import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import SectionLink from "./SectionLink";
import { contact } from "../data/contact";

const sections = [["inicio", "Inicio"], ["proyectos", "Proyectos"], ["sobre-mi", "Sobre mí"], ["contacto", "Contacto"]];

export default function Header({ dark, onToggleTheme }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const isHome = location.pathname === "/";
  const expanded = open && isHome === open.isHome && location.key === open.key;

  function close() { setOpen(false); }

  useEffect(() => {
    if (!isHome) return;
    let frame;
    function update() {
      frame = null;
      let current = "inicio";
      for (const [id] of sections) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= 180) current = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = "contacto";
      setActive(current);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isHome]);

  useEffect(() => {
    if (!expanded) return;
    function dismiss(event) {
      if (event.type === "keydown") {
        if (event.key !== "Escape") return;
        close();
        menuRef.current?.focus();
      } else if (!headerRef.current?.contains(event.target)) close();
    }
    const desktop = matchMedia("(min-width: 761px)");
    const onResize = () => { if (desktop.matches) close(); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismiss);
      desktop.removeEventListener("change", onResize);
    };
  }, [expanded]);

  return (
    <header className={`header wide${expanded ? " menu-open" : ""}`} data-menu-motion={expanded && open.animate ? "true" : undefined} ref={headerRef}>
      <button ref={menuRef} className="menu-toggle" type="button" aria-expanded={!!expanded} aria-controls="main-navigation"
        onClick={event => setOpen(expanded ? false : { key: location.key, isHome, animate: event.detail > 0 })}>
        {expanded ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}<span>{expanded ? "Cerrar" : "Menú"}</span>
      </button>
      <nav id="main-navigation" aria-label="Navegación principal">
        {sections.map(([id, label]) => (
          <SectionLink section={id} key={id} onClick={close}
            aria-current={(isHome ? active === id : location.pathname.startsWith("/proyectos/") && id === "proyectos") ? "location" : undefined}>
            {label}
          </SectionLink>
        ))}
        <a className="nav-external" href={contact.github} target="_blank" rel="noopener noreferrer" onClick={close}>GitHub <ArrowUpRight aria-hidden="true" /><span className="sr-only"> (nueva pestaña)</span></a>
      </nav>
      <button className="theme" type="button" role="switch" aria-checked={dark} aria-label="Modo oscuro" onClick={onToggleTheme}>
        <span className="switch" aria-hidden="true" />
      </button>
    </header>
  );
}
