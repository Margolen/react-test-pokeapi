import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PokemonCard = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (pokemonId) {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
        .then((response) => {
          console.log(response);
          setPokemon(response.data);
        });
    }
  }, [pokemonId]);

  return (
    <div>
      {pokemon !== null && (
        <div>
          <p>{pokemon.id}</p>
          <p>{pokemon.name}</p>
          <p>{pokemon.height}</p>
          <p>{pokemon.weight}</p>
        </div>
      )}
    </div>
  );
};
