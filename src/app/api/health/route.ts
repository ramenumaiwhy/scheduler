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