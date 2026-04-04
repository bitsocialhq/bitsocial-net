---
title: Tantangan Kanvas Captcha
description: Generator captcha berbasis gambar mandiri dengan karakter, dimensi, dan warna yang dapat dikonfigurasi.
sidebar_position: 2
---

# Tantangan Kanvas Captcha

Captcha Canvas Challenge adalah generator captcha gambar mandiri. Ini merender teks acak ke dalam kanvas HTML dan mengembalikan gambar yang dihasilkan, yang dapat disajikan oleh komunitas kepada penulis sebagai tantangan spam.

**Kode sumber:** [github.com/bitsocialnet/captcha-canvas-challenge](https://github.com/bitsocialnet/captcha-canvas-challenge)

## Persyaratan

- **Node.js** >= 22
- **Khusus ESM** -- paket ini tidak mengirimkan build CommonJS.

## Instalasi

```bash
npm install @bitsocial/captcha-canvas-challenge
```

## Opsi Konfigurasi

| Pilihan      | Ketik    | Bawaan    | Deskripsi                                               |
| ------------ | -------- | --------- | ------------------------------------------------------- |
| `characters` | `number` | `6`       | Jumlah karakter acak yang dirender pada gambar captcha. |
| `height`     | `number` | `100`     | Tinggi gambar yang dihasilkan dalam piksel.             |
| `width`      | `number` | `300`     | Lebar gambar yang dihasilkan dalam piksel.              |
| `colors`     | `string` | `#32cf7e` | Warna primer yang digunakan untuk teks captcha.         |

## Cara Kerjanya

1. Generator mengambil string acak dengan panjang yang dikonfigurasi.
2. String dirender ke kanvas dengan noise visual untuk menahan OCR.
3. Gambar yang dihasilkan (dan jawaban yang diharapkan) dikembalikan sehingga aplikasi pemanggil dapat menyajikan tantangan dan kemudian memverifikasi responsnya.

Karena paket ini adalah generator gambar murni, paket ini tidak menangani manajemen jaringan atau sesi sendiri. Hal ini dimaksudkan untuk diintegrasikan ke dalam aliran tantangan yang lebih besar -- misalnya, sebagai salah satu jenis tantangan yang didukung oleh [Pemblokir Spam](./spam-blocker.md).
