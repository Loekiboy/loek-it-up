import 'package:flutter/material.dart';
import '../models/word_list.dart';

class WordListCard extends StatelessWidget {
  final WordList list;
  final VoidCallback onTap;
  final String? searchQuery;

  const WordListCard({
    super.key,
    required this.list,
    required this.onTap,
    this.searchQuery,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      list.title,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                  ),
                  if (list.isPublic)
                    const Chip(
                      label: Text('Openbaar'),
                      padding: EdgeInsets.symmetric(horizontal: 8),
                    ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                '${list.wordCount} woordje${list.wordCount != 1 ? 's' : ''}',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const SizedBox(height: 12),
              LinearProgressIndicator(
                value: list.percentLearned / 100,
                backgroundColor: Colors.grey.shade300,
              ),
              const SizedBox(height: 4),
              Text(
                '${list.percentLearned.toStringAsFixed(0)}% geleerd',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              if (searchQuery != null && searchQuery!.isNotEmpty) ...[
                const SizedBox(height: 8),
                const Divider(),
                const SizedBox(height: 8),
                _buildMatchingWords(context),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMatchingWords(BuildContext context) {
    final matchingWords = list.words.where((word) =>
        word.term.toLowerCase().contains(searchQuery!.toLowerCase()) ||
        word.definition.toLowerCase().contains(searchQuery!.toLowerCase())).take(3).toList();

    if (matchingWords.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Gevonden woordjes:',
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 4),
        ...matchingWords.map((word) => Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(
                '${word.term} → ${word.definition}',
                style: Theme.of(context).textTheme.bodySmall,
              ),
            )),
      ],
    );
  }
}
