# Where Does My Money GO? フロントエンド

## 概要

あなたが払った税金が 1 日あたりどう使われているかを知ることで、
公共サービスの受益と負担の関係を読み解く市民主導のプロジェクトです。
こちらはフロントエンドのリポジトリです。

## デモ

- [現行版サイト](https://tsukubashi.spending.jp/)

## 環境

- Node.js ver.16
- NuxtJS ver.2
- Bootstrap ver.5
- TypeScript
- Yarn

## 開発手順

### 環境セットアップ

```bash
# リポジトリをクローン
$ git clone https://github.com/spendingjp/openspending-frontend.git
$ cd openspending-frontend

# 依存関係モジュールをインストール
$ yarn install
```

### デバッグ実行

```bash
# モックAPIサーバーを起動
$ yarn serveapi

# 開発用サーバーを起動（ホットリロード有効）
$ yarn dev
```

以下の URL を開いて、サイトが表示されれば成功です。

- [http://localhost:3000](http://localhost:3000)

### 開発に参加するには

Code for Japan の Slack に開発メンバー用チャンネルがあります。[Slack への参加はこちらから](https://join.slack.com/t/cfj/shared_invite/zt-w2soa7jo-ZhVLNk5HjBMYm1GD72i36g)どうぞ。

- #proj-wdmmg （プロジェクト全体）
- #proj-wdmmg-dev （開発）

## 参考サイト

- 現行版

  - [プロジェクトサイト](https://spending.jp/)
  - [つくば市現行サイト](https://tsukubashi.spending.jp/)

- 開発中
  - [バックエンド リポジトリ（GitHub）](https://github.com/spendingjp/openspending-backend)
