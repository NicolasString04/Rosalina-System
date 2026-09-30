import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Flower2,
  MapPin,
  Package,
  Plus,
  ReceiptText,
  ShoppingCart,
  Truck,
} from "lucide-react";

/* =========================================================
   DADOS DE EXEMPLO
========================================================= */

const orders = [
  {
    id: "#1048",
    client: "Mariana Costa",
    time: "14:30",
    value: 189.9,
    status: "Recebido",
    statusClass: "received",
  },
  {
    id: "#1047",
    client: "Lucas Almeida",
    time: "13:45",
    value: 129.9,
    status: "Em preparo",
    statusClass: "preparing",
  },
  {
    id: "#1046",
    client: "Ana Souza",
    time: "12:20",
    value: 89.9,
    status: "Pronto",
    statusClass: "ready",
  },
  {
    id: "#1045",
    client: "Pedro Lima",
    time: "11:10",
    value: 219.9,
    status: "Em entrega",
    statusClass: "delivery",
  },
];

const deliveries = [
  {
    time: "15:00",
    type: "Entrega",
    client: "Mariana Costa",
    location: "Centro",
    typeClass: "delivery",
  },
  {
    time: "16:30",
    type: "Retirada",
    client: "Ana Souza",
    location: "",
    typeClass: "pickup",
  },
  {
    time: "17:00",
    type: "Entrega",
    client: "Pedro Lima",
    location: "Vila Nova",
    typeClass: "delivery",
  },
];

const lowStock = [
  {
    name: "Rosa vermelha",
    current: 8,
    minimum: 10,
    icon: "🌹",
  },
  {
    name: "Lírio rosa",
    current: 3,
    minimum: 5,
    icon: "🌸",
  },
  {
    name: "Papel kraft",
    current: 5,
    minimum: 10,
    icon: "📜",
  },
];

const bestSellers = [
  {
    position: 1,
    name: "Buquê Van Gogh",
    sales: 12,
    image: "/assets/home/buque-van-gogh.png",
  },
  {
    position: 2,
    name: "Combo Doce Carinho",
    sales: 8,
    image: "/assets/home/combo-doce-carinho.png",
  },
  {
    position: 3,
    name: "Arranjo Encanto",
    sales: 6,
    image: "/assets/home/arranjo-encanto.png",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value) || 0);
}

function monthKeyFromDate(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  return `${year}-${month}`;
}

function monthLabel(monthKey) {
  const [year, month] = monthKey
    .split("-")
    .map(Number);

  const date = new Date(
    year,
    month - 1,
    1
  );

  const formatted =
    new Intl.DateTimeFormat(
      "pt-BR",
      {
        month: "long",
        year: "numeric",
      }
    ).format(date);

  return (
    formatted.charAt(0).toUpperCase() +
    formatted.slice(1)
  );
}

/*
  Gera dados fictícios de forma determinística.

  Depois, quando ligarmos Firestore,
  basta trocar essa função pelos dados reais.
*/
function buildDemoMonthData(monthKey) {
  const [year, month] = monthKey
    .split("-")
    .map(Number);

  const totalDays = new Date(
    year,
    month,
    0
  ).getDate();

  const today = new Date();

  const currentMonthKey =
    monthKeyFromDate(today);

  return Array.from(
    { length: totalDays },
    (_, index) => {
      const day = index + 1;

      const isFuture =
        monthKey === currentMonthKey &&
        day > today.getDate();

      if (isFuture) {
        return {
          day,
          sales: 0,
          total: 0,
        };
      }

      const zeroSales =
        (day + month) % 9 === 0 ||
        day % 13 === 0;

      if (zeroSales) {
        return {
          day,
          sales: 0,
          total: 0,
        };
      }

      const sales =
        ((day * 3 + month * 2) % 7) +
        1;

      const averageTicket =
        58 +
        ((day * 17 + month * 11) %
          93);

      const total =
        sales * averageTicket +
        ((day * 29) % 45);

      return {
        day,
        sales,
        total,
      };
    }
  );
}

function buildMonthOptions() {
  const today = new Date();

  return Array.from(
    { length: 12 },
    (_, index) => {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - index,
        1
      );

      const value =
        monthKeyFromDate(date);

      return {
        value,
        label: monthLabel(value),
      };
    }
  );
}

/* =========================================================
   COMPONENTE
========================================================= */

