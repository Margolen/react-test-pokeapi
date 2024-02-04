import "./App.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => {
      console.log(response);
      setPokemonList(response.data.results);
    });
  }, [setPokemonList]);

  return (
    <div>
      <header>
        <a href="#" className="logo">
          logo
        </a>
        <h1 className="title">Pokemon</h1>
      </header>
      <main>
        {pokemonList.map((pokemon) => (
          <p key={pokemon.url}>{pokemon.name}</p>
        ))}
      </main>
    </div>
  );
}
