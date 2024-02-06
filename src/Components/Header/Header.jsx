import { useState } from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";

export const Header = () => {
  const [isOpen, setOpen] = useState();

  return (
    <header styleName="header">
      <a href="#" styleName="header__logo">
        <img src="/assets/logo.png" alt="home" />
      </a>
      <nav styleName={`header__nav ${isOpen ? "active" : ""}`}>
        <ul styleName="header__nav-list">
          <li styleName="header__nav-item">Home</li>
          <li styleName="header__nav-item">About</li>
          <li styleName="header__nav-item">Contacts</li>
        </ul>
      </nav>
      <button styleName="header__menu-button" onClick={() => setOpen(!isOpen)}>
        <faBars />
      </button>
    </header>
  );
};

export default CSSModules(Header, style);
