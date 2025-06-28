import Link from 'next/link';

export default function CICDSetupPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* パンくずリスト */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-700">Home</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-900">CI/CD Setup</li>
        </ol>
      </nav>

      {/* 記事ヘッダー */}
      <header className="mb-12">
        <div className="flex items-center mb-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            CI/CD
          </span>
          <span className="text-gray-500 text-sm ml-4">2024年12月</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          GitHub Actions CI/CD セットアップ手順
        </h1>
        
        <p className="text-xl text-gray-600 leading-relaxed">
          Next.jsプロジェクトをGitHubにプッシュすると自動的にレンタルサーバー（Xserver）にFTPでデプロイされるCI/CDパイプラインの構築手順を詳しく解説します。
        </p>
      </header>

      {/* 記事本文 */}
      <article className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">概要</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            このプロジェクトは、GitHubにプッシュすると自動的にレンタルサーバー（Xserver）にFTPでデプロイされるCI/CDパイプラインを構築します。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">アーキテクチャ図</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
{`graph TD
    A[開発者がコードをプッシュ] --> B[GitHub Actions トリガー]
    B --> C[Node.js環境セットアップ]
    C --> D[依存関係インストール]
    D --> E[Next.js ビルド]
    E --> F[静的ファイル生成]
    F --> G[FTPでXserverにアップロード]
    G --> H[デプロイ完了]
    
    style A fill:#e1f5fe
    style H fill:#c8e6c9
    style G fill:#fff3e0`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">デプロイフロー</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
{`sequenceDiagram
    participant Dev as 開発者
    participant GH as GitHub
    participant Actions as GitHub Actions
    participant FTP as Xserver FTP
    
    Dev->>GH: git push origin main
    GH->>Actions: ワークフロー開始
    Actions->>Actions: Node.js環境セットアップ
    Actions->>Actions: npm ci
    Actions->>Actions: npm run build:static
    Actions->>FTP: FTP接続・アップロード
    FTP-->>Actions: アップロード完了
    Actions-->>GH: ワークフロー完了`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">セットアップ手順</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ステップ1: XserverのFTP情報を確認</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>Xserverのサーバーパネルにログイン</strong></li>
                <li><strong>「FTPアカウント設定」を開く</strong></li>
                <li><strong>該当ドメインのアカウント情報を取得</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>ホスト名（例: <code className="bg-gray-100 px-1 rounded">ftp.xserver.ne.jp</code>）</li>
                    <li>ユーザー名</li>
                    <li>パスワード</li>
                    <li>アップロード先パス（例: <code className="bg-gray-100 px-1 rounded">/command-typing-practice/</code>）</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ステップ2: GitHub Secrets に登録</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>GitHubリポジトリページに移動</strong></li>
                <li><strong>Settings → Secrets and variables → Actions</strong></li>
                <li><strong>「New repository secret」をクリック</strong></li>
                <li><strong>以下のシークレットを登録</strong></li>
              </ol>
              
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Value</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">説明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">FTP_HOST</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">ftp.xserver.ne.jp</td>
                      <td className="border border-gray-300 px-4 py-2">FTPホスト名</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">FTP_USERNAME</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">your_username</td>
                      <td className="border border-gray-300 px-4 py-2">FTPユーザー名</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">FTP_PASSWORD</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">your_password</td>
                      <td className="border border-gray-300 px-4 py-2">FTPパスワード</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ステップ3: GitHub Actions ワークフロー追加</h3>
              <p className="text-gray-700 mb-4">
                <a href="https://github.com/SamKirkland/FTP-Deploy-Action" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  https://github.com/SamKirkland/FTP-Deploy-Action
                </a>
                が公開してるActionを使用しています
              </p>
              
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>.github/workflows/deploy.yml ファイルを作成</strong></li>
                <li><strong>以下の内容を追加</strong></li>
              </ol>
              
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-gray-100 text-sm">
{`name: Deploy to Xserver

on:
  push:
    branches:
      - main  # または master

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build:static

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4
        with:
          server: ` + '${{ secrets.FTP_HOST }}' + `
          username: ` + '${{ secrets.FTP_USERNAME }}' + `
          password: ` + '${{ secrets.FTP_PASSWORD }}' + `
          local-dir: ./out/
          server-dir: /command-typing-practice/`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ステップ4: 動作確認</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>mainブランチにプッシュ</strong>
                  <div className="bg-gray-900 rounded-lg p-4 mt-2 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
{`git add .
git commit -m "Add CI/CD workflow"
git push origin main`}
                    </pre>
                  </div>
                </li>
                <li><strong>GitHubのActionsタブで確認</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>「Deploy to Xserver」ワークフローが実行されているか確認</li>
                    <li>緑色のチェックマークが表示されれば成功</li>
                  </ul>
                </li>
                <li><strong>レンタルサーバーで確認</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><code className="bg-gray-100 px-1 rounded">https://yourdomain.com/command-typing-practice/</code> にアクセス</li>
                    <li>最新の変更が反映されているか確認</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">設定の詳細</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">プロジェクト構成</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Next.js 15.3.4</strong> - Reactフレームワーク</li>
                <li><strong>TypeScript</strong> - 型安全性</li>
                <li><strong>Tailwind CSS</strong> - スタイリング</li>
                <li><strong>静的エクスポート</strong> - <code className="bg-gray-100 px-1 rounded">output: 'export'</code> でSSG</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ビルドプロセス</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <pre className="text-sm overflow-x-auto">
{`graph LR
    A[npm run build:static] --> B[next build]
    B --> C[out/ディレクトリ生成]
    C --> D[FTPアップロード]
    
    style A fill:#f3e5f5
    style C fill:#e8f5e8`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">重要な設定ファイル</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">next.config.ts</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
{`const nextConfig = {
  basePath: '/command-typing-practice',        // ベースパス
  assetPrefix: '/command-typing-practice/',    // アセットプレフィックス
  output: 'export',                            // 静的エクスポート
  trailingSlash: true,                         // 末尾スラッシュ
  images: { unoptimized: true },               // 画像最適化無効
};`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">package.json スクリプト</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
{`{
  "scripts": {
    "build:static": "next build"  // 静的ビルド
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">トラブルシューティング</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">よくある問題</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">問題</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">原因</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">解決方法</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">FTP接続エラー</td>
                      <td className="border border-gray-300 px-4 py-2">認証情報が間違っている</td>
                      <td className="border border-gray-300 px-4 py-2">GitHub Secretsを再確認</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">ビルドエラー</td>
                      <td className="border border-gray-300 px-4 py-2">依存関係の問題</td>
                      <td className="border border-gray-300 px-4 py-2">npm ciでクリーンインストール</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">ファイルが反映されない</td>
                      <td className="border border-gray-300 px-4 py-2">キャッシュの問題</td>
                      <td className="border border-gray-300 px-4 py-2">ブラウザキャッシュをクリア</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ログの確認方法</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>GitHub Actions</strong> → <strong>ワークフロー実行</strong> → <strong>デプロイジョブ</strong> → <strong>ステップ詳細</strong></li>
                <li><strong>エラーメッセージを確認</strong></li>
                <li><strong>必要に応じてシークレットを更新</strong></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">次のステップ</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">最適化オプション</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>差分アップロード</strong>: 変更されたファイルのみアップロード</li>
                <li><strong>SFTP移行</strong>: より安全なプロトコルへの移行</li>
                <li><strong>キャッシュ戦略</strong>: ビルド時間の短縮</li>
                <li><strong>通知設定</strong>: Slack/Discordへのデプロイ通知</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">セキュリティ強化</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>SSH鍵認証</strong>: パスワード認証から鍵認証へ</li>
                <li><strong>環境変数分離</strong>: 開発/本番環境の分離</li>
                <li><strong>アクセス制限</strong>: 特定ブランチのみデプロイ</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">参考リンク</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <a href="https://docs.github.com/ja/actions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                GitHub Actions 公式ドキュメント
              </a>
            </li>
            <li>
              <a href="https://github.com/SamKirkland/FTP-Deploy-Action" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                FTP Deploy Action
              </a>
            </li>
            <li>
              <a href="https://nextjs.org/docs/app/building-your-application/deploying/static-exports" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Next.js 静的エクスポート
              </a>
            </li>
          </ul>
        </section>
      </article>

      {/* ナビゲーション */}
      <nav className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Blog一覧に戻る
          </Link>
          
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ホームに戻る
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  );
} 