import { NextResponse } from 'next/server';

/**
 * シンプルなテスト用APIエンドポイント
 * 認証なしでアクセスできるか確認するために作成
 */
export async function GET() {
  return NextResponse.json(
    { 
      message: 'テストAPIが正常に動作しています',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
} 