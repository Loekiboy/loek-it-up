import 'package:flutter/foundation.dart';
import '../models/word_list.dart';
import '../models/word.dart';
import '../services/storage_service.dart';
import '../services/supabase_service.dart';
import '../services/audio_service.dart';

class AppState extends ChangeNotifier {
  final StorageService _storage = StorageService();
  final SupabaseService _supabase = SupabaseService();
  final AudioService _audio = AudioService();

  List<WordList> _lists = [];
  Map<String, dynamic> _settings = {};
  bool _isLoading = false;

  List<WordList> get lists => _lists;
  Map<String, dynamic> get settings => _settings;
  bool get isLoading => _isLoading;
  AudioService get audio => _audio;

  AppState() {
    _init();
  }

  Future<void> _init() async {
    await loadLists();
    await loadSettings();
  }

  Future<void> loadLists() async {
    _isLoading = true;
    notifyListeners();

    try {
      _lists = await _storage.loadLists();
    } catch (e) {
      print('Error loading lists: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> loadSettings() async {
    try {
      _settings = await _storage.loadSettings();
      _audio.setSoundEnabled(_settings['soundEnabled'] as bool? ?? true);
    } catch (e) {
      print('Error loading settings: $e');
    }
    notifyListeners();
  }

  Future<void> saveSettings(Map<String, dynamic> settings) async {
    _settings = settings;
    _audio.setSoundEnabled(settings['soundEnabled'] as bool? ?? true);
    await _storage.saveSettings(settings);
    notifyListeners();
  }

  Future<void> addList(WordList list) async {
    _lists.add(list);
    await _storage.saveLists(_lists);
    notifyListeners();
  }

  Future<void> updateList(WordList list) async {
    final index = _lists.indexWhere((l) => l.id == list.id);
    if (index != -1) {
      _lists[index] = list;
      await _storage.saveLists(_lists);
      notifyListeners();
    }
  }

  Future<void> deleteList(String listId) async {
    _lists.removeWhere((l) => l.id == listId);
    await _storage.saveLists(_lists);
    notifyListeners();
  }

  Future<void> updateWord(String listId, Word word) async {
    final list = _lists.firstWhere((l) => l.id == listId);
    final wordIndex = list.words.indexWhere((w) => w.id == word.id);
    if (wordIndex != -1) {
      list.words[wordIndex] = word;
      list.updatedAt = DateTime.now();
      await _storage.saveLists(_lists);
      notifyListeners();
    }
  }

  Future<void> syncWithCloud() async {
    if (_supabase.currentUser == null) return;

    try {
      _isLoading = true;
      notifyListeners();

      final cloudLists = await _supabase.fetchUserLists();

      // Merge local and cloud lists
      for (final cloudList in cloudLists) {
        final localIndex = _lists.indexWhere((l) => l.id == cloudList.id);
        if (localIndex == -1) {
          _lists.add(cloudList);
        } else if (cloudList.updatedAt.isAfter(_lists[localIndex].updatedAt)) {
          _lists[localIndex] = cloudList;
        }
      }

      // Upload local lists to cloud
      for (final list in _lists) {
        if (list.userId == _supabase.currentUser!.id) {
          await _supabase.saveListToCloud(list);
        }
      }

      await _storage.saveLists(_lists);
    } catch (e) {
      print('Error syncing with cloud: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  WordList? getListById(String id) {
    try {
      return _lists.firstWhere((l) => l.id == id);
    } catch (e) {
      return null;
    }
  }

  @override
  void dispose() {
    _audio.dispose();
    super.dispose();
  }
}
