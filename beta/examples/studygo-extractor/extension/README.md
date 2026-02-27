# StudyGo Extractor - Browser Extensie

Een browser extensie die een "Kopieer als tabel" knop toevoegt aan StudyGo pagina's.

## Installatie

### Chrome / Edge / Brave

1. Open je browser en ga naar `chrome://extensions/` (of `edge://extensions/` voor Edge)
2. Zet "Ontwikkelaarsmodus" aan (rechtsboven)
3. Klik op "Uitgepakte extensie laden"
4. Selecteer de `extension` folder

### Firefox

1. Open Firefox en ga naar `about:debugging#/runtime/this-firefox`
2. Klik op "Tijdelijke add-on laden"
3. Selecteer het `manifest.json` bestand in de `extension` folder

## Gebruik

1. Ga naar een woordenlijst op StudyGo
2. Klik op opties (drie bolletjes) → "Printen"
3. Je ziet nu een gele knop rechtsonder: "Kopieer als tabel"
4. Klik op de knop om alle woorden naar je klembord te kopiëren
5. De woorden zijn nu gekopieerd als tab-gescheiden tekst

## Bestanden

- `manifest.json` - Extensie configuratie
- `content.js` - Hoofdscript dat de knop toevoegt
- `styles.css` - Styling voor de knop en notificaties
- `icons/` - Extensie iconen (voeg zelf toe)

## Iconen toevoegen

Voeg de volgende iconen toe aan de `icons/` folder:
- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels
- `icon128.png` - 128x128 pixels

Je kunt het bestaande icon van de website gebruiken en resizen.
