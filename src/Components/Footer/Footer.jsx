import styles from "./style.module.scss";

export const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer__contact"]}>
        <p>
          Made by &nbsp;
          <a href="https://www.linkedin.com/in/margarita-shishkova/">
            Margarita Shishkova
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
