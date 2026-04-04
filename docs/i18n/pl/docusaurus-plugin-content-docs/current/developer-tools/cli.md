---
title: interfejs wiersza polecenia
description: Interfejs wiersza poleceń do uruchamiania węzła Bitsocial, tworzenia społeczności i zarządzania operacjami na protokołach.
sidebar_position: 2
---

# interfejs wiersza polecenia

`bitsocial-cli` to narzędzie wiersza poleceń umożliwiające interakcję z backendem protokołu Bitsocial. Umożliwia uruchomienie lokalnego demona P2P, tworzenie i konfigurowanie społeczności oraz publikowanie treści – a wszystko to z poziomu terminala.

Jest zbudowany na bazie współdzielonej warstwy klienta protokołu Bitsocial i jest używany przez [5kan](/apps/5chan/) i [Seedit](/apps/seedit/) do tworzenia społeczności i zarządzania węzłami.

## Instalacja

Gotowe pliki binarne są dostępne dla systemów Windows, macOS i Linux. Pobierz najnowszą wersję dla swojej platformy z GitHub:

**[Pobierz z wersji GitHub](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Po pobraniu utwórz plik wykonywalny binarny (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Uruchamianie demona

Najczęstszym zastosowaniem interfejsu CLI jest uruchomienie węzła Bitsocial. Demon uruchamia warstwę sieciową P2P i udostępnia lokalny interfejs API, z którym mogą się łączyć klienci.

```bash
bitsocial-cli daemon
```

Przy pierwszym uruchomieniu demon wyświetla łącza do **WebUI**, opartego na przeglądarce interfejsu graficznego służącego do zarządzania węzłem, społecznościami i ustawieniami. Jest to przydatne, jeśli wolisz interfejs GUI od poleceń terminala.

## Kluczowe działania

| Akcja                        | Opis                                                      |
| ---------------------------- | --------------------------------------------------------- |
| Uruchom demona               | Uruchom węzeł Bitsocial P2P                               |
| Utwórz społeczność           | Utwórz nową społeczność                                   |
| Edytuj społeczność           | Zaktualizuj ustawienia społeczności (tytuł, opis, zasady) |
| Lista społeczności lokalnych | Lista społeczności hostowanych w tym węźle                |
| Załóż społeczność            | Zacznij służyć określonej społeczności                    |
| Zatrzymaj społeczność        | Przestań służyć określonej społeczności                   |

Uruchom CLI z `--help`, aby zobaczyć bieżące nazwy poleceń i flagi udostępniane przez zainstalowaną wersję:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Typowy przepływ pracy

Typowy proces konfiguracji hostingu nowej społeczności:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Stamtąd użyj poleceń zarządzania społecznością zainstalowanej wersji, aby utworzyć, skonfigurować i rozpocząć obsługę społeczności. Po uruchomieniu społeczność działa w sieci Bitsocial i jest dostępna z kompatybilnych klientów.

## Spinki do mankietów

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
