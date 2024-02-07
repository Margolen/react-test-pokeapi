import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (pokemonOffset !== null) {
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
    }
  }, [setPokemonList, pokemonOffset, pokemonLimit]);

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
          containerClassName={styles["pagination"]}
          pageClassName={styles["page-item"]}
          previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
          nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
          forcePage={page}
        />
      </div>
      <main>
        <select
          className={styles["select__page"]}
          value={pokemonLimit}
          onChange={(e) => {
            setPokemonLimit(e.target.value);
          }}
        >
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <div className={styles["card__list"]}>
          {pokemonList.map((pokemon) => (
            <Card key={pokemon.url} url={pokemon.url} name={pokemon.name} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};