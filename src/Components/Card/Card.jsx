import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Card = ({ name, url }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then((response) => {
      setPokemon(response.data);
    });
  }, [setPokemon]);

  return (
    pokemon && (
      <div className={styles["card"]}>
        <img
          className={styles["card__img"]}
          src={pokemon.sprites.front_default}
          alt={name}
          onClick={() => navigate("/pokemon/" + pokemon.id)}
        />
        <div className={styles["card__info"]}>
          <h3 className={styles["card__title"]}>name: {name}</h3>
          <p className={styles["card__text"]}>weight: {pokemon.weight}</p>
        </div>
      </div>
    )
  );
};

export default Card;
