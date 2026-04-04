---
title: EVM Contract Call Challenge
description: Anti-Spam-Herausforderung, die die Bedingungen in der Kette durch den Aufruf eines EVM-Smart-Vertrags überprüft.
sidebar_position: 4
---

# EVM Contract Call Challenge

EVM Contract Call Challenge ist ein Anti-Spam-Mechanismus, der die Bedingungen in der Kette überprüft, bevor eine Veröffentlichung zugelassen wird. Damit können Community-Eigentümer von Autoren verlangen, dass sie Kriterien erfüllen, die durch Smart-Contracts definiert werden – zum Beispiel das Halten eines Mindest-Token-Guthabens –, um Beiträge zu veröffentlichen.

**Quellcode:** [github.com/bitsocialnet/evm-contract-call](https://github.com/bitsocialnet/evm-contract-call)

## Anforderungen

- **Node.js** >= 22
- **Nur ESM** – dieses Paket liefert keine CommonJS-Builds.

## Installation

```bash
npm install @bitsocial/evm-contract-challenge
```

## Konfigurationsoptionen

| Option        | Geben Sie | ein Beschreibung                                                                                |
| ------------- | --------- | ----------------------------------------------------------------------------------------------- |
| `chainTicker` | `string`  | Die abzufragende Kette (z. B. `eth`, `matic`, `avax`).                                          |
| `address`     | `string`  | Die aufzurufende Smart-Contract-Adresse.                                                        |
| `abi`         | `string`  | Das ABI-Fragment für die aufgerufene Funktion.                                                  |
| `condition`   | `string`  | Ein Vergleichsausdruck, der anhand des Vertragsrückgabewerts ausgewertet wird (z. B. `> 1000`). |
| `error`       | `string`  | Die Fehlermeldung wird Autoren angezeigt, die die Bedingung nicht erfüllen.                     |

## Beispiel

Ein Community-Eigentümer, der das Posten auf Autoren beschränken möchte, die mehr als 1.000 eines bestimmten ERC-20-Tokens besitzen, würde die Herausforderung wie folgt konfigurieren:

- `chainTicker`: `"eth"`
- `address`: die Token-Vertragsadresse
- `abi`: der ABI für `balanceOf(address)`
- `condition`: `"> 1000"`
- `error`: `"You must hold more than 1,000 tokens to post in this community."`

Wenn ein Autor versucht zu veröffentlichen, ruft die Challenge `balanceOf` mit der Adresse des Autors auf und prüft, ob der zurückgegebene Wert die Bedingung erfüllt. Ist dies der Fall, wird die Veröffentlichung fortgesetzt. andernfalls wird die konfigurierte Fehlermeldung zurückgegeben.

## Wann man es verwendet

Die EVM Contract Call Challenge ist ideal für:

- **Token-Gated-Communities**, die das Posten auf Token-Inhaber beschränken.
- **NFT-geschützter Zugriff**, bei dem der Besitz eines bestimmten NFT erforderlich ist.
- **DAO-Governance-Bereiche**, an denen die Teilnahme auf Governance-Token-Inhaber beschränkt ist.

Für Communities, die nicht auf On-Chain-Identität angewiesen sind, sollten Sie stattdessen [Spam-Blocker](./spam-blocker.md) oder [Gutschein-Challenge](./voucher-challenge.md) in Betracht ziehen.
