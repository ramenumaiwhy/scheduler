import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Difyワークフローを実行するAPIエンドポイント
 * クエリパラメータでワークフローIDを指定して実行します
 */
export async function GET(request: NextRequest) {
  try {
    // クエリパラメータからワークフローIDを取得
    const searchParams = request.nextUrl.searchParams;
    const workflowId = searchParams.get('workflowId');
    
    if (!workflowId) {
      return NextResponse.json(
        { error: 'Workflow ID is required' },
        { status: 400 }
      );
    }
    
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
    
    // 指定されたIDのワークフローを検索
    const workflow = data.workflows.find((w: any) => w.id === workflowId);
    
    if (!workflow) {
      return NextResponse.json(
        { error: `Workflow with ID ${workflowId} not found` },
        { status: 404 }
      );
    }
    
    // 実際のDify APIの呼び出しはここに実装
    // 現在はモックレスポンスを返す
    const mockResponse = {
      success: true,
      workflow: workflow,
      executedAt: new Date().toISOString(),
      message: `Workflow "${workflow.name}" executed successfully`
    };
    
    return NextResponse.json(mockResponse, { status: 200 });
  } catch (error) {
    console.error('Error executing workflow:', error);
    return NextResponse.json(
      { error: 'Failed to execute workflow' },
      { status: 500 }
    );
  }
} 