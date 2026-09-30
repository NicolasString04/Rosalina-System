import { useMemo, useState } from "react";

import {
  ArrowRight,
  CalendarDays,
  Flower2,
  Gem,
  Leaf,
  Palette,
  Star,
  Gift,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  X,
} from "lucide-react";

/* =========================================================
   PRODUTOS PADRÃO
========================================================= */

const fallbackProducts = [
  {
    id: "fallback-1",
    name: "Buquê Van Gogh",
    category: "Buquês",
    price: 56.9,
    image: "/assets/home/buque-van-gogh.png",
    description:
      "Girassol, margaridas e flores selecionadas em uma composição especial.",
    status: "active",
  },
  {
    id: "fallback-2",
    name: "Combo Cone Singular",
    category: "Combos",
    price: 29.9,
    image: "/assets/home/combo-cone-singular.png",
    description:
      "Flor especial acompanhada de presente e embalagem exclusiva.",
    status: "active",
  },
  {
    id: "fallback-3",
    name: "Combo Doce Carinho",
    category: "Combos",
    price: 44.9,
    image: "/assets/home/combo-doce-carinho.png",
    description:
      "Flores, chocolates e carinho em uma composição feita para surpreender.",
    status: "active",
  },
  {
    id: "fallback-4",
    name: "Combo Amor que Encanta",
    category: "Combos",
    price: 49.9,
    image: "/assets/home/combo-amor-que-encanta.png",
    description:
      "Um combo romântico com flores e chocolates para momentos especiais.",
    status: "active",
  },
  {
    id: "fallback-5",
    name: "Cesta Carinho Especial",
    category: "Cestas",
    price: 109.9,
    image: "/assets/home/cesta-carinho-especial.png",
    description:
      "Cesta delicada com flores, mimos e chocolates para encantar.",
    status: "active",
  },
  {
    id: "fallback-6",
    name: "Arranjo Encanto",
    category: "Arranjos",
    price: 62,
    image: "/assets/home/arranjo-encanto.png",
    description:
      "Flores do campo e espécies selecionadas para todos os momentos.",
    status: "active",
  },
  {
    id: "fallback-7",
    name: "Arranjo Premium",
    category: "Arranjos",
    price: 119.9,
    image: "/assets/home/arranjo-premium.png",
    description:
      "Flores selecionadas e complementos especiais em uma composição elegante.",
    status: "active",
  },
];

/* =========================================================
   CATEGORIAS
========================================================= */

const categories = [
  {
    id: "Buquês",
    title: "Buquês",
    description: "Beleza em cada detalhe",
  },
  {
    id: "Arranjos",
    title: "Arranjos",
    description: "Flores para todos os momentos",
  },
  {
    id: "Combos",
    title: "Combos",
    description: "Flores e presentes em harmonia",
  },
  {
    id: "Cestas",
    title: "Cestas",
    description: "Surpresas que encantam",
  },
  {
    id: "Personalizados",
    title: "Personalizados",
    description: "Monte do seu jeito",
  },
];

/* =========================================================
   IMAGENS DOS PRODUTOS
========================================================= */

const productImageMap = [
  {
    match: "buque van gogh",
    image: "/assets/home/buque-van-gogh.png",
  },
  {
    match: "combo cone singular",
    image: "/assets/home/combo-cone-singular.png",
  },
  {
    match: "combo doce carinho",
    image: "/assets/home/combo-doce-carinho.png",
  },
  {
    match: "combo amor que encanta",
    image: "/assets/home/combo-amor-que-encanta.png",
  },
  {
    match: "cesta carinho especial",
    image: "/assets/home/cesta-carinho-especial.png",
  },
  {
    match: "arranjo encanto",
    image: "/assets/home/arranjo-encanto.png",
  },
  {
    match: "arranjo premium",
    image: "/assets/home/arranjo-premium.png",
  },
];

/* =========================================================
   NORMALIZAÇÃO
========================================================= */

