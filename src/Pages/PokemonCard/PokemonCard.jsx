import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./style.module.scss";

export const PokemonCard = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isFront, setIsFront] = useState(true);

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
    <>
      {pokemon !== null && (
        <div className={styles["card__container"]}>
          <div className={styles["card"]}>
            <img
              className={styles["card__img"]}
              src={
                isFront
                  ? pokemon.sprites.front_default
                  : pokemon.sprites.back_default
              }
              alt={name}
              onClick={() => setIsFront(!isFront)}
            />
            <div className={styles["card__content"]}>
              <h2>{pokemon.name}</h2>
              <div className={styles["card__traits"]}>
                <p className={styles["title"]}>
                  ID: <span>{pokemon.id}</span>
                </p>
                <p className={styles["title"]}>
                  Height: <span>{pokemon.height}</span>
                </p>
                <p className={styles["title"]}>
                  Weight: <span>{pokemon.weight}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
