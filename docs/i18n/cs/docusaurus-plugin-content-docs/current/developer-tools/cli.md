---
title: CLI
description: Rozhraní příkazového řádku pro spouštění uzlu Bitsocial, vytváření komunit a správu operací protokolu.
sidebar_position: 2
---

# CLI

`bitsocial-cli` je nástroj příkazového řádku pro interakci s backendem protokolu Bitsocial. Umožňuje vám spouštět místního P2P démona, vytvářet a konfigurovat komunity a publikovat obsah – to vše z terminálu.

Je postaven na vrstvě klienta sdíleného protokolu Bitsocial a je používán [5kanál](/apps/5chan/) a [Seedit](/apps/seedit/) pro vytváření komunit a správu uzlů.

## Instalace

Předpřipravené binární soubory jsou k dispozici pro Windows, macOS a Linux. Stáhněte si nejnovější verzi pro vaši platformu z GitHubu:

**[Stáhnout z GitHub Releases](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Po stažení vytvořte binární spustitelný soubor (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Spuštění démona

Nejběžnějším použitím CLI je provozování uzlu Bitsocial. Démon spustí vrstvu P2P sítě a zpřístupní místní API, ke kterému se mohou klienti připojit.

```bash
bitsocial-cli daemon
```

Při prvním spuštění démon vytvoří odkazy na **WebUI**, grafické rozhraní založené na prohlížeči pro správu vašeho uzlu, komunit a nastavení. To je užitečné, pokud dáváte přednost GUI před terminálovými příkazy.

## Klíčové akce

| Akce                    | Popis                                                    |
| ----------------------- | -------------------------------------------------------- |
| Spusťte démona          | Spusťte Bitsocial P2P uzel                               |
| Vytvořit komunitu       | Vytvořit novou komunitu                                  |
| Upravit komunitu        | Aktualizovat nastavení komunity (název, popis, pravidla) |
| Seznam místních komunit | Seznam komunit hostovaných na tomto uzlu                 |
| Založit komunitu        | Začněte sloužit konkrétní komunitě                       |
| Zastavit komunitu       | Přestat sloužit konkrétní komunitě                       |

Spusťte CLI pomocí `--help`, abyste viděli aktuální názvy příkazů a příznaky vystavené vaším nainstalovaným vydáním:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Typický pracovní postup

Běžný postup nastavení pro hostování nové komunity:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Odtud použijte příkazy správy komunity nainstalovaného vydání k vytvoření, konfiguraci a zahájení poskytování komunity. Po spuštění je komunita živá na síti Bitsocial a přístupná z kompatibilních klientů.

## Odkazy

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
