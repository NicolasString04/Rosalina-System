import { useMemo, useState } from "react";

import {
  ArrowRight,
  CalendarDays,
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
    description:
      "Girassol, margaridas e flores selecionadas em uma composição especial.",
    status: "active",
  },
  {
    id: "fallback-2",
    name: "Combo Cone Singular",
    category: "Combos",
    price: 29.9,
    description:
      "Flor especial acompanhada de presente e embalagem exclusiva.",
    status: "active",
  },
  {
    id: "fallback-3",
    name: "Combo Doce Carinho",
    category: "Combos",
    price: 44.9,
    description:
      "Flores, chocolates e carinho em uma composição feita para surpreender.",
    status: "active",
  },
  {
    id: "fallback-4",
    name: "Arranjo Encanto",
    category: "Arranjos",
    price: 62,
    description:
      "Flores do campo e espécies selecionadas para todos os momentos.",
    status: "active",
  },
  {
    id: "fallback-5",
    name: "Arranjo Premium",
    category: "Arranjos",
    price: 109.9,
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

function normalizeCategory(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export default function HomeClientes() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState("Todos");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [cartOpen, setCartOpen] =
    useState(false);

  const [cart, setCart] =
    useState([]);

  /* =======================================================
     PRODUTOS
  ======================================================= */

  const products = useMemo(() => {
    try {
      const saved =
        localStorage.getItem("rosalina_products");

      if (!saved) {
        return fallbackProducts;
      }

      const parsed =
        JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return fallbackProducts;
      }

      const activeProducts =
        parsed.filter(
          (product) =>
            product.status !== "inactive"
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

  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (product) => {
          const category =
            normalizeCategory(
              product.category
            );

          const selected =
            normalizeCategory(
              selectedCategory
            );

          const matchesCategory =
            selectedCategory === "Todos" ||
            category === selected;

          const search =
            searchTerm
              .trim()
              .toLowerCase();

          const name =
            String(
              product.name || ""
            ).toLowerCase();

          const description =
            String(
              product.description || ""
            ).toLowerCase();

          const productCategory =
            String(
              product.category || ""
            ).toLowerCase();

          const matchesSearch =
            search === "" ||
            name.includes(search) ||
            description.includes(search) ||
            productCategory.includes(search);

          return (
            matchesCategory &&
            matchesSearch
          );
        }
      );
    }, [
      products,
      selectedCategory,
      searchTerm,
    ]);

  /* =======================================================
     SACOLA
  ======================================================= */

  const cartQuantity =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );

  const cartTotal =
    cart.reduce(
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
    return new Intl.NumberFormat(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    ).format(
      Number(value) || 0
    );
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
      const existing =
        current.find(
          (item) =>
            String(item.id) ===
            String(product.id)
        );

      if (existing) {
        return current.map(
          (item) =>
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

  function changeQuantity(
    productId,
    amount
  ) {
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

  function removeFromCart(
    productId
  ) {
    setCart((current) =>
      current.filter(
        (item) =>
          String(item.id) !==
          String(productId)
      )
    );
  }

  function openWhatsApp(
    message = ""
  ) {
    const phone =
      "5547988254525";

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

    const items =
      cart
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

  function getProductImage(product) {
    return (
      product.image ||
      product.imageUrl ||
      product.photo ||
      ""
    );
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
            R
          </span>

          <div>
            <strong>
              ROSALINA
            </strong>

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
            <MessageCircle size={18} />

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
            <em>
              Presentear
            </em>
          </h2>

          <img
            src="/assets/home/coração dourado.png"
            alt=""
            className="section-gold-divider"
          />

        </div>

        <div className="client-category-grid">

          {categories.map(
            (
              category,
              index
            ) => (
              <button
                key={
                  category.id
                }
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
                    {
                      category.title
                    }
                  </strong>

                </div>

                <strong className="client-category-name">
                  {
                    category.title
                  }
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

          {filteredProducts.length >
          0 ? (

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
                      key={
                        product.id
                      }
                    >

                      <button
                        className="client-product-favorite"
                        aria-label="Favoritar"
                      >
                        <Heart
                          size={17}
                        />
                      </button>

                      {image ? (

                        <div className="client-product-image">

                          <img
                            src={
                              image
                            }
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
                          {
                            product.name
                          }
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
          FAIXA DE BENEFÍCIOS
      ==================================================== */}

      <section className="client-benefits-strip">

        <div className="benefit-item">

          <Truck size={34} />

          <span>
            <strong>
              Delivery em Jaraguá do Sul
            </strong>

            Com todo o cuidado que suas flores merecem.
          </span>

        </div>

        <div className="benefit-item benefit-highlight">

          <img
            src="/assets/home/arranjo horizontal.png"
            alt=""
            className="benefit-highlight-image"
          />

          <div className="benefit-highlight-card">

            <Gift size={34} />

            <span>
              <strong>
                Presentearia completa
              </strong>

              Flores, chocolates, mimos e muito mais.
            </span>

          </div>

        </div>

        <div className="benefit-item">

          <CalendarDays size={34} />

          <span>
            <strong>
              Para todas as ocasiões
            </strong>

            Aniversários, datas especiais e romances.
          </span>

        </div>

      </section>

      {/* ===================================================
          PERSONALIZADOS
      ==================================================== */}

      <section
        className="client-custom"
        id="personalizados"
      >

        <img
          src="/assets/home/floral left.png"
          alt=""
          className="custom-foliage-left"
        />

        <img
          src="/assets/home/petalas rosa.png"
          alt=""
          className="custom-petals"
        />

        <div className="client-custom-bouquet">

          <img
            src="/assets/home/buque 2.png"
            alt="Buquê personalizado Rosalina"
          />

        </div>

        <div className="client-custom-copy">

          <span className="client-eyebrow">
            BUQUÊS PERSONALIZADOS
          </span>

          <h2>
            Monte do seu jeito

            <Heart
              size={24}
              strokeWidth={1.4}
            />
          </h2>

          <p>
            Escolha suas flores preferidas, as cores, o tamanho e os
            complementos. Criamos um buquê único, do seu jeito, para tornar
            seu momento ainda mais especial.
          </p>

          <button
            className="client-primary-button"
            onClick={() =>
              openWhatsApp(
                "Olá! Gostaria de montar um buquê personalizado com a Rosalina."
              )
            }
          >
            <MessageCircle
              size={18}
            />

            Fazer meu buquê personalizado

            <ArrowRight
              size={16}
            />
          </button>

        </div>

        <div className="client-custom-steps">

          <div>
            <span>01</span>

            <strong>
              Você escolhe
            </strong>

            <small>
              as flores
            </small>
          </div>

          <div>
            <span>02</span>

            <strong>
              Definimos
            </strong>

            <small>
              a paleta de cores
            </small>
          </div>

          <div>
            <span>03</span>

            <strong>
              Adicionamos
            </strong>

            <small>
              complementos especiais
            </small>
          </div>

          <div>
            <span>04</span>

            <strong>
              Criamos
            </strong>

            <small>
              algo único para você
            </small>
          </div>

        </div>
      </section>

      {/* ===================================================
          GARANTIAS
      ==================================================== */}

      <section
        className="client-trust"
        id="sobre"
      >

        <div>
          <span>◇</span>

          <strong>
            Qualidade garantida
          </strong>

          <small>
            em todas as flores
          </small>
        </div>

        <div>
          <span>❧</span>

          <strong>
            Embalagem especial
          </strong>

          <small>
            feita com carinho
          </small>
        </div>

        <div>
          <Heart size={24} />

          <strong>
            Atendimento personalizado
          </strong>

          <small>
            para cada momento
          </small>
        </div>

        <div>
          <span>☆</span>

          <strong>
            Momentos especiais
          </strong>

          <small>
            criados pela Rosalina
          </small>
        </div>

      </section>

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <footer className="client-footer">

        <div className="client-footer-brand">

          <div className="client-footer-logo">

            <span className="client-logo-flower">
              R
            </span>

            <div>
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

              <ShoppingBag
                size={37}
              />

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

            cart.map(
              (item) => {

                const image =
                  getProductImage(
                    item
                  );

                return (
                  <div
                    className="cart-item"
                    key={
                      item.id
                    }
                  >

                    <div className="cart-item-image">

                      {image ? (

                        <img
                          src={
                            image
                          }
                          alt={
                            item.name
                          }
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
                          <Minus
                            size={14}
                          />
                        </button>

                        <span>
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            changeQuantity(
                              item.id,
                              1
                            )
                          }
                        >
                          <Plus
                            size={14}
                          />
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
              }
            )

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
              onClick={
                finishOrder
              }
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