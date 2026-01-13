import { useEffect } from "react";

async function GetRawData(limit) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=20`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

function GetPokemonData(limit) {
  useEffect(() => {
    const fetchData = async () => {
      const rawData = await GetRawData(limit);
      const url = rawData.results[0].url;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);
}
