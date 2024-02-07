import { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Card from "../../Components/Card/Card";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

export const Home = () => {
  const { pageId } = useParams();

  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonLimit, setPokemonLimit] = useState(20);
  const [pokemonOffset, setPokemonOffset] = useState(null);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [page, setPage] = useState(-1);
  const [isSearchEnabled, setSearchEnabled] = useState(false);

  const requestPokemons = (limit, offset) => {
    setSearchEnabled(false);
    axios
      .get("https://pokeapi.co/api/v2/pokemon/", {
        params: {
          limit: limit,
          offset: offset,
        },
      })
      .then((response) => {
        setPokemonList(response.data.results);
        setPokemonCount(response.data.count);
      });
  };

  const handleOnPokemonSearchChanged = (value) => {
    setTimeout(() => {
      if (value !== "") {
        setSearchEnabled(true);
        axios
          .get("https://pokeapi.co/api/v2/pokemon/", {
            params: {
              limit: -1,
              offset: 0,
            },
          })
          .then((response) => {
            const newPokemonList = response.data.results.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(value.toLowerCase())
            );
            setPokemonList(newPokemonList);
            setPokemonCount(response.data.count);
          });
      } else {
        requestPokemons(pokemonLimit, pokemonOffset);
      }
    }, 500);
  };

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

  return (
    <div className={styles["wrapper"]}>
      <Header />
      <div className={styles["pagination__container"]}>
        <ReactPaginate
          breakLabel="..."
          pageCount={
            pokemonLimit > 0 ? Math.ceil(pokemonCount / pokemonLimit) : 1
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
      <main>
        <div className={styles["card__list"]}>
          {pokemonList.map((pokemon) => (
            <Suspense key={pokemon.url} fallback={<div>Loading...</div>}>
              <Card url={pokemon.url} name={pokemon.name} />
            </Suspense>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
