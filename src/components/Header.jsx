import {
  ChevronDown,
  Info,
  UserRound,
} from "lucide-react";

import { useLocation } from "react-router-dom";

const pageData = {
  "/home": {
    eyebrow: "Olá, gestora",
    title: "Visão geral",
    subtitle:
      "Acompanhe os pedidos e os cuidados de hoje.",
  },

  "/vendas": {
    eyebrow: "Rosalina Gestão",
    title: "Pedidos",
    subtitle:
      "Acompanhe e registre as vendas da floricultura.",
  },

  "/produtos": {
    eyebrow: "Rosalina Gestão",
    title: "Produtos",
    subtitle:
      "Gerencie produtos, preços e disponibilidade.",
  },
};

function formatCurrentDate() {
  const value =
    new Intl.DateTimeFormat(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ).format(new Date());

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

export default function Header() {
  const location =
    useLocation();

  const content =
    pageData[
      location.pathname
    ] || {
      eyebrow:
        "Rosalina Gestão",
      title:
        "Painel administrativo",
      subtitle:
        "Gerencie sua floricultura.",
    };

  const isHome =
    location.pathname ===
    "/home";

  return (
    <header className="app-header">

      <div className="app-header-copy">
        <span className="app-header-eyebrow">
          {content.eyebrow}
        </span>

        <h1>
          {content.title}
        </h1>

        <p>
          {content.subtitle}
        </p>
      </div>

      <div className="app-header-meta">

        <div className="app-header-user-row">
          <span className="app-header-date">
            {formatCurrentDate()}
          </span>

          <button
            className="app-header-profile"
            type="button"
          >
            <span className="app-header-avatar">
              <UserRound
                size={20}
              />
            </span>

            <ChevronDown
              size={16}
            />
          </button>
        </div>

        {isHome && (
          <span className="demo-data-badge">
            <Info size={15} />
            Dados de exemplo
          </span>
        )}

      </div>

    </header>
  );
}