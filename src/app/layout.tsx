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