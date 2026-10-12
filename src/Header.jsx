import { ArrowUpRight, Moon, Sun } from "lucide-react";

export default function Header({ dark, onToggleTheme }) {
  return (
    <header className="header shell">
      <a className="wordmark" href="#inicio" aria-label="Martín Fierro, inicio">
        mf<span>.</span>
      </a>
      <nav aria-label="Navegación principal">
        <a href="#proyectos">Proyectos</a>
        <a href="#sobre-mi">Sobre mí</a>
        <a className="nav-contact" href="#contacto">
          Hablemos <ArrowUpRight size={15} />
        </a>
      </nav>
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
      >
        {dark ? <Sun size={19} /> : <Moon size={19} />}
      </button>
    </header>
  );
}
