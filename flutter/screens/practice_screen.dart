import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:confetti/confetti.dart';
import '../services/app_state.dart';
import '../models/word.dart';
import 'dart:math';

class PracticeScreen extends StatefulWidget {
  final String listId;
  final String mode;

  const PracticeScreen({
    super.key,
    required this.listId,
    this.mode = 'classic',
  });

  @override
  State<PracticeScreen> createState() => _PracticeScreenState();
}

class _PracticeScreenState extends State<PracticeScreen> {
  late List<Word> _words;
  int _currentIndex = 0;
  final _answerController = TextEditingController();
  String? _feedback;
  bool _showAnswer = false;
  final _confettiController = ConfettiController();
  int _correctCount = 0;
  int _wrongCount = 0;

  @override
  void initState() {
    super.initState();
    _loadWords();
  }

  void _loadWords() {
    final appState = context.read<AppState>();
    final list = appState.getListById(widget.listId);
    if (list != null) {
      setState(() {
        _words = List.from(list.words)..shuffle();
      });
    }
  }

  void _checkAnswer() {
    if (_answerController.text.trim().isEmpty) return;

    final currentWord = _words[_currentIndex];
    final answer = _answerController.text.trim().toLowerCase();
    final correct = answer == currentWord.definition.toLowerCase();

    setState(() {
      _feedback = correct ? 'Correct! ✓' : 'Fout! Juiste antwoord: ${currentWord.definition}';
      _showAnswer = true;
      if (correct) {
        _correctCount++;
        context.read<AppState>().audio.playCorrect();
      } else {
        _wrongCount++;
        context.read<AppState>().audio.playWrong();
      }
    });

    // Update word stats
    final appState = context.read<AppState>();
    final updatedWord = currentWord.copyWith(
      correctCount: correct ? currentWord.correctCount + 1 : currentWord.correctCount,
      wrongCount: !correct ? currentWord.wrongCount + 1 : currentWord.wrongCount,
      lastReviewed: DateTime.now(),
    );
    appState.updateWord(widget.listId, updatedWord);

    if (correct && _currentIndex == _words.length - 1) {
      _confettiController.play();
    }
  }

  void _nextWord() {
    if (_currentIndex < _words.length - 1) {
      setState(() {
        _currentIndex++;
        _answerController.clear();
        _feedback = null;
        _showAnswer = false;
      });
    } else {
      _showResults();
    }
  }

  void _showResults() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Voltooid! 🎉'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Goed: $_correctCount'),
            Text('Fout: $_wrongCount'),
            Text('Score: ${(_correctCount / _words.length * 100).toStringAsFixed(0)}%'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              context.go('/');
            },
            child: const Text('Terug naar home'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                _currentIndex = 0;
                _correctCount = 0;
                _wrongCount = 0;
                _loadWords();
              });
            },
            child: const Text('Opnieuw'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _answerController.dispose();
    _confettiController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_words.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Oefenen')),
        body: const Center(child: Text('Geen woordjes om te oefenen')),
      );
    }

    final currentWord = _words[_currentIndex];

    return Scaffold(
      appBar: AppBar(
        title: Text('Oefenen - ${_currentIndex + 1}/${_words.length}'),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Center(
              child: Text(
                '✓ $_correctCount | ✗ $_wrongCount',
                style: const TextStyle(fontSize: 16),
              ),
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          Column(
            children: [
              LinearProgressIndicator(
                value: (_currentIndex + 1) / _words.length,
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Card(
                        elevation: 4,
                        child: Padding(
                          padding: const EdgeInsets.all(32),
                          child: Column(
                            children: [
                              Text(
                                'Wat is de vertaling van:',
                                style: Theme.of(context).textTheme.bodyLarge,
                              ),
                              const SizedBox(height: 24),
                              Text(
                                currentWord.term,
                                style: Theme.of(context).textTheme.headlineLarge,
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 32),
                      if (!_showAnswer) ...[
                        TextField(
                          controller: _answerController,
                          decoration: const InputDecoration(
                            labelText: 'Jouw antwoord',
                            border: OutlineInputBorder(),
                          ),
                          onSubmitted: (_) => _checkAnswer(),
                          autofocus: true,
                        ),
                        const SizedBox(height: 24),
                        ElevatedButton(
                          onPressed: _checkAnswer,
                          child: const Text('Controleer'),
                        ),
                      ] else ...[
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: _feedback!.contains('Correct')
                                ? Colors.green.withOpacity(0.2)
                                : Colors.red.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            _feedback!,
                            style: Theme.of(context).textTheme.titleLarge,
                            textAlign: TextAlign.center,
                          ),
                        ),
                        const SizedBox(height: 24),
                        ElevatedButton(
                          onPressed: _nextWord,
                          child: Text(
                            _currentIndex < _words.length - 1
                                ? 'Volgende'
                                : 'Resultaten bekijken',
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ],
          ),
          Align(
            alignment: Alignment.topCenter,
            child: ConfettiWidget(
              confettiController: _confettiController,
              blastDirection: pi / 2,
              emissionFrequency: 0.05,
              numberOfParticles: 20,
              gravity: 0.1,
            ),
          ),
        ],
      ),
    );
  }
}
