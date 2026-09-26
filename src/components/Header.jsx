import { Bell, UserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-welcome">
        <span>Bem-vindo(a)</span>

        <strong>Rosalina Floricultura</strong>
      </div>

      <div className="header-actions">
        <button
          className="header-icon-button"
          aria-label="Notificações"
        >
          <Bell size={20} />
        </button>

        <div className="header-user">
          <div className="header-avatar">
            <UserRound size={19} />
          </div>

          <div>
            <strong>Administrador</strong>
            <span>Rosalina</span>
          </div>
        </div>
      </div>
    </header>
  );
}