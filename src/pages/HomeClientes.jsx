import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Gift,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

const fallbackProducts = [
  {
    id: 1,
    name: "Buquê Van Gogh",
    category: "Buquês",
    price: 56.9,
    description: "Girassol, margaridas e mosquitinhos azuis.",
    status: "active",
    emoji: "🌻",
  },
  {
    id: 2,
    name: "Combo Cone Singular",
    category: "Combos",
    price: 29.9,
    description: "Flores e presente em embalagem especial.",
    status: "active",
    emoji: "🌹",
  },
  {
    id: 3,
    name: "Combo Doce Carinho",
    category: "Combos",
    price: 44.9,
    description: "Flores, chocolates e carinho.",
    status: "active",
    emoji: "💐",
  },
  {
    id: 4,
    name: "Arranjo Encanto",
    category: "Arranjos",
    price: 62,
    description: "Flores do campo para todos os momentos.",
    status: "active",
    emoji: "🌼",
  },
  {
    id: 5,
    name: "Arranjo Premium",
    category: "Arranjos",
    price: 119.9,
    description: "Flores especiais em uma composição elegante.",
    status: "active",
    emoji: "🌷",
  },
];

const categories = [
  {
    name: "Buquês",
    emoji: "🌹",
    description: "Beleza em cada detalhe",
  },
  {
    name: "Arranjos",
    emoji: "🌻",
    description: "Flores para todos os momentos",
  },
  {
    name: "Combos",
    emoji: "💐",
    description: "Flores e presentes em harmonia",
  },
  {
    name: "Cestas",
    emoji: "🎁",
    description: "Surpresas que encantam",
  },
  {
    name: "Personalizados",
    emoji: "🌷",
    description: "Monte do seu jeito",
  },
];

