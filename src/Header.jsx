import { Moon, Sun } from "lucide-react";
import useActiveSection from "./hooks/useActiveSection";

const links = [
  { href: "#enfoque", id: "enfoque", label: "Enfoque" },
  { href: "#proyectos", id: "proyectos", label: "Proyectos" },
  { href: "#sobre-mi", id: "sobre-mi", label: "Sobre mí" },
];

export default function Header({ dark, onToggleTheme, page }) {
  const visibleSection = useActiveSection(page === "home");
  const activeSection =
    page === "home"
      ? visibleSection
      : ["proyectos", "demos"].includes(page)
        ? "proyectos"
        : null;

  return (
    <header className="header">
      <div className="shell header-inner">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="Martín Fierro, inicio"
        >
          Martín Fierro
        </a>
        <nav aria-label="Navegación principal">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link nav-${link.id}`}
              aria-current={activeSection === link.id ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
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
