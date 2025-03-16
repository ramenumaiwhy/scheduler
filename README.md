# Dify Scheduler

Difyワークフローを指定した時間に自動実行するシステムです。Vercel Cron Jobsを使用して、複数のワークフローを異なるスケジュールで実行できます。

## 機能

- 設定した時間に指定したDify APIを呼び出してワークフローを実行
- 複数のワークフローを異なるスケジュールで実行可能
- ワークフローの実行結果はDify側で設定された連携先に自動的に投稿される
- 実行ログを記録して障害時に確認できる

## 技術スタック

- Next.js: Webアプリケーションフレームワーク
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
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定します：

```
DIFY_API_KEY=your_dify_api_key_here
DIFY_API_URL=https://api.dify.ai/v1
```

### 4. ワークフロー設定の編集

`config/workflows.json`ファイルを編集して、実行するワークフローとスケジュールを設定します：

```json
{
  "workflows": [
    {
      "id": "your-workflow-id-1",
      "schedule": "0 21 * * *",
      "name": "チバさん日報"
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
npm run dev
```

### 7. Vercelへのデプロイ

```bash
vercel
```

## APIエンドポイント

- `GET /api`: APIの動作確認
- `GET /api/workflows`: 登録されているワークフロー一覧を取得
- `GET /api/cron/dify-workflow?workflowId=xxx`: 指定したワークフローを実行

## 注意事項

- Dify APIキーは公開しないように注意してください
- Vercelの無料プランではCron Jobsの実行回数に制限があります
- ワークフローIDは実際のDifyで作成したワークフローのIDに置き換えてください

## ライセンス

MIT 