import CSSModules from "react-css-modules";
import style from "./style.module.scss";

export const Footer = () => {
  return <div styleName="footer">Footer</div>;
};

export default CSSModules(Footer, style);
