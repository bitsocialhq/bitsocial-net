---
title: 5chan
description: 基于 Bitsocial 协议构建的无服务器、去中心化图像板，任何人都可以创建和拥有图像板。
sidebar_position: 1
---

:::warning[Legacy naming]
该项目的代码库仍然使用 Bitsocial 品牌重塑之前的传统“plebbit”命名。包名称、API 参考和一些内部术语将在未来版本中更新。这里描述的功能是最新的 - 只是命名已经过时。
:::

# 5chan

5chan 是一个无服务器、无管理且完全去中心化的图像板，在 Bitsocial 协议上运行。它遵循熟悉的 imageboard 目录结构，同时引入去中心化所有权——任何人都可以创建一个 board，多个 board 可以通过投票机制竞争同一个目录位置。

## 下载

|平台|链接|
| -------- | ------------------------------------- |
|网页 | [5chan.app](https://5chan.app) |
|桌面|适用于 Mac、Windows 和 Linux |
|手机 |适用于 Android |

## 看板如何工作

5chan 使用经典目录布局（例如 `/b/`、`/g/`）将内容组织到看板中。与中央管理员控制每个板的传统图像板不同，5chan 允许任何用户创建并完全拥有自己的板。当多个看板瞄准同一个目录位置时，它们会通过投票竞争该位置。

### 创建看板

要创建新板，您需要将 `bitsocial-cli` 作为对等节点运行。这可确保您的开发板以分散的方式托管，而不依赖于任何中央服务器。

### 目录分配

目录槽分配（哪个开发板出现在哪个路径）当前通过 GitHub 对 `5chan-directories.json` 文件的拉取请求进行管理。这是一个临时过程 - 未来版本将支持应用内看板创建和基于 pubsub 的投票来自动处理目录分配。

## 内部

在幕后，5chan 使用 plebbit-js API 层进行协议交互。正如上面警告中所指出的，这些内部引用仍然带有 Bitsocial 品牌重塑之前的旧命名。

## 链接

- **GitHub**：[github.com/bitsocialnet/5chan](https://github.com/bitsocialnet/5chan)
- **Telegram**：[t.me/ Fivechandev](https://t.me/fivechandev)
- **许可证**：仅限 GPL-2.0
