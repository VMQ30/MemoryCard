import { GetPokemonData } from "./Pokemon";

export function Game({ gameDifficulty }) {
  return (
    <main className="main-game">
      <div className="header">
        <h1>PokeMatch</h1>
      </div>

      <div className="game-cards">
        <div className="cards-wrapper">
          <GetPokemonDetails limit={gameDifficulty.numOfCards} />
        </div>
      </div>
      <div className="game-info">
        <h4>Score: </h4>
        <h4>High Score: </h4>
      </div>
    </main>
  );
}

function GetPokemonDetails({ limit }) {
  const pokemons = GetPokemonData(limit);
  console.log(pokemons.pokemonList);
}
