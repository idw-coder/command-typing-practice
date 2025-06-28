import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-lg text-gray-600">
          技術的な知見やチュートリアルを共有しています
        </p>
      </header>

      <div className="grid gap-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                CI/CD
              </span>
              <span className="text-gray-500 text-sm ml-4">2024年12月</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              GitHub Actions CI/CD セットアップ手順
            </h2>
            
            <p className="text-gray-600 mb-6">
              Next.jsプロジェクトをGitHubにプッシュすると自動的にレンタルサーバー（Xserver）にFTPでデプロイされるCI/CDパイプラインの構築手順を詳しく解説します。
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Next.js</span>
                <span>GitHub Actions</span>
                <span>FTP</span>
              </div>
              
              <Link 
                href="/blog/ci-cd-setup" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                詳細を読む
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </article>
        <article className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                Wanakana
              </span>
              <span className="text-gray-500 text-sm ml-4">2025年6月</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Wanakanaの使い方まとめ
            </h2>
            
            <p className="text-gray-600 mb-6">
              Wanakanaの使い方をまとめます。
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Wanakana</span>
                <span>日本語タイピング</span>
                <span>ローマ字変換</span>
              </div>
              
              <Link 
                href="/blog/wanakana-usage" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                詳細を読む
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 