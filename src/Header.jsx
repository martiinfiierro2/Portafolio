import { Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useActiveSection from "./hooks/useActiveSection";
import "./Header.css";

const links = [
  { to: "/#inicio", id: "inicio", label: "Inicio" },
  { to: "/#proyectos", id: "proyectos", label: "Proyectos" },
  { to: "/#sobre-mi", id: "sobre-mi", label: "Sobre mí" },
];

export default function Header({ dark, onToggleTheme }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const visibleSection = useActiveSection(isHome);
  const activeSection =
    isHome
      ? visibleSection
      : /^\/(proyectos|demos)\//.test(pathname)
        ? "proyectos"
        : null;

  return (
    <header className="header">
      <div className="header-inner">
        <Link
          className="wordmark"
          to="/#inicio"
          aria-label="Martín Fierro, inicio"
        >
          MF
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="example-1">
            {links.map((link) => (
              <li key={link.id} className="icon-content">
                <Link
                  to={link.to}
                  className={`nav-link nav-${link.id}`}
                  aria-current={
                    activeSection === link.id ? "location" : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
