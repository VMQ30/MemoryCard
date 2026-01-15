import { useEffect, useState } from "react";

async function FetchData(limit) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=20`
    );
    let data = await response.json();
    data = data.results;

    const promises = data.map(async (data) => {
      const response = await fetch(data.url);
      const basicData = await response.json();

      const speciesResponse = await fetch(basicData.species.url);
      const speciesData = await speciesResponse.json();

      return {
        ...basicData,
        speciesInfo: speciesData,
      };
    });

    return await Promise.all(promises);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function GetPokemonData(limit) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    FetchData(limit).then((data) => {
      if (isMounted) {
        setPokemonList(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { pokemonList, loading };
}
