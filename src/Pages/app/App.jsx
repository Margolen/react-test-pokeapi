import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Footer from "../../Components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./style.module.scss";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

export function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonLimit, setPokemonLimit] = useState(20);
  const [pokemonOffset, setPokemonOffset] = useState(0);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [page, setPage] = useState(0);

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

  useEffect(() => {
    setPokemonOffset(page * pokemonLimit);
  }, [setPokemonOffset, page, pokemonLimit]);

  return (
    <Router>
      <div className={styles["wrapper"]}>
        <Header />
        <div className={styles["pagination__container"]}>
          <ReactPaginate
            breakLabel="..."
            pageCount={
              pokemonLimit > 0 ? Math.ceil(pokemonCount / pokemonLimit) : 1
            }
            pageRangeDisplayed={5}
            onPageChange={(event) => setPage(event.selected)}
            activeClassName={styles["active"]}
            containerClassName={styles["pagination"]}
            pageClassName={styles["page-item"]}
            previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
            nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
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
    </Router>
  );
}

export default App;
