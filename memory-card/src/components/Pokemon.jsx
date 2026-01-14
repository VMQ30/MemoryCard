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
      const newData = await response.json();
      return newData;
    });

    const finalData = await Promise.all(promises);
    return finalData;
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
