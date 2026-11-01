import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Navigate, Route, Routes, useLocation, useMatch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionLink from "./components/SectionLink";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import { projects } from "./data/projects";

const sectionRoutes = { "/proyectos": "proyectos", "/sobre-mi": "sobre-mi", "/contacto": "contacto" };

function readTheme() {
  try {
    const saved = localStorage.getItem("mf-theme");
    if (saved === "dark" || saved === "light") return saved === "dark";
  } catch { /* Use the system preference if storage is unavailable. */ }
  return matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function App() {
  const [dark, setDark] = useState(readTheme);
  const location = useLocation();
  const projectRoute = useMatch("/proyectos/:slug");
  const project = projects.find(item => item.slug === projectRoute?.params.slug);
  const legacyTarget = location.pathname === "/"
    ? location.hash.startsWith("#/") ? location.hash.slice(1)
      : ["#trabajo", "#enfoque"].includes(location.hash) ? "/#proyectos" : null
    : null;

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    try { localStorage.setItem("mf-theme", theme); } catch { /* Theme still works without storage. */ }
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const background = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    document.documentElement.style.backgroundColor = background;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", background);
  }, [dark]);

  useEffect(() => {
    if (legacyTarget || sectionRoutes[location.pathname]) return;
    document.title = location.pathname === "/" ? "Martín Fierro — Desarrollador full-stack"
      : `${project?.title ?? "Página no encontrada"} — Martín Fierro`;
    let cancelled = false;
    let frame;
    // Font metrics must settle before measuring a deep section on a fresh visit.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        const anchor = location.hash && document.getElementById(location.hash.slice(1));
        const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : location.state?.scrollBehavior ?? "instant";
        if (anchor) {
          anchor.scrollIntoView({ block: "start", behavior });
          (anchor.querySelector("h1, h2") ?? anchor).focus({ preventScroll: true });
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
          document.querySelector("main h1")?.focus({ preventScroll: true });
        }
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [location, legacyTarget, project?.title]);

  const notFound = <section className="not-found wide"><p>404</p><h1 tabIndex={-1}>Esta ruta no existe.</h1><p>Vuelve a los proyectos para seguir explorando.</p><SectionLink className="button" section="proyectos"><ArrowLeft size={18} aria-hidden="true" />Volver a proyectos</SectionLink></section>;

  return (
    <div className="site" data-theme={dark ? "dark" : "light"}>
      <a className="skip-link" href="#contenido" onClick={event => { event.preventDefault(); document.getElementById("contenido")?.focus(); }}>Saltar al contenido</a>
      <Header dark={dark} onToggleTheme={() => setDark(value => !value)} />
      <main id="contenido" className="site-main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={legacyTarget ? <Navigate to={legacyTarget} replace /> : <Home dark={dark} />} />
          {Object.entries(sectionRoutes).map(([path, section]) => <Route key={path} path={path} element={<Navigate to={`/#${section}`} replace />} />)}
          <Route path="/proyectos/:slug" element={project ? <ProjectDetail key={project.slug} project={project} /> : notFound} />
          <Route path="*" element={notFound} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
