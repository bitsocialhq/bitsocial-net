---
title: EVM コントラクト コール チャレンジ
description: EVM スマート コントラクトを呼び出してオンチェーンの状態を検証するスパム対策チャレンジ。
sidebar_position: 4
---

# EVM コントラクト コール チャレンジ

EVM Contract Call Challenge は、パブリケーションを許可する前にオンチェーンの状態を検証するスパム対策メカニズムです。これにより、コミュニティ所有者は、作成者が投稿するために、スマート コントラクトで定義された基準 (たとえば、最低トークン残高を保持するなど) を満たすことを要求できるようになります。

**ソースコード:** [github.com/bitsocialnet/evm-contract-call](https://github.com/bitsocialnet/evm-contract-call)

## 要件

- **Node.js** >= 22
- **ESM のみ** -- このパッケージには CommonJS ビルドは含まれません。

## インストール

```bash
npm install @bitsocial/evm-contract-challenge
```

## 構成オプション

| オプション    | タイプ   | 説明                                                          |
| ------------- | -------- | ------------------------------------------------------------- |
| `chainTicker` | `string` | クエリするチェーン (例: `eth`、`matic`、`avax`)。             |
| `address`     | `string` | 呼び出すスマート コントラクト アドレス。                      |
| `abi`         | `string` | 呼び出される関数の ABI フラグメント。                         |
| `condition`   | `string` | コントラクトの戻り値に対して評価される比較式 (例: `> 1000`)。 |
| `error`       | `string` | 条件を満たさない著者に表示されるエラーメッセージ。            |

## 例

特定の ERC-20 トークンを 1,000 個以上保有する作成者に投稿を制限したいコミュニティ所有者は、次のようにチャレンジを構成します。

- `chainTicker`: `"eth"`
- `address`: トークンコントラクトアドレス
- `abi`: `balanceOf(address)` の ABI
- `condition`: `"> 1000"`
- `error`: `"You must hold more than 1,000 tokens to post in this community."`

作成者が公開しようとすると、チャレンジは作成者のアドレスを指定して `balanceOf` を呼び出し、戻り値が条件を満たすかどうかを確認します。一致する場合、出版は続行されます。それ以外の場合は、設定されたエラー メッセージが返されます。

## いつ使用するか

EVM コントラクト コール チャレンジは次のような場合に最適です。

- **トークンゲート型コミュニティ**。トークン所有者への投稿を制限します。
- **NFT ゲート型アクセス**。特定の NFT の所有権が必要です。
- **DAO ガバナンス スペース**。参加はガバナンス トークン所有者に限定されます。

オンチェーン ID に依存しないコミュニティの場合は、代わりに [スパムブロッカー](./spam-blocker.md) または [バウチャーチャレンジ](./voucher-challenge.md) を検討してください。
