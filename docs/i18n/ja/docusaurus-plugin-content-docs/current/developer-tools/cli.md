---
title: CLI
description: Bitsocial ノードの実行、コミュニティの作成、プロトコル操作の管理のためのコマンドライン インターフェイス。
sidebar_position: 2
---

# CLI

`bitsocial-cli` は、Bitsocial プロトコル バックエンドと対話するためのコマンドライン ツールです。これにより、ローカル P2P デーモンの実行、コミュニティの作成と構成、コンテンツの公開をすべてターミナルから行うことができます。

これは共有 Bitsocial プロトコル クライアント層の上に構築されており、コミュニティの作成とノード管理のために [5ちゃん](/apps/5chan/) と [シードト](/apps/seedit/) によって使用されます。

## インストール

事前に構築されたバイナリは、Windows、macOS、および Linux で利用できます。 GitHub からお使いのプラットフォームの最新リリースをダウンロードします。

**[GitHub リリースからダウンロード](https://github.com/bitsocialnet/bitsocial-cli/releases)**

ダウンロード後、バイナリを実行可能ファイルにします (macOS/Linux)。

```bash
chmod +x bitsocial-cli
```

## デーモンの実行

CLI の最も一般的な使用法は、Bitsocial ノードを実行することです。デーモンは P2P ネットワーキング層を開始し、クライアントが接続できるローカル API を公開します。

```bash
bitsocial-cli daemon
```

最初の起動時に、デーモンはノード、コミュニティ、設定を管理するためのブラウザベースのグラフィカル インターフェイスである **WebUI** へのリンクを出力します。これは、端末コマンドよりも GUI を好む場合に便利です。

## 主要なアクション

| アクション                         | 説明                                                     |
| ---------------------------------- | -------------------------------------------------------- |
| デーモンを開始する                 | Bitsocial P2P ノードを起動します                         |
| コミュニティを作成する             | 新しいコミュニティを作成します                           |
| コミュニティを編集する             | コミュニティ設定 (タイトル、説明、ルール) を更新します   |
| ローカルコミュニティを一覧表示する | このノードでホストされているコミュニティを一覧表示します |
| コミュニティを開始する             | 特定のコミュニティへのサービスを開始します               |
| コミュニティを停止する             | 特定のコミュニティへのサービス提供を停止します           |

`--help` を指定して CLI を実行し、インストールされているリリースで公開されている現在のコマンド名とフラグを確認します。

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## 一般的なワークフロー

新しいコミュニティをホストするための一般的なセットアップ フローは次のとおりです。

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

そこから、インストールされたリリースのコミュニティ管理コマンドを使用して、コミュニティを作成、構成し、サービスの提供を開始します。開始すると、コミュニティは Bitsocial ネットワーク上で稼働し、互換性のあるクライアントからアクセスできます。

## リンク

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
