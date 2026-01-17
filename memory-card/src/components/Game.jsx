import "../styles/Game.css";
import loader from "../assets/loader.png";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import { GetPokemonData } from "./Pokemon";
import { useState } from "react";

export function Game({
  gameDifficulty,
  setModalIsOpen,
  highScore,
  setHighScore,
}) {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const { pokemonList, loading, setPokemonList } = GetPokemonData(
    gameDifficulty.numOfCards,
  );

  if (loading) {
    return <RenderLoading />;
  }

  if (gameOver) {
    return (
      <RenderLostGame
        setModalIsOpen={setModalIsOpen}
        score={score}
        setScore={setScore}
      />
    );
  }

  if (gameWin) {
    return <RenderWinGame setModalIsOpen={setModalIsOpen} />;
  }
  return (
    <main className="main-game">
      <div className="header">
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="pokemonOutline">
              <feMorphology
                in="SourceAlpha"
                result="DILATED"
                operator="dilate"
                radius="5"
              />

              <feFlood floodColor="#2a6eb7" result="BLUE" />

              <feComposite
                in="BLUE"
                in2="DILATED"
                operator="in"
                result="OUTLINE"
              />

              <feMerge>
                <feMergeNode in="OUTLINE" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <h1>PokeMatch</h1>
      </div>

      <div className="game-cards">
        <div className="cards-wrapper">
          <GetPokemonDetails
            score={score}
            setScore={setScore}
            highScore={highScore}
            setHighScore={setHighScore}
            setGameOver={setGameOver}
            gameDifficulty={gameDifficulty}
            pokemonList={pokemonList}
            setPokemonList={setPokemonList}
            setGameWin={setGameWin}
          />
        </div>
      </div>
      <div className="game-info">
        <h4>Score: {score}</h4>
        <h4 className="high-score">
          High Score: {highScore[gameDifficulty.difficulty]}
        </h4>
      </div>
    </main>
  );
}

function GetPokemonDetails({
  score,
  setScore,
  highScore,
  setHighScore,
  setGameOver,
  gameDifficulty,
  pokemonList,
  setPokemonList,
  setGameWin,
}) {
  const pokemonInfoCards = pokemonList.map((pokemon) => {
    return { ...pokemon, isPicked: false };
  });

  return (
    <>
      {pokemonInfoCards.map((pokemon, index) => (
        <RenderPokemonCard
          key={pokemon.id}
          index={index}
          pokemonInfoCards={pokemon}
          pokemonList={pokemonList}
          setPokemonList={setPokemonList}
          score={score}
          setScore={setScore}
          highScore={highScore}
          setHighScore={setHighScore}
          setGameOver={setGameOver}
          gameDifficulty={gameDifficulty}
          setGameWin={setGameWin}
        />
      ))}
    </>
  );
}

function RenderPokemonCard({
  index,
  pokemonInfoCards,
  pokemonList,
  setPokemonList,
  score,
  setScore,
  highScore,
  setHighScore,
  setGameOver,
  gameDifficulty,
  setGameWin,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], [-8, 8]);

  function handleHoverMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = (mouseX / rect.width) * 100;
    const yPct = (mouseY / rect.height) * 100;

    event.currentTarget.style.setProperty("--x", `${xPct}%`);
    event.currentTarget.style.setProperty("--y", `${yPct}%`);

    x.set(mouseX - rect.width / 2);
    y.set(mouseY - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="cards"
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleHoverMouse}
      onClick={() => {
        OnCardClick(
          pokemonList,
          setPokemonList,
          index,
          score,
          setScore,
          highScore,
          setHighScore,
          setGameOver,
          gameDifficulty,
          setGameWin,
        );
      }}
      style={{
        rotateX,
        rotateY,
        "--tilt-x": rotateX,
        "--tilt-y": rotateY,
      }}
    >
      <div className="gold-layer" />
      <div
        className="cards-info"
        data-type={pokemonInfoCards.types[0].type.name}
      >
        <div className="holo-lines" />
        <div className="holo-layer" />
        <div className="cards-header">
          <h4 className="name">{pokemonInfoCards.name}</h4>
          <h4>HP:{pokemonInfoCards.stats[0].base_stat}</h4>
        </div>

        <div className="card-body">
          <img src={pokemonInfoCards.sprites.front_default} />
          <div className="type">
            <h4>{pokemonInfoCards.types[0].type.name} Pokemon</h4>
            <h4>Height: {pokemonInfoCards.height}</h4>
            <h4>Weight: {pokemonInfoCards.weight}</h4>
          </div>
          <div className="description">
            <p>
              {pokemonInfoCards.speciesInfo.flavor_text_entries[4].flavor_text.replace(
                /[\f\n\r]/gm,
                " ",
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OnCardClick(
  pokemonList,
  setPokemonList,
  index,
  score,
  setScore,
  highScore,
  setHighScore,
  setGameOver,
  gameDifficulty,
  setGameWin,
) {
  const difficulty = gameDifficulty.difficulty;

  if (pokemonList[index].isPicked === true) {
    setGameOver(true);

    if (score > highScore[difficulty]) {
      setHighScore((prev) => ({
        ...prev,
        [difficulty]: score,
      }));
    }
    return;
  }

  const newScore = score + 1;
  setScore(newScore);
  console.log(pokemonList);

  if (newScore === pokemonList.length) {
    if (newScore > highScore[difficulty]) {
      setHighScore((prev) => ({
        ...prev,
        [difficulty]: newScore,
      }));
    }
    setGameWin(true);
    return;
  }

  let shuffled = [...pokemonList];
  shuffled[index] = { ...shuffled[index], isPicked: true };

  for (let i = 0, n = pokemonList.length; i < n; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  setPokemonList(shuffled);
}

function RenderLostGame({ setModalIsOpen, score, setScore }) {
  const restartGame = () => {
    setModalIsOpen(true);
    setScore(0);
  };
  return (
    <div className="game-over">
      <h3>Game Over</h3>
      <h4>Final Score is: {score}</h4>
      <h4>Restart Game?</h4>
      <button className="reset-game" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}

function RenderWinGame({ setModalIsOpen }) {
  const restartGame = () => {
    setModalIsOpen(true);
    setScore(0);
  };
  return (
    <div className="game-win">
      <h3>Game Won!</h3>
      <h4>Restart Game?</h4>
      <button className="reset-game" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}

function RenderLoading() {
  return (
    <div className="loading">
      <img className="loader" src={loader} />
    </div>
  );
}
