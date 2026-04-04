---
title: Sfida Captcha Canvas
description: Generatore captcha autonomo basato su immagini con caratteri, dimensioni e colori configurabili.
sidebar_position: 2
---

# Sfida Captcha Canvas

Captcha Canvas Challenge è un generatore di captcha di immagini autonomo. Rende il testo casuale su una tela HTML e restituisce l'immagine risultante, che le comunità possono presentare agli autori come sfida antispam.

**Codice sorgente:** [github.com/bitsocialnet/captcha-canvas-challenge](https://github.com/bitsocialnet/captcha-canvas-challenge)

## Requisiti

- **Node.js** >= 22
- **Solo ESM**: questo pacchetto non include build CommonJS.

## Installazione

```bash
npm install @bitsocial/captcha-canvas-challenge
```

## Opzioni di configurazione

| Opzione            | Digitare           | Predefinito        | Descrizione                                                     |
| ------------------ | ------------------ | ------------------ | --------------------------------------------------------------- |
| ZXQPLACEholder0ZXQ | ZXQPLACEholder1ZXQ | ZXQPLACEholder2ZXQ | Numero di caratteri casuali visualizzati nell'immagine captcha. |
| ZXQPLACEholder0ZXQ | ZXQPLACEholder1ZXQ | ZXQPLACEholder2ZXQ | Altezza dell'immagine generata in pixel.                        |
| ZXQPLACEholder0ZXQ | ZXQPLACEholder1ZXQ | ZXQPLACEholder2ZXQ | Larghezza dell'immagine generata in pixel.                      |
| ZXQPLACEholder0ZXQ | ZXQPLACEholder1ZXQ | ZXQPLACEholder2ZXQ | Colore primario utilizzato per il testo captcha.                |

## Come funziona

1. Il generatore seleziona una stringa casuale della lunghezza configurata.
2. La stringa viene renderizzata su una tela con rumore visivo per resistere all'OCR.
3. L'immagine risultante (e la risposta prevista) vengono restituite in modo che l'applicazione chiamante possa presentare la sfida e successivamente verificare la risposta.

Because the package is a pure image generator, it does not handle networking or session management on its own. It is intended to be integrated into a larger challenge flow -- for example, as one of the challenge types supported by [Spam Blocker](./spam-blocker.md).
