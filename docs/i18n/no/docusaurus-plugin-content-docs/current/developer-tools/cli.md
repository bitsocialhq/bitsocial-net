---
title: CLI
description: Kommandolinjegrensesnitt for å kjøre en Bitsocial-node, opprette fellesskap og administrere protokolloperasjoner.
sidebar_position: 2
---

# CLI

`bitsocial-cli` er et kommandolinjeverktøy for å samhandle med Bitsocial-protokollens backend. Den lar deg kjøre en lokal P2P-demon, opprette og konfigurere fellesskap og publisere innhold - alt fra terminalen.

Den er bygget på toppen av det delte Bitsocial-protokollklientlaget og brukes av [5chan](/apps/5chan/) og [Seedit](/apps/seedit/) for opprettelse av fellesskap og nodeadministrasjon.

## Installasjon

Forhåndsbygde binærfiler er tilgjengelige for Windows, macOS og Linux. Last ned den siste utgivelsen for plattformen din fra GitHub:

**[Last ned fra GitHub-utgivelser](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Etter nedlasting gjør du den binære kjørbare (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Kjører Daemon

Den vanligste bruken av CLI er å kjøre en Bitsocial-node. Daemonen starter P2P-nettverkslaget og avslører et lokalt API som klienter kan koble til.

```bash
bitsocial-cli daemon
```

Ved første lansering sender demonen ut koblinger til **WebUI**, et nettleserbasert grafisk grensesnitt for å administrere noden, fellesskapene og innstillingene dine. Dette er nyttig hvis du foretrekker en GUI fremfor terminalkommandoer.

## Nøkkelhandlinger

| Handling              | Beskrivelse                                                     |
| --------------------- | --------------------------------------------------------------- |
| Start demonen         | Start Bitsocial P2P-noden                                       |
| Opprett et fellesskap | Opprett et nytt fellesskap                                      |
| Rediger et fellesskap | Oppdater fellesskapsinnstillinger (tittel, beskrivelse, regler) |
| Liste lokalsamfunn    | Liste fellesskap som er vert for denne noden                    |
| Start et fellesskap   | Begynn å betjene et bestemt fellesskap                          |
| Stopp et fellesskap   | Slutt å tjene et bestemt fellesskap                             |

Kjør CLI med `--help` for å se gjeldende kommandonavn og flagg eksponert av den installerte versjonen:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Typisk arbeidsflyt

En vanlig oppsettflyt for å være vert for et nytt fellesskap:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Derfra bruker du den installerte utgivelsens kommandoer for fellesskapsadministrasjon for å opprette, konfigurere og begynne å betjene et fellesskap. Når det er startet, er fellesskapet live på Bitsocial-nettverket og tilgjengelig fra kompatible klienter.

## Lenker

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
