import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:pageId" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
