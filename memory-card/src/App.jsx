import "./App.css";
import { useState } from "react";
import { Difficulty } from "./components/Difficulty.jsx";
import { Game } from "./components/Game.jsx";

function App() {
  const [gameDifficulty, setGameDifficulty] = useState("Easy");
  const [modalIsOpen, setModalIsOpen] = useState(true);
  return (
    <main>
      <Difficulty
        gameDifficulty={gameDifficulty}
        setGameDifficulty={setGameDifficulty}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />

      {!modalIsOpen && <Game />}
    </main>
  );
}

export default App;
