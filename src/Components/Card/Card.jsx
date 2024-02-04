import CSSModules from "react-css-modules";
import style from "./style.module.scss";

export const Card = () => {
  return <div styleName="card">Card</div>;
};

export default CSSModules(Card, style);