export default function HomeClientes() {
  const [menuOpen, setMenuOpen] = useState(false);

  const products = useMemo(() => {
    try {
      const saved = localStorage.getItem("rosalina_products");

      if (!saved) {
        return fallbackProducts;
      }

      const parsed = JSON.parse(saved);

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

  const featuredProducts = products.slice(0, 5);

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
      });

    setMenuOpen(false);
  }

  return (
    <main className="client-home">
      {/* =====================
          HEADER
      ====================== */}

      <header className="client-header">
        <button
          className="client-logo"
          onClick={() => scrollToSection("inicio")}
        >
          <span className="client-logo-rose">🌹</span>

          <div>
            <strong>ROSALINA</strong>

            <span>
              FLORICULTURA E PRESENTEARIA
            </span>
          </div>
        </button>

        <nav
          className={`client-nav ${
            menuOpen ? "client-nav-open" : ""
          }`}
        >
          <button onClick={() => scrollToSection("inicio")}>
            Início
          </button>

          <button onClick={() => scrollToSection("categorias")}>
            Categorias
          </button>

          <button onClick={() => scrollToSection("produtos")}>
            Produtos
          </button>

          <button onClick={() => scrollToSection("personalizados")}>
            Personalizados
          </button>

          <button onClick={() => scrollToSection("sobre")}>
            Sobre
          </button>
        </nav>

        <div className="client-header-actions">
          <button
            className="client-icon-button"
            aria-label="Pesquisar"
          >
            <Search size={19} />
          </button>

          <button
            className="client-icon-button client-cart"
            aria-label="Carrinho"
          >
            <ShoppingBag size={20} />

            <span>0</span>
          </button>

          <button className="client-whatsapp-button">
            <MessageCircle size={18} />

            Fazer pedido
          </button>

          <button
            className="client-mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </header>

      {/* =====================
          HERO
      ====================== */}

      <section className="client-hero" id="inicio">
        <div className="client-hero-copy">
          <span className="client-eyebrow">
            FLORES • PRESENTES • EMOÇÕES
          </span>

          <h1>
            ROSALINA
          </h1>

          <span className="client-hero-subtitle">
            FLORICULTURA E PRESENTEARIA
          </span>

          <h2>
            Onde sentimentos
            <br />
            ganham flores
            <Heart
              size={27}
              strokeWidth={1.5}
            />
          </h2>

          <p>
            Mais que flores, entregamos carinho em cada
            detalhe. Buquês, arranjos, cestas e presentes
            para tornar cada momento especial.
          </p>

          <div className="client-hero-actions">
            <button
              className="client-primary-button"
              onClick={() => scrollToSection("produtos")}
            >
              <Sparkles size={18} />

              Ver catálogo

              <ArrowRight size={17} />
            </button>

            <button className="client-outline-button">
              <MessageCircle size={19} />

              Pedir no WhatsApp
            </button>
          </div>

          <div className="client-hero-benefits">
            <div>
              <Truck size={23} />

              <span>
                <strong>Delivery</strong>
                Jaraguá do Sul
              </span>
            </div>

            <div>
              <Gift size={23} />

              <span>
                <strong>Presentes</strong>
                Todas as ocasiões
              </span>
            </div>

            <div>
              <Heart size={23} />

              <span>
                <strong>Flores</strong>
                Que emocionam
              </span>
            </div>
          </div>
        </div>

        <div className="client-hero-visual">
          <div className="hero-flower-bg">
            <div className="hero-flower">
              🌹
            </div>

            <div className="hero-flower hero-sunflower">
              🌻
            </div>

            <div className="hero-flower hero-flower-two">
              🌹
            </div>

            <div className="hero-flower hero-small-one">
              🌼
            </div>

            <div className="hero-flower hero-small-two">
              🌿
            </div>
          </div>

          <div className="hero-tag">
            <strong>ROSALINA</strong>

            <span>
              Floricultura
              <br />
              e Presentearia
            </span>
          </div>

          <div className="hero-message-card">
            Flores transformam
            <br />
            momentos comuns em
            <br />
            lembranças inesquecíveis.

            <Heart
              size={22}
              strokeWidth={1.3}
            />
          </div>
        </div>
      </section>

      {/* =====================
          CATEGORIAS
      ====================== */}

      <section
        className="client-categories"
        id="categorias"
      >
        <div className="client-section-heading">
          <span>NOSSOS PRODUTOS</span>

          <h2>
            Escolha a forma de{" "}
            <em>Presentear</em>
          </h2>
        </div>

        <div className="client-category-grid">
          {categories.map((category) => (
            <button
              className="client-category"
              key={category.name}
            >
              <div className="client-category-image">
                {category.emoji}
              </div>

              <strong>
                {category.name}
              </strong>

              <span>
                {category.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* =====================
          PRODUTOS
      ====================== */}

      <section
        className="client-products"
        id="produtos"
      >
        <div className="client-products-header">
          <div className="client-section-heading">
            <span>MAIS ESCOLHIDOS</span>

            <h2>
              Produtos em destaque
            </h2>

            <p>
              Mais escolhidos por quem ama presentear.
            </p>
          </div>

          <button className="client-view-all">
            Ver todos os produtos

            <ArrowRight size={17} />
          </button>
        </div>

        <div className="client-product-grid">
          {featuredProducts.map((product, index) => (
            <article
              className="client-product-card"
              key={product.id}
            >
              <button className="client-product-favorite">
                <Heart size={17} />
              </button>

              <div className="client-product-image">
                <span>
                  {product.emoji ||
                    ["🌻", "🌹", "💐", "🌼", "🌷"][
                      index % 5
                    ]}
                </span>
              </div>

              <div className="client-product-info">
                <span className="client-product-category">
                  {product.category}
                </span>

                <h3>
                  {product.name}
                </h3>

                <p>
                  {product.description ||
                    "Flores selecionadas e preparadas com carinho."}
                </p>

                <div className="client-product-bottom">
                  <strong>
                    {formatCurrency(product.price)}
                  </strong>

                  <button>
                    <ShoppingBag size={16} />

                    Adicionar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================
          FAIXA BENEFÍCIOS
      ====================== */}

      <section className="client-benefits-strip">
        <div>
          <Truck size={35} />

          <span>
            <strong>
              Delivery em Jaraguá do Sul
            </strong>

            Com todo o cuidado que suas flores merecem.
          </span>
        </div>

        <div>
          <Gift size={35} />

          <span>
            <strong>
              Presentearia completa
            </strong>

            Flores, chocolates, mimos e muito mais.
          </span>
        </div>

        <div>
          <CalendarDays size={35} />

          <span>
            <strong>
              Para todas as ocasiões
            </strong>

            Aniversários, datas especiais e romances.
          </span>
        </div>
      </section>

      {/* =====================
          PERSONALIZADOS
      ====================== */}

      <section
        className="client-custom"
        id="personalizados"
      >
        <div className="client-custom-visual">
          <span>💐</span>
        </div>

        <div className="client-custom-copy">
          <span className="client-eyebrow">
            BUQUÊS PERSONALIZADOS
          </span>

          <h2>
            Monte do seu jeito
            <Heart
              size={25}
              strokeWidth={1.4}
            />
          </h2>

          <p>
            Escolha suas flores preferidas, as cores,
            o tamanho e os complementos. Criamos um
            buquê único, do seu jeito, para tornar seu
            momento ainda mais especial.
          </p>

          <button className="client-primary-button">
            <MessageCircle size={18} />

            Fazer meu buquê personalizado

            <ArrowRight size={17} />
          </button>
        </div>

        <div className="client-custom-steps">
          <div>
            <span>🌹</span>
            <strong>Você escolhe</strong>
            <small>as flores</small>
          </div>

          <div>
            <span>🎨</span>
            <strong>Definimos</strong>
            <small>a paleta de cores</small>
          </div>

          <div>
            <span>🎁</span>
            <strong>Adicionamos</strong>
            <small>os complementos</small>
          </div>

          <div>
            <span>♡</span>
            <strong>Criamos</strong>
            <small>algo único para você</small>
          </div>
        </div>
      </section>

      {/* =====================
          SOBRE / GARANTIAS
      ====================== */}

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
          <Heart size={25} />

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
            Clientes especiais
          </strong>

          <small>
            que confiam na Rosalina
          </small>
        </div>
      </section>

      {/* =====================
          FOOTER
      ====================== */}

      <footer className="client-footer">
        <div className="client-footer-brand">
          <div className="client-footer-logo">
            🌹

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
            <Camera size={23} />

            <span>
              <strong>
                @rosalinafloricultura_jaragua
              </strong>

              Acompanhe nossas criações
            </span>
          </div>

          <div>
            <MessageCircle size={23} />

            <span>
              <strong>
                (47) 98825-4525
              </strong>

              Fale conosco no WhatsApp
            </span>
          </div>

          <div>
            <MapPin size={23} />

            <span>
              <strong>
                Jaraguá do Sul - SC
              </strong>

              Atendemos toda a região
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}