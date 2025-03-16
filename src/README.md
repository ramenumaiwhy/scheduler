# Dify Scheduler プロジェクト構造解説

このドキュメントでは、Dify Schedulerプロジェクトのディレクトリ構造と実装内容について、初心者にもわかりやすく解説します。

## 1. プロジェクト概要

Dify Schedulerは、Difyワークフローを指定した時間に自動実行するシステムです。このプロジェクトは主にAPIサーバーとして機能し、フロントエンド（見た目の部分）はほとんどありません。

## 2. ディレクトリ構造

プロジェクトの主要なディレクトリ構造は以下のようになっています：

```
scheduler/
├── config/                  # 設定ファイル
│   └── workflows.json       # ワークフロー設定
├── src/                     # ソースコード
│   └── app/                 # Next.jsのアプリケーション
│       ├── api/             # APIエンドポイント
│       │   └── health/      # ヘルスチェックAPI
│       │       └── route.ts # ヘルスチェックの実装
│       ├── layout.tsx       # 基本レイアウト
│       └── page.tsx         # トップページ
├── vercel.json              # Vercelデプロイ設定
└── package.json             # プロジェクト依存関係
```

## 3. 各ファイルの役割

### 3.1 `src/app/layout.tsx`

このファイルは、アプリケーション全体の基本的なHTMLレイアウトを定義しています。

```tsx
export const metadata = {
  title: 'Dify Scheduler',
  description: 'Difyワークフローを指定した時間に自動実行するシステム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
```

**解説**:
- `metadata`: ウェブページのタイトルや説明文を設定します（SEOに役立ちます）
- `RootLayout`: すべてのページで共通して使われる基本的なHTMLの構造を定義しています
- `children`: このレイアウトの中に表示される実際のページ内容を表します

### 3.2 `src/app/page.tsx`

トップページの内容を定義しています。このプロジェクトではAPIが主な機能なので、シンプルな説明文だけを表示しています。

```tsx
export default function Home() {
  return (
    <main>
      <h1>Dify Scheduler API</h1>
      <p>このサービスはAPIのみを提供しています。フロントエンドはありません。</p>
    </main>
  );
}
```

**解説**:
- `Home`: トップページのコンポーネントです
- このページは単純な説明文のみを表示し、ユーザーにこれがAPIサービスであることを伝えています

### 3.3 `src/app/api/health/route.ts`

サーバーの状態を確認するためのヘルスチェックAPIを実装しています。

```tsx
import { NextResponse } from 'next/server';

/**
 * ヘルスチェック用のAPIエンドポイント
 * サーバーが正常に動作しているかを確認するために使用します
 */
export async function GET() {
  return NextResponse.json(
    { 
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'dify-scheduler'
    },
    { status: 200 }
  );
}
```

**解説**:
- `GET`: HTTPのGETリクエストを処理する関数です
- このAPIは、サーバーが正常に動作していることを確認するために使用されます
- 返すデータ:
  - `status`: サーバーの状態（"ok"は正常動作中を意味します）
  - `timestamp`: 現在の日時（ISO形式の文字列）
  - `service`: サービス名

### 3.4 `config/workflows.json`

実行するDifyワークフローの設定を定義しています。

```json
{
  "workflows": [
    {
      "id": "example-workflow-id-1",
      "schedule": "0 21 * * *",
      "name": "チバさん日報"
    },
    {
      "id": "example-workflow-id-2",
      "schedule": "0 9 * * *",
      "name": "朝のニュース"
    }
  ]
}
```

**解説**:
- `workflows`: 実行するワークフローのリストです
- 各ワークフローには以下の情報が含まれます:
  - `id`: Difyシステム上でのワークフローのID
  - `schedule`: 実行スケジュール（cron形式）
  - `name`: ワークフローの名前（わかりやすい表示用）
- cron形式の例:
  - `0 21 * * *`: 毎日21時00分に実行
  - `0 9 * * *`: 毎日9時00分に実行

### 3.5 `vercel.json`

Vercelにデプロイするための設定ファイルです。

```json
{
  "version": 2,
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["hnd1"],
  "crons": []
}
```

**解説**:
- `version`: Vercel設定のバージョン
- `buildCommand`: ビルド時に実行するコマンド
- `devCommand`: 開発サーバー起動時に実行するコマンド
- `installCommand`: 依存関係をインストールするコマンド
- `framework`: 使用しているフレームワーク（Next.js）
- `regions`: デプロイするリージョン（hnd1は東京）
- `crons`: 定期実行するジョブの設定

## 4. APIの使い方

### 4.1 ヘルスチェックAPI

サーバーの状態を確認するためのAPIです。

- **エンドポイント**: `/api/health`
- **メソッド**: GET
- **レスポンス例**:
  ```json
  {
    "status": "ok",
    "timestamp": "2025-03-16T12:20:02.319Z",
    "service": "dify-scheduler"
  }
  ```

## 5. 技術スタック

このプロジェクトでは以下の技術を使用しています：

1. **Next.js**: Reactベースのウェブアプリケーションフレームワーク
2. **TypeScript**: 型安全なJavaScriptの拡張言語
3. **Vercel**: ホスティングとCron Jobs機能を提供するプラットフォーム

## 6. 開発方法

### 6.1 ローカル開発

```bash
# 開発サーバーを起動
pnpm dev

# ビルド
pnpm build

# 本番モードで起動
pnpm start
```

### 6.2 デプロイ

```bash
# プレビューデプロイ
pnpm deploy:preview

# 本番デプロイ
pnpm deploy:production
```

## 7. 今後の拡張ポイント

このプロジェクトは以下のように拡張できます：

1. **ワークフロー管理API**: ワークフローの追加・編集・削除を行うAPI
2. **実行ログ機能**: ワークフローの実行結果を記録する機能
3. **認証機能**: APIアクセスを制限するための認証機能
4. **管理画面**: ワークフローを管理するためのシンプルなUI

## 8. まとめ

Dify Schedulerは、Next.jsのApp Routerを使用したシンプルなAPIサーバーです。主な機能は、設定されたスケジュールに従ってDifyワークフローを自動実行することです。このプロジェクトは、APIのみの構成で、フロントエンドの実装はほとんどありません。 