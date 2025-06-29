'use client';

import { useState, useEffect } from 'react';
import { Container, GitBranch, Code, Wrench, Play, RotateCcw, Clock, Target, AlertCircle, CheckCircle, TrendingUp, Table } from 'lucide-react';
import * as wanakana from 'wanakana';

// JSONファイルをインポート
import dockerCommands from '../lib/words/docker_commands_improved.json';
import gitCommands from '../lib/words/git_commands.json';
import javascriptMethods from '../lib/words/javascript_methods.json';
import laravelCommands from '../lib/words/laravel_commands.json';
import phpFunctions from '../lib/words/php_functions.json';
import sqlCommands from '../lib/words/sql_commands.json';
import marketingTerms from '../lib/words/marketing_terms.json';

// データ型の定義
type WordEntry = {
  command: string;
  description: string;
};

// カテゴリの定義
const categories = {
  docker: { 
    name: 'Docker', 
    icon: Container,
    data: dockerCommands as WordEntry[], 
    color: 'bg-blue-100 border-blue-300 text-blue-800' 
  },
  git: { 
    name: 'Git', 
    icon: GitBranch,
    data: gitCommands as WordEntry[], 
    color: 'bg-orange-100 border-orange-300 text-orange-800' 
  },
  javascript: { 
    name: 'JavaScript', 
    icon: Code,
    data: javascriptMethods as WordEntry[], 
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800' 
  },
  laravel: { 
    name: 'Laravel', 
    icon: Wrench,
    data: laravelCommands as WordEntry[], 
    color: 'bg-red-100 border-red-300 text-red-800' 
  },
  php: { 
    name: 'PHP', 
    icon: Code,
    data: phpFunctions as WordEntry[], 
    color: 'bg-purple-100 border-purple-300 text-purple-800' 
  },
  sql: { 
    name: 'SQL', 
    icon: Table,
    data: sqlCommands as WordEntry[], 
    color: 'bg-green-100 border-green-300 text-green-800' 
  },
  marketing: {
    name: 'マーケティング',
    icon: TrendingUp,
    data: marketingTerms as WordEntry[],
    color: 'bg-pink-100 border-pink-300 text-pink-800'
  }
};

// ミス1回あたりの減点
const MISS_PENALTY = 0.5;

