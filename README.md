# Dify Scheduler

Difyワークフローを指定した時間に自動実行するシステムです。Vercel Cron Jobsを使用して、複数のワークフローを異なるスケジュールで実行できます。

## 機能

- 設定した時間に指定したDify APIを呼び出してワークフローを実行
- 複数のワークフローを異なるスケジュールで実行可能
- ワークフローの実行結果はDify側で設定された連携先に自動的に投稿される
- 実行ログを記録して障害時に確認できる

## 技術スタック

- Next.js 15.2: 最新のWebアプリケーションフレームワーク
- TypeScript: 型安全なJavaScriptの拡張言語
- Vercel: ホスティングとCron Jobs機能
- Edge Runtime: 高速な実行環境

## セットアップ方法

### 1. リポジトリのクローン

```bash
git clone https://github.com/yourusername/dify-scheduler.git
cd dify-scheduler
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定します：

```
DIFY_API_KEY=your_dify_api_key_here
DIFY_API_URL=https://api.dify.ai/v1
# Vercelダッシュボードの「Settings > General > Protection Bypass for Automation」から取得したシークレット値
VERCEL_AUTOMATION_BYPASS_SECRET=your_secret_here
```

### 4. ワークフロー設定の編集

`config/workflows.json`ファイルを編集して、実行するワークフローとスケジュールを設定します：

```json
{
  "workflows": [
    {
      "id": "your-workflow-id-1",
      "schedule": "0 21 * * *",
      "name": "夜のニュース"
    },
    {
      "id": "your-workflow-id-2",
      "schedule": "0 9 * * *",
      "name": "朝のニュース"
    }
  ]
}
```

### 5. Vercel設定の編集

`vercel.json`ファイルを編集して、Cron Jobsの設定を行います：

```json
{
  "version": 2,
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["hnd1"],
  "crons": [
    {
      "path": "/api/cron/dify-workflow?workflowId=your-workflow-id-1",
      "schedule": "0 21 * * *"
    },
    {
      "path": "/api/cron/dify-workflow?workflowId=your-workflow-id-2",
      "schedule": "0 9 * * *"
    }
  ]
}
```

### 6. ローカルでの開発

```bash
pnpm dev
```

### 7. Vercelへのデプロイ

```bash
# プレビューデプロイ
pnpm deploy:preview

# 本番デプロイ
pnpm deploy:production
```

## APIエンドポイント

- `GET /api/health`: サーバーのヘルスチェック（動作確認）
- `GET /api/test`: シンプルなテスト用API（認証なしでアクセス可能か確認）

## 認証設定について

Vercelでは保護されたAPIエンドポイントへのアクセスに認証が必要です。以下の設定を行ってください：

1. Vercelダッシュボードで「Settings > Authentication」を選択
2. 「Protection Bypass」セクションで `/api/*` パスを追加して認証をバイパス
3. 環境変数に `VERCEL_AUTOMATION_BYPASS_SECRET` を設定

## Cronジョブの制限

Vercelの無料（Hobby）プランでは以下の制限があります：

- 各アカウントで2つまでのCronジョブ
- 1日1回のみの実行
- 実行時間は正確でない場合があります（例：1時設定でも1:00〜1:59の間で実行）

詳細は[Vercelのドキュメント](https://vercel.com/docs/cron-jobs/usage-and-pricing)を参照してください。

## 注意事項

- 機密情報（APIキーなど）は`.env.local`に保存し、リポジトリにコミットしないでください
- 無効化したCronジョブも制限数にカウントされるため、完全に削除するには設定を削除して再デプロイしてください
- ワークフローIDは実際のDifyで作成したワークフローのIDに置き換えてください

## ライセンス

MIT 