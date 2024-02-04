import CSSModules from "react-css-modules";
import style from "./style.module.scss";

export const Header = () => {
  return <div styleName="header">Header</div>;
};

export default CSSModules(Header, style);
