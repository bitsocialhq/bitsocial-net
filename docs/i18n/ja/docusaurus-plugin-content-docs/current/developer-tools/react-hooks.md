---
title: 反応フック
description: Bitsocial プロトコル上で分散型ソーシャル アプリケーションを構築するための React フック ライブラリ。
sidebar_position: 1
---

# 反応フック

`bitsocial-react-hooks` パッケージは、Bitsocial プロトコルと対話するための使い慣れた React フック API を提供します。フィード、コメント、作成者プロフィールの取得、アカウントの管理、コンテンツの公開、コミュニティの購読をすべて中央サーバーに依存せずに処理します。

このライブラリは、[5ちゃん](/apps/5chan/) および他の Bitsocial クライアント アプリケーションによって使用される主要なインターフェイスです。

:::note
`bitsocial-react-hooks` は現在、npm に公開されるのではなく、GitHub から直接使用されます。
:::

## インストール

パッケージはまだ npm にないため、GitHub から直接インストールし、特定のコミット ハッシュに固定します。

```bash
yarn add https://github.com/bitsocialnet/bitsocial-react-hooks.git#<commit-hash>
```

`<commit-hash>` を対象とするコミットに置き換えます。

## APIの概要

フックは機能的なカテゴリに分類されています。以下は、各カテゴリで最も一般的に使用されるフックの概要です。完全な署名、パラメータ、戻り値の型については、[GitHub の完全な API リファレンス](https://github.com/bitsocialnet/bitsocial-react-hooks).) を参照してください。

### アカウント

ローカル ユーザー アカウント、ID、設定を管理します。

- `useAccount(accountName?)` -- アクティブな (または名前付き) アカウント オブジェクトを返します。
- `useAccounts()` -- ローカルに保存されているすべてのアカウントを返します
- `useAccountComments(options?)` -- アクティブなアカウントによって公開されたコメントを返します

### コメント

個々のコメントやスレッドを取得して対話します。

- `useComment(commentCid?)` -- CID によって単一のコメントを取得します
- `useComments(commentCids?)` -- 複数のコメントをバッチで取得します
- `useEditedComment(comment?)` -- コメントの最新編集バージョンを返します。

### コミュニティ

コミュニティのメタデータと設定を取得します。

- 単一コミュニティ検索フック -- アドレスによってコミュニティを取得します
- マルチコミュニティルックアップフック -- 複数のコミュニティを取得します
- コミュニティ統計フック -- 購読者と投稿数を返します

### 著者

著者プロフィールとメタデータを検索します。

- `useAuthor(authorAddress?)` -- 著者プロフィールを取得します
- `useAuthorComments(options?)` -- 特定の作成者によるコメントを返します
- `useResolvedAuthorAddress(authorAddress?)` -- 人間が読めるアドレス (ENS など) をそのプロトコル アドレスに解決します。

### フィード

コンテンツ フィードを購読し、ページ分割します。

- `useFeed(options?)` -- 1 つ以上のコミュニティからの投稿のページ分割されたフィードを返します
- `useBufferedFeeds(feedOptions?)` -- レンダリングを高速化するために複数のフィードを事前バッファリングします。
- `useAuthorFeed(authorAddress?)` -- 特定の作成者による投稿のフィードを返します

### アクション

コンテンツを公開し、書き込み操作を実行します。

- `usePublishComment(options?)` -- 新しいコメントまたは返信を公開する
- `usePublishVote(options?)` -- 賛成票または反対票を投じます
- `useSubscribe(options?)` -- コミュニティに登録または登録解除する

### 状態と RPC

接続状態を監視し、リモートの Bitsocial デーモンと対話します。

- `useClientsStates(options?)` -- IPFS/pubsub クライアントの接続状態を返します。
- RPC 設定フック -- 現在の RPC デーモン構成を返します。

## 開発

フック ライブラリをローカルで操作するには:

**前提条件:** Node.js、Corepack が有効、Yarn 4

```bash
git clone https://github.com/bitsocialnet/bitsocial-react-hooks.git
cd bitsocial-react-hooks
corepack enable
yarn install
```

テストおよびビルド コマンドについては、リポジトリの README を参照してください。

## リンク

- **GitHub:** [bitsocialnet/bitsocial-react-hooks](https://github.com/bitsocialnet/bitsocial-react-hooks)
- **ライセンス:** GPL-2.0 のみ
