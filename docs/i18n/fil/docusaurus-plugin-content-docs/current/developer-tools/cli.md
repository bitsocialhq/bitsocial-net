---
title: CLI
description: Command-line interface para sa pagpapatakbo ng Bitsocial node, paglikha ng mga komunidad, at pamamahala ng mga pagpapatakbo ng protocol.
sidebar_position: 2
---

# CLI

Ang `bitsocial-cli` ay isang command-line tool para sa pakikipag-ugnayan sa Bitsocial protocol backend. Hinahayaan ka nitong magpatakbo ng lokal na P2P daemon, lumikha at mag-configure ng mga komunidad, at mag-publish ng nilalaman -- lahat mula sa terminal.

Ito ay binuo sa ibabaw ng nakabahaging Bitsocial protocol client layer at ginagamit ng [5chan](/apps/5chan/) at [Seedit](/apps/seedit/) para sa paggawa ng komunidad at pamamahala ng node.

## Pag-install

Available ang mga pre-built na binary para sa Windows, macOS, at Linux. I-download ang pinakabagong release para sa iyong platform mula sa GitHub:

**[Mag-download mula sa GitHub Releases](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Pagkatapos mag-download, gawin ang binary executable (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Pagpapatakbo ng Daemon

Ang pinakakaraniwang paggamit ng CLI ay nagpapatakbo ng isang Bitsocial node. Sinisimulan ng daemon ang layer ng P2P networking at inilalantad ang isang lokal na API na maaaring kumonekta ng mga kliyente.

```bash
bitsocial-cli daemon
```

Sa unang paglunsad, naglalabas ang daemon ng mga link sa **WebUI**, isang graphical interface na nakabatay sa browser para sa pamamahala ng iyong node, mga komunidad, at mga setting. Ito ay kapaki-pakinabang kung mas gusto mo ang isang GUI kaysa sa mga terminal command.

## Mga Pangunahing Aksyon

| Aksyon                             | Paglalarawan                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| Simulan ang daemon                 | Ilunsad ang Bitsocial P2P node                                                |
| Lumikha ng isang komunidad         | Lumikha ng bagong komunidad                                                   |
| I-edit ang isang komunidad         | I-update ang mga setting ng komunidad (pamagat, paglalarawan, mga panuntunan) |
| Maglista ng mga lokal na komunidad | Ilista ang mga komunidad na naka-host sa node na ito                          |
| Magsimula ng isang komunidad       | Simulan ang paglilingkod sa isang partikular na komunidad                     |
| Itigil ang isang komunidad         | Ihinto ang paglilingkod sa isang partikular na komunidad                      |

Patakbuhin ang CLI gamit ang `--help` upang makita ang kasalukuyang mga pangalan ng command at flag na nakalantad sa iyong naka-install na release:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Karaniwang Daloy ng Trabaho

Isang karaniwang daloy ng pag-setup para sa pagho-host ng bagong komunidad:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Mula doon, gamitin ang naka-install na release na mga command sa pamamahala ng komunidad upang lumikha, mag-configure, at magsimulang maglingkod sa isang komunidad. Kapag nagsimula na, live na ang komunidad sa Bitsocial network at naa-access mula sa mga katugmang kliyente.

## Mga link

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
