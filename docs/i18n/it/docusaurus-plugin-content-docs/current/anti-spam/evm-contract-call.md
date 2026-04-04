---
title: Sfida per chiamate di contratti EVM
description: Sfida anti-spam che verifica le condizioni on-chain richiamando uno smart contract EVM.
sidebar_position: 4
---

# Sfida per chiamate di contratti EVM

EVM Contract Call Challenge è un meccanismo anti-spam che verifica le condizioni on-chain prima di consentire una pubblicazione. Consente ai proprietari della comunità di richiedere agli autori di soddisfare i criteri definiti dallo smart contract, ad esempio il mantenimento di un saldo minimo di token, per poter pubblicare.

**Codice sorgente:** [github.com/bitsocialnet/evm-contract-call](https://github.com/bitsocialnet/evm-contract-call)

## Requisiti

- **Node.js** >= 22
- **Solo ESM**: questo pacchetto non include build CommonJS.

## Installazione

```bash
npm install @bitsocial/evm-contract-challenge
```

## Opzioni di configurazione

| Opzione            | Digitare           | Descrizione                                                                                              |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------------------------- |
| ZXQPLACEholder0ZXQ | ZXQPLACEholder1ZXQ | La catena da interrogare (ad esempio, ZXQPLACEholder2ZXQ, ZXQPLACEholder3ZXQ, ZXQPLACEholder4ZXQ).       |
| ZXQPLACEholder0ZXQ | ZXQPLACEholder1ZXQ | L'indirizzo del contratto intelligente da chiamare.                                                      |
| ZXQPLACEholder0ZXQ | ZXQPLACEholder1ZXQ | Il frammento ABI per la funzione chiamata.                                                               |
| ZXQPLACEholder0ZXQ | ZXQPLACEholder1ZXQ | Un'espressione di confronto valutata rispetto al valore restituito dal contratto (ad esempio, `> 1000`). |
| ZXQPLACEholder0ZXQ | ZXQPLACEholder1ZXQ | Il messaggio di errore mostrato agli autori che non soddisfano la condizione.                            |

## Esempio

Un proprietario di comunità che desidera limitare la pubblicazione agli autori che detengono più di 1.000 token ERC-20 particolari configurerebbe la sfida con:

- ZXQPLACEholder0ZXQ: ZXQPLACEholder1ZXQ
- `address`: l'indirizzo del contratto del token
- ZXQPLACEholder0ZXQ: l'ABI per ZXQPLACEholder1ZXQ
- ZXQPLACEholder0ZXQ: ZXQPLACEholder1ZXQ
- ZXQPLACEholder0ZXQ: ZXQPLACEholder1ZXQ

Quando un autore tenta di pubblicare, la sfida chiama `balanceOf` con l'indirizzo dell'autore e controlla se il valore restituito soddisfa la condizione. In tal caso la pubblicazione procede; in caso contrario viene restituito il messaggio di errore configurato.

## Quando usarlo

EVM Contract Call Challenge è l'ideale per:

- **Comunità controllate da token** che limitano la pubblicazione ai possessori di token.
- **Accesso controllato da NFT** dove è richiesta la proprietà di un NFT specifico.
- **Spazi di governance DAO** in cui la partecipazione è limitata ai titolari di token di governance.

Per le comunità che non fanno affidamento sull'identità sulla catena, considera invece [Spam Blocker](./spam-blocker.md) o [Voucher Challenge](./voucher-challenge.md).
