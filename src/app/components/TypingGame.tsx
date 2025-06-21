'use client';

import { useState, useEffect } from 'react';
// コマンドデータをインポート（拡張可能な構造にするなら、引数付き読み込みにしても良い）
import dockerCommands from '../lib/words/docker_commands_improved.json';

// データ型の定義：コマンドとその説明
type WordEntry = {
  command: string;
  description: string;
};

// ミス1回あたりの減点（0.5点）
const MISS_PENALTY = 0.5;

export default function TypingGame() {
  // シャッフルされたリスト
  const [shuffledList, setShuffledList] = useState<WordEntry[]>([]);
  // 現在の単語インデックス（何番目の問題か）
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // ユーザーがタイプした文字列
  const [typed, setTyped] = useState('');
  // どの文字まで正しくタイプされたか（インデックス）
  const [inputCharIndex, setInputCharIndex] = useState(0);
  // タイピング状態フラグ（初期表示でヒントを出す）
  const [isTyping, setIsTyping] = useState(false);

  // ゲーム機能の状態
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 秒
  const [isGameOver, setIsGameOver] = useState(false);

  // シャッフル（Fisher-Yatesアルゴリズム）
  const shuffleList = (list: WordEntry[]): WordEntry[] => {
    const array = [...list];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 初期化：ゲーム開始時にシャッフル
  useEffect(() => {
    const shuffled = shuffleList(dockerCommands);
    setShuffledList(shuffled);
  }, []);

  // 現在の出題データ
  const currentEntry = shuffledList[currentWordIndex];
  const currentCommand = currentEntry?.command ?? '';

  // タイマー処理：1秒ごとに残り時間を更新
  useEffect(() => {
    if (!isTyping || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTyping, isGameOver]);

  // キー入力イベントの処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver || !currentCommand) return;
      const char = e.key;
      setIsTyping(true); // 初回キー入力時に「タイピング開始済み」にする

      if (char === currentCommand[inputCharIndex]) {
        setTyped(prev => prev + char);
        const nextIndex = inputCharIndex + 1;

        if (nextIndex === currentCommand.length) {
          // 単語完了：文字数分スコア加算
          setScore((prev) => prev + currentCommand.length);
          setCurrentWordIndex((prev) => (prev + 1) % shuffledList.length);
          setTyped('');
          setInputCharIndex(0);
          setIsTyping(false);
        } else {
          // 続けて次の文字へ
          setInputCharIndex(nextIndex);
        }
      } else {
        // ミスタイプ：ミス + 減点
        setMistakes((prev) => prev + 1);
        setScore((prev) => Math.max(0, prev - MISS_PENALTY));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCommand, inputCharIndex, isGameOver, shuffledList]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">⏱ タイピングチャレンジ</h1>
      <p className="text-sm text-gray-500 mb-4">制限時間: <span className="font-bold">{timeLeft}s</span></p>

      {isGameOver ? (
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600 mb-2">⌛ Time&apos;s up!</p>
          <p className="text-xl mb-1">スコア（文字ベース）: {score.toFixed(1)} 点</p>
          <p className="text-md text-gray-600">ミス数: {mistakes}</p>
        </div>
      ) : (
        <>
          {/* 出題コマンド */}
          <p className="text-lg mb-1 text-gray-700">コマンド:</p>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">{currentCommand}</h2>

          {/* コマンドの説明 */}
          <p className="text-sm text-gray-600 mb-6 whitespace-pre-wrap leading-relaxed">
            🛈 {currentEntry?.description}
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

          {/* スコア表示 */}
          <div className="mt-4 text-sm text-gray-600">
            ✅ 正確な文字: {score.toFixed(1)}　❌ ミス: {mistakes}
          </div>
        </>
      )}
    </div>
  );
}
