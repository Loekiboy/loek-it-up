class Word {
  final String id;
  final String term;
  final String definition;
  int correctCount;
  int wrongCount;
  DateTime? lastReviewed;

  Word({
    required this.id,
    required this.term,
    required this.definition,
    this.correctCount = 0,
    this.wrongCount = 0,
    this.lastReviewed,
  });

  // Calculate learning level (0 = new, 1 = learning, 2 = mastered)
  int get learningLevel {
    if (correctCount == 0) return 0;
    if (correctCount < 3 || wrongCount > correctCount) return 1;
    return 2;
  }

  double get accuracy {
    final total = correctCount + wrongCount;
    if (total == 0) return 0;
    return correctCount / total;
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'term': term,
        'definition': definition,
        'correctCount': correctCount,
        'wrongCount': wrongCount,
        'lastReviewed': lastReviewed?.toIso8601String(),
      };

  factory Word.fromJson(Map<String, dynamic> json) => Word(
        id: json['id'] as String,
        term: json['term'] as String,
        definition: json['definition'] as String,
        correctCount: json['correctCount'] as int? ?? 0,
        wrongCount: json['wrongCount'] as int? ?? 0,
        lastReviewed: json['lastReviewed'] != null
            ? DateTime.parse(json['lastReviewed'] as String)
            : null,
      );

  Word copyWith({
    String? id,
    String? term,
    String? definition,
    int? correctCount,
    int? wrongCount,
    DateTime? lastReviewed,
  }) =>
      Word(
        id: id ?? this.id,
        term: term ?? this.term,
        definition: definition ?? this.definition,
        correctCount: correctCount ?? this.correctCount,
        wrongCount: wrongCount ?? this.wrongCount,
        lastReviewed: lastReviewed ?? this.lastReviewed,
      );
}
