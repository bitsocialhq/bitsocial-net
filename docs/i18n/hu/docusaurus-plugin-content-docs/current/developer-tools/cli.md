---
title: CLI
description: Parancssori interfész Bitsocial csomópont futtatásához, közösségek létrehozásához és protokollműveletek kezeléséhez.
sidebar_position: 2
---

# CLI

A `bitsocial-cli` egy parancssori eszköz a Bitsocial protokoll hátterével való interakcióhoz. Lehetővé teszi helyi P2P démon futtatását, közösségek létrehozását és konfigurálását, valamint tartalom közzétételét – mindezt a terminálról.

A megosztott Bitsocial protokoll kliens rétegére épül, és a [5chan](/apps/5chan/) és a [Seedit](/apps/seedit/) használja a közösség létrehozására és a csomópontok kezelésére.

## Telepítés

Előre beépített bináris fájlok állnak rendelkezésre Windows, macOS és Linux rendszereken. Töltse le a platform legújabb kiadását a GitHubról:

**[Letöltés a GitHub kiadásaiból](https://github.com/bitsocialnet/bitsocial-cli/releases)**

A letöltés után tegye a bináris fájlt végrehajthatóvá (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## A Daemon futtatása

A CLI legáltalánosabb használata egy Bitsocial csomópont futtatása. A démon elindítja a P2P hálózati réteget, és felfed egy helyi API-t, amelyhez az ügyfelek csatlakozhatnak.

```bash
bitsocial-cli daemon
```

Az első indításkor a démon hivatkozásokat ad ki a **WebUI**-ra, amely egy böngésző alapú grafikus felület a csomópont, a közösségek és a beállítások kezelésére. Ez akkor hasznos, ha a GUI-t részesíti előnyben a terminálparancsokkal szemben.

## Kulcsműveletek

| Akció                    | Leírás                                                    |
| ------------------------ | --------------------------------------------------------- |
| Indítsa el a démont      | Indítsa el a Bitsocial P2P csomópontot                    |
| Közösség létrehozása     | Új közösség létrehozása                                   |
| Közösség szerkesztése    | Közösségi beállítások frissítése (cím, leírás, szabályok) |
| Helyi közösségek listája | Az ezen a csomóponton tárolt közösségek listázása         |
| Közösség indítása        | Egy adott közösség kiszolgálásának megkezdése             |
| Közösség leállítása      | Egy adott közösség kiszolgálásának leállítása             |

Futtassa a parancssori felületet a `--help` segítségével, hogy megtekinthesse a telepített kiadás által közzétett aktuális parancsneveket és jelzőket:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Tipikus munkafolyamat

Egy közös beállítási folyamat új közösség fogadásához:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Innentől kezdve használja a telepített kiadás közösségkezelési parancsait a közösség létrehozásához, konfigurálásához és szolgáltatásának megkezdéséhez. Miután elindult, a közösség élesben van a Bitsocial hálózaton, és elérhető kompatibilis ügyfelekről.

## Linkek

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
