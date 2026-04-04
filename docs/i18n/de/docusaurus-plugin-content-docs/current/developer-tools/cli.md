---
title: CLI
description: Befehlszeilenschnittstelle zum Ausführen eines Bitsocial-Knotens, zum Erstellen von Communities und zum Verwalten von Protokollvorgängen.
sidebar_position: 2
---

# CLI

`bitsocial-cli` ist ein Befehlszeilentool für die Interaktion mit dem Bitsocial-Protokoll-Backend. Sie können damit einen lokalen P2P-Daemon ausführen, Communities erstellen und konfigurieren sowie Inhalte veröffentlichen – alles vom Terminal aus.

Es basiert auf der gemeinsamen Bitsocial-Protokoll-Client-Schicht und wird von [5chan](/apps/5chan/) und [Seedit](/apps/seedit/) für die Community-Erstellung und Knotenverwaltung verwendet.

## Installation

Vorgefertigte Binärdateien sind für Windows, macOS und Linux verfügbar. Laden Sie die neueste Version für Ihre Plattform von GitHub herunter:

**[Von GitHub Releases herunterladen](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Machen Sie nach dem Herunterladen die Binärdatei ausführbar (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Den Daemon ausführen

Die häufigste Verwendung der CLI ist die Ausführung eines Bitsocial-Knotens. Der Daemon startet die P2P-Netzwerkschicht und stellt eine lokale API bereit, mit der Clients eine Verbindung herstellen können.

```bash
bitsocial-cli daemon
```

Beim ersten Start gibt der Daemon Links zur **WebUI** aus, einer browserbasierten grafischen Oberfläche zur Verwaltung Ihres Knotens, Ihrer Communities und Einstellungen. Dies ist nützlich, wenn Sie eine GUI gegenüber Terminalbefehlen bevorzugen.

## Schlüsselaktionen

| Aktion                        | Beschreibung                                                        |
| ----------------------------- | ------------------------------------------------------------------- |
| Starten Sie den Daemon        | Starten Sie den Bitsocial P2P-Knoten                                |
| Erstellen Sie eine Community  | Erstellen Sie eine neue Community                                   |
| Bearbeiten Sie eine Community | Community-Einstellungen aktualisieren (Titel, Beschreibung, Regeln) |
| Lokale Gemeinden auflisten    | Auf diesem Knoten gehostete Communities auflisten                   |
| Eine Community gründen        | Beginnen Sie, einer bestimmten Community zu dienen                  |
| Stoppen Sie eine Community    | Hören Sie auf, einer bestimmten Community zu dienen                 |

Führen Sie die CLI mit `--help` aus, um die aktuellen Befehlsnamen und Flags anzuzeigen, die von Ihrer installierten Version verfügbar gemacht werden:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Typischer Arbeitsablauf

Ein üblicher Einrichtungsablauf zum Hosten einer neuen Community:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Von dort aus verwenden Sie die Community-Verwaltungsbefehle der installierten Version, um eine Community zu erstellen, zu konfigurieren und mit der Bereitstellung zu beginnen. Nach dem Start ist die Community live im Bitsocial-Netzwerk und über kompatible Clients zugänglich.

## Links

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