export default function TypingGame() {
  // 選択された分野
  const [selectedCategory, setSelectedCategory] = useState<string>('docker');
  // シャッフルされたリスト
  const [shuffledList, setShuffledList] = useState<WordEntry[]>([]);
  // 現在の単語インデックス
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // ユーザーがタイプした文字列
  const [typed, setTyped] = useState('');
  // どの文字まで正しくタイプされたか
  const [inputCharIndex, setInputCharIndex] = useState(0);
  // タイピング状態フラグ
  const [isTyping, setIsTyping] = useState(false);
  // ゲーム開始フラグ
  const [gameStarted, setGameStarted] = useState(false);

  // ゲーム機能の状態
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);

  const [inputStatus, setInputStatus] = useState<'normal' | 'success' | 'error'>('normal');

  const isJapaneseCategory = selectedCategory === 'marketing';

  // シャッフル関数（Fisher-Yatesアルゴリズム）
  const shuffleList = (list: WordEntry[]): WordEntry[] => {
    const array = [...list];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // カテゴリ変更時にリストを更新
  useEffect(() => {
    const selectedData = categories[selectedCategory as keyof typeof categories].data;
    const shuffled = shuffleList(selectedData);
    setShuffledList(shuffled);
    resetGame();
  }, [selectedCategory]);

  // ゲームリセット関数
  const resetGame = () => {
    setCurrentWordIndex(0);
    setTyped('');
    setInputCharIndex(0);
    setIsTyping(false);
    setGameStarted(false);
    setScore(0);
    setMistakes(0);
    setTimeLeft(60);
    setIsGameOver(false);
  };

  // ゲーム開始関数
  const startGame = () => {
    setGameStarted(true);
    setIsTyping(true);
  };

  // 現在の出題データ
  const currentEntry = shuffledList[currentWordIndex];
  const currentCommand = currentEntry?.command ?? '';
  const currentDescription = currentEntry?.description ?? '';

  // 表示用ローマ字（長音は必ず'-'、連続母音も'-'に置換）
  let displayRomajiCommand = isJapaneseCategory
    ? wanakana.toRomaji(currentCommand ?? '', { customKanaMapping: { 'ー': '-' } })
    : currentCommand ?? '';
  displayRomajiCommand = isJapaneseCategory
    ? displayRomajiCommand.replace(/([aeiou])\1+/g, '$1-')
    : displayRomajiCommand;

  // タイマー処理：1秒ごとに残り時間を更新
  useEffect(() => {
    if (!gameStarted || !isTyping || isGameOver) return;

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
  }, [gameStarted, isTyping, isGameOver]);

  // キー入力イベントの処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || isGameOver || !currentCommand) return;
      
      const char = e.key;
      
      // スペースキーでスクロールするのを防ぐ
      if (char === ' ') {
        e.preventDefault();
      }
      
      // 特殊キーは無視（ただしBackspaceは除く）
      if (char.length > 1 && char !== 'Backspace') return;
      
      if (char === 'Backspace') {
        // バックスペースで一文字削除
        if (typed.length > 0) {
          setTyped(prev => prev.slice(0, -1));
          setInputCharIndex(prev => Math.max(0, prev - 1));
        }
        return;
      }

      if (isJapaneseCategory) {
        // ローマ字で進捗判定（長音は-または母音どちらでもOK、大文字小文字区別なし）
        const nextTyped = (typed + char).toLowerCase();
        let isCorrect = true;
        for (let i = 0; i < nextTyped.length; i++) {
          if (displayRomajiCommand[i] === '-') {
            const prev = displayRomajiCommand[i - 1];
            if (!(nextTyped[i] === '-' || (prev && 'aeiou'.includes(prev) && nextTyped[i] === prev))) {
              isCorrect = false;
              break;
            }
          } else if (nextTyped[i]?.toLowerCase() !== displayRomajiCommand[i]?.toLowerCase()) {
            isCorrect = false;
            break;
          }
        }
        if (char.length === 1 && isCorrect) {
          setTyped(prev => prev + char);
          const nextIndex = inputCharIndex + 1;
          if (nextIndex === displayRomajiCommand.length) {
            setScore((prev) => prev + displayRomajiCommand.length);
            setCurrentWordIndex((prev) => (prev + 1) % shuffledList.length);
            setTyped('');
            setInputCharIndex(0);
            setInputStatus('success');
            setTimeout(() => setInputStatus('normal'), 300);
          } else {
            setInputCharIndex(nextIndex);
          }
        } else if (char.length === 1) {
          setMistakes((prev) => prev + 1);
          setScore((prev) => Math.max(0, prev - MISS_PENALTY));
          setInputStatus('error');
          setTimeout(() => setInputStatus('normal'), 300);
        }
        return;
      }

      // SQLカテゴリの場合は大文字小文字を区別しない
      const isCorrectChar = selectedCategory === 'sql' 
        ? char.toLowerCase() === currentCommand[inputCharIndex].toLowerCase()
        : char === currentCommand[inputCharIndex];

      if (isCorrectChar) {
        // 正しい文字
        setTyped(prev => prev + char);
        const nextIndex = inputCharIndex + 1;

        if (nextIndex === currentCommand.length) {
          // 単語完了：文字数分スコア加算
          setScore((prev) => prev + currentCommand.length);
          setCurrentWordIndex((prev) => (prev + 1) % shuffledList.length);
          setTyped('');
          setInputCharIndex(0);
          setInputStatus('success');
          setTimeout(() => setInputStatus('normal'), 300);
        } else {
          // 続けて次の文字へ
          setInputCharIndex(nextIndex);
        }
      } else {
        // ミスタイプ：ミス + 減点
        setMistakes((prev) => prev + 1);
        setScore((prev) => Math.max(0, prev - MISS_PENALTY));
        setInputStatus('error');
        setTimeout(() => setInputStatus('normal'), 300);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCommand, inputCharIndex, gameStarted, isGameOver, shuffledList, typed, selectedCategory, displayRomajiCommand, isJapaneseCategory]);

  const currentCategory = categories[selectedCategory as keyof typeof categories];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Code className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-center">プログラミング タイピングチャレンジ</h1>
      </div>
      
      {/* カテゴリ選択 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">分野を選択:</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm flex flex-col items-center gap-2
                  ${selectedCategory === key 
                    ? category.color + ' shadow-md scale-105' 
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <IconComponent className="w-6 h-6" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ゲーム状態表示 */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <div className={`px-3 py-2 rounded-full font-medium flex items-center gap-2 ${currentCategory.color}`}>
          <currentCategory.icon className="w-4 h-4" />
          <span>現在の分野: {currentCategory.name}</span>
        </div>
        <div className="text-gray-600 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>制限時間: <span className="font-bold text-lg">{timeLeft}s</span></span>
        </div>
      </div>

      {!gameStarted ? (
        <div className="text-center py-8">
          <p className="text-lg mb-4">準備完了！ゲームを開始しましょう。</p>
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            ゲーム開始
          </button>
        </div>
      ) : isGameOver ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-8 h-8 text-red-600" />
            <p className="text-3xl font-bold text-red-600">Time&apos;s up!</p>
          </div>
          <p className="text-2xl mb-2">最終スコア: <span className="font-bold text-blue-600">{score.toFixed(1)} 点</span></p>
          <p className="text-lg text-gray-600 mb-4">ミス数: {mistakes}</p>
          <p className="text-md text-gray-500 mb-6">
            正確率: {score > 0 ? Math.round((score / (score + mistakes * MISS_PENALTY)) * 100) : 0}%
          </p>
          <button
            onClick={resetGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            もう一度プレイ
          </button>
        </div>
      ) : (
        <>
          {/* タイピング入力表示エリア */}
          <div className="mb-6">
            {isJapaneseCategory ? (
              <>
                <div className="text-sm text-gray-500 mb-1 text-center">{currentCommand}</div>
                <div
                  className={`min-h-[80px] p-6 rounded-lg font-mono text-2xl shadow-inner transition-colors duration-200 border-2 text-center
                    ${inputStatus === 'success' ? 'bg-green-50 border-green-400' : inputStatus === 'error' ? 'bg-red-50 border-red-400' : 'bg-gray-50 border-blue-300'}`}
                  >
                    <span>
                      <span className="text-green-600 bg-green-100 px-1 rounded">{typed}</span>
                      <span className="text-gray-400">{displayRomajiCommand.slice(typed.length)}</span>
                    </span>
                  </div>
                {currentDescription && (
                  <div className="text-sm text-gray-600 mt-2 text-center italic">
                    {currentDescription}
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  className={`min-h-[80px] p-6 rounded-lg font-mono text-2xl shadow-inner transition-colors duration-200 border-2
                    ${inputStatus === 'success' ? 'bg-green-50 border-green-400' : inputStatus === 'error' ? 'bg-red-50 border-red-400' : 'bg-gray-50 border-blue-300'}`}
                >
                  <span>
                    <span className="text-green-600 bg-green-100 px-1 rounded">{typed}</span>
                    <span className="text-gray-400">{currentCommand.slice(typed.length)}</span>
                  </span>
                </div>
                {currentDescription && (
                  <div className="text-sm text-gray-600 mt-2 text-center italic">
                    {currentDescription}
                  </div>
                )}
              </>
            )}
          </div>

          {/* 進捗表示 */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>進捗: {inputCharIndex} / {currentCommand.length} 文字</span>
              <span className="font-bold">{Math.round((inputCharIndex / currentCommand.length) * 100)}% 完了</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(inputCharIndex / currentCommand.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* スコア表示 */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-green-600 text-sm font-medium">スコア</p>
              </div>
              <p className="text-green-800 text-xl font-bold">{score.toFixed(1)}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-red-600 text-sm font-medium">ミス</p>
              </div>
              <p className="text-red-800 text-xl font-bold">{mistakes}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4 text-blue-600" />
                <p className="text-blue-600 text-sm font-medium">問題数</p>
              </div>
              <p className="text-blue-800 text-xl font-bold">{currentWordIndex + 1}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}