import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/word_list.dart';

class SupabaseService {
  static SupabaseClient? _client;

  static SupabaseClient get client {
    if (_client == null) {
      throw Exception('Supabase not initialized. Call initialize() first.');
    }
    return _client!;
  }

  static Future<void> initialize({
    required String url,
    required String anonKey,
  }) async {
    await Supabase.initialize(
      url: url,
      anonKey: anonKey,
    );
    _client = Supabase.instance.client;
  }

  // Authentication
  Future<AuthResponse> signUp({
    required String email,
    required String password,
  }) async {
    return await client.auth.signUp(
      email: email,
      password: password,
    );
  }

  Future<AuthResponse> signIn({
    required String email,
    required String password,
  }) async {
    return await client.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }

  Future<void> signOut() async {
    await client.auth.signOut();
  }

  User? get currentUser => client.auth.currentUser;

  Stream<AuthState> get authStateChanges => client.auth.onAuthStateChange;

  // Word Lists sync
  Future<List<WordList>> fetchUserLists() async {
    final userId = currentUser?.id;
    if (userId == null) return [];

    final response = await client
        .from('word_lists')
        .select()
        .eq('user_id', userId)
        .order('updated_at', ascending: false);

    return (response as List)
        .map((item) => WordList.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<void> saveListToCloud(WordList list) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    final data = list.toJson();
    data['user_id'] = userId;

    await client.from('word_lists').upsert(data);
  }

  Future<void> deleteListFromCloud(String listId) async {
    await client.from('word_lists').delete().eq('id', listId);
  }

  // Progress tracking
  Future<void> saveProgress({
    required String listId,
    required String wordId,
    required bool correct,
  }) async {
    final userId = currentUser?.id;
    if (userId == null) return;

    await client.from('progress').insert({
      'user_id': userId,
      'list_id': listId,
      'word_id': wordId,
      'correct': correct,
      'timestamp': DateTime.now().toIso8601String(),
    });
  }

  // Feedback
  Future<void> submitFeedback({
    required String type,
    required String subject,
    required String description,
  }) async {
    final userId = currentUser?.id;

    await client.from('feedback').insert({
      'user_id': userId,
      'type': type,
      'subject': subject,
      'description': description,
      'created_at': DateTime.now().toIso8601String(),
    });
  }

  // Shared lists
  Future<List<WordList>> fetchPublicLists() async {
    final response = await client
        .from('word_lists')
        .select()
        .eq('is_public', true)
        .order('created_at', ascending: false)
        .limit(50);

    return (response as List)
        .map((item) => WordList.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<WordList?> fetchSharedList(String listId) async {
    final response =
        await client.from('word_lists').select().eq('id', listId).single();

    if (response == null) return null;
    return WordList.fromJson(response as Map<String, dynamic>);
  }
}
