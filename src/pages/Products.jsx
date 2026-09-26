import { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircleCheck,
  Edit3,
  Package,
  Plus,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Buquê Van Gogh",
    category: "Buquês",
    price: 56.9,
    description: "Girassol, margaridas e mosquitinhos.",
    status: "active",
  },
  {
    id: 2,
    name: "Combo Cone Singular",
    category: "Combos",
    price: 29.9,
    description: "Flor, embalagem cone especial e presente.",
    status: "active",
  },
  {
    id: 3,
    name: "Combo Doce Carinho",
    category: "Combos",
    price: 44.9,
    description: "Buquê com chocolates e cartão.",
    status: "active",
  },
  {
    id: 4,
    name: "Combo Amor que Encanta",
    category: "Combos",
    price: 49.9,
    description: "Arranjo floral com presente e embalagem premium.",
    status: "active",
  },
  {
    id: 5,
    name: "Cesta Carinho Especial",
    category: "Cestas",
    price: 109.9,
    description: "Cesta presenteável para datas especiais.",
    status: "active",
  },
];

const emptyForm = {
  name: "",
  category: "",
  price: "",
  description: "",
  status: "active",
};

export default function Products() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("rosalina_products");

    if (saved) {
      return JSON.parse(saved);
    }

    return initialProducts;
  });

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem(
      "rosalina_products",
      JSON.stringify(products)
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        product.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        product.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    categoryFilter,
    statusFilter,
  ]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map((product) => product.category)
      ),
    ];
  }, [products]);

  const activeProducts = products.filter(
    (product) => product.status === "active"
  ).length;

  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  function openCreateModal() {
    setEditingProduct(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);

    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price).replace(".", ","),
      description: product.description,
      status: product.status,
    });

    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingProduct(null);
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

    const parsedPrice = Number(
      form.price.replace(",", ".")
    );

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      Number.isNaN(parsedPrice) ||
      parsedPrice <= 0
    ) {
      alert(
        "Preencha nome, categoria e um preço válido."
      );

      return;
    }

    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: form.name.trim(),
                category: form.category.trim(),
                price: parsedPrice,
                description:
                  form.description.trim(),
                status: form.status,
              }
            : product
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name.trim(),
        category: form.category.trim(),
        price: parsedPrice,
        description: form.description.trim(),
        status: form.status,
      };

      setProducts((current) => [
        newProduct,
        ...current,
      ]);
    }

    closeModal();
  }

  function handleDelete(product) {
    const confirmed = window.confirm(
      `Deseja realmente excluir "${product.name}"?`
    );

    if (!confirmed) return;

    setProducts((current) =>
      current.filter(
        (item) => item.id !== product.id
      )
    );
  }

  return (
    <section className="products-page">
      <div className="products-heading">
        <div>
          <span className="page-eyebrow">
            CATÁLOGO
          </span>

          <h1>Gestão de Produtos</h1>

          <p>
            Gerencie os produtos utilizados nas
            vendas da Rosalina.
          </p>
        </div>

        <button
          className="products-create-button"
          onClick={openCreateModal}
        >
          <Plus size={19} />

          Criar produto
        </button>
      </div>

      <div className="products-summary">
        <div className="product-summary-card">
          <div className="summary-icon">
            <Package size={22} />
          </div>

          <div>
            <span>Total de produtos</span>

            <strong>{products.length}</strong>
          </div>
        </div>

        <div className="product-summary-card">
          <div className="summary-icon">
            <CircleCheck size={22} />
          </div>

          <div>
            <span>Produtos ativos</span>

            <strong>{activeProducts}</strong>
          </div>
        </div>

        <div className="product-summary-card">
          <div className="summary-icon">
            <Tag size={22} />
          </div>

          <div>
            <span>Categorias</span>

            <strong>{categories.length}</strong>
          </div>
        </div>
      </div>

      <div className="products-panel">
        <div className="products-toolbar">
          <div className="products-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
          >
            <option value="all">
              Todas as categorias
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >
            <option value="all">
              Todos os status
            </option>

            <option value="active">
              Ativos
            </option>

            <option value="inactive">
              Inativos
            </option>
          </select>
        </div>

        <div className="products-table-header">
          <span>Produto</span>
          <span>Categoria</span>
          <span>Preço</span>
          <span>Status</span>
          <span>Ações</span>
        </div>

        <div className="products-list">
          {filteredProducts.length === 0 ? (
            <div className="products-empty">
              <Box size={34} />

              <strong>
                Nenhum produto encontrado
              </strong>

              <span>
                Tente alterar os filtros de
                pesquisa.
              </span>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                className="product-row"
                key={product.id}
              >
                <div className="product-info">
                  <div className="product-image-placeholder">
                    🌹
                  </div>

                  <div>
                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.description ||
                        "Sem descrição"}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="category-badge">
                    {product.category}
                  </span>
                </div>

                <strong className="product-price">
                  {formatCurrency(
                    product.price
                  )}
                </strong>

                <div>
                  <span
                    className={`status-badge ${
                      product.status ===
                      "active"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    <i />

                    {product.status ===
                    "active"
                      ? "Ativo"
                      : "Inativo"}
                  </span>
                </div>

                <div className="product-actions">
                  <button
                    className="action-edit"
                    onClick={() =>
                      openEditModal(product)
                    }
                  >
                    <Edit3 size={16} />

                    Editar
                  </button>

                  <button
                    className="action-delete"
                    onClick={() =>
                      handleDelete(product)
                    }
                  >
                    <Trash2 size={16} />

                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {modalOpen && (
        <div
          className="product-modal-overlay"
          onMouseDown={closeModal}
        >
          <div
            className="product-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="product-modal-header">
              <div>
                <span>
                  {editingProduct
                    ? "EDITAR PRODUTO"
                    : "NOVO PRODUTO"}
                </span>

                <h2>
                  {editingProduct
                    ? editingProduct.name
                    : "Cadastrar produto"}
                </h2>
              </div>

              <button
                onClick={closeModal}
                aria-label="Fechar"
              >
                <X size={21} />
              </button>
            </div>

            <form
              className="product-form"
              onSubmit={handleSubmit}
            >
              <div className="product-form-group">
                <label>
                  Nome do produto *
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Ex.: Buquê Van Gogh"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="product-form-row">
                <div className="product-form-group">
                  <label>
                    Categoria *
                  </label>

                  <input
                    type="text"
                    name="category"
                    placeholder="Ex.: Buquês"
                    value={form.category}
                    onChange={handleChange}
                  />
                </div>

                <div className="product-form-group">
                  <label>
                    Preço (R$) *
                  </label>

                  <input
                    type="text"
                    name="price"
                    placeholder="Ex.: 56,90"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="product-form-group">
                <label>Descrição</label>

                <textarea
                  name="description"
                  maxLength={200}
                  placeholder="Breve descrição do produto..."
                  value={form.description}
                  onChange={handleChange}
                />

                <small>
                  {form.description.length}/200
                </small>
              </div>

              <div className="product-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">
                    Ativo
                  </option>

                  <option value="inactive">
                    Inativo
                  </option>
                </select>
              </div>

              <div className="product-modal-footer">
                <button
                  type="button"
                  className="product-cancel"
                  onClick={closeModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="product-save"
                >
                  <CircleCheck size={18} />

                  {editingProduct
                    ? "Salvar alterações"
                    : "Salvar produto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}