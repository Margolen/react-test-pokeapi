import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { PokemonCard } from "./Pages/PokemonCard/PokemonCard";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import styles from "./style.module.scss";

export function App() {
  return (
    <BrowserRouter>
      <div className={styles["wrapper"]}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page/:pageId" element={<Home />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonCard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
