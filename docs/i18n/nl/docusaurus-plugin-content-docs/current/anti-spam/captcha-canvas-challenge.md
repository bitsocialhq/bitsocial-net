---
title: Captcha Canvas-uitdaging
description: Standalone, op afbeeldingen gebaseerde captcha-generator met configureerbare tekens, afmetingen en kleuren.
sidebar_position: 2
---

# Captcha Canvas-uitdaging

Captcha Canvas Challenge is een zelfstandige captcha-generator voor afbeeldingen. Het geeft willekeurige tekst weer op een HTML-canvas en retourneert de resulterende afbeelding, die communities aan auteurs kunnen presenteren als een spamuitdaging.

**Broncode:** [github.com/bitsocialnet/captcha-canvas-challenge](https://github.com/bitsocialnet/captcha-canvas-challenge)

## Vereisten

- **Node.js** >= 22
- **Alleen ESM** - dit pakket verzendt geen CommonJS-builds.

## Installatie

```bash
npm install @bitsocial/captcha-canvas-challenge
```

## Configuratie-opties

| Optie        | Typ      | Standaard | Beschrijving                                                     |
| ------------ | -------- | --------- | ---------------------------------------------------------------- |
| `characters` | `number` | `6`       | Aantal willekeurige tekens weergegeven in de captcha-afbeelding. |
| `height`     | `number` | `100`     | Hoogte van de gegenereerde afbeelding in pixels.                 |
| `width`      | `number` | `300`     | Breedte van de gegenereerde afbeelding in pixels.                |
| `colors`     | `string` | `#32cf7e` | Primaire kleur die wordt gebruikt voor de captcha-tekst.         |

## Hoe het werkt

1. De generator kiest een willekeurige reeks met de geconfigureerde lengte.
2. De string wordt weergegeven op een canvas met visuele ruis om OCR te weerstaan.
3. De resulterende afbeelding (en het verwachte antwoord) worden geretourneerd, zodat de aanroepende toepassing de uitdaging kan presenteren en later het antwoord kan verifiëren.

Omdat het pakket een pure beeldgenerator is, verzorgt het niet zelfstandig het netwerk- of sessiebeheer. Het is bedoeld om te worden geïntegreerd in een grotere uitdagingsstroom, bijvoorbeeld als een van de uitdagingstypen die worden ondersteund door [Spam blokkeren](./spam-blocker.md).
