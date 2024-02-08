import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import store from "./store";
import { Provider } from "react-redux";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
