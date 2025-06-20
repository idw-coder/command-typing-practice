import TypingGame from './components/TypingGame';

import dockerCommands from './lib/words/docker_commands_improved.json';

export default function Page() {
  return (
    <main className="p-10 font-mono">
      <h1 className="text-2xl mb-4">Typing Game</h1>
      <TypingGame wordList={dockerCommands} />
    </main>
  );
}
