---
title: Captcha Canvas Challenge
description: Samostatný generátor captcha založený na obrázcích s konfigurovatelnými znaky, rozměry a barvami.
sidebar_position: 2
---

# Captcha Canvas Challenge

Captcha Canvas Challenge je samostatný generátor obrázků captcha. Vykreslí náhodný text na plátno HTML a vrátí výsledný obrázek, který mohou komunity prezentovat autorům jako výzvu proti spamu.

**Zdrojový kód:** [github.com/bitsocialnet/captcha-canvas-challenge](https://github.com/bitsocialnet/captcha-canvas-challenge)

## Požadavky

- **Node.js** >= 22
- **Pouze ESM** – tento balíček nedodává sestavení CommonJS.

## Instalace

```bash
npm install @bitsocial/captcha-canvas-challenge
```

## Možnosti konfigurace

| Možnost      | Typ      | Výchozí   | Popis                                                 |
| ------------ | -------- | --------- | ----------------------------------------------------- |
| `characters` | `number` | `6`       | Počet náhodných znaků vykreslených v obrázku captcha. |
| `height`     | `number` | `100`     | Výška generovaného obrázku v pixelech.                |
| `width`      | `number` | `300`     | Šířka generovaného obrázku v pixelech.                |
| `colors`     | `string` | `#32cf7e` | Primární barva použitá pro text captcha.              |

## Jak to funguje

1. Generátor vybere náhodný řetězec nakonfigurované délky.
2. Struna je vykreslena na plátno s vizuálním šumem, aby odolala OCR.
3. Výsledný obrázek (a očekávaná odpověď) jsou vráceny, takže volající aplikace může předložit výzvu a později ověřit odpověď.

Protože je balíček čistým generátorem obrázků, nezvládá sám o sobě práci v síti ani správu relací. Je určen k integraci do většího toku výzev -- například jako jeden z typů výzev podporovaných [Blokátor spamu] (./spam-blocker.md).
