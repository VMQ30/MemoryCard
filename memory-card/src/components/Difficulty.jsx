import "../styles/Difficulty.css";

export function Difficulty({
  gameDifficulty,
  setGameDifficulty,
  modalIsOpen,
  setModalIsOpen,
}) {
  return (
    <>
      {modalIsOpen && (
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
                onChange={() => setGameDifficulty((diff) => (diff = "Easy"))}
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
                onChange={() => setGameDifficulty((diff) => (diff = "Medium"))}
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
                onChange={() => setGameDifficulty((diff) => (diff = "Hard"))}
              />
              <span className="choice-indicator">▶</span>Hard
            </label>
          </div>
          <button className="start-game" onClick={() => setModalIsOpen(false)}>
            Start Game
          </button>
        </div>
      )}
    </>
  );
}
