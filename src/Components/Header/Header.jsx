import { useState } from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const [isOpen, setOpen] = useState();

  return (
    <header className={styles["header"]}>
      <a href="/" className={styles["header__logo"]}>
        <img src="/assets/logo.png" alt="home" />
      </a>
      <nav
        className={
          isOpen
            ? styles["header__nav"] + " " + styles["active"]
            : styles["header__nav"]
        }
      >
        <ul className={styles["header__nav-list"]}>
          <li className={styles["header__nav-item"]}>
            <a href="/">Home</a>
          </li>
          <li disabled={true} className={styles["header__nav-item"]}>
            <a href="https://pokeapi.co/">Poke API</a>
          </li>
        </ul>
      </nav>
      <button
        className={styles["header__menu-button"]}
        onClick={() => setOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
};

export default Header;
