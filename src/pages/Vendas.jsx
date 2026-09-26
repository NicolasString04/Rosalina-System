import { useMemo, useState, useEffect } from "react";
import {
  CalendarDays,
  CircleCheck,
  Edit3,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Buquê Van Gogh",
    category: "Buquês",
    price: 56.9,
    status: "active",
  },
  {
    id: 2,
    name: "Combo Cone Singular",
    category: "Combos",
    price: 29.9,
    status: "active",
  },
  {
    id: 3,
    name: "Combo Doce Carinho",
    category: "Combos",
    price: 44.9,
    status: "active",
  },
];

function today() {
  return new Date().toISOString().split("T")[0];
}

const emptyForm = {
  productId: "",
  quantity: 1,
  freight: "",
  saleDate: today(),
  deliveryDate: today(),
  status: "pending",
};

export default function Vendas() {
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem("rosalina_sales");

    return saved ? JSON.parse(saved) : [];
  });

  const [products] = useState(() => {
    const saved = localStorage.getItem("rosalina_products");

    return saved
      ? JSON.parse(saved)
      : initialProducts;
  });

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem(
      "rosalina_sales",
      JSON.stringify(sales)
    );
  }, [sales]);

  const activeProducts = products.filter(
    (product) => product.status !== "inactive"
  );

  const selectedProduct = products.find(
    (product) =>
      String(product.id) === String(form.productId)
  );

  const quantity = Number(form.quantity) || 0;

  const freight =
    Number(
      String(form.freight)
        .replace(",", ".")
    ) || 0;

  const productSubtotal =
    (selectedProduct?.price || 0) *
    quantity;

  const total =
    productSubtotal + freight;

  const salesToday = sales.filter(
    (sale) => sale.saleDate === today()
  );

  const todayRevenue = salesToday.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const pendingDeliveries = sales.filter(
    (sale) =>
      sale.deliveryDate >= today() &&
      sale.status !== "delivered"
  ).length;

  const filteredSales = useMemo(() => {
    return sales.filter((sale) =>
      sale.productName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [sales, search]);

  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  function formatDate(date) {
    if (!date) return "-";

    return new Date(
      `${date}T12:00:00`
    ).toLocaleDateString("pt-BR");
  }

  function openCreateModal() {
    setEditingSale(null);

    setForm({
      ...emptyForm,
      saleDate: today(),
      deliveryDate: today(),
    });

    setModalOpen(true);
  }

  function openEditModal(sale) {
    setEditingSale(sale);

    setForm({
      productId: String(sale.productId),
      quantity: sale.quantity,
      freight: String(sale.freight)
        .replace(".", ","),
      saleDate: sale.saleDate,
      deliveryDate: sale.deliveryDate,
      status: sale.status,
    });

    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingSale(null);
    setForm(emptyForm);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedProduct) {
      alert("Selecione um produto.");
      return;
    }

    if (quantity <= 0) {
      alert("Informe uma quantidade válida.");
      return;
    }

    const saleData = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      unitPrice: selectedProduct.price,
      quantity,
      freight,
      subtotal: productSubtotal,
      total,
      saleDate: form.saleDate,
      deliveryDate: form.deliveryDate,
      status: form.status,
    };

    if (editingSale) {
      setSales((current) =>
        current.map((sale) =>
          sale.id === editingSale.id
            ? {
                ...sale,
                ...saleData,
              }
            : sale
        )
      );
    } else {
      setSales((current) => [
        {
          id: Date.now(),
          createdAt: new Date().toISOString(),
          ...saleData,
        },
        ...current,
      ]);
    }

    closeModal();
  }

  function handleDelete(sale) {
    const confirmed = window.confirm(
      `Deseja realmente excluir a venda de "${sale.productName}"?`
    );

    if (!confirmed) return;

    setSales((current) =>
      current.filter(
        (item) => item.id !== sale.id
      )
    );
  }

  return (
    <section className="sales-page">
      <div className="sales-heading">
        <div>
          <span className="page-eyebrow">
            CONTROLE
          </span>

          <h1>Vendas</h1>

          <p>
            Registre e acompanhe as vendas e
            entregas da Rosalina.
          </p>
        </div>

        <button
          className="sales-create-button"
          onClick={openCreateModal}
        >
          <Plus size={19} />

          Adicionar venda
        </button>
      </div>

      <div className="sales-summary">
        <div className="sales-summary-card">
          <div className="sales-summary-icon">
            <ShoppingBag size={22} />
          </div>

          <div>
            <span>Vendas hoje</span>

            <strong>
              {salesToday.length}
            </strong>
          </div>
        </div>

        <div className="sales-summary-card">
          <div className="sales-summary-icon">
            <CircleCheck size={22} />
          </div>

          <div>
            <span>Valor vendido hoje</span>

            <strong>
              {formatCurrency(todayRevenue)}
            </strong>
          </div>
        </div>

        <div className="sales-summary-card">
          <div className="sales-summary-icon">
            <Truck size={22} />
          </div>

          <div>
            <span>Entregas pendentes</span>

            <strong>
              {pendingDeliveries}
            </strong>
          </div>
        </div>
      </div>

      <div className="sales-panel">
        <div className="sales-toolbar">
          <div className="sales-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Buscar por produto..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>
        </div>

        <div className="sales-table-header">
          <span>Produto</span>
          <span>Qtd.</span>
          <span>Venda</span>
          <span>Entrega</span>
          <span>Frete</span>
          <span>Total</span>
          <span>Status</span>
          <span>Ações</span>
        </div>

        <div className="sales-list">
          {filteredSales.length === 0 ? (
            <div className="sales-empty">
              <ShoppingBag size={36} />

              <strong>
                Nenhuma venda registrada
              </strong>

              <span>
                Clique em “Adicionar venda” para
                registrar a primeira.
              </span>
            </div>
          ) : (
            filteredSales.map((sale) => (
              <div
                className="sale-row"
                key={sale.id}
              >
                <div className="sale-product">
                  <div className="sale-product-icon">
                    🌹
                  </div>

                  <div>
                    <strong>
                      {sale.productName}
                    </strong>

                    <span>
                      {formatCurrency(
                        sale.unitPrice
                      )}{" "}
                      un.
                    </span>
                  </div>
                </div>

                <span>
                  {sale.quantity}
                </span>

                <span>
                  {formatDate(
                    sale.saleDate
                  )}
                </span>

                <span>
                  {formatDate(
                    sale.deliveryDate
                  )}
                </span>

                <span>
                  {formatCurrency(
                    sale.freight
                  )}
                </span>

                <strong className="sale-total">
                  {formatCurrency(
                    sale.total
                  )}
                </strong>

                <div>
                  <span
                    className={`sale-status sale-status-${sale.status}`}
                  >
                    {sale.status ===
                    "delivered"
                      ? "Entregue"
                      : sale.status ===
                        "scheduled"
                      ? "Agendada"
                      : "Pendente"}
                  </span>
                </div>

                <div className="sale-actions">
                  <button
                    className="action-edit"
                    onClick={() =>
                      openEditModal(sale)
                    }
                  >
                    <Edit3 size={15} />
                  </button>

                  <button
                    className="action-delete"
                    onClick={() =>
                      handleDelete(sale)
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {modalOpen && (
        <div
          className="sale-modal-overlay"
          onMouseDown={closeModal}
        >
          <div
            className="sale-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="sale-modal-header">
              <div>
                <span>
                  {editingSale
                    ? "EDITAR VENDA"
                    : "NOVA VENDA"}
                </span>

                <h2>
                  {editingSale
                    ? "Editar venda"
                    : "Registrar venda"}
                </h2>
              </div>

              <button
                onClick={closeModal}
              >
                <X size={21} />
              </button>
            </div>

            <form
              className="sale-form"
              onSubmit={handleSubmit}
            >
              <div className="sale-form-group">
                <label>Produto *</label>

                <select
                  name="productId"
                  value={form.productId}
                  onChange={handleChange}
                >
                  <option value="">
                    Selecione um produto
                  </option>

                  {activeProducts.map(
                    (product) => (
                      <option
                        key={product.id}
                        value={product.id}
                      >
                        {product.name} —{" "}
                        {formatCurrency(
                          product.price
                        )}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="sale-form-row">
                <div className="sale-form-group">
                  <label>
                    Quantidade *
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="sale-form-group">
                  <label>
                    Frete (R$)
                  </label>

                  <input
                    type="text"
                    name="freight"
                    placeholder="0,00"
                    value={form.freight}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sale-form-row">
                <div className="sale-form-group">
                  <label>
                    Data da venda
                  </label>

                  <div className="sale-date-input">
                    <CalendarDays
                      size={17}
                    />

                    <input
                      type="date"
                      name="saleDate"
                      value={form.saleDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sale-form-group">
                  <label>
                    Data da entrega
                  </label>

                  <div className="sale-date-input">
                    <Truck size={17} />

                    <input
                      type="date"
                      name="deliveryDate"
                      value={
                        form.deliveryDate
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="sale-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="pending">
                    Pendente
                  </option>

                  <option value="scheduled">
                    Agendada
                  </option>

                  <option value="delivered">
                    Entregue
                  </option>
                </select>
              </div>

              <div className="sale-calculation">
                <div>
                  <span>Produto</span>

                  <strong>
                    {selectedProduct
                      ? selectedProduct.name
                      : "Nenhum selecionado"}
                  </strong>
                </div>

                <div>
                  <span>Subtotal</span>

                  <strong>
                    {formatCurrency(
                      productSubtotal
                    )}
                  </strong>
                </div>

                <div>
                  <span>Frete</span>

                  <strong>
                    {formatCurrency(
                      freight
                    )}
                  </strong>
                </div>

                <div className="sale-calculation-total">
                  <span>Total</span>

                  <strong>
                    {formatCurrency(
                      total
                    )}
                  </strong>
                </div>
              </div>

              <div className="sale-modal-footer">
                <button
                  type="button"
                  className="sale-cancel"
                  onClick={closeModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="sale-save"
                >
                  <CircleCheck size={18} />

                  {editingSale
                    ? "Salvar alterações"
                    : "Registrar venda"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}