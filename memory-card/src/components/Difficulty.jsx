import "../styles/Difficulty.css";
import music from "../assets/music.mp3";
import useSound from "use-sound";

export function Difficulty({
  gameInfo,
  gameDifficulty,
  setGameDifficulty,
  modalIsOpen,
  setModalIsOpen,
}) {
  const [play, { stop }] = useSound(music, { volume: 0.3, loop: true });

  const startGame = () => {
    if (gameDifficulty) {
      setModalIsOpen(false);
      play();
    }
  };
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
                onChange={() => setGameDifficulty(gameInfo[0])}
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
                onChange={() => setGameDifficulty(gameInfo[1])}
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
                onChange={() => setGameDifficulty(gameInfo[2])}
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
