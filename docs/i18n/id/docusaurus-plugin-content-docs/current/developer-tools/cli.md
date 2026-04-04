---
title: CLI
description: Antarmuka baris perintah untuk menjalankan node Bitsocial, membuat komunitas, dan mengelola operasi protokol.
sidebar_position: 2
---

# CLI

`bitsocial-cli` adalah alat baris perintah untuk berinteraksi dengan backend protokol Bitsocial. Ini memungkinkan Anda menjalankan daemon P2P lokal, membuat dan mengkonfigurasi komunitas, dan mempublikasikan konten -- semuanya dari terminal.

Itu dibangun di atas lapisan klien protokol Bitsocial bersama dan digunakan oleh [5chan](/apps/5chan/) dan [edit benih](/apps/seedit/) untuk pembuatan komunitas dan manajemen node.

## Instalasi

Biner bawaan tersedia untuk Windows, macOS, dan Linux. Unduh rilis terbaru untuk platform Anda dari GitHub:

**[Unduh dari Rilis GitHub](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Setelah mengunduh, buat binernya dapat dieksekusi (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Menjalankan Daemon

Penggunaan CLI yang paling umum adalah menjalankan node Bitsocial. Daemon memulai lapisan jaringan P2P dan menampilkan API lokal yang dapat dihubungkan oleh klien.

```bash
bitsocial-cli daemon
```

Pada peluncuran pertama, daemon mengeluarkan tautan ke **WebUI**, antarmuka grafis berbasis browser untuk mengelola node, komunitas, dan pengaturan Anda. Ini berguna jika Anda lebih memilih GUI daripada perintah terminal.

## Tindakan Utama

| Aksi                   | Deskripsi                                                |
| ---------------------- | -------------------------------------------------------- |
| Mulai daemon           | Luncurkan simpul P2P Bitsocial                           |
| Buat komunitas         | Buat komunitas baru                                      |
| Edit komunitas         | Perbarui pengaturan komunitas (judul, deskripsi, aturan) |
| Daftar komunitas lokal | Daftar komunitas yang dihosting di node ini              |
| Mulai komunitas        | Mulai melayani komunitas tertentu                        |
| Hentikan komunitas     | Berhenti melayani komunitas tertentu                     |

Jalankan CLI dengan `--help` untuk melihat nama perintah dan tanda saat ini yang diekspos oleh rilis yang Anda instal:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Alur Kerja Khas

Alur penyiapan umum untuk menghosting komunitas baru:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

Dari sana, gunakan perintah manajemen komunitas rilis yang diinstal untuk membuat, mengonfigurasi, dan mulai melayani komunitas. Setelah dimulai, komunitas tersebut aktif di jaringan Bitsocial dan dapat diakses dari klien yang kompatibel.

## Tautan

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
