import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/app_state.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Instellingen'),
      ),
      body: Consumer<AppState>(
        builder: (context, appState, child) {
          final settings = appState.settings;

          return ListView(
            children: [
              SwitchListTile(
                title: const Text('Geluid'),
                subtitle: const Text('Geluidseffecten tijdens oefenen'),
                value: settings['soundEnabled'] as bool? ?? true,
                onChanged: (value) {
                  appState.saveSettings({
                    ...settings,
                    'soundEnabled': value,
                  });
                },
              ),
              SwitchListTile(
                title: const Text('Animaties'),
                subtitle: const Text('Animaties en visuele effecten'),
                value: settings['animationsEnabled'] as bool? ?? true,
                onChanged: (value) {
                  appState.saveSettings({
                    ...settings,
                    'animationsEnabled': value,
                  });
                },
              ),
              SwitchListTile(
                title: const Text('Donkere modus'),
                subtitle: const Text('Gebruik een donker kleurenschema'),
                value: settings['darkMode'] as bool? ?? false,
                onChanged: (value) {
                  appState.saveSettings({
                    ...settings,
                    'darkMode': value,
                  });
                },
              ),
              const Divider(),
              ListTile(
                title: const Text('Taal'),
                subtitle: Text(settings['language'] == 'nl' ? 'Nederlands' : 'English'),
                trailing: const Icon(Icons.arrow_forward_ios),
                onTap: () {
                  showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                      title: const Text('Taal selecteren'),
                      content: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          RadioListTile<String>(
                            title: const Text('Nederlands'),
                            value: 'nl',
                            groupValue: settings['language'] as String? ?? 'nl',
                            onChanged: (value) {
                              appState.saveSettings({
                                ...settings,
                                'language': value,
                              });
                              Navigator.pop(context);
                            },
                          ),
                          RadioListTile<String>(
                            title: const Text('English'),
                            value: 'en',
                            groupValue: settings['language'] as String? ?? 'nl',
                            onChanged: (value) {
                              appState.saveSettings({
                                ...settings,
                                'language': value,
                              });
                              Navigator.pop(context);
                            },
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
              const Divider(),
              ListTile(
                title: const Text('Data wissen'),
                subtitle: const Text('Verwijder alle woordenlijsten'),
                leading: const Icon(Icons.delete_forever, color: Colors.red),
                onTap: () async {
                  final confirm = await showDialog<bool>(
                    context: context,
                    builder: (context) => AlertDialog(
                      title: const Text('Data wissen?'),
                      content: const Text(
                        'Weet je zeker dat je alle woordenlijsten wilt verwijderen? Dit kan niet ongedaan worden gemaakt.',
                      ),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.pop(context, false),
                          child: const Text('Annuleren'),
                        ),
                        TextButton(
                          onPressed: () => Navigator.pop(context, true),
                          style: TextButton.styleFrom(foregroundColor: Colors.red),
                          child: const Text('Wissen'),
                        ),
                      ],
                    ),
                  );

                  if (confirm == true && context.mounted) {
                    // Clear all lists
                    final lists = List.from(appState.lists);
                    for (final list in lists) {
                      await appState.deleteList(list.id);
                    }

                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Alle data gewist')),
                      );
                    }
                  }
                },
              ),
              const Divider(),
              const AboutListTile(
                icon: Icon(Icons.info),
                applicationName: 'Loek it Up',
                applicationVersion: '1.0.0',
                applicationLegalese: '© 2024 Loek Oerlemans',
                children: [
                  Text('Een gratis woordjes leren app.'),
                ],
              ),
            ],
          );
        },
      ),
    );
  }
}
