import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/word_list.dart';
import '../models/word.dart';

class StorageService {
  static const String _listsKey = 'word_lists';
  static const String _settingsKey = 'app_settings';

  Future<List<WordList>> loadLists() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final listsJson = prefs.getString(_listsKey);

      if (listsJson == null) return [];

      final List<dynamic> decoded = json.decode(listsJson);
      return decoded
          .map((item) => WordList.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      print('Error loading lists: $e');
      return [];
    }
  }

  Future<bool> saveLists(List<WordList> lists) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final listsJson = json.encode(lists.map((l) => l.toJson()).toList());
      return await prefs.setString(_listsKey, listsJson);
    } catch (e) {
      print('Error saving lists: $e');
      return false;
    }
  }

  Future<bool> saveList(WordList list, List<WordList> allLists) async {
    final index = allLists.indexWhere((l) => l.id == list.id);
    if (index != -1) {
      allLists[index] = list;
    } else {
      allLists.add(list);
    }
    return await saveLists(allLists);
  }

  Future<bool> deleteList(String listId, List<WordList> allLists) async {
    allLists.removeWhere((l) => l.id == listId);
    return await saveLists(allLists);
  }

  Future<Map<String, dynamic>> loadSettings() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final settingsJson = prefs.getString(_settingsKey);

      if (settingsJson == null) {
        return {
          'language': 'nl',
          'soundEnabled': true,
          'animationsEnabled': true,
          'darkMode': false,
        };
      }

      return json.decode(settingsJson) as Map<String, dynamic>;
    } catch (e) {
      print('Error loading settings: $e');
      return {
        'language': 'nl',
        'soundEnabled': true,
        'animationsEnabled': true,
        'darkMode': false,
      };
    }
  }

  Future<bool> saveSettings(Map<String, dynamic> settings) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final settingsJson = json.encode(settings);
      return await prefs.setString(_settingsKey, settingsJson);
    } catch (e) {
      print('Error saving settings: $e');
      return false;
    }
  }

  Future<bool> clearAllData() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_listsKey);
      return true;
    } catch (e) {
      print('Error clearing data: $e');
      return false;
    }
  }
}
