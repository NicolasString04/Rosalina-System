import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import HomeClientes from "./pages/HomeClientes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Vendas from "./pages/Vendas";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

export default function App() {
  return (
    <Routes>
      {/* =========================
          SITE PÚBLICO
      ========================== */}

      <Route
        path="/"
        element={<HomeClientes />}
      />

      {/* =========================
          LOGIN ADMINISTRATIVO
      ========================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* =========================
          SISTEMA ADMINISTRATIVO
      ========================== */}

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/vendas"
          element={<Vendas />}
        />

        <Route
          path="/produtos"
          element={<Products />}
        />
      </Route>

      {/* =========================
          ROTA NÃO ENCONTRADA
      ========================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}