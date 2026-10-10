import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../navigation/Header';
import Footer from './Footer';
import { profile } from '../../data/profile';
export default function Layout() {
  const { pathname, hash } = useLocation();
  const previous = useRef(pathname),
    mainRef = useRef(null);
  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'instant'
            : 'smooth',
        }),
      );
      previous.current = pathname;
      return () => cancelAnimationFrame(frame);
    }
    if (previous.current === pathname) return;
    previous.current = pathname;
    window.scrollTo({ top: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() =>
      mainRef.current?.querySelector('h1')?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <Header profile={profile} />
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
