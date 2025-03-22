import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * ミドルウェア関数
 * 
 * この関数は各リクエストが処理される前に実行されます。
 * APIエンドポイントにアクセスする際の認証をバイパスします。
 * 
 * @param request - 受信したリクエスト情報
 * @returns 変更されたレスポンスまたは次のミドルウェアへのリクエスト
 */
export function middleware(request: NextRequest) {
  // リクエストのパスを取得
  const path = request.nextUrl.pathname;
  
  // APIエンドポイントへのアクセスの場合
  if (path.startsWith('/api/')) {
    // 認証をバイパスして次のミドルウェアまたはルートハンドラに進む
    return NextResponse.next();
  }
  
  // その他のパスは通常の処理を続行
  return NextResponse.next();
}

// マッチするパスの設定（すべてのパスに適用）
export const config = {
  matcher: [
    /*
     * 下記パスでミドルウェアを実行:
     * - api/* (APIエンドポイント)
     */
    '/api/:path*',
  ],
}; 