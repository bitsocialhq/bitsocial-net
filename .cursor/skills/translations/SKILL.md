---
name: translations
description: Add or update i18next translation keys across all language files. Use when the user asks to add a new translation, update existing translations, translate text, or work with i18n keys. Triggers on "translate", "add translation", "translation key", "i18n", "localization".
---

# Translations

This project uses i18next with 35 language files in `public/translations/{lang}/default.json`.

**Never manually edit each language file.** Use `scripts/update-translations.js` instead.

## Adding or Updating a Translation Key

### Step 1: Create a Dictionary File

Create a temporary JSON file (e.g., `translations-temp.json`) with translations for each language code:

```json
{
  "en": "English text",
  "es": "Spanish text",
  "fr": "French text",
  "de": "German text",
  "it": "Italian text",
  "pt": "Portuguese text",
  "nl": "Dutch text",
  "ru": "Russian text",
  "ja": "Japanese text",
  "ko": "Korean text",
  "zh": "Chinese text",
  "ar": "Arabic text",
  "hi": "Hindi text",
  "bn": "Bengali text",
  "ur": "Urdu text",
  "fa": "Persian text",
  "tr": "Turkish text",
  "vi": "Vietnamese text",
  "th": "Thai text",
  "id": "Indonesian text",
  "fil": "Filipino text",
  "pl": "Polish text",
  "uk": "Ukrainian text",
  "cs": "Czech text",
  "ro": "Romanian text",
  "hu": "Hungarian text",
  "el": "Greek text",
  "he": "Hebrew text",
  "sv": "Swedish text",
  "da": "Danish text",
  "no": "Norwegian text",
  "fi": "Finnish text",
  "sq": "Albanian text",
  "mr": "Marathi text",
  "te": "Telugu text"
}
```

### Step 2: Run the Script

```bash
# Dry run first to verify changes
node scripts/update-translations.js --key my_new_key --map translations-temp.json --include-en --dry

# Apply changes
node scripts/update-translations.js --key my_new_key --map translations-temp.json --include-en --write
```

### Step 3: Delete the Dictionary File

After the script completes, delete `translations-temp.json`.

## Other Common Operations

### Copy English value to all languages

```bash
node scripts/update-translations.js --key some_key --from en --write
```

### Delete a key from all languages

```bash
node scripts/update-translations.js --key obsolete_key --delete --write
```

### Audit for unused keys

```bash
# Dry run
node scripts/update-translations.js --audit --dry

# Remove unused keys
node scripts/update-translations.js --audit --write
```

## Important Flags

| Flag | Description |
|------|-------------|
| `--key <name>` | Translation key to update/delete |
| `--map <file>` | JSON file with per-language values |
| `--include-en` | Include English in updates (required when using `--map`) |
| `--from <lang>` | Source language to copy from (default: en) |
| `--dry` | Preview changes without writing |
| `--write` | Actually write the files |
| `--delete` | Delete the key from all languages |
| `--audit` | Find and remove unused translation keys |

## Supported Languages

ar, bn, cs, da, de, el, en, es, fa, fi, fil, fr, he, hi, hu, id, it, ja, ko, mr, nl, no, pl, pt, ro, ru, sq, sv, te, th, tr, uk, ur, vi, zh
