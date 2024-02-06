import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Footer from "../../Components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";

export function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonLimit, setPokemonLimit] = useState(20);
  const [pokemonOffset, setPokemonOffset] = useState(0);
  const [pokemonCount, setPokemonCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/", {
        params: {
          limit: pokemonLimit,
          offset: pokemonOffset,
        },
      })
      .then((response) => {
        setPokemonList(response.data.results);
        setPokemonCount(response.data.count);
      });
  }, [setPokemonList, pokemonOffset, pokemonLimit]);

  const clamp = (x, min, max) => {
    if (x < min) return min;
    if (x > max) return max;
    return x;
  };

  const pageCount = Math.floor(
    pokemonLimit > 0 ? pokemonCount / pokemonLimit : 1
  );

  const pages = Array.from({ length: Math.min(pageCount, 5) }, (_, index) => (
    <button>{index + 1}</button>
  ));

  return (
    <Router>
      <div styleName="wrapper">
        <Header />
        <main>
          <button
            onClick={() =>
              setPokemonOffset(
                clamp(pokemonOffset - pokemonLimit, 0, pokemonCount)
              )
            }
            disabled={pokemonOffset - pokemonLimit < 0}
          >
            prev
          </button>
          {pages}
          <span>...</span>
          <button>{pageCount}</button>
          <select
            value={pokemonLimit}
            onChange={(e) => {
              setPokemonLimit(e.target.value);
            }}
          >
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <button
            onClick={() =>
              setPokemonOffset(
                clamp(pokemonOffset + pokemonLimit, 0, pokemonCount)
              )
            }
            disabled={pokemonOffset + pokemonLimit >= pokemonCount}
          >
            next
          </button>
          <div styleName="card__list">
            {pokemonList.map((pokemon) => (
              <Card key={pokemon.url} url={pokemon.url} name={pokemon.name} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default CSSModules(App, style);
