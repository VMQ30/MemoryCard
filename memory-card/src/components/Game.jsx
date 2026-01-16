import "../styles/Game.css";

import { GetPokemonData } from "./Pokemon";

export function Game({ gameDifficulty }) {
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
      <div
        className="cards-info"
        data-type={pokemonInfoCards.types[0].type.name}
      >
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
                " "
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
