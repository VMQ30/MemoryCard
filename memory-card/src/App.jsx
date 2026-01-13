import "./App.css";
import { useState } from "react";
import { Difficulty } from "./components/Difficulty.jsx";

function App() {
  const [gameDifficulty, setGameDifficulty] = useState("Easy");
  return (
    <main>
      <Difficulty
        gameDifficulty={gameDifficulty}
        setGameDifficulty={setGameDifficulty}
      />
    </main>
  );
}

export default App;
