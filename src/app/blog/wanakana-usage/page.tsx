import Link from 'next/link';

export default function WanakanaUsagePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-700">Home</Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li>
            <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-900">wanakanaの使い方</li>
        </ol>
      </nav>
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          日本語→ローマ字変換ライブラリ「wanakana」の使い方・仕様まとめ
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          日本語タイピングゲームや日本語入力支援でよく使われる「wanakana」ライブラリの特徴・使い方・注意点をまとめます。
        </p>
      </header>
      <article className="prose prose-lg max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">wanakanaとは？</h2>
          <p>
            <a href="https://wanakana.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">wanakana</a>は、ひらがな・カタカナ⇔ローマ字変換を簡単に行えるJavaScriptライブラリです。日本語タイピングゲームや日本語IMEの実装で広く使われています。
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">主な機能</h2>
          <ul>
            <li>ひらがな・カタカナ→ローマ字変換（toRomaji）</li>
            <li>ローマ字→ひらがな変換（toHiragana）</li>
            <li>ローマ字→カタカナ変換（toKatakana）</li>
            <li>日本語文字列の自動判別（isHiragana, isKatakana, isRomaji など）</li>
            <li>変換時のオプション指定（ヘボン式/訓令式、長音・促音・小文字の扱いなど）</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">インストール方法</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">npm install wanakana</pre>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">基本的な使い方</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">import * as wanakana from 'wanakana';

// ひらがな→ローマ字
wanakana.toRomaji('ありがとう'); // "arigatou"

// カタカナ→ローマ字
wanakana.toRomaji('コンバージョン'); // "konba-jon"

// ローマ字→ひらがな
wanakana.toHiragana('arigatou'); // "ありがとう"

// ローマ字→カタカナ
wanakana.toKatakana('arigatou'); // "アリガトウ"</pre>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">タイピングゲームでの活用例</h2>
          <ul>
            <li>日本語の出題文を <code>toRomaji</code> でローマ字に変換し、ユーザーのローマ字入力と比較</li>
            <li>表示は日本語のまま、内部判定はローマ字で行うことで日本語IME不要のタイピングが可能</li>
            <li>促音（っ）、拗音（きゃ/しゃ）、長音（ー）なども自動で正しいローマ字に変換</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">主なオプション・仕様</h2>
          <ul>
            <li>デフォルトはヘボン式ローマ字（例：し→shi、ち→chi）</li>
            <li>オプションで訓令式やカスタム変換も可能</li>
            <li>長音（ー）は「-」や母音で表現される（例：コンバージョン→konba-jon）</li>
            <li>促音（っ）は子音重複（例：がっこう→gakkou）</li>
            <li>小文字（ゃゅょ）は拗音として正しく変換</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">注意点・デメリット</h2>
          <ul>
            <li>英語や記号、数字はそのまま変換される</li>
            <li>「ん」の後に母音や「y」が続く場合のn/n'の扱いに注意</li>
            <li>長音の表現（- or 母音）は用途に応じて調整が必要</li>
            <li>カタカナ語の外来語表記は複数のローマ字表現があり得る</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">公式ドキュメント・参考リンク</h2>
          <ul>
            <li><a href="https://wanakana.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">wanakana公式サイト</a></li>
            <li><a href="https://github.com/WaniKani/WanaKana" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHubリポジトリ</a></li>
            <li><a href="https://zenn.dev/uhyo/articles/wanakana-japanese-typing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Zenn: wanakanaで日本語タイピング判定</a></li>
          </ul>
        </section>
      </article>
    </div>
  );
} 