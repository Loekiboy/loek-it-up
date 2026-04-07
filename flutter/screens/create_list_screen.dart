import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:uuid/uuid.dart';
import '../services/app_state.dart';
import '../models/word_list.dart';
import '../models/word.dart';

class CreateListScreen extends StatefulWidget {
  final String? listId;

  const CreateListScreen({super.key, this.listId});

  @override
  State<CreateListScreen> createState() => _CreateListScreenState();
}

class _CreateListScreenState extends State<CreateListScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final List<_WordPair> _words = [];
  bool _isPublic = false;

  @override
  void initState() {
    super.initState();
    if (widget.listId != null) {
      _loadExistingList();
    } else {
      _addEmptyWord();
    }
  }

  void _loadExistingList() {
    final appState = context.read<AppState>();
    final list = appState.getListById(widget.listId!);
    if (list != null) {
      _titleController.text = list.title;
      _isPublic = list.isPublic;
      for (final word in list.words) {
        _words.add(_WordPair(
          termController: TextEditingController(text: word.term),
          definitionController: TextEditingController(text: word.definition),
        ));
      }
    }
  }

  void _addEmptyWord() {
    setState(() {
      _words.add(_WordPair(
        termController: TextEditingController(),
        definitionController: TextEditingController(),
      ));
    });
  }

  void _removeWord(int index) {
    setState(() {
      _words[index].dispose();
      _words.removeAt(index);
    });
  }

  Future<void> _saveList() async {
    if (!_formKey.currentState!.validate()) return;

    final validWords = _words
        .where((pair) =>
            pair.termController.text.isNotEmpty &&
            pair.definitionController.text.isNotEmpty)
        .map((pair) => Word(
              id: const Uuid().v4(),
              term: pair.termController.text.trim(),
              definition: pair.definitionController.text.trim(),
            ))
        .toList();

    if (validWords.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Voeg minimaal één woordje toe'),
        ),
      );
      return;
    }

    final appState = context.read<AppState>();
    final now = DateTime.now();

    if (widget.listId != null) {
      final existingList = appState.getListById(widget.listId!);
      if (existingList != null) {
        final updatedList = existingList.copyWith(
          title: _titleController.text.trim(),
          words: validWords,
          updatedAt: now,
          isPublic: _isPublic,
        );
        await appState.updateList(updatedList);
      }
    } else {
      final newList = WordList(
        id: const Uuid().v4(),
        title: _titleController.text.trim(),
        words: validWords,
        createdAt: now,
        updatedAt: now,
        isPublic: _isPublic,
      );
      await appState.addList(newList);
    }

    if (mounted) {
      context.go('/');
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    for (final pair in _words) {
      pair.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.listId != null ? 'Lijst bewerken' : 'Nieuwe lijst'),
        actions: [
          IconButton(
            icon: const Icon(Icons.check),
            onPressed: _saveList,
          ),
        ],
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            TextFormField(
              controller: _titleController,
              decoration: const InputDecoration(
                labelText: 'Lijstnaam',
                hintText: 'Bijv. Engels Hoofdstuk 3',
                prefixIcon: Icon(Icons.title),
              ),
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Voer een naam in';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            SwitchListTile(
              title: const Text('Openbaar maken'),
              subtitle: const Text('Anderen kunnen deze lijst vinden en gebruiken'),
              value: _isPublic,
              onChanged: (value) => setState(() => _isPublic = value),
            ),
            const SizedBox(height: 24),
            Text(
              'Woordjes',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),
            ..._words.asMap().entries.map((entry) {
              final index = entry.key;
              final pair = entry.value;
              return _WordInputCard(
                index: index,
                pair: pair,
                onRemove: _words.length > 1 ? () => _removeWord(index) : null,
              );
            }),
            const SizedBox(height: 16),
            OutlinedButton.icon(
              onPressed: _addEmptyWord,
              icon: const Icon(Icons.add),
              label: const Text('Woordje toevoegen'),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _saveList,
        icon: const Icon(Icons.save),
        label: const Text('Opslaan'),
      ),
    );
  }
}

class _WordPair {
  final TextEditingController termController;
  final TextEditingController definitionController;

  _WordPair({
    required this.termController,
    required this.definitionController,
  });

  void dispose() {
    termController.dispose();
    definitionController.dispose();
  }
}

class _WordInputCard extends StatelessWidget {
  final int index;
  final _WordPair pair;
  final VoidCallback? onRemove;

  const _WordInputCard({
    required this.index,
    required this.pair,
    this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  '${index + 1}.',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const Spacer(),
                if (onRemove != null)
                  IconButton(
                    icon: const Icon(Icons.delete_outline),
                    onPressed: onRemove,
                    color: Colors.red,
                  ),
              ],
            ),
            const SizedBox(height: 8),
            TextFormField(
              controller: pair.termController,
              decoration: const InputDecoration(
                labelText: 'Term',
                hintText: 'Bijv. Hello',
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: pair.definitionController,
              decoration: const InputDecoration(
                labelText: 'Definitie',
                hintText: 'Bijv. Hallo',
              ),
            ),
          ],
        ),
      ),
    );
  }
}
