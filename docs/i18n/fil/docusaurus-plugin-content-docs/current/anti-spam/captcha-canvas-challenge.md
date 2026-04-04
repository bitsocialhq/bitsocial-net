---
title: Captcha Canvas Challenge
description: Standalone na image-based na captcha generator na may mga na-configure na character, dimensyon, at kulay.
sidebar_position: 2
---

# Captcha Canvas Challenge

Ang Captcha Canvas Challenge ay isang standalone na image captcha generator. Nag-render ito ng randomized na text sa isang HTML canvas at ibinabalik ang nagreresultang larawan, na maaaring ipakita ng mga komunidad sa mga may-akda bilang hamon sa spam.

**Source code:** [github.com/bitsocialnet/captcha-canvas-challenge](https://github.com/bitsocialnet/captcha-canvas-challenge)

## Mga kinakailangan

- **Node.js** >= 22
- **ESM-only** -- hindi nagpapadala ang package na ito ng mga CommonJS build.

## Pag-install

```bash
npm install @bitsocial/captcha-canvas-challenge
```

## Mga Pagpipilian sa Pag-configure

| Pagpipilian  | Uri      | Default   | Paglalarawan                                                           |
| ------------ | -------- | --------- | ---------------------------------------------------------------------- |
| `characters` | `number` | `6`       | Bilang ng mga random na character na nai-render sa captcha na larawan. |
| `height`     | `number` | `100`     | Taas ng nabuong imahe sa mga pixel.                                    |
| `width`      | `number` | `300`     | Lapad ng nabuong imahe sa mga pixel.                                   |
| `colors`     | `string` | `#32cf7e` | Pangunahing kulay na ginamit para sa captcha text.                     |

## Paano Ito Gumagana

1. Pinipili ng generator ang isang random na string ng naka-configure na haba.
2. Ang string ay na-render sa isang canvas na may visual na ingay upang labanan ang OCR.
3. Ang nagreresultang larawan (at ang inaasahang sagot) ay ibinalik upang maipakita ng application sa pagtawag ang hamon at sa paglaon ay ma-verify ang tugon.

Dahil ang package ay isang purong image generator, hindi nito pinangangasiwaan ang networking o session management sa sarili nitong. Ito ay nilayon na maisama sa isang mas malaking daloy ng hamon -- halimbawa, bilang isa sa mga uri ng hamon na sinusuportahan ng [Spam Blocker](./spam-blocker.md).
