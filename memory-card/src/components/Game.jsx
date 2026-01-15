import "../styles/Game.css";

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
  const pokemonInfoRaw = GetPokemonData(limit);
  const pokemonInfoCards = pokemonInfoRaw.pokemonList.map((pokemon) => {
    return { ...pokemon, isPicked: false };
  });
  console.log(pokemonInfoCards);

  return (
    <>
      {pokemonInfoCards.map((pokemon) => (
        <RenderPokemonCard key={pokemon.id} pokemonInfoCards={pokemon} />
      ))}
    </>
  );
}

function RenderPokemonCard({ pokemonInfoCards }) {
  return (
    <div className="cards">
      <div className="cards-info">
        <div className="header">
          <h4 className="name">{pokemonInfoCards.name}</h4>
          <h4>HP: {pokemonInfoCards.stats[0].base_stat}</h4>
        </div>

        <div className="card-body">
          <img src={pokemonInfoCards.sprites.front_default} />
          <div className="type">
            <h4>{pokemonInfoCards.types[0].type.name} Pokemon</h4>

            <h4>
              Height: {pokemonInfoCards.height} Weight:{" "}
              {pokemonInfoCards.weight}
            </h4>
          </div>
          <div className="description">
            <p>
              {pokemonInfoCards.speciesInfo.flavor_text_entries[4].flavor_text.replace(
                /[\f\n\r]/gm,
                " "
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
