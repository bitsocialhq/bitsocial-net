---
title: Reagire ai ganci
description: Libreria di hook React per creare applicazioni social decentralizzate sul protocollo Bitsocial.
sidebar_position: 1
---

# Reagire ai ganci

Il pacchetto `bitsocial-react-hooks` fornisce un'API familiare di hook React per interagire con il protocollo Bitsocial. Gestisce il recupero di feed, commenti e profili degli autori, la gestione degli account, la pubblicazione di contenuti e l'iscrizione alle comunità, il tutto senza fare affidamento su un server centrale.

Questa libreria è l'interfaccia principale utilizzata da [5chan](/apps/5chan/) e altre applicazioni client Bitsocial.

:::note
`bitsocial-react-hooks` viene attualmente utilizzato direttamente da GitHub anziché pubblicato su npm.
:::

## Installazione

Poiché il pacchetto non è ancora su npm, installalo direttamente da GitHub, aggiungendolo a un hash di commit specifico:

```bash
yarn add https://github.com/bitsocialnet/bitsocial-react-hooks.git#<commit-hash>
```

Sostituisci `<commit-hash>` con il commit che desideri scegliere come target.

## Panoramica dell'API

Gli hook sono organizzati in categorie funzionali. Di seguito è riportato un riepilogo degli hook più comunemente utilizzati in ciascuna categoria. Per firme, parametri e tipi restituiti completi, vedere il [riferimento API completo su GitHub](https://github.com/bitsocialnet/bitsocial-react-hooks).

### Conti

Gestisci account utente locali, identità e impostazioni.

- `useAccount(accountName?)`: restituisce l'oggetto account attivo (o denominato).
- `useAccounts()`: restituisce tutti gli account archiviati localmente
- `useAccountComments(options?)`: restituisce i commenti pubblicati dall'account attivo

### Commenti

Recupera e interagisci con singoli commenti e thread.

- `useComment(commentCid?)`: recupera un singolo commento tramite il suo CID
- `useComments(commentCids?)`: recupera più commenti in batch
- `useEditedComment(comment?)`: restituisce l'ultima versione modificata di un commento

### Comunità

Recuperare metadati e impostazioni della community.

- Hook di ricerca a comunità singola: recupera una comunità in base all'indirizzo
- Hook di ricerca multi-comunità: recupera più comunità
- Hook statistiche della community: restituisce il numero di iscritti e di post

### Autori

Cerca i profili e i metadati degli autori.

- `useAuthor(authorAddress?)`: recupera un profilo dell'autore
- `useAuthorComments(options?)`: restituisce i commenti di un autore specifico
- `useResolvedAuthorAddress(authorAddress?)` -- risolve un indirizzo leggibile dall'uomo (ad esempio, ENS) nel suo indirizzo di protocollo

### Feed

Iscriviti e impagina i feed di contenuti.

- `useFeed(options?)`: restituisce un feed impaginato di post da una o più community
- `useBufferedFeeds(feedOptions?)`: pre-buffer di feed multipli per un rendering più veloce
- `useAuthorFeed(authorAddress?)`: restituisce un feed di post di un autore specifico

### Azioni

Pubblica contenuti ed esegui operazioni di scrittura.

- `usePublishComment(options?)`: pubblica un nuovo commento o risposta
- `usePublishVote(options?)`: lancia un voto positivo o negativo
- `useSubscribe(options?)`: iscriviti o annulla l'iscrizione a una community

### Stati e RPC

Monitora lo stato della connessione e interagisci con un demone Bitsocial remoto.

- `useClientsStates(options?)`: restituisce lo stato di connessione dei client IPFS/pubsub
- Hook impostazioni RPC: restituisce la configurazione corrente del demone RPC

## Sviluppo

Per lavorare localmente sulla libreria degli hook:

**Prerequisiti:** Node.js, Corepack abilitato, Yarn 4

```bash
git clone https://github.com/bitsocialnet/bitsocial-react-hooks.git
cd bitsocial-react-hooks
corepack enable
yarn install
```

Fare riferimento al file README del repository per i comandi di test e creazione.

## Collegamenti

- **GitHub:** [bitsocialnet/bitsocial-react-hooks](https://github.com/bitsocialnet/bitsocial-react-hooks)
- **Licenza:** solo GPL-2.0
