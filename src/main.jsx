import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./styles/global.css";
import "./styles/login.css";
import "./styles/app-layout.css";
import "./styles/products.css";
import "./styles/vendas.css";
import "./styles/home-clientes.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);