import { useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  function closeOnEscape(event) {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggleRef.current?.focus();
    }
  }

  return (
    <header className="site-header container" onKeyDown={closeOnEscape}>
      <a className="brand" href="#inicio" aria-label="Martín Fierro, inicio">
        <span className="brand-mark" aria-hidden="true">m.</span>
        <span>{profile.name}</span>
      </a>
      <span className="header-role">{profile.role}</span>
      <button ref={toggleRef} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navegación principal">
        <a href="#proyectos" onClick={() => setOpen(false)}>Proyectos</a>
        <a href="#sobre-mi" onClick={() => setOpen(false)}>Sobre mí</a>
        <a href="#contacto" onClick={() => setOpen(false)}>Contacto <ArrowUpRight size={15} /></a>
        <a className="variant-link" href="/disquetes" onClick={() => setOpen(false)}>Comparar con disquetes <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  );
}
