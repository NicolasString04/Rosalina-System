import {
  BarChart3,
  ClipboardList,
  ExternalLink,
  House,
  LogOut,
  Package,
  PieChart,
  Settings,
  Users,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(
      "rosalina_auth"
    );

    sessionStorage.removeItem(
      "rosalina_auth"
    );

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  }

  return (
    <aside className="sidebar">

      {/* LOGO */}

      <button
        className="sidebar-brand"
        onClick={() =>
          navigate("/home")
        }
      >
        <div className="sidebar-logo-circle">
          <img
            src="/assets/home/logo-rosalina.png"
            alt=""
          />
        </div>

        <div className="sidebar-brand-text">
          <strong>
            ROSALINA
          </strong>

          <span>
            GESTÃO
          </span>
        </div>
      </button>

      {/* MENU */}

      <nav className="sidebar-menu">

        <NavLink
          to="/home"
          className={({
            isActive,
          }) =>
            `sidebar-link ${
              isActive
                ? "sidebar-link-active"
                : ""
            }`
          }
        >
          <House size={21} />

          <span>
            Visão geral
          </span>
        </NavLink>

        <NavLink
          to="/vendas"
          className={({
            isActive,
          }) =>
            `sidebar-link ${
              isActive
                ? "sidebar-link-active"
                : ""
            }`
          }
        >
          <ClipboardList
            size={21}
          />

          <span>
            Pedidos
          </span>
        </NavLink>

        <NavLink
          to="/produtos"
          className={({
            isActive,
          }) =>
            `sidebar-link ${
              isActive
                ? "sidebar-link-active"
                : ""
            }`
          }
        >
          <Package size={21} />

          <span>
            Produtos
          </span>
        </NavLink>

        <button
          className="sidebar-link sidebar-future-link"
          type="button"
          title="Página de estoque será criada em seguida"
        >
          <BarChart3 size={21} />

          <span>
            Estoque
          </span>
        </button>

        <button
          className="sidebar-link sidebar-future-link"
          type="button"
          title="Página de clientes será criada em seguida"
        >
          <Users size={21} />

          <span>
            Clientes
          </span>
        </button>

        <button
          className="sidebar-link sidebar-future-link"
          type="button"
          title="Página de relatórios será criada em seguida"
        >
          <PieChart size={21} />

          <span>
            Relatórios
          </span>
        </button>

        <button
          className="sidebar-link sidebar-future-link"
          type="button"
          title="Página de configurações será criada em seguida"
        >
          <Settings size={21} />

          <span>
            Configurações
          </span>
        </button>

      </nav>

      {/* RODAPÉ */}

      <div className="sidebar-footer">

        <div className="sidebar-footer-divider" />

        <button
          className="sidebar-footer-action"
          onClick={() =>
            navigate("/")
          }
        >
          <ExternalLink size={20} />

          <span>
            Ver loja
          </span>
        </button>

        <button
          className="sidebar-footer-action"
          onClick={handleLogout}
        >
          <LogOut size={20} />

          <span>
            Sair
          </span>
        </button>

      </div>

    </aside>
  );
}