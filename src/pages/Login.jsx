import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLogged =
      localStorage.getItem("rosalina_auth") === "true" ||
      sessionStorage.getItem("rosalina_auth") === "true";

    if (isLogged) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const validEmail = "admin@rosalina.com";
      const validPassword = "123456";

      if (email === validEmail && password === validPassword) {
        if (remember) {
          localStorage.setItem("rosalina_auth", "true");
        } else {
          sessionStorage.setItem("rosalina_auth", "true");
        }

        navigate("/home", { replace: true });
        return;
      }

      setError("E-mail ou senha incorretos.");
      setLoading(false);
    }, 600);
  }

  return (
    <main className="login-page">
      <section className="login-brand">
        <div className="brand-circle brand-circle-one" />
        <div className="brand-circle brand-circle-two" />

        <div className="brand-side-text">
          <span>FLORES</span>
          <span>PRESENTES</span>
          <span>HISTÓRIAS</span>
          <span>SEMPRE</span>

          <div className="brand-side-line" />

          <span className="brand-side-heart">♡</span>
        </div>

        <div className="brand-main">
          <div className="brand-rose">🌹</div>

          <h1>ROSALINA</h1>

          <span className="brand-subtitle">
            FLORICULTURA E PRESENTEARIA
          </span>

          <p className="brand-slogan">
            Onde sentimentos
            <br />
            ganham flores
            <span> ♡</span>
          </p>
        </div>

        <div className="brand-footer-message">
          <strong>Mais que flores,</strong>
          <span>conectamos pessoas</span>
          <b>♡</b>
        </div>
      </section>

      <section className="login-content">
        <div className="login-decoration decoration-top">
          ❧
        </div>

        <header className="login-location">
          <span>JARAGUÁ DO SUL · SC</span>

          <div />

          <p>
            FLORES HOJE,
            <br />
            HISTÓRIAS SEMPRE.
          </p>
        </header>

        <div className="login-wrapper">
          <div className="login-card">
            <div className="login-header">
              <span className="login-leaf">❧</span>

              <span className="welcome-text">
                BEM-VINDO(A)
              </span>

              <h2>Acesse seu sistema</h2>

              <p>
                Sistema de gerenciamento e controle de vendas
                <br />
                da Rosalina Floricultura e Presentearia.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  E-mail
                </label>

                <div className="input-container">
                  <Mail size={20} />

                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Senha
                </label>

                <div className="input-container">
                  <LockKeyhole size={20} />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Sua senha"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) =>
                      setRemember(
                        event.target.checked
                      )
                    }
                  />

                  <span>Lembrar-me</span>
                </label>

                <button
                  type="button"
                  className="forgot-button"
                >
                  Esqueci minha senha?
                </button>
              </div>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                className="login-button"
                type="submit"
                disabled={loading}
              >
                <LogIn size={22} />

                {loading
                  ? "Entrando..."
                  : "Entrar"}
              </button>
            </form>

            <div className="login-divider">
              <span />
              <b>♡</b>
              <span />
            </div>

            <div className="security-info">
              <ShieldCheck size={27} />

              <div>
                <strong>
                  Acesso restrito a usuários
                  autorizados.
                </strong>

                <span>
                  Seus dados estão protegidos.
                </span>
              </div>
            </div>
          </div>

          <p className="login-quote">
            “Flores tornam tudo mais especial”
            <span> ♡</span>
          </p>
        </div>

        <div className="login-decoration decoration-bottom">
          ❧
        </div>
      </section>
    </main>
  );
}