function normalizeCategory(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase();
}

/* =========================================================
   RECORTES DECORATIVOS DO ESBOÇO
========================================================= */

function DetailArt({ viewBox, className, label }) {
  return (
    <svg
      className={"rd-art " + className}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <image
        href="/rosalina-home-reference.png.jpeg"
        width="1055"
        height="1491"
      />
    </svg>
  );
}

export default function HomeClientes() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  /* =======================================================
     PRODUTOS
  ======================================================= */

  const products = useMemo(() => {
    try {
      const saved = localStorage.getItem("rosalina_products");

      if (!saved) {
        return fallbackProducts;
      }

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return fallbackProducts;
      }

      const activeProducts = parsed.filter(
        (product) => product.status !== "inactive"
      );

      return activeProducts.length
        ? activeProducts
        : fallbackProducts;
    } catch {
      return fallbackProducts;
    }
  }, []);

  /* =======================================================
     FILTROS
  ======================================================= */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const category = normalizeCategory(product.category);
      const selected = normalizeCategory(selectedCategory);

      const matchesCategory =
        selectedCategory === "Todos" ||
        category === selected;

      const search = searchTerm.trim().toLowerCase();

      const name = String(
        product.name || ""
      ).toLowerCase();

      const description = String(
        product.description || ""
      ).toLowerCase();

      const productCategory = String(
        product.category || ""
      ).toLowerCase();

      const matchesSearch =
        search === "" ||
        name.includes(search) ||
        description.includes(search) ||
        productCategory.includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [
    products,
    selectedCategory,
    searchTerm,
  ]);

  /* =======================================================
     SACOLA
  ======================================================= */

  const cartQuantity = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  /* =======================================================
     HELPERS
  ======================================================= */

  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) || 0);
  }

  function scrollToSection(id) {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setMenuOpen(false);
  }

  function selectCategory(category) {
    setSelectedCategory(category);
    setMenuOpen(false);

    setTimeout(() => {
      scrollToSection("produtos");
    }, 80);
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find(
        (item) =>
          String(item.id) ===
          String(product.id)
      );

      if (existing) {
        return current.map((item) =>
          String(item.id) ===
          String(product.id)
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  }

  function changeQuantity(productId, amount) {
    setCart((current) =>
      current
        .map((item) => {
          if (
            String(item.id) !==
            String(productId)
          ) {
            return item;
          }

          return {
            ...item,
            quantity:
              item.quantity + amount,
          };
        })
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  }

  function removeFromCart(productId) {
    setCart((current) =>
      current.filter(
        (item) =>
          String(item.id) !==
          String(productId)
      )
    );
  }

  function openWhatsApp(message = "") {
    const phone = "5547988254525";

    const text =
      message ||
      "Olá! Gostaria de fazer um pedido na Rosalina Floricultura.";

    const url =
      `https://wa.me/${phone}?text=` +
      encodeURIComponent(text);

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function finishOrder() {
    if (cart.length === 0) {
      openWhatsApp();
      return;
    }

    const items = cart
      .map(
        (item) =>
          `${item.quantity}x ${item.name} — ${formatCurrency(
            Number(item.price) *
              Number(item.quantity)
          )}`
      )
      .join("\n");

    const message =
      "Olá! Gostaria de fazer este pedido na Rosalina:\n\n" +
      items +
      "\n\n" +
      `Total dos produtos: ${formatCurrency(
        cartTotal
      )}\n\n` +
      "Gostaria também de verificar o valor da entrega.";

    openWhatsApp(message);
  }

  /*
   * Primeiro tenta utilizar uma imagem cadastrada diretamente
   * no produto.
   *
   * Caso o produto venha do localStorage antigo sem imagem,
   * identifica pelo nome e utiliza a imagem correspondente.
   */
  function getProductImage(product) {
    const directImage =
      product.image ||
      product.imageUrl ||
      product.photo ||
      product.img ||
      product.thumbnail ||
      "";

    if (directImage) {
      return directImage;
    }

    const normalizedName =
      normalizeText(product.name);

    const matchedProduct =
      productImageMap.find((item) =>
        normalizedName.includes(item.match)
      );

    return matchedProduct?.image || "";
  }

  return (
    <main className="client-home">
      {/* ===================================================
          HEADER
      ==================================================== */}

      <header className="client-header">
        <button
          className="client-logo"
          onClick={() =>
            scrollToSection("inicio")
          }
        >
          <span className="client-logo-flower">
            <img
              src="/assets/home/logo-rosalina.png"
              alt=""
              className="client-logo-mark"
            />
          </span>

          <div className="client-logo-text">
            <strong>ROSALINA</strong>

            <span>
              FLORICULTURA E PRESENTEARIA
            </span>
          </div>
        </button>

        <nav
          className={`client-nav ${
            menuOpen
              ? "client-nav-open"
              : ""
          }`}
        >
          <button
            onClick={() =>
              scrollToSection("inicio")
            }
          >
            Início
          </button>

          <button
            onClick={() =>
              selectCategory("Buquês")
            }
          >
            Buquês
          </button>

          <button
            onClick={() =>
              selectCategory("Arranjos")
            }
          >
            Arranjos
          </button>

          <button
            onClick={() =>
              selectCategory("Combos")
            }
          >
            Combos
          </button>

          <button
            onClick={() =>
              selectCategory("Cestas")
            }
          >
            Cestas
          </button>

          <button
            onClick={() =>
              scrollToSection(
                "personalizados"
              )
            }
          >
            Personalizados
          </button>

          <button
            onClick={() =>
              scrollToSection("sobre")
            }
          >
            Sobre
          </button>
        </nav>

        <div className="client-header-actions">
          <button
            className="client-icon-button"
            aria-label="Pesquisar"
            onClick={() =>
              scrollToSection("produtos")
            }
          >
            <Search size={19} />
          </button>

          <button
            className="client-icon-button client-cart"
            aria-label="Abrir sacola"
            onClick={() =>
              setCartOpen(true)
            }
          >
            <ShoppingBag size={20} />

            <span>
              {cartQuantity}
            </span>
          </button>

          <button
            className="client-whatsapp-button"
            onClick={() =>
              openWhatsApp()
            }
          >
            <MessageCircle
              size={18}
            />

            Fazer pedido
          </button>

          <button
            className="client-mobile-menu"
            aria-label="Abrir menu"
            onClick={() =>
              setMenuOpen(
                (current) =>
                  !current
              )
            }
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </header>

      {/* ===================================================
          HERO
      ==================================================== */}

      <section
        className="client-hero"
        id="inicio"
      >
        <div className="hero-main-wrapper">
          <img
            src="/assets/home/Card principal.png"
            alt="Rosalina Floricultura e Presentearia"
            className="hero-main-card"
          />

          <div className="hero-overlay-actions">
            <button
              className="hero-catalog-button"
              onClick={() => {
                setSelectedCategory(
                  "Todos"
                );

                scrollToSection(
                  "produtos"
                );
              }}
            >
              <Sparkles size={17} />

              Ver catálogo

              <ArrowRight size={17} />
            </button>

            <button
              className="hero-whatsapp-button"
              onClick={() =>
                openWhatsApp()
              }
            >
              <MessageCircle size={18} />

              Pedir no WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================
          CATEGORIAS
      ==================================================== */}

      <section
        className="client-categories"
        id="categorias"
      >
        <img
          src="/assets/home/floral left.png"
          alt=""
          className="categories-decoration-left"
        />

        <img
          src="/assets/home/floral right.png"
          alt=""
          className="categories-decoration-right"
        />

        <div className="client-section-heading">
          <span>
            NOSSOS PRODUTOS
          </span>

          <h2>
            Escolha a forma de{" "}
            <em>Presentear</em>
          </h2>

          <img
            src="/assets/home/coração dourado.png"
            alt=""
            className="section-gold-divider"
          />
        </div>

        <div className="client-category-grid">
          {categories.map(
            (category, index) => (
              <button
                key={category.id}
                className={`client-category ${
                  selectedCategory ===
                  category.id
                    ? "client-category-active"
                    : ""
                }`}
                onClick={() =>
                  selectCategory(
                    category.id
                  )
                }
              >
                <div className="client-category-circle">
                  <span>
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <strong>
                    {category.title}
                  </strong>
                </div>

                <strong className="client-category-name">
                  {category.title}
                </strong>

                <span className="client-category-description">
                  {
                    category.description
                  }
                </span>
              </button>
            )
          )}
        </div>
      </section>

      {/* ===================================================
          PRODUTOS
      ==================================================== */}

      <section
        className="client-products"
        id="produtos"
      >
        <div className="client-products-content">
          <div className="client-products-header">
            <div className="client-section-heading client-section-heading-left">
              <span>
                MAIS ESCOLHIDOS
              </span>

              <h2>
                Produtos em destaque
              </h2>

              <p>
                Mais escolhidos por quem ama presentear.
              </p>
            </div>

            <button
              className="client-view-all"
              onClick={() => {
                setSelectedCategory(
                  "Todos"
                );

                setSearchTerm("");
              }}
            >
              Ver todos os produtos

              <ArrowRight size={16} />
            </button>
          </div>

          <div className="client-product-tools">
            <div className="client-product-search">
              <Search size={18} />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Buscar produtos..."
              />
            </div>

            <div className="client-product-filters">
              <button
                className={
                  selectedCategory ===
                  "Todos"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedCategory(
                    "Todos"
                  )
                }
              >
                Todos
              </button>

              {categories
                .slice(0, 4)
                .map(
                  (category) => (
                    <button
                      key={
                        category.id
                      }
                      className={
                        selectedCategory ===
                        category.id
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setSelectedCategory(
                          category.id
                        )
                      }
                    >
                      {
                        category.title
                      }
                    </button>
                  )
                )}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="client-product-grid">
              {filteredProducts.map(
                (product) => {
                  const image =
                    getProductImage(
                      product
                    );

                  return (
                    <article
                      className="client-product-card"
                      key={product.id}
                    >
                      <button
                        className="client-product-favorite"
                        aria-label="Favoritar"
                      >
                        <Heart size={17} />
                      </button>

                      {image ? (
                        <div className="client-product-image">
                          <img
                            src={image}
                            alt={
                              product.name
                            }
                          />
                        </div>
                      ) : (
                        <div className="client-product-image client-product-placeholder">
                          <Sparkles
                            size={30}
                          />

                          <span>
                            ROSALINA
                          </span>
                        </div>
                      )}

                      <div className="client-product-info">
                        <span className="client-product-category">
                          {product.category ||
                            "Rosalina"}
                        </span>

                        <h3>
                          {product.name}
                        </h3>

                        <p>
                          {product.description ||
                            "Preparado especialmente para transformar sentimentos em momentos inesquecíveis."}
                        </p>

                        <div className="client-product-bottom">
                          <strong>
                            {formatCurrency(
                              product.price
                            )}
                          </strong>

                          <button
                            onClick={() =>
                              addToCart(
                                product
                              )
                            }
                          >
                            <ShoppingBag
                              size={15}
                            />

                            Adicionar
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          ) : (
            <div className="client-products-empty">
              <Search size={32} />

              <h3>
                Nenhum produto encontrado
              </h3>

              <p>
                Tente outra busca ou selecione outra categoria.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");

                  setSelectedCategory(
                    "Todos"
                  );
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          BENEFÍCIOS, PERSONALIZAÇÃO E GARANTIAS
      ==================================================== */}

      <div className="rosalina-details">
        <section
          className="rd-benefits"
          aria-label="Diferenciais da Rosalina"
        >
          <DetailArt
            viewBox="0 1113 99 93"
            className="rd-benefits-leaves"
          />

          <DetailArt
            viewBox="869 1113 186 93"
            className="rd-benefits-roses"
          />

          <div className="rd-benefits-inner">
            <div className="rd-benefit">
              <Truck aria-hidden="true" />

              <div>
                <h3>
                  Delivery em
                  <br />
                  Jaraguá do Sul
                </h3>

                <p>
                  Com todo o cuidado
                  <br />
                  que suas flores merecem.
                </p>
              </div>
            </div>

            <div className="rd-benefit">
              <Gift aria-hidden="true" />

              <div>
                <h3>
                  Presentearia
                  <br />
                  completa
                </h3>

                <p>
                  Flores, chocolates, pelúcias
                  <br />e muito mais.
                </p>
              </div>
            </div>

            <div className="rd-benefit">
              <CalendarDays
                aria-hidden="true"
              />

              <div>
                <h3>
                  Para todas
                  <br />
                  as ocasiões
                </h3>

                <p>
                  Aniversários, datas especiais,
                  <br />
                  romances e muito mais.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="rd-personalization">
          <img
            src="/assets/home/buque-personalizado.png"
            alt="Buquê Rosalina com rosas vermelhas e lírios cor-de-rosa"
            className="rd-art rd-bouquet"
          />

          <DetailArt
            viewBox="981 1208 74 202"
            className="rd-personalization-edge"
          />

          <section
            className="rd-custom"
            id="personalizados"
            aria-labelledby="rd-custom-title"
          >
            <div className="rd-custom-copy">
              <p className="rd-eyebrow">
                BUQUÊS PERSONALIZADOS
              </p>

              <div className="rd-custom-heading">
                <h2 id="rd-custom-title">
                  Monte do seu jeito
                </h2>

                <svg
                  className="rd-flourish"
                  viewBox="0 0 95 38"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M2 32C14 36 24 26 27 18C34 6 26 3 23 12C18 2 10 8 17 19C30 39 53 27 92 3" />
                </svg>
              </div>

              <p className="rd-custom-description">
                Escolha suas flores preferidas, as cores, o tamanho e
                os complementos. Criamos um buquê único, do seu jeito,
                para tornar seu momento ainda mais especial.
              </p>

              <button
                className="rd-custom-button"
                onClick={() =>
                  openWhatsApp(
                    "Olá! Gostaria de montar um buquê personalizado com a Rosalina."
                  )
                }
              >
                <MessageCircle
                  aria-hidden="true"
                />

                <span>
                  Fazer meu buquê personalizado
                </span>

                <ArrowRight
                  aria-hidden="true"
                />
              </button>
            </div>

            <ol
              className="rd-steps"
              aria-label="Como montamos seu buquê"
            >
              <li>
                <Flower2
                  aria-hidden="true"
                />

                <p>
                  Você escolhe
                  <br />
                  as flores
                </p>
              </li>

              <li>
                <Palette
                  aria-hidden="true"
                />

                <p>
                  Definimos
                  <br />
                  a paleta de cores
                </p>
              </li>

              <li>
                <Gift
                  aria-hidden="true"
                />

                <p>
                  Adicionamos
                  <br />
                  complementos especiais
                </p>
              </li>

              <li>
                <Heart
                  aria-hidden="true"
                />

                <p>
                  Criamos um buquê
                  <br />
                  único para você
                </p>
              </li>
            </ol>
          </section>

          <section
            className="rd-trust"
            id="sobre"
            aria-label="Nosso cuidado em cada pedido"
          >
            <div>
              <Gem aria-hidden="true" />

              <p>
                Qualidade garantida
                <br />
                em todas as flores
              </p>
            </div>

            <div>
              <Leaf aria-hidden="true" />

              <p>
                Embalagem especial
                <br />
                feita com carinho
              </p>
            </div>

            <div>
              <Heart aria-hidden="true" />

              <p>
                Atendimento
                <br />
                personalizado
              </p>
            </div>

            <div>
              <Star aria-hidden="true" />

              <p>
                Momentos especiais
                <br />
                criados pela Rosalina
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <footer className="client-footer">
        <div className="client-footer-brand">
          <div className="client-footer-logo">
            <span className="client-logo-flower client-footer-logo-circle">
              <img
                src="/assets/home/logo-rosalina.png"
                alt=""
                className="client-logo-mark"
              />
            </span>

            <div className="client-logo-text">
              <strong>
                ROSALINA
              </strong>

              <span>
                FLORICULTURA E PRESENTEARIA
              </span>
            </div>
          </div>

          <p>
            Onde sentimentos ganham flores.
          </p>
        </div>

        <div className="client-footer-contact">
          <div>
            <span className="footer-social-symbol">
              ◎
            </span>

            <span>
              <strong>
                @rosalinafloricultura_jaragua
              </strong>

              Acompanhe nossas criações
            </span>
          </div>

          <div>
            <MessageCircle size={22} />

            <span>
              <strong>
                (47) 98825-4525
              </strong>

              Fale conosco pelo WhatsApp
            </span>
          </div>

          <div>
            <MapPin size={22} />

            <span>
              <strong>
                Jaraguá do Sul - SC
              </strong>

              Atendemos toda a região
            </span>
          </div>
        </div>
      </footer>

      {/* ===================================================
          OVERLAY SACOLA
      ==================================================== */}

      <div
        className={`cart-overlay ${
          cartOpen
            ? "cart-overlay-open"
            : ""
        }`}
        onClick={() =>
          setCartOpen(false)
        }
      />

      {/* ===================================================
          SACOLA
      ==================================================== */}

      <aside
        className={`cart-drawer ${
          cartOpen
            ? "cart-drawer-open"
            : ""
        }`}
      >
        <div className="cart-header">
          <div>
            <span>
              SEU PEDIDO
            </span>

            <h2>
              Sacola
            </h2>
          </div>

          <button
            onClick={() =>
              setCartOpen(false)
            }
            aria-label="Fechar sacola"
          >
            <X size={21} />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <img
                src="/assets/home/arranjo coração.png"
                alt=""
                className="cart-heart-decoration"
              />

              <ShoppingBag size={37} />

              <h3>
                Sua sacola está vazia
              </h3>

              <p>
                Escolha um produto especial para começar seu pedido.
              </p>

              <button
                onClick={() => {
                  setCartOpen(false);

                  scrollToSection(
                    "produtos"
                  );
                }}
              >
                Ver produtos
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const image =
                getProductImage(item);

              return (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <div className="cart-item-image">
                    {image ? (
                      <img
                        src={image}
                        alt={item.name}
                      />
                    ) : (
                      <Sparkles
                        size={22}
                      />
                    )}
                  </div>

                  <div className="cart-item-info">
                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {formatCurrency(
                        item.price
                      )}
                    </span>

                    <div className="cart-item-controls">
                      <button
                        onClick={() =>
                          changeQuantity(
                            item.id,
                            -1
                          )
                        }
                      >
                        <Minus size={14} />
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          changeQuantity(
                            item.id,
                            1
                          )
                        }
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        className="cart-remove"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        <Trash2
                          size={15}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div>
              <span>
                Total dos produtos
              </span>

              <strong>
                {formatCurrency(
                  cartTotal
                )}
              </strong>
            </div>

            <small>
              O valor da entrega será combinado durante o atendimento.
            </small>

            <button
              onClick={finishOrder}
            >
              <MessageCircle
                size={18}
              />

              Finalizar pelo WhatsApp
            </button>
          </div>
        )}
      </aside>
    </main>
  );
}