import xml.etree.ElementTree as ET
import json
import os

NS = '{http://www.tei-c.org/ns/1.0}'

def parse_tei(filepath):
    tree = ET.parse(filepath)
    root = tree.getroot()
    dictionary = {}

    for entry in root.iter(f'{NS}entry'):
        # Get the headword
        form = entry.find(f'{NS}form')
        if form is None:
            continue
        orth = form.find(f'{NS}orth')
        if orth is None or not orth.text:
            continue
        word = orth.text.strip()

        # Get all translations
        translations = []
        for sense in entry.iter(f'{NS}sense'):
            for cit in sense.iter(f'{NS}cit'):
                if cit.get('type') == 'trans':
                    for quote in cit.iter(f'{NS}quote'):
                        if quote.text and quote.text.strip():
                            translations.append(quote.text.strip())

        if translations:
            key = word.lower()
            if key in dictionary:
                for t in translations:
                    if t not in dictionary[key]:
                        dictionary[key].append(t)
            else:
                dictionary[key] = translations

    return dictionary

tei_files = [
    ('freedict-eng-nld-0.2.src/eng-nld/eng-nld.tei', 'eng-nld.json'),
    ('freedict-deu-nld-0.1.5.src/deu-nld/deu-nld.tei', 'deu-nld.json'),
    ('freedict-fra-nld-0.2.src/fra-nld/fra-nld.tei', 'fra-nld.json'),
]

base_dir = os.path.dirname(os.path.abspath(__file__))

for tei_path, json_name in tei_files:
    full_tei = os.path.join(base_dir, tei_path)
    full_json = os.path.join(base_dir, json_name)

    if not os.path.exists(full_tei):
        print(f"SKIP: {tei_path} not found")
        continue

    print(f"Parsing {tei_path}...")
    d = parse_tei(full_tei)
    print(f"  -> {len(d)} headwords")

    with open(full_json, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, separators=(',', ':'))

    size_kb = os.path.getsize(full_json) / 1024
    print(f"  -> Saved {json_name} ({size_kb:.0f} KB)")

    # Build reverse dictionary (nld -> other language)
    reverse = {}
    for word, translations in d.items():
        for t in translations:
            key = t.lower()
            if key in reverse:
                if word not in reverse[key]:
                    reverse[key].append(word)
            else:
                reverse[key] = [word]

    reverse_name = json_name.replace('-nld', '-nld').replace(json_name.split('-')[0], 'nld').replace('nld-', 'nld-', 1)
    # e.g. eng-nld.json -> nld-eng.json
    parts = json_name.split('-')
    reverse_name = f"nld-{parts[0]}.json"
    full_reverse = os.path.join(base_dir, reverse_name)

    with open(full_reverse, 'w', encoding='utf-8') as f:
        json.dump(reverse, f, ensure_ascii=False, separators=(',', ':'))

    rsize_kb = os.path.getsize(full_reverse) / 1024
    print(f"  -> Reverse: {len(reverse)} headwords -> {reverse_name} ({rsize_kb:.0f} KB)")

print("Done!")
