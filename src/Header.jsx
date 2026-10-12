import { ArrowUpRight, Moon, Sun, Terminal } from "lucide-react";

export default function Header({ dark, onToggleTheme }) {
  return (
    <header className="header">
      <div className="shell header-inner">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="Martín Fierro, inicio"
        >
          <Terminal size={22} />
          <span>
            martín<span className="accent">.dev</span>
          </span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#proyectos">
            <span className="nav-index">01</span> Proyectos
          </a>
          <a href="#sobre-mi">
            <span className="nav-index">02</span> Perfil
          </a>
          <a className="nav-contact" href="#contacto">
            Conectar <ArrowUpRight size={14} />
          </a>
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
