import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/app_state.dart';

class StatsScreen extends StatelessWidget {
  const StatsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Statistieken'),
      ),
      body: Consumer<AppState>(
        builder: (context, appState, child) {
          final lists = appState.lists;

          if (lists.isEmpty) {
            return const Center(
              child: Text('Nog geen statistieken beschikbaar'),
            );
          }

          int totalWords = 0;
          int totalCorrect = 0;
          int totalWrong = 0;
          int masteredWords = 0;

          for (final list in lists) {
            totalWords += list.words.length;
            for (final word in list.words) {
              totalCorrect += word.correctCount;
              totalWrong += word.wrongCount;
              if (word.learningLevel == 2) masteredWords++;
            }
          }

          final totalAttempts = totalCorrect + totalWrong;
          final accuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts * 100) : 0;

          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Totaal overzicht',
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: 24),
                      _StatRow(
                        label: 'Aantal lijsten',
                        value: lists.length.toString(),
                        icon: Icons.list,
                      ),
                      const SizedBox(height: 12),
                      _StatRow(
                        label: 'Totaal woordjes',
                        value: totalWords.toString(),
                        icon: Icons.school,
                      ),
                      const SizedBox(height: 12),
                      _StatRow(
                        label: 'Gestampte woordjes',
                        value: masteredWords.toString(),
                        icon: Icons.check_circle,
                      ),
                      const SizedBox(height: 12),
                      _StatRow(
                        label: 'Totaal pogingen',
                        value: totalAttempts.toString(),
                        icon: Icons.try_sms_star,
                      ),
                      const SizedBox(height: 12),
                      _StatRow(
                        label: 'Nauwkeurigheid',
                        value: '${accuracy.toStringAsFixed(1)}%',
                        icon: Icons.percent,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'Per lijst',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 16),
              ...lists.map((list) {
                final listCorrect = list.words.fold(0, (sum, w) => sum + w.correctCount);
                final listWrong = list.words.fold(0, (sum, w) => sum + w.wrongCount);
                final listTotal = listCorrect + listWrong;
                final listAccuracy = listTotal > 0 ? (listCorrect / listTotal * 100) : 0;

                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: ListTile(
                    title: Text(list.title),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 4),
                        Text('${list.wordCount} woordjes • ${list.percentLearned.toStringAsFixed(0)}% geleerd'),
                        if (listTotal > 0) ...[
                          const SizedBox(height: 4),
                          Text('Nauwkeurigheid: ${listAccuracy.toStringAsFixed(1)}%'),
                        ],
                      ],
                    ),
                    trailing: CircularProgressIndicator(
                      value: list.percentLearned / 100,
                      backgroundColor: Colors.grey.shade300,
                    ),
                  ),
                );
              }),
            ],
          );
        },
      ),
    );
  }
}

class _StatRow extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;

  const _StatRow({
    required this.label,
    required this.value,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, size: 20),
        const SizedBox(width: 12),
        Expanded(child: Text(label)),
        Text(
          value,
          style: Theme.of(context).textTheme.titleMedium,
        ),
      ],
    );
  }
}
