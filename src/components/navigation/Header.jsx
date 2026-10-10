import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { m, useReducedMotion } from 'framer-motion';
import { Menu, ArrowUpRight } from 'lucide-react';
import MobileMenu from './MobileMenu';
import usePortfolioNavigation from '../../hooks/usePortfolioNavigation';
const links = [
  ['/', 'Inicio'],
  ['/#proyectos', 'Proyectos'],
  ['/#cv', 'CV'],
  ['/#contacto', 'Contacto'],
];
export default function Header({ profile }) {
  const location = useLocation();
  const navigateTo = usePortfolioNavigation();
  const follow = (event, to) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateTo(to);
  };
  const [menu, setMenu] = useState({ path: location.pathname, open: false });
  const reduced = useReducedMotion();
  const open = menu.path === location.pathname && menu.open;
  const close = () => setMenu({ path: location.pathname, open: false });
  return (
    <>
      <header className="site-header" style={{ viewTransitionName: 'site-header' }}>
        <div className="header-inner">
          <Link to="/" className="brand" onClick={(event) => follow(event, '/')}>
            <span className="wordmark">
              MF<span>.</span>
            </span>
            <span className="brand-name">{profile.name}</span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                onClick={(event) => follow(event, to)}
                aria-current={
                  location.pathname === '/' &&
                  (location.hash ? to.endsWith(location.hash) : to === '/')
                    ? 'location'
                    : undefined
                }
              >
                {label}
                {location.pathname === '/' &&
                  (location.hash ? to.endsWith(location.hash) : to === '/') && (
                    <m.span
                      className="nav-indicator"
                      layoutId="navigation-indicator"
                      transition={{ duration: reduced ? 0 : 0.22 }}
                    />
                  )}
              </Link>
            ))}
          </nav>
          <Link to="/#contacto" className="header-cta">
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
      <MobileMenu open={open} onClose={close} profile={profile} onNavigate={follow} />
    </>
  );
}
