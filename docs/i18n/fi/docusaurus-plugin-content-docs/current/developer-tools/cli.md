---
title: CLI
description: Komentorivikäyttöliittymä Bitsocial-solmun suorittamiseen, yhteisöjen luomiseen ja protokollatoimintojen hallintaan.
sidebar_position: 2
---

# CLI

`bitsocial-cli` on komentorivityökalu vuorovaikutukseen Bitsocial-protokollan taustajärjestelmän kanssa. Sen avulla voit ajaa paikallista P2P-demonia, luoda ja määrittää yhteisöjä sekä julkaista sisältöä – kaikki päätteestä.

Se on rakennettu jaetun Bitsocial-protokollan asiakaskerroksen päälle, ja [5chan](/apps/5chan/) ja [Seedit] (/apps/seedit/) käyttävät sitä yhteisön luomiseen ja solmujen hallintaan.

## Asennus

Valmiiksi rakennetut binaarit ovat saatavilla Windowsille, macOS:lle ja Linuxille. Lataa alustallesi uusin julkaisu GitHubista:

**[Lataa GitHub-julkaisuista](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Latauksen jälkeen tee binaarista suoritettava (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Daemonin ajaminen

CLI:n yleisin käyttötapa on Bitsocial-solmun käyttö. Daemon käynnistää P2P-verkkokerroksen ja paljastaa paikallisen API:n, johon asiakkaat voivat muodostaa yhteyden.

```bash
bitsocial-cli daemon
```

Ensimmäisellä käynnistyksellä daemon lähettää linkit **WebUI:hen**, selainpohjaiseen graafiseen käyttöliittymään solmun, yhteisöjen ja asetusten hallintaan. Tämä on hyödyllistä, jos haluat käyttää graafista käyttöliittymää päätekomentojen sijaan.

## Avaintoiminnot

| Toiminta                    | Kuvaus                                                |
| --------------------------- | ----------------------------------------------------- |
| Käynnistä demoni            | Käynnistä Bitsocial P2P -solmu                        |
| Luo yhteisö                 | Luo uusi yhteisö                                      |
| Muokkaa yhteisöä            | Päivitä yhteisön asetukset (otsikko, kuvaus, säännöt) |
| Listaa paikalliset yhteisöt | Listaa tässä solmussa isännöidyt yhteisöt             |
| Aloita yhteisö              | Aloita tietyn yhteisön palveleminen                   |
| Pysäytä yhteisö             | Lopeta tietyn yhteisön palveleminen                   |

Suorita CLI `--help`:lla nähdäksesi asennetun julkaisun nykyiset komentojen nimet ja liput:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Tyypillinen työnkulku

Yleinen asennuskulku uuden yhteisön isännöimiseksi:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Sieltä voit luoda, määrittää ja aloittaa yhteisön palvelemisen asennetun julkaisun yhteisönhallintakomentojen avulla. Kun yhteisö on alkanut, se on live-tilassa Bitsocial-verkossa ja käytettävissä yhteensopivien asiakkaiden kanssa.

## Linkit

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
