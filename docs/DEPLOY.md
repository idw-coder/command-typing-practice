# レンタルサーバーへのSSGデプロイ手順

## 概要
このプロジェクトは、レンタルサーバーの配下ディレクトリ（`/command-typing-practice/`）にSSG（Static Site Generation）でデプロイするように設定されています。

## 設定内容

### next.config.ts
- `basePath: '/command-typing-practice'` - アプリケーションのベースパス
- `assetPrefix: '/command-typing-practice/'` - 静的アセットのプレフィックス
- `output: 'export'` - 静的ファイル生成を有効化
- `trailingSlash: true` - URLの末尾にスラッシュを追加
- `images.unoptimized: true` - 画像最適化を無効化（SSGでは必要）

## デプロイ手順

### 1. 静的ファイルの生成
```bash
npm run build:static
```

### 2. 生成されたファイル
ビルド後、`out/`ディレクトリに静的ファイルが生成されます。

### 3. レンタルサーバーへのアップロード
`out/`ディレクトリ内のすべてのファイルを、レンタルサーバーの以下のディレクトリにアップロードしてください：
```
public_html/command-typing-practice/
```

### 4. アクセスURL
デプロイ後、以下のURLでアクセスできます：
```
https://yourdomain.com/command-typing-practice/
```

## 注意事項
- レンタルサーバーでSSGを使用する場合、サーバーサイド機能（API Routes等）は使用できません
- すべてのページは事前にビルド時に生成される必要があります
- 動的なルーティングを使用する場合は、`generateStaticParams`を使用して静的パスを定義してください

## ディレクトリ名の変更
別のディレクトリ名を使用したい場合は、`next.config.ts`の以下の値を変更してください：
- `basePath`
- `assetPrefix`

例：
```typescript
basePath: '/my-app',
assetPrefix: '/my-app/',
``` 