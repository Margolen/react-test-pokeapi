import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ name, url }) => {
  const [pokemon, setPokemon] = useState(null);
  const [isFront, setIsFront] = useState(true);

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
        <img styleName="card__img"
          src={
            isFront
              ? pokemon.sprites.front_default
              : pokemon.sprites.back_default
          }
          alt={name}
          onClick={() => setIsFront(!isFront)}
        />
      </>
    )
  );
};

export default CSSModules(Card, style);