export default function Home() {
  const navigate = useNavigate();

  const currentMonth =
    monthKeyFromDate(new Date());

  const [selectedMonth, setSelectedMonth] =
    useState(currentMonth);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const monthOptions =
    useMemo(
      () => buildMonthOptions(),
      []
    );

  const monthData =
    useMemo(
      () =>
        buildDemoMonthData(
          selectedMonth
        ),
      [selectedMonth]
    );

  const currentMonthData =
    useMemo(
      () =>
        buildDemoMonthData(
          currentMonth
        ),
      [currentMonth]
    );

  const todayNumber =
    new Date().getDate();

  const todaySales =
    currentMonthData.find(
      (item) =>
        item.day === todayNumber
    ) || {
      sales: 0,
      total: 0,
    };

  const monthlyTotal =
    monthData.reduce(
      (total, item) =>
        total + item.total,
      0
    );

  const monthlySales =
    monthData.reduce(
      (total, item) =>
        total + item.sales,
      0
    );

  const maxDailyTotal = Math.max(
    ...monthData.map(
      (item) => item.total
    ),
    1
  );

  const [selectedYear, selectedMonthNumber] =
    selectedMonth
      .split("-")
      .map(Number);

  function formattedDay(day) {
    return `${String(day).padStart(
      2,
      "0"
    )}/${String(
      selectedMonthNumber
    ).padStart(2, "0")}/${selectedYear}`;
  }

  return (
    <section className="dashboard-page">

      {/* ===================================================
          AÇÕES PRINCIPAIS
      ==================================================== */}

      <div className="dashboard-actions-row">
        <div className="dashboard-main-actions">
          <button
            className="dashboard-primary-action"
            onClick={() =>
              navigate("/vendas")
            }
          >
            <Plus size={21} />
            Registrar venda
          </button>

          <button
            className="dashboard-secondary-action"
            onClick={() =>
              navigate("/produtos")
            }
          >
            <Package size={20} />
            Cadastrar produto
          </button>
        </div>

        <button className="dashboard-today-button">
          <CalendarDays size={19} />

          <span>Hoje</span>

          <ChevronDown size={17} />
        </button>
      </div>

      {/* ===================================================
          KPI CARDS
      ==================================================== */}

      <div className="dashboard-kpis">

        <article className="dashboard-kpi-card">
          <div className="dashboard-kpi-icon">
            <ShoppingCart />
          </div>

          <div>
            <span className="dashboard-kpi-title">
              Vendas de hoje
            </span>

            <strong className="dashboard-kpi-value">
              {formatCurrency(
                todaySales.total
              )}
            </strong>

            <small>
              {todaySales.sales} vendas registradas
            </small>
          </div>
        </article>

        <article className="dashboard-kpi-card">
          <div className="dashboard-kpi-icon">
            <ReceiptText />
          </div>

          <div>
            <span className="dashboard-kpi-title">
              Pedidos pendentes
            </span>

            <strong className="dashboard-kpi-value">
              05
            </strong>

            <small>
              Aguardando preparo
            </small>
          </div>
        </article>

        <article className="dashboard-kpi-card">
          <div className="dashboard-kpi-icon">
            <Truck />
          </div>

          <div>
            <span className="dashboard-kpi-title">
              Entregas de hoje
            </span>

            <strong className="dashboard-kpi-value">
              03
            </strong>

            <small>
              1 saiu para entrega
            </small>
          </div>
        </article>

        <article className="dashboard-kpi-card">
          <div className="dashboard-kpi-icon">
            <Package />
          </div>

          <div>
            <span className="dashboard-kpi-title">
              Estoque em atenção
            </span>

            <strong className="dashboard-kpi-value">
              04
            </strong>

            <small>
              Itens abaixo do mínimo
            </small>
          </div>
        </article>

      </div>

      {/* ===================================================
          PEDIDOS + ENTREGAS
      ==================================================== */}

      <div className="dashboard-middle-grid">

        <section className="dashboard-panel dashboard-orders">
          <div className="dashboard-panel-header">
            <h2>
              Pedidos para acompanhar
            </h2>

            <button
              onClick={() =>
                navigate("/vendas")
              }
            >
              Ver todos
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="dashboard-table-wrapper">
            <table className="dashboard-orders-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Horário</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>
                        {order.id}
                      </strong>
                    </td>

                    <td>
                      {order.client}
                    </td>

                    <td>
                      {order.time}
                    </td>

                    <td>
                      {formatCurrency(
                        order.value
                      )}
                    </td>

                    <td>
                      <span
                        className={`order-status order-status-${order.statusClass}`}
                      >
                        <i />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-panel dashboard-deliveries">
          <div className="dashboard-panel-header">
            <h2>
              Entregas e retiradas
            </h2>
          </div>

          <div className="delivery-list">
            {deliveries.map(
              (delivery) => (
                <button
                  className="delivery-item"
                  key={`${delivery.time}-${delivery.client}`}
                  onClick={() =>
                    navigate("/vendas")
                  }
                >
                  <div className="delivery-time">
                    {delivery.time}
                  </div>

                  <div className="delivery-kind">
                    <span
                      className={`delivery-dot delivery-dot-${delivery.typeClass}`}
                    />

                    {delivery.type}
                  </div>

                  <div className="delivery-person">
                    <strong>
                      {delivery.client}
                    </strong>

                    {delivery.location && (
                      <small>
                        <MapPin size={13} />
                        {delivery.location}
                      </small>
                    )}
                  </div>

                  <ArrowRight
                    size={16}
                  />
                </button>
              )
            )}
          </div>
        </section>

      </div>

      {/* ===================================================
          LINHA INFERIOR
      ==================================================== */}

      <div className="dashboard-bottom-grid">

        {/* VENDAS DO MÊS */}

        <section className="dashboard-panel dashboard-sales-chart">
          <div className="dashboard-panel-header dashboard-month-header">
            <div>
              <h2>
                Vendas do mês
              </h2>

              <span>
                {monthLabel(
                  selectedMonth
                )}
              </span>
            </div>

            <div className="dashboard-month-select">
              <CalendarDays size={16} />

              <select
                value={selectedMonth}
                onChange={(event) =>
                  setSelectedMonth(
                    event.target.value
                  )
                }
              >
                {monthOptions.map(
                  (option) => (
                    <option
                      key={
                        option.value
                      }
                      value={
                        option.value
                      }
                    >
                      {
                        option.label
                      }
                    </option>
                  )
                )}
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          <div className="month-summary">
            <div>
              <strong>
                {formatCurrency(
                  monthlyTotal
                )}
              </strong>

              <span>
                Total vendido
              </span>
            </div>

            <div>
              <strong>
                {monthlySales}
              </strong>

              <span>
                Vendas no mês
              </span>
            </div>
          </div>

          <div className="month-chart">
            <div className="month-chart-bars">
              {monthData.map(
                (item) => {
                  const percentage =
                    item.total > 0
                      ? Math.max(
                          8,
                          (item.total /
                            maxDailyTotal) *
                            100
                        )
                      : 2;

                  return (
                    <div
                      className="month-chart-column"
                      key={
                        item.day
                      }
                      title={`${formattedDay(
                        item.day
                      )} — ${formatCurrency(
                        item.total
                      )}`}
                    >
                      <div className="month-bar-track">
                        <span
                          className={
                            item.total === 0
                              ? "month-bar month-bar-empty"
                              : "month-bar"
                          }
                          style={{
                            height: `${percentage}%`,
                          }}
                        />
                      </div>

                      <small>
                        {item.day === 1 ||
                        item.day % 5 ===
                          0
                          ? item.day
                          : ""}
                      </small>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <button
            className="month-history-button"
            onClick={() =>
              setHistoryOpen(
                (current) =>
                  !current
              )
            }
          >
            <Clock3 size={16} />

            {historyOpen
              ? "Ocultar histórico"
              : "Ver histórico do mês"}

            <ArrowRight
              size={16}
              className={
                historyOpen
                  ? "history-arrow-open"
                  : ""
              }
            />
          </button>
        </section>

        {/* ESTOQUE */}

        <section className="dashboard-panel dashboard-stock">
          <div className="dashboard-panel-header">
            <h2>
              Estoque em atenção
            </h2>

            <button
              onClick={() =>
                navigate("/produtos")
              }
            >
              Ver estoque
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="stock-list">
            {lowStock.map(
              (item) => (
                <div
                  className="stock-item"
                  key={item.name}
                >
                  <div className="stock-thumb">
                    <span>
                      {item.icon}
                    </span>
                  </div>

                  <div className="stock-info">
                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.current} un.
                    </span>
                  </div>

                  <div className="stock-minimum">
                    <i />

                    Mínimo:{" "}
                    {item.minimum} un.
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* MAIS VENDIDOS */}

        <section className="dashboard-panel dashboard-best-sellers">
          <div className="dashboard-panel-header">
            <h2>
              Mais vendidos
            </h2>
          </div>

          <div className="best-sellers-list">
            {bestSellers.map(
              (product) => (
                <div
                  className="best-seller-item"
                  key={
                    product.position
                  }
                >
                  <span
                    className={`best-position best-position-${product.position}`}
                  >
                    {
                      product.position
                    }
                  </span>

                  <div className="best-product-image">
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                    />
                  </div>

                  <div>
                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.sales} vendas
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

      </div>

      {/* ===================================================
          HISTÓRICO DO MÊS
      ==================================================== */}

      {historyOpen && (
        <section className="dashboard-panel monthly-history-panel">
          <div className="dashboard-panel-header monthly-history-title">
            <div>
              <span className="monthly-history-eyebrow">
                HISTÓRICO DE VENDAS
              </span>

              <h2>
                {monthLabel(
                  selectedMonth
                )}
              </h2>
            </div>

            <div className="monthly-history-totals">
              <div>
                <span>
                  Total do mês
                </span>

                <strong>
                  {formatCurrency(
                    monthlyTotal
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Vendas
                </span>

                <strong>
                  {monthlySales}
                </strong>
              </div>
            </div>
          </div>

          <div className="monthly-history-table-wrapper">
            <table className="monthly-history-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Quantidade de vendas</th>
                  <th>Total vendido</th>
                  <th>Situação</th>
                </tr>
              </thead>

              <tbody>
                {monthData.map(
                  (item) => (
                    <tr key={item.day}>
                      <td>
                        <strong>
                          {formattedDay(
                            item.day
                          )}
                        </strong>
                      </td>

                      <td>
                        {item.sales ===
                        1
                          ? "1 venda"
                          : `${item.sales} vendas`}
                      </td>

                      <td>
                        {formatCurrency(
                          item.total
                        )}
                      </td>

                      <td>
                        {item.sales >
                        0 ? (
                          <span className="history-has-sales">
                            <i />
                            Com vendas
                          </span>
                        ) : (
                          <span className="history-no-sales">
                            Sem vendas
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </section>
  );
}