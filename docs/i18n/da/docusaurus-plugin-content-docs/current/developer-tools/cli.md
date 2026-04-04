---
title: CLI
description: Kommandolinjegrænseflade til at køre en Bitsocial-node, oprette fællesskaber og administrere protokoloperationer.
sidebar_position: 2
---

# CLI

`bitsocial-cli` er et kommandolinjeværktøj til at interagere med Bitsocial-protokollens backend. Det lader dig køre en lokal P2P-dæmon, oprette og konfigurere fællesskaber og udgive indhold - alt sammen fra terminalen.

Den er bygget oven på det delte Bitsocial-protokolklientlag og bruges af [5 chan](/apps/5chan/) og [Seedit](/apps/seedit/) til oprettelse af fællesskaber og nodestyring.

## Installation

Forudbyggede binære filer er tilgængelige til Windows, macOS og Linux. Download den seneste udgivelse til din platform fra GitHub:

**[Download fra GitHub-udgivelser](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Efter download skal du gøre den binære eksekverbare (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Kører Dæmonen

Den mest almindelige brug af CLI er at køre en Bitsocial node. Dæmonen starter P2P-netværkslaget og afslører en lokal API, som klienter kan oprette forbindelse til.

```bash
bitsocial-cli daemon
```

Ved første lancering udsender dæmonen links til **WebUI**, en browserbaseret grafisk grænseflade til styring af din node, fællesskaber og indstillinger. Dette er nyttigt, hvis du foretrækker en GUI frem for terminalkommandoer.

## Nøglehandlinger

| Handling                | Beskrivelse                                                   |
| ----------------------- | ------------------------------------------------------------- |
| Start dæmonen           | Start Bitsocial P2P-knuden                                    |
| Opret et fællesskab     | Opret et nyt fællesskab                                       |
| Rediger et fællesskab   | Opdater fællesskabsindstillinger (titel, beskrivelse, regler) |
| Liste over lokalsamfund | Vis fællesskaber hostet på denne node                         |
| Start et fællesskab     | Begynd at tjene et bestemt fællesskab                         |
| Stop et fællesskab      | Stop med at tjene et bestemt fællesskab                       |

Kør CLI med `--help` for at se de aktuelle kommandonavne og flag, der er afsløret af din installerede udgivelse:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Typisk arbejdsgang

Et almindeligt opsætningsflow til at være vært for et nyt fællesskab:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Derfra skal du bruge den installerede udgivelses kommandoer til fællesskabsstyring til at oprette, konfigurere og begynde at betjene et fællesskab. Når det er startet, er fællesskabet live på Bitsocial-netværket og tilgængeligt fra kompatible klienter.

## Links

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
