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
  
  // クエリパラメータとしての認証バイパストークンを取得
  const bypassToken = request.nextUrl.searchParams.get('x-vercel-protection-bypass');
  
  // レスポンスを作成
  const response = NextResponse.next();
  
  // APIエンドポイントへのアクセスの場合
  if (path.startsWith('/api/')) {
    // 環境変数からバイパスシークレットを取得
    const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '';
    
    // Protection Bypass for Automation用のヘッダーを追加
    // 環境変数か、もしくはクエリパラメータで渡されたトークンを使用
    response.headers.set('x-vercel-protection-bypass', bypassToken || bypassSecret);
    
    // クッキーを設定してフォローアップリクエストでも認証をバイパスできるようにする
    response.headers.set('x-vercel-set-bypass-cookie', 'true');
    
    return response;
  }
  
  // その他のパスは通常の処理を続行
  return response;
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