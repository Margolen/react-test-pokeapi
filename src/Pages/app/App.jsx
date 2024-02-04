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

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => {
      console.log(response);
      setPokemonList(response.data.results);
    });
  }, [setPokemonList]);

  return (
    <Router>
      <div styleName="container">
        <Header />

        {pokemonList.map((pokemon) => (
          <Card key={pokemon.url} url={pokemon.url} name={pokemon.name} />
        ))}

        <Footer />
      </div>
    </Router>
  );
}

export default CSSModules(App, style);
