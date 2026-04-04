---
title: Reageer haken
description: React hooks-bibliotheek voor het bouwen van gedecentraliseerde sociale applicaties op het Bitsocial-protocol.
sidebar_position: 1
---

# Reageer haken

Het `bitsocial-react-hooks`-pakket biedt een vertrouwde React hooks-API voor interactie met het Bitsocial-protocol. Het zorgt voor het ophalen van feeds, opmerkingen en auteursprofielen, het beheren van accounts, het publiceren van inhoud en het abonneren op communities - allemaal zonder afhankelijk te zijn van een centrale server.

Deze bibliotheek is de primaire interface die wordt gebruikt door [5kan](/apps/5chan/) en andere Bitsocial-clienttoepassingen.

:::note
`bitsocial-react-hooks` wordt momenteel rechtstreeks vanuit GitHub gebruikt in plaats van gepubliceerd naar npm.
:::

## Installatie

Omdat het pakket nog niet op npm staat, installeer je het rechtstreeks vanuit GitHub, vastgemaakt aan een specifieke commit-hash:

```bash
yarn add https://github.com/bitsocialnet/bitsocial-react-hooks.git#<commit-hash>
```

Vervang `<commit-hash>` door de commit die je wilt targeten.

## API-overzicht

De haken zijn georganiseerd in functionele categorieën. Hieronder vindt u een overzicht van de meest gebruikte haken per categorie. Voor volledige handtekeningen, parameters en retourtypes, zie de [volledige API-referentie op GitHub](https://github.com/bitsocialnet/bitsocial-react-hooks).

### Rekeningen

Beheer lokale gebruikersaccounts, identiteit en instellingen.

- `useAccount(accountName?)` -- retourneert het actieve (of benoemde) accountobject
- `useAccounts()` - retourneert alle lokaal opgeslagen accounts
- `useAccountComments(options?)` - retourneert opmerkingen die zijn gepubliceerd door het actieve account

### Opmerkingen

Haal individuele opmerkingen en discussies op en communiceer ermee.

- `useComment(commentCid?)` -- haalt één commentaar op via zijn CID
- `useComments(commentCids?)` -- haalt meerdere opmerkingen in batch op
- `useEditedComment(comment?)` -- retourneert de laatst bewerkte versie van een opmerking

### Gemeenschappen

Metagegevens en instellingen van de community ophalen.

- Opzoekhook voor één community: haalt een community op op adres
- Multi-community lookup hook - haalt meerdere communities op
- Communitystatistieken hook - retourneert het aantal abonnees en berichten

### Auteurs

Zoek auteursprofielen en metadata op.

- `useAuthor(authorAddress?)` -- haalt een auteursprofiel op
- `useAuthorComments(options?)` - retourneert commentaar van een specifieke auteur
- `useResolvedAuthorAddress(authorAddress?)` - zet een voor mensen leesbaar adres (bijvoorbeeld ENS) om naar zijn protocoladres

### Feeds

Abonneer u op inhoudsfeeds en pagineer ze.

- `useFeed(options?)` -- retourneert een gepagineerde feed met berichten van een of meer communities
- `useBufferedFeeds(feedOptions?)` - buffert meerdere feeds vooraf voor snellere weergave
- `useAuthorFeed(authorAddress?)` - retourneert een feed met berichten van een specifieke auteur

### Acties

Publiceer inhoud en voer schrijfbewerkingen uit.

- `usePublishComment(options?)` -- publiceer een nieuwe opmerking of antwoord
- `usePublishVote(options?)` - breng een positieve of negatieve stem uit
- `useSubscribe(options?)` - abonneer of meld u af bij een community

### Staten en RPC

Bewaak de verbindingsstatus en communiceer met een externe Bitsocial-daemon.

- `useClientsStates(options?)` - retourneert de verbindingsstatus van IPFS/pubsub-clients
- Hook voor RPC-instellingen - retourneert de huidige RPC-daemonconfiguratie

## Ontwikkeling

Om lokaal aan de hooks-bibliotheek te werken:

**Vereisten:** Node.js, Corepack ingeschakeld, garen 4

```bash
git clone https://github.com/bitsocialnet/bitsocial-react-hooks.git
cd bitsocial-react-hooks
corepack enable
yarn install
```

Raadpleeg de repository README voor test- en build-opdrachten.

## Koppelingen

- **GitHub:** [bitsocialnet/bitsocial-react-hooks](https://github.com/bitsocialnet/bitsocial-react-hooks)
- **Licentie:** Alleen GPL-2.0
