import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../services/app_state.dart';
import '../models/word_list.dart';

class ListDetailScreen extends StatelessWidget {
  final String listId;

  const ListDetailScreen({super.key, required this.listId});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, appState, child) {
        final list = appState.getListById(listId);

        if (list == null) {
          return Scaffold(
            appBar: AppBar(title: const Text('Lijst niet gevonden')),
            body: const Center(
              child: Text('Deze lijst bestaat niet meer'),
            ),
          );
        }

        return Scaffold(
          appBar: AppBar(
            title: Text(list.title),
            actions: [
              IconButton(
                icon: const Icon(Icons.edit),
                onPressed: () => context.go('/create?id=$listId'),
              ),
              PopupMenuButton(
                itemBuilder: (context) => [
                  const PopupMenuItem(
                    value: 'delete',
                    child: Row(
                      children: [
                        Icon(Icons.delete, color: Colors.red),
                        SizedBox(width: 8),
                        Text('Verwijderen'),
                      ],
                    ),
                  ),
                ],
                onSelected: (value) async {
                  if (value == 'delete') {
                    final confirm = await showDialog<bool>(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text('Lijst verwijderen?'),
                        content: const Text(
                          'Weet je zeker dat je deze lijst wilt verwijderen?',
                        ),
                        actions: [
                          TextButton(
                            onPressed: () => Navigator.pop(context, false),
                            child: const Text('Annuleren'),
                          ),
                          TextButton(
                            onPressed: () => Navigator.pop(context, true),
                            child: const Text('Verwijderen'),
                          ),
                        ],
                      ),
                    );

                    if (confirm == true && context.mounted) {
                      await appState.deleteList(listId);
                      context.go('/');
                    }
                  }
                },
              ),
            ],
          ),
          body: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _StatsCard(list: list),
              const SizedBox(height: 24),
              _PracticeModes(listId: listId),
              const SizedBox(height: 24),
              Text(
                'Woordjes (${list.wordCount})',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 16),
              ...list.words.map((word) => Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: ListTile(
                      title: Text(word.term),
                      subtitle: Text(word.definition),
                      trailing: _WordProgress(word: word),
                    ),
                  )),
            ],
          ),
        );
      },
    );
  }
}

class _StatsCard extends StatelessWidget {
  final WordList list;

  const _StatsCard({required this.list});

  @override
  Widget build(BuildContext context) {
    final newWords = list.getWordsByLevel(0);
    final learningWords = list.getWordsByLevel(1);
    final masteredWords = list.getWordsByLevel(2);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Voortgang',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            LinearProgressIndicator(
              value: list.percentLearned / 100,
              minHeight: 8,
            ),
            const SizedBox(height: 8),
            Text('${list.percentLearned.toStringAsFixed(0)}% geleerd'),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _StatItem(
                  label: 'Nieuw',
                  count: newWords.length,
                  color: Colors.blue,
                ),
                _StatItem(
                  label: 'Leren',
                  count: learningWords.length,
                  color: Colors.orange,
                ),
                _StatItem(
                  label: 'Gestampt',
                  count: masteredWords.length,
                  color: Colors.green,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final String label;
  final int count;
  final Color color;

  const _StatItem({
    required this.label,
    required this.count,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          count.toString(),
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                color: color,
              ),
        ),
        Text(label),
      ],
    );
  }
}

class _PracticeModes extends StatelessWidget {
  final String listId;

  const _PracticeModes({required this.listId});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Oefenmodi',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 12),
        _PracticeModeCard(
          title: 'Klassiek',
          description: 'Beantwoord vragen één voor één',
          icon: Icons.school,
          color: Colors.blue,
          onTap: () => context.go('/practice/$listId?mode=classic'),
        ),
        const SizedBox(height: 12),
        _PracticeModeCard(
          title: 'Multiple Choice',
          description: 'Kies het juiste antwoord',
          icon: Icons.quiz,
          color: Colors.green,
          onTap: () => context.go('/practice/$listId?mode=multiple_choice'),
        ),
        const SizedBox(height: 12),
        _PracticeModeCard(
          title: 'Flashcards',
          description: 'Swipe door je woordjes',
          icon: Icons.style,
          color: Colors.orange,
          onTap: () => context.go('/practice/$listId?mode=flashcard'),
        ),
      ],
    );
  }
}

class _PracticeModeCard extends StatelessWidget {
  final String title;
  final String description;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const _PracticeModeCard({
    required this.title,
    required this.description,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(icon, color: color),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    Text(
                      description,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
              const Icon(Icons.arrow_forward_ios),
            ],
          ),
        ),
      ),
    );
  }
}

class _WordProgress extends StatelessWidget {
  final word;

  const _WordProgress({required this.word});

  @override
  Widget build(BuildContext context) {
    final total = word.correctCount + word.wrongCount;
    if (total == 0) {
      return const Chip(label: Text('Nieuw'));
    }

    final accuracy = (word.correctCount / total * 100).toInt();
    Color color = Colors.red;
    if (accuracy >= 80) {
      color = Colors.green;
    } else if (accuracy >= 50) {
      color = Colors.orange;
    }

    return Chip(
      label: Text('$accuracy%'),
      backgroundColor: color.withOpacity(0.2),
      labelStyle: TextStyle(color: color),
    );
  }
}
