import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * ワークフロー一覧を取得するAPIエンドポイント
 * config/workflows.jsonに定義されたワークフロー情報を返します
 */
export async function GET() {
  try {
    // ワークフロー設定ファイルのパス
    const filePath = path.join(process.cwd(), 'config', 'workflows.json');
    
    // ファイルが存在するか確認
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Workflows configuration file not found' },
        { status: 404 }
      );
    }
    
    // ファイルを読み込む
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error reading workflows:', error);
    return NextResponse.json(
      { error: 'Failed to read workflows configuration' },
      { status: 500 }
    );
  }
} 