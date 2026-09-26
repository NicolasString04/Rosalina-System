import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <section className="home-page">
      <div className="home-heading">
        <div>
          <span className="page-eyebrow">
            VISÃO GERAL
          </span>

          <h1>Painel de Vendas</h1>

          <p>
            Acompanhe as vendas e entregas
            da Rosalina.
          </p>
        </div>
      </div>

      <div className="home-placeholder">
        <span>🌹</span>

        <h2>Dashboard Rosalina</h2>

        <p>
          Agora vamos construir os indicadores,
          vendas e entregas aqui.
        </p>
      </div>
    </section>
  );
}