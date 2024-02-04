import CSSModules from "react-css-modules";
import style from "./style.module.scss";

const Card = ({ pokemon }) => {
  return <div styleName="card">{pokemon.name}</div>;
};

export default CSSModules(Card, style);
