import "./App.css";

import { useState } from "react";
import { Difficulty } from "./components/Difficulty.jsx";
import { Game } from "./components/Game.jsx";
import { Music } from "./components/Music";

import music from "./assets/music.mp3";
import useSound from "use-sound";

function App() {
  const gameInfo = [
    { difficulty: "Easy", numOfCards: 5 },
    { difficulty: "Medium", numOfCards: 10 },
    { difficulty: "Hard", numOfCards: 20 },
  ];
  const [play, { stop }] = useSound(music, { volume: 0.3, loop: true });
  const [gameDifficulty, setGameDifficulty] = useState(gameInfo[0]);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [highScore, setHighScore] = useState({ Easy: 0, Medium: 0, Hard: 0 });

  return (
    <main>
      <Music play={play} stop={stop} />

      <Difficulty
        gameInfo={gameInfo}
        gameDifficulty={gameDifficulty}
        setGameDifficulty={setGameDifficulty}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />

      {!modalIsOpen && (
        <Game
          gameDifficulty={gameDifficulty}
          setModalIsOpen={setModalIsOpen}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      )}
    </main>
  );
}

export default App;
