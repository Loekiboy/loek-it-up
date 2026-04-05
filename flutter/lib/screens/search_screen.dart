import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../services/app_state.dart';
import '../widgets/word_list_card.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final _searchController = TextEditingController();
  String _searchQuery = '';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TextField(
          controller: _searchController,
          decoration: const InputDecoration(
            hintText: 'Zoek lijsten of woordjes...',
            border: InputBorder.none,
            hintStyle: TextStyle(color: Colors.grey),
          ),
          autofocus: true,
          onChanged: (value) {
            setState(() {
              _searchQuery = value.toLowerCase();
            });
          },
        ),
        actions: [
          if (_searchQuery.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.clear),
              onPressed: () {
                setState(() {
                  _searchController.clear();
                  _searchQuery = '';
                });
              },
            ),
        ],
      ),
      body: Consumer<AppState>(
        builder: (context, appState, child) {
          if (_searchQuery.isEmpty) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.search, size: 64, color: Colors.grey),
                  SizedBox(height: 16),
                  Text('Zoek naar lijsten of woordjes'),
                ],
              ),
            );
          }

          final matchingLists = appState.lists.where((list) {
            // Search in list title
            if (list.title.toLowerCase().contains(_searchQuery)) {
              return true;
            }
            // Search in words
            return list.words.any((word) =>
                word.term.toLowerCase().contains(_searchQuery) ||
                word.definition.toLowerCase().contains(_searchQuery));
          }).toList();

          if (matchingLists.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.search_off, size: 64, color: Colors.grey),
                  const SizedBox(height: 16),
                  Text('Geen resultaten voor "$_searchQuery"'),
                ],
              ),
            );
          }

          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Text(
                '${matchingLists.length} resultaten',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 16),
              ...matchingLists.map((list) => Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: WordListCard(
                      list: list,
                      searchQuery: _searchQuery,
                      onTap: () => context.go('/list/${list.id}'),
                    ),
                  )),
            ],
          );
        },
      ),
    );
  }
}
