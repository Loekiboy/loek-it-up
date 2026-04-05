# Loek it Up - Flutter App

Een Flutter-versie van de Loek it Up woordjes leren applicatie.

## Over deze app

Loek it Up is een gratis woordjes leren app waarmee je je eigen woordenlijsten kunt maken en oefenen met verschillende modi. Deze Flutter-versie biedt dezelfde functionaliteit als de web-versie, maar dan als native mobiele app voor iOS en Android.

## Features

- ✅ Maak onbeperkt woordenlijsten
- ✅ Verschillende oefenmodi:
  - Klassiek (typ het antwoord)
  - Multiple choice
  - Flashcards
- ✅ Volg je voortgang met statistieken
- ✅ Zoek door je lijsten en woordjes
- ✅ Cloud sync met Supabase (optioneel)
- ✅ Offline support
- ✅ Dark mode
- ✅ Geluideffecten en animaties
- ✅ Nederlands en Engels

## Project Structuur

```
flutter/
├── lib/
│   ├── main.dart              # App entry point
│   ├── models/                # Data models
│   │   ├── word.dart
│   │   └── word_list.dart
│   ├── screens/               # App screens
│   │   ├── home_screen.dart
│   │   ├── create_list_screen.dart
│   │   ├── list_detail_screen.dart
│   │   ├── practice_screen.dart
│   │   ├── settings_screen.dart
│   │   ├── stats_screen.dart
│   │   └── search_screen.dart
│   ├── widgets/               # Reusable widgets
│   │   ├── word_list_card.dart
│   │   └── app_drawer.dart
│   ├── services/              # Business logic & services
│   │   ├── app_state.dart
│   │   ├── storage_service.dart
│   │   ├── supabase_service.dart
│   │   └── audio_service.dart
│   └── utils/                 # Utilities
│       └── theme.dart
├── assets/                    # Static assets
│   ├── images/
│   ├── sounds/
│   └── fonts/
├── android/                   # Android specific files
├── ios/                       # iOS specific files
├── web/                       # Web specific files
└── pubspec.yaml              # Dependencies
```

## Installatie

### Vereisten

- Flutter SDK (3.0.0 of hoger)
- Dart SDK
- Android Studio / Xcode (voor mobile development)

### Setup

1. **Installeer Flutter**
   ```bash
   # Volg de officiële Flutter installatie guide:
   # https://docs.flutter.dev/get-started/install
   ```

2. **Clone het project**
   ```bash
   cd flutter
   ```

3. **Installeer dependencies**
   ```bash
   flutter pub get
   ```

4. **Run de app**
   ```bash
   # Voor Android
   flutter run -d android

   # Voor iOS
   flutter run -d ios

   # Voor web
   flutter run -d chrome
   ```

## Supabase Configuratie (Optioneel)

Voor cloud sync functionaliteit moet je Supabase configureren:

1. Maak een Supabase project aan op [supabase.com](https://supabase.com)

2. Voer de SQL scripts uit uit de root van het project:
   - `supabase-feedback-setup.sql`
   - `supabase-progress-setup.sql`
   - `supabase-shares-setup.sql`

3. Voeg je Supabase credentials toe in `lib/main.dart`:
   ```dart
   await SupabaseService.initialize(
     url: 'YOUR_SUPABASE_URL',
     anonKey: 'YOUR_SUPABASE_ANON_KEY',
   );
   ```

## Development

### Code Style

- Gebruik Flutter/Dart best practices
- Volg de Material Design guidelines
- Schrijf duidelijke comments voor complexe logica

### Testing

```bash
flutter test
```

### Build

```bash
# Android APK
flutter build apk --release

# Android App Bundle
flutter build appbundle --release

# iOS
flutter build ios --release

# Web
flutter build web --release
```

## Dependencies

Belangrijkste packages:
- `provider` - State management
- `go_router` - Routing
- `supabase_flutter` - Backend & Auth
- `shared_preferences` - Local storage
- `audioplayers` - Geluidseffecten
- `confetti` - Visuele effecten
- `google_fonts` - Fonts

Zie `pubspec.yaml` voor de volledige lijst.

## Verschillen met Web-versie

Deze Flutter-versie is een **complete, standalone implementatie** die:
- Alle functionaliteit van de web-versie bevat
- Native mobile performance biedt
- Offline-first werkt
- Dezelfde data models en logica gebruikt
- Optioneel kan synchroniseren met Supabase

## Licentie

© 2024 Loek Oerlemans

## Contact

Voor vragen of feedback, open een issue in de GitHub repository.
