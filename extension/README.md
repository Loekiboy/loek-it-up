# Loek it Up Importer (StudyGo)

Deze extensie haalt woordenlijsten op van StudyGo en opent Loek it Up met een nieuwe lijst die al is ingevuld.

## Installatie (Chrome/Edge)
1. Open `chrome://extensions`
2. Zet **Developer mode** aan
3. Klik **Load unpacked** en kies de map `extension`

## URL instellen
De extensie opent standaard: `http://localhost:5500/index.html`

Wil je een andere URL gebruiken, zet dit in je console:
```js
localStorage.setItem('loek_it_up_url', 'https://jouw-site.nl')
```

## Werking
- Op StudyGo lijstpagina: een ronde + knop links onder
- Op printpagina: knop **Importeer in Loek it Up** links onder

De titel en talen worden automatisch overgenomen als ze in de pagina aanwezig zijn.
