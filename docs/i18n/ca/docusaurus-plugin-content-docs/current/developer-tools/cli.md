---
title: CLI
description: Interfície de línia d'ordres per executar un node Bitsocial, crear comunitats i gestionar operacions de protocol.
sidebar_position: 2
---

# CLI

El `bitsocial-cli` és una eina de línia d'ordres per interactuar amb el backend del protocol Bitsocial. Us permet executar un dimoni P2P local, crear i configurar comunitats i publicar contingut, tot des del terminal.

Està construït a la part superior de la capa de client del protocol Bitsocial compartit i és utilitzat per [5canal](/apps/5chan/) i [Seeedit](/apps/seedit/) per a la creació de comunitats i la gestió de nodes.

## Instal·lació

Els binaris preconstruïts estan disponibles per a Windows, macOS i Linux. Baixeu la darrera versió per a la vostra plataforma des de GitHub:

**[Baixeu des de les versions de GitHub](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Després de descarregar, feu que el binari sigui executable (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Executant el dimoni

L'ús més comú de la CLI és executar un node Bitsocial. El dimoni inicia la capa de xarxa P2P i exposa una API local a la qual es poden connectar els clients.

```bash
bitsocial-cli daemon
```

En el primer llançament, el dimoni mostra enllaços a la **WebUI**, una interfície gràfica basada en navegador per gestionar el vostre node, comunitats i configuració. Això és útil si preferiu una GUI sobre les ordres del terminal.

## Accions clau

| Acció                        | Descripció                                                             |
| ---------------------------- | ---------------------------------------------------------------------- |
| Inicieu el dimoni            | Inicieu el node Bitsocial P2P                                          |
| Crear una comunitat          | Crea una nova comunitat                                                |
| Edita una comunitat          | Actualitza la configuració de la comunitat (títol, descripció, regles) |
| Llista les comunitats locals | Llista les comunitats allotjades en aquest node                        |
| Iniciar una comunitat        | Comença a servir una comunitat específica                              |
| Aturar una comunitat         | Deixar de servir una comunitat específica                              |

Executeu la CLI amb `--help` per veure els noms d'ordres actuals i els indicadors exposats per la vostra versió instal·lada:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Flux de treball típic

Un flux de configuració comú per allotjar una nova comunitat:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

A partir d'aquí, utilitzeu les ordres de gestió de comunitats de la versió instal·lada per crear, configurar i començar a servir una comunitat. Un cop iniciat, la comunitat està en directe a la xarxa Bitsocial i accessible des de clients compatibles.

## Enllaços

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
