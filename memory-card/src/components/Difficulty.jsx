import "../styles/Difficulty.css";
import sfx from "../assets/click.mp3";
import useSound from "use-sound";

export function Difficulty({
  gameInfo,
  gameDifficulty,
  setGameDifficulty,
  modalIsOpen,
  setModalIsOpen,
}) {
  const startGame = () => {
    playClick();
    if (gameDifficulty) {
      setModalIsOpen(false);
    }
  };

  const [playClick] = useSound(sfx, { volume: 0.5 });

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
                checked={gameDifficulty.difficulty === "Easy"}
                onChange={() => {
                  playClick();
                  setGameDifficulty(gameInfo[0]);
                }}
              />
              <span className="choice-indicator">▶</span>Easy
            </label>

            <label>
              <input
                type="radio"
                className="difficulty-choices"
                name="difficulty"
                value="medium"
                checked={gameDifficulty.difficulty === "Medium"}
                onChange={() => {
                  playClick();
                  setGameDifficulty(gameInfo[1]);
                }}
              />
              <span className="choice-indicator">▶</span>Medium
            </label>

            <label>
              <input
                type="radio"
                className="difficulty-choices"
                name="difficulty"
                value="hard"
                checked={gameDifficulty.difficulty === "Hard"}
                onChange={() => {
                  playClick();
                  setGameDifficulty(gameInfo[2]);
                }}
              />
              <span className="choice-indicator">▶</span>Hard
            </label>
          </div>
          <button className="start-game" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}
    </>
  );
}
