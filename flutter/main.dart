import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:go_router/go_router.dart';
import 'services/app_state.dart';
import 'screens/home_screen.dart';
import 'screens/create_list_screen.dart';
import 'screens/list_detail_screen.dart';
import 'screens/practice_screen.dart';
import 'screens/settings_screen.dart';
import 'screens/stats_screen.dart';
import 'screens/search_screen.dart';
import 'utils/theme.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => AppState(),
      child: const LoekItUpApp(),
    ),
  );
}

class LoekItUpApp extends StatelessWidget {
  const LoekItUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, appState, child) {
        final isDarkMode = appState.settings['darkMode'] as bool? ?? false;

        final router = GoRouter(
          initialLocation: '/',
          routes: [
            GoRoute(
              path: '/',
              builder: (context, state) => const HomeScreen(),
            ),
            GoRoute(
              path: '/create',
              builder: (context, state) => const CreateListScreen(),
            ),
            GoRoute(
              path: '/list/:id',
              builder: (context, state) {
                final id = state.pathParameters['id']!;
                return ListDetailScreen(listId: id);
              },
            ),
            GoRoute(
              path: '/practice/:id',
              builder: (context, state) {
                final id = state.pathParameters['id']!;
                final mode = state.uri.queryParameters['mode'] ?? 'classic';
                return PracticeScreen(listId: id, mode: mode);
              },
            ),
            GoRoute(
              path: '/settings',
              builder: (context, state) => const SettingsScreen(),
            ),
            GoRoute(
              path: '/stats',
              builder: (context, state) => const StatsScreen(),
            ),
            GoRoute(
              path: '/search',
              builder: (context, state) => const SearchScreen(),
            ),
          ],
        );

        return MaterialApp.router(
          title: 'Loek it Up',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: isDarkMode ? ThemeMode.dark : ThemeMode.light,
          routerConfig: router,
          localizationsDelegates: const [
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          supportedLocales: const [
            Locale('nl', 'NL'),
            Locale('en', 'US'),
          ],
        );
      },
    );
  }
}
