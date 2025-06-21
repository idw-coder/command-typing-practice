import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // レンタルサーバーの配下ディレクトリにデプロイするための設定
  basePath: '/command-typing-practice',
  assetPrefix: '/command-typing-practice/',
  
  // SSG（Static Site Generation）の設定
  output: 'export',
  trailingSlash: true,
  
  // 画像の最適化を無効化（SSGでは必要）
  images: {
    unoptimized: true,
  },
  
  // その他の設定
  reactStrictMode: true,
};

export default nextConfig;
