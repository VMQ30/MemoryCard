import "../styles/Difficulty.css";

export function Difficulty({ gameDifficulty, setGameDifficulty }) {
  return (
    <div className="difficulty-selector">
      <h3>Select Difficulty</h3>

      <div className="difficulty-choices-wrapper">
        <label>
          <input
            type="radio"
            className="difficulty-choices"
            name="difficulty"
            value="easy"
            checked={gameDifficulty === "Easy"}
            onClick={() => setGameDifficulty((diff) => (diff = "Easy"))}
          />
          <span className="choice-indicator">▶</span>Easy
        </label>

        <label>
          <input
            type="radio"
            className="difficulty-choices"
            name="difficulty"
            value="medium"
            checked={gameDifficulty === "Medium"}
            onClick={() => setGameDifficulty((diff) => (diff = "Medium"))}
          />
          <span className="choice-indicator">▶</span>Medium
        </label>

        <label>
          <input
            type="radio"
            className="difficulty-choices"
            name="difficulty"
            value="hard"
            checked={gameDifficulty === "Hard"}
            onClick={() => setGameDifficulty((diff) => (diff = "Hard"))}
          />
          <span className="choice-indicator">▶</span>Hard
        </label>
      </div>
      <button className="start-game">Start Game</button>
    </div>
  );
}
