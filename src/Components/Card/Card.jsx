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
      <div styleName="card">
        <img
          styleName="card__img"
          src={
            isFront
              ? pokemon.sprites.front_default
              : pokemon.sprites.back_default
          }
          alt={name}
          onClick={() => setIsFront(!isFront)}
        />
        <div className="card__info">
          <h3 styleName="card__title">name: {name}</h3>
          <p styleName="card__text">weight: {pokemon.weight}</p>
        </div>
      </div>
    )
  );
};

export default CSSModules(Card, style);
