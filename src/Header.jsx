import { Moon, Sun } from "lucide-react";

export default function Header({ dark, onToggleTheme }) {
  return (
    <header className="header">
      <div className="shell header-inner">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="Martín Fierro, inicio"
        >
          <span>
            mf<span className="accent">.</span>
          </span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#proyectos">Proyectos</a>
          <a href="#sobre-mi">Sobre mí</a>
        </nav>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
