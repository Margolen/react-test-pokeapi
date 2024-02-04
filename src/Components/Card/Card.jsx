import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ name, url }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setPokemon(response.data);
      console.log(response);
    });
  }, [setPokemon]);

  return (
    pokemon && (
      <>
        <div styleName="card">{name}</div>
        <div styleName="card">{pokemon.weight}</div>
        <img src={pokemon.sprites.front_default} alt={name} />
      </>
    )
  );
};

export default CSSModules(Card, style);
