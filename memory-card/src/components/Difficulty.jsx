import "../styles/Difficulty.css";

export function Difficulty({ gameDifficulty, setGameDifficulty }) {
  console.log("hi");
  return (
    <div className="difficulty-selector">
      <h3>SELECT DIFFICULTY</h3>

      <div className="difficulty-choices-wrapper">
        <label>
          <input
            type="radio"
            className="difficulty-choices"
            name="difficulty"
            value="easy"
            checked
          />
          <span className="choice-indicator">▶</span>Easy
        </label>

        <label>
          <input
            type="radio"
            className="difficulty-choices"
            name="difficulty"
            value="medium"
          />
          <span className="choice-indicator">▶</span>Medium
        </label>

        <label>
          <input
            type="radio"
            className="difficulty-choices"
            name="difficulty"
            value="hard"
          />
          <span className="choice-indicator">▶</span>Hard
        </label>
      </div>
      <button className="start-game">START GAME</button>
    </div>
  );
}
