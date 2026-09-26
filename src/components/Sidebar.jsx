import { NavLink, useNavigate } from "react-router-dom";
import {
  House,
  ShoppingBag,
  Package,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("rosalina_auth");
    sessionStorage.removeItem("rosalina_auth");

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-rose">
          🌹
        </div>

        <div className="sidebar-brand-text">
          <strong>ROSALINA</strong>

          <span>
            FLORICULTURA
            <br />
            E PRESENTEARIA
          </span>
        </div>
      </div>

      <div className="sidebar-slogan">
        Onde sentimentos
        <br />
        ganham flores ♡
      </div>

      <nav className="sidebar-menu">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive
                ? "sidebar-link-active"
                : ""
            }`
          }
        >
          <House size={20} />

          <span>Início</span>
        </NavLink>

        <NavLink
          to="/vendas"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive
                ? "sidebar-link-active"
                : ""
            }`
          }
        >
          <ShoppingBag size={20} />

          <span>Vendas</span>
        </NavLink>

        <NavLink
          to="/produtos"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive
                ? "sidebar-link-active"
                : ""
            }`
          }
        >
          <Package size={20} />

          <span>Produtos</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-message">
          <span>Mais que flores,</span>

          <strong>
            conectamos pessoas
          </strong>

          <b>♡</b>
        </div>

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />

          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}