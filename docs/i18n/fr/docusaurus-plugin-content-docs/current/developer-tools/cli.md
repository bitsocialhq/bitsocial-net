---
title: CLI
description: Interface de ligne de commande pour exécuter un nœud Bitsocial, créer des communautés et gérer les opérations de protocole.
sidebar_position: 2
---

# CLI

Le `bitsocial-cli` est un outil de ligne de commande permettant d'interagir avec le backend du protocole Bitsocial. Il vous permet d'exécuter un démon P2P local, de créer et de configurer des communautés et de publier du contenu, le tout depuis le terminal.

Il est construit au-dessus de la couche client du protocole Bitsocial partagé et est utilisé par [5chan](/apps/5chan/) et [Seedit](/apps/seedit/) pour la création de communauté et la gestion de nœuds.

## Mise en place

Des binaires prédéfinis sont disponibles pour Windows, macOS et Linux. Téléchargez la dernière version pour votre plateforme depuis GitHub :

**[Télécharger à partir des versions GitHub](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Après le téléchargement, rendez l'exécutable binaire (macOS/Linux) :

```bash
chmod +x bitsocial-cli
```

## Exécuter le démon

L'utilisation la plus courante de la CLI consiste à exécuter un nœud Bitsocial. Le démon démarre la couche réseau P2P et expose une API locale à laquelle les clients peuvent se connecter.

```bash
bitsocial-cli daemon
```

Au premier lancement, le démon génère des liens vers **WebUI**, une interface graphique basée sur un navigateur pour gérer votre nœud, vos communautés et vos paramètres. Ceci est utile si vous préférez une interface graphique aux commandes du terminal.

## Actions clés

| Actions                       | Descriptif                                                                 |
| ----------------------------- | -------------------------------------------------------------------------- |
| Démarrez le démon             | Lancez le nœud Bitsocial P2P                                               |
| Créer une communauté          | Créer une nouvelle communauté                                              |
| Modifier une communauté       | Mettre à jour les paramètres de la communauté (titre, description, règles) |
| Liste des communautés locales | Répertorier les communautés hébergées sur ce nœud                          |
| Démarrer une communauté       | Commencez à servir une communauté spécifique                               |
| Arrêter une communauté        | Arrêter de servir une communauté spécifique                                |

Exécutez la CLI avec `--help` pour voir les noms de commandes et les indicateurs actuels exposés par votre version installée :

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Flux de travail typique

Un flux de configuration courant pour héberger une nouvelle communauté :

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

À partir de là, utilisez les commandes de gestion de communauté de la version installée pour créer, configurer et commencer à servir une communauté. Une fois démarrée, la communauté est en direct sur le réseau Bitsocial et accessible depuis les clients compatibles.

## Liens

- **GitHub :** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
