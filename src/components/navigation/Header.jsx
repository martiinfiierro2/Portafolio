import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { m, useReducedMotion } from 'framer-motion';
import { Menu, ArrowUpRight } from 'lucide-react';
import MobileMenu from './MobileMenu';
const links = [
  ['/', 'Inicio'],
  ['/projects', 'Proyectos'],
  ['/cv', 'CV'],
  ['/contact', 'Contacto'],
];
export default function Header({ profile }) {
  const location = useLocation();
  const [menu, setMenu] = useState({ path: location.pathname, open: false });
  const reduced = useReducedMotion();
  const open = menu.path === location.pathname && menu.open;
  const close = () => setMenu({ path: location.pathname, open: false });
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="wordmark">
              MF<span>.</span>
            </span>
            <span className="brand-name">{profile.name}</span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'}>
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <m.span
                        className="nav-indicator"
                        layoutId="navigation-indicator"
                        transition={{ duration: reduced ? 0 : 0.22 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <Link to="/contact" className="header-cta">
            Hablemos <ArrowUpRight size={15} />
          </Link>
          <button
            className="icon-button menu-toggle"
            aria-label="Abrir menú"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setMenu({ path: location.pathname, open: true })}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} profile={profile} />
    </>
  );
}
