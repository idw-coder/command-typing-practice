'use client';

import { useState, useEffect } from 'react';
// コマンドデータをインポート（拡張可能な構造にするなら、引数付き読み込みにしても良い）
import dockerCommands from '../lib/words/docker_commands_improved.json';

// データ型の定義：コマンドとその説明
type WordEntry = {
  command: string;
  description: string;
};

export default function TypingGame({ wordList }: { wordList: WordEntry[] }) {
  // 現在の単語インデックス（何番目の問題か）
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // ユーザーがタイプした文字列
  const [typed, setTyped] = useState('');
  // どの文字まで正しくタイプされたか（インデックス）
  const [inputCharIndex, setInputCharIndex] = useState(0);
  // タイピング状態フラグ（初期表示でヒントを出す）
  const [isTyping, setIsTyping] = useState(false);

  // 現在の出題データ
  const currentEntry = dockerCommands[currentWordIndex] as WordEntry;
  const currentCommand = currentEntry.command;

  // キー入力イベントの処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const char = e.key;
      setIsTyping(true); // 初回キー入力時に「タイピング開始済み」にする

      if (char === currentCommand[inputCharIndex]) {
        setTyped(prev => prev + char);
        const nextIndex = inputCharIndex + 1;

        if (nextIndex === currentCommand.length) {
          // 単語をすべて打ち終えたら次へ
          setCurrentWordIndex((prev) => (prev + 1) % dockerCommands.length);
          setTyped('');
          setInputCharIndex(0);
          setIsTyping(false);
        } else {
          // 続けて次の文字へ
          setInputCharIndex(nextIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCommand, inputCharIndex]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔡 タイピング練習</h1>

      {/* 出題コマンド */}
      <p className="text-lg mb-1 text-gray-700">コマンド:</p>
      <h2 className="text-3xl font-bold text-blue-700 mb-4">{currentCommand}</h2>

      {/* コマンドの説明 */}
      <p className="text-sm text-gray-600 mb-6 whitespace-pre-wrap leading-relaxed">
        🛈 {currentEntry.description}
      </p>

      {/* ユーザーがタイプ中の文字 */}
      <div className="mb-4">
        <p className="text-gray-700">Typed:</p>
        <p className="text-xl font-mono text-green-700">{typed}</p>
      </div>

      {/* ヒント表示 */}
      {!isTyping && (
        <div className="text-sm text-gray-400 italic">
          タイピングを始めてください（キーボード入力で開始）
        </div>
      )}
    </div>
  );
}
