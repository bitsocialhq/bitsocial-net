---
title: CLI
description: Interfaccia della riga di comando per eseguire un nodo Bitsocial, creare comunità e gestire le operazioni del protocollo.
sidebar_position: 2
---

# CLI

`bitsocial-cli` è uno strumento da riga di comando per interagire con il backend del protocollo Bitsocial. Ti consente di eseguire un demone P2P locale, creare e configurare comunità e pubblicare contenuti, tutto dal terminale.

È costruito sul livello client del protocollo Bitsocial condiviso ed è utilizzato da [5chan](/apps/5chan/) e [Seedit](/apps/seedit/) per la creazione di comunità e la gestione dei nodi.

## Installazione

Sono disponibili file binari predefiniti per Windows, macOS e Linux. Scarica l'ultima versione per la tua piattaforma da GitHub:

**[Scarica dalle versioni GitHub](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Dopo il download, rendi eseguibile il binario (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Gestire il demone

L'uso più comune della CLI è l'esecuzione di un nodo Bitsocial. Il demone avvia il livello di rete P2P ed espone un'API locale a cui i client possono connettersi.

```bash
bitsocial-cli daemon
```

Al primo avvio, il demone genera collegamenti a **WebUI**, un'interfaccia grafica basata su browser per la gestione del nodo, delle comunità e delle impostazioni. Questo è utile se preferisci una GUI rispetto ai comandi del terminale.

## Azioni chiave

| Azione                 | Descrizione                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| Avvia il demone        | Avvia il nodo Bitsocial P2P                                            |
| Crea una comunità      | Crea una nuova comunità                                                |
| Modifica una comunità  | Aggiorna le impostazioni della community (titolo, descrizione, regole) |
| Elenco comunità locali | Elenca le comunità ospitate su questo nodo                             |
| Avvia una comunità     | Inizia a servire una comunità specifica                                |
| Fermare una comunità   | Smettere di servire una comunità specifica                             |

Esegui la CLI con `--help` per visualizzare i nomi dei comandi e i flag correnti esposti dalla versione installata:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Flusso di lavoro tipico

Un flusso di configurazione comune per ospitare una nuova comunità:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Da lì, utilizza i comandi di gestione della comunità della versione installata per creare, configurare e iniziare a servire una comunità. Una volta avviata, la community è live sulla rete Bitsocial e accessibile dai client compatibili.

## Collegamenti

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
