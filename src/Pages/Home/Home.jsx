import { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPokemons, updatePokemonsAsync } from "../../Features/pokemonSlice";
import CardSkeleton from "../../Components/CardSkeleton/CardSkeleton";

export const Home = () => {
  const { pageId } = useParams();

  const [pokemonLimit, setPokemonLimit] = useState(20);
  const [pokemonOffset, setPokemonOffset] = useState(null);
  const [page, setPage] = useState(-1);
  const [isSearchEnabled, setSearchEnabled] = useState(false);
  const [fullPokemonList, setFullPokemonList] = useState([]);

  const pokemons = useSelector((state) => state.pokemons.value);
  const pokemonCount = useSelector((state) => state.pokemons.count);

  const dispatch = useDispatch();

  const requestPokemons = (limit, offset) => {
    setSearchEnabled(false);
    dispatch(updatePokemonsAsync(offset, limit));
  };

  const handleOnPokemonSearchChanged = (value) => {
    setTimeout(() => {
      if (value !== "") {
        setSearchEnabled(true);
        const newPokemonList = fullPokemonList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(value.toLowerCase())
        );
        dispatch(setPokemons(newPokemonList));
      } else {
        requestPokemons(pokemonLimit, pokemonOffset);
      }
    }, 500);
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/", {
        params: {
          limit: -1,
          offset: 0,
        },
      })
      .then((response) => {
        setFullPokemonList(response.data.results);
      });
  }, []);

  useEffect(() => {
    if (pokemonOffset !== null) {
      requestPokemons(pokemonLimit, pokemonOffset);
    }
  }, [pokemonLimit, pokemonOffset]);

  useEffect(() => {
    setPokemonOffset(page * pokemonLimit);
  }, [setPokemonOffset, page, pokemonLimit]);

  useEffect(() => {
    if (pageId) {
      setPage(pageId - 1);
    } else {
      setPage(0);
    }
  }, [setPage, pageId]);

  const navigate = useNavigate();
  const isLoaded = () => {
    return pokemons && pokemons.payload;
  };

  const SuspendedCard = lazy(() => import("../../Components/Card/Card"));

  return (
    <>
      <div className={styles["pagination__container"]}>
        <ReactPaginate
          breakLabel="..."
          pageCount={
            pokemonLimit > 0 && pokemonCount.payload
              ? Math.ceil(pokemonCount.payload / pokemonLimit)
              : 1
          }
          pageRangeDisplayed={5}
          onPageChange={(event) => navigate("/page/" + (event.selected + 1))}
          activeClassName={styles["active"]}
          containerClassName={
            isSearchEnabled
              ? styles["pagination"] + " " + styles["deactivated"]
              : styles["pagination"]
          }
          pageClassName={styles["page-item"]}
          previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
          nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
          forcePage={page}
        />
        <div
          className={
            isSearchEnabled
              ? styles["select__page"] + " " + styles["deactivated"]
              : styles["select__page"]
          }
        >
          <p>Pokemons per page: </p>
          <select
            className={styles["select__list"]}
            value={pokemonLimit}
            onChange={(e) => {
              setPokemonLimit(e.target.value);
            }}
          >
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Pokemon name"
            onChange={(event) =>
              handleOnPokemonSearchChanged(event.target.value)
            }
          />
        </div>
      </div>
      <div className={styles["card__list"]}>
        {isLoaded() &&
          pokemons.payload.map((pokemon) => (
            <Suspense key={pokemon.url} fallback={<CardSkeleton />}>
              <SuspendedCard url={pokemon.url} name={pokemon.name} />
            </Suspense>
          ))}
      </div>
    </>
  );
};
