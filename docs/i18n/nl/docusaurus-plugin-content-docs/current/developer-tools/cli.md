---
title: CLI
description: Commandoregelinterface voor het uitvoeren van een Bitsocial-knooppunt, het creëren van communities en het beheren van protocolbewerkingen.
sidebar_position: 2
---

# CLI

De `bitsocial-cli` is een opdrachtregelprogramma voor interactie met de backend van het Bitsocial-protocol. Hiermee kunt u een lokale P2P-daemon uitvoeren, communities maken en configureren en inhoud publiceren - allemaal vanaf de terminal.

Het is gebouwd bovenop de gedeelde clientlaag van het Bitsocial-protocol en wordt gebruikt door [5kan](/apps/5chan/) en [Zaad](/apps/seedit/) voor het creëren van community's en knooppuntbeheer.

## Installatie

Vooraf gebouwde binaire bestanden zijn beschikbaar voor Windows, macOS en Linux. Download de nieuwste release voor uw platform vanaf GitHub:

**[Downloaden van GitHub-releases](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Maak na het downloaden het binaire bestand uitvoerbaar (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Het uitvoeren van de Daemon

Het meest voorkomende gebruik van de CLI is het uitvoeren van een Bitsocial-knooppunt. De daemon start de P2P-netwerklaag en stelt een lokale API beschikbaar waarmee clients verbinding kunnen maken.

```bash
bitsocial-cli daemon
```

Bij de eerste keer opstarten voert de daemon links uit naar de **WebUI**, een browsergebaseerde grafische interface voor het beheren van uw knooppunt, communities en instellingen. Dit is handig als u de voorkeur geeft aan een GUI boven terminalopdrachten.

## Belangrijkste acties

| Actie                       | Beschrijving                                                   |
| --------------------------- | -------------------------------------------------------------- |
| Start de daemon             | Start het Bitsocial P2P-knooppunt                              |
| Creëer een community        | Creëer een nieuwe community                                    |
| Een community bewerken      | Community-instellingen bijwerken (titel, beschrijving, regels) |
| Lijst lokale gemeenschappen | Geef community's weer die op dit knooppunt worden gehost       |
| Start een community         | Begin met het bedienen van een specifieke gemeenschap          |
| Stop een gemeenschap        | Stop met het bedienen van een specifieke community             |

Voer de CLI uit met `--help` om de huidige opdrachtnamen en vlaggen te zien die worden weergegeven door uw geïnstalleerde release:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Typische workflow

Een algemene installatiestroom voor het hosten van een nieuwe community:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Van daaruit gebruikt u de communitybeheeropdrachten van de geïnstalleerde release om een community te maken, te configureren en te bedienen. Eenmaal gestart, is de community live op het Bitsocial-netwerk en toegankelijk via compatibele klanten.

## Koppelingen

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
