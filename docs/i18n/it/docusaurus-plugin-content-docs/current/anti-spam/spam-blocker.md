---
title: Spam Blocker
description: Centralized spam detection service with risk scoring, OAuth challenges, and configurable tier thresholds.
sidebar_position: 1
---

# Spam Blocker

Spam Blocker è un servizio centralizzato di rilevamento dello spam che valuta le pubblicazioni in arrivo e assegna punteggi di rischio. Si compone di due pacchetti:

- **`@bitsocial/spam-blocker-server`** -- il server HTTP che ospita le API di valutazione e verifica.
- **`@bitsocial/spam-blocker-challenge`** -- un pacchetto client leggero che le comunità integrano per inviare pubblicazioni per la valutazione.

**Codice sorgente:** [github.com/bitsocialnet/spam-blocker](https://github.com/bitsocialnet/spam-blocker)

## Come funziona il punteggio del rischio

Ogni pubblicazione inviata all'endpoint `/evaluate` riceve un punteggio di rischio numerico. Il punteggio è una combinazione ponderata di diversi segnali:

| Segnale                 | Descrizione                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Età del conto           | I conti più recenti ricevono punteggi di rischio più elevati.                                                                                                                   |
| Karma                   | Il karma comunitario accumulato riduce il rischio.                                                                                                                              |
| Reputazione dell'autore | Dati sulla reputazione raccolti dall'indicizzatore di rete in background.                                                                                                       |
| Analisi del contenuto   | Euristica a livello di testo (densità dei collegamenti, modelli di spam noti, ecc.).                                                                                            |
| Velocità                | I post successivi e rapidi dello stesso autore aumentano il rischio.                                                                                                            |
| Intelligenza IP         | Geolocalizzazione a livello di paese e ricerche nei feed di minacce. Vengono archiviati solo i codici paese: gli indirizzi IP grezzi non vengono mai condivisi con le comunità. |

## Soglie di livello

Il punteggio di rischio si associa a uno dei quattro livelli configurabili che determinano cosa succede dopo:

1. **Accettazione automatica**: il punteggio è sufficientemente basso da consentire l'approvazione della pubblicazione senza alcuna contestazione.
2. **OAuth sufficiente**: l'autore deve completare una verifica OAuth per procedere.
3. **OAuth-più-altro**: OAuth da solo non è sufficiente; è richiesta una verifica aggiuntiva (ad esempio CAPTCHA).
4. **Rifiuto automatico**: il punteggio è troppo alto; la pubblicazione viene respinta in toto.

Tutti i valori di soglia sono configurabili per comunità.

## Flusso della sfida

Quando una pubblicazione rientra in un livello che richiede verifica, inizia il flusso di sfida:

1. All'autore viene innanzitutto richiesto di autenticarsi tramite **OAuth** (GitHub, Google, Twitter e altri provider supportati).
2. Se OAuth da solo non è sufficiente (livello 3), viene presentato un **CAPTCHA fallback** alimentato da Cloudflare Turnstile.
3. L'identità OAuth viene utilizzata esclusivamente per la verifica: non viene mai condivisa con la community o con altri utenti.

## Endpoint API

### ZXQPLACEholder0ZXQ

Presentare una pubblicazione per la valutazione del rischio. Restituisce il punteggio di rischio calcolato e il livello di sfida richiesto.

### ZXQPLACEholder0ZXQ

Invia il risultato di una verifica completata (token OAuth, soluzione CAPTCHA o entrambi) per la verifica.

### ZXQPLACEholder0ZXQ

Restituisce una pagina HTML incorporabile che esegue il rendering dell'interfaccia utente della sfida appropriata per la sessione specificata.

## Limitazione della velocità

I limiti di tariffa vengono applicati dinamicamente in base all'età e alla reputazione dell'autore. Gli autori più nuovi o con una reputazione inferiore devono affrontare limiti più severi, mentre gli autori affermati godono di soglie più generose. Ciò impedisce inondazioni di spam senza penalizzare i partecipanti fidati.

## Indicizzatore di rete in background

Il server esegue un indicizzatore in background che esegue la scansione continua della rete per creare e mantenere i dati sulla reputazione dell'autore. Questi dati vengono inseriti direttamente nel processo di valutazione del rischio, consentendo al sistema di riconoscere i partecipanti in buona fede ripetuti nelle comunità.

## Privacy

Spam Blocker è progettato pensando alla privacy:

- Le identità OAuth vengono utilizzate solo per la verifica delle sfide e **non vengono mai divulgate** alle comunità.
- Gli indirizzi IP vengono risolti in **solo codici paese**; gli IP grezzi non vengono archiviati o condivisi.

## Banca dati

Il server utilizza **SQLite** (tramite `better-sqlite3`) per la persistenza locale dei dati di reputazione, stato della sessione e configurazione.
