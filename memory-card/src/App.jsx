import "./App.css";
import { useState } from "react";
import { Difficulty } from "./components/Difficulty.jsx";
import { Game } from "./components/Game.jsx";

function App() {
  const gameInfo = [
    { difficulty: "Easy", numOfCards: 5 },
    { difficulty: "Medium", numOfCards: 10 },
    { difficulty: "Hard", numOfCards: 20 },
  ];
  const [gameDifficulty, setGameDifficulty] = useState(gameInfo[0]);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [highScore, setHighScore] = useState(0);
  return (
    <main>
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
