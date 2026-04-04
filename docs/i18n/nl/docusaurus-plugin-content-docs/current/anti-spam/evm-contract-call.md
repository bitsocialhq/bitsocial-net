---
title: EVM-contractoproepuitdaging
description: Antispam-uitdaging die de omstandigheden in de keten verifieert door een slim EVM-contract aan te roepen.
sidebar_position: 4
---

# EVM-contractoproepuitdaging

EVM Contract Call Challenge is een antispammechanisme dat de omstandigheden in de keten verifieert voordat een publicatie wordt toegestaan. Het stelt community-eigenaren in staat om van auteurs te eisen dat ze voldoen aan door smart-contract gedefinieerde criteria (bijvoorbeeld het aanhouden van een minimaal tokensaldo) om te kunnen posten.

**Broncode:** [github.com/bitsocialnet/evm-contract-call](https://github.com/bitsocialnet/evm-contract-call)

## Vereisten

- **Node.js** >= 22
- **Alleen ESM** - dit pakket verzendt geen CommonJS-builds.

## Installatie

```bash
npm install @bitsocial/evm-contract-challenge
```

## Configuratie-opties

| Optie         | Typ      | Beschrijving                                                                                                        |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `chainTicker` | `string` | De keten die moet worden opgevraagd (bijvoorbeeld `eth`, `matic`, `avax`).                                          |
| `address`     | `string` | Het slimme contractadres om te bellen.                                                                              |
| `abi`         | `string` | Het ABI-fragment voor de functie die wordt aangeroepen.                                                             |
| `condition`   | `string` | Een vergelijkingsuitdrukking die wordt geëvalueerd aan de hand van de contractretourwaarde (bijvoorbeeld `> 1000`). |
| `error`       | `string` | De foutmelding die wordt getoond aan auteurs die niet aan de voorwaarde voldoen.                                    |

## Voorbeeld

Een community-eigenaar die het posten wil beperken tot auteurs die meer dan 1.000 van een bepaald ERC-20-token bezitten, kan de uitdaging configureren met:

- `chainTicker`: `"eth"`
- `address`: het tokencontractadres
- `abi`: de ABI voor `balanceOf(address)`
- `condition`: `"> 1000"`
- `error`: `"You must hold more than 1,000 tokens to post in this community."`

Wanneer een auteur probeert te publiceren, roept de uitdaging `balanceOf` aan met het adres van de auteur en wordt gecontroleerd of de geretourneerde waarde aan de voorwaarde voldoet. Als dat het geval is, gaat de publicatie door; anders wordt het geconfigureerde foutbericht geretourneerd.

## Wanneer moet u het gebruiken?

EVM Contract Call Challenge is ideaal voor:

- **Token-gated communities** die het plaatsen van berichten beperken tot tokenhouders.
- **NFT-gated access** waarbij eigendom van een specifieke NFT vereist is.
- **DAO-governanceruimtes** waar deelname beperkt is tot houders van governance-tokens.

Voor communities die niet afhankelijk zijn van een identiteit in de keten, kun je in plaats daarvan [Spam blokkeren](./spam-blocker.md) of [Voucher-uitdaging](./voucher-challenge.md) overwegen.
