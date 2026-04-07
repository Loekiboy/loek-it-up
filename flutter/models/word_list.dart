import 'word.dart';

class WordList {
  final String id;
  String title;
  List<Word> words;
  DateTime createdAt;
  DateTime updatedAt;
  bool isPublic;
  String? userId;

  WordList({
    required this.id,
    required this.title,
    required this.words,
    required this.createdAt,
    required this.updatedAt,
    this.isPublic = false,
    this.userId,
  });

  int get wordCount => words.length;

  double get percentLearned {
    if (words.isEmpty) return 0;
    final masteredCount = words.where((w) => w.learningLevel == 2).length;
    return (masteredCount / words.length) * 100;
  }

  List<Word> getWordsByLevel(int level) =>
      words.where((w) => w.learningLevel == level).toList();

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'words': words.map((w) => w.toJson()).toList(),
        'createdAt': createdAt.toIso8601String(),
        'updatedAt': updatedAt.toIso8601String(),
        'isPublic': isPublic,
        'userId': userId,
      };

  factory WordList.fromJson(Map<String, dynamic> json) => WordList(
        id: json['id'] as String,
        title: json['title'] as String,
        words: (json['words'] as List<dynamic>)
            .map((w) => Word.fromJson(w as Map<String, dynamic>))
            .toList(),
        createdAt: DateTime.parse(json['createdAt'] as String),
        updatedAt: DateTime.parse(json['updatedAt'] as String),
        isPublic: json['isPublic'] as bool? ?? false,
        userId: json['userId'] as String?,
      );

  WordList copyWith({
    String? id,
    String? title,
    List<Word>? words,
    DateTime? createdAt,
    DateTime? updatedAt,
    bool? isPublic,
    String? userId,
  }) =>
      WordList(
        id: id ?? this.id,
        title: title ?? this.title,
        words: words ?? this.words,
        createdAt: createdAt ?? this.createdAt,
        updatedAt: updatedAt ?? this.updatedAt,
        isPublic: isPublic ?? this.isPublic,
        userId: userId ?? this.userId,
      );
}
