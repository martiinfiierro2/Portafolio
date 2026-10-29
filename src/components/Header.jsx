import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Header.css";

const links = [
  { to: "/", id: "inicio", label: "Inicio" },
  { to: "/proyectos", id: "proyectos", label: "Proyectos" },
  { to: "/sobre-mi", id: "sobre-mi", label: "Sobre mí" },
  { to: "/contacto", id: "contacto", label: "Contacto" },
];

export default function Header({ dark, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const activeSection =
    isHome
      ? "inicio"
      : /^\/(proyectos|demos)(\/|$)/.test(pathname)
        ? "proyectos"
        : pathname === "/sobre-mi"
          ? "sobre-mi"
          : pathname === "/contacto"
            ? "contacto"
            : null;

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnOutsideClick(event) {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className="header" ref={headerRef}>
      <div className="header-inner">
        <Link
          className="wordmark"
          to="/"
          aria-label="Martín Fierro, inicio"
          onClick={() => setMenuOpen(false)}
        >
          MF
        </Link>
        <nav aria-label="Navegación principal" data-open={menuOpen}>
          <button
            className="mobile-menu-toggle"
            type="button"
            ref={menuButtonRef}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
          <ul className="header-links" id="primary-navigation">
            {links.map((link) => (
              <li key={link.id} className="icon-content">
                <Link
                  to={link.to}
                  className={`nav-link nav-${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={
                    activeSection === link.id ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="theme-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={dark}
              onChange={onToggleTheme}
              aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
            />
            <span className="slider" aria-hidden="true" />
          </label>
        </div>
      </div>
    </header>
  );
}
