import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useMatch,
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import ProjectDetail from "./components/ProjectDetail";
import DemoPage from "./components/DemoPage";
import Projects from "./components/Projects";
import { projects } from "./data/projects";

function readTheme() {
  try {
    return localStorage.getItem("mf-theme") !== "light";
  } catch {
    return true;
  }
}

export default function App() {
  const [dark, setDark] = useState(readTheme);
  const location = useLocation();
  const projectRoute = useMatch("/proyectos/:slug");
  const demoRoute = useMatch("/demos/:demoId");
  const isHome = location.pathname === "/";
  const project = projects.find(
    (item) => item.slug === (projectRoute?.params.slug ?? demoRoute?.params.demoId),
  );
  const validDemo = projects.some(
    (item) => item.demoHref === `/demos/${demoRoute?.params.demoId}`,
  );
  const legacyTarget = isHome
    ? location.hash.startsWith("#/")
      ? location.hash.slice(1)
      : location.hash === "#proyectos"
        ? "/proyectos"
        : location.hash === "#enfoque"
          ? "/#inicio"
          : null
    : null;

  useEffect(() => {
    try {
      localStorage.setItem("mf-theme", dark ? "dark" : "light");
    } catch {
      // The theme still works when storage is unavailable.
    }
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    const background = getComputedStyle(document.querySelector(".site"))
      .getPropertyValue("--bg")
      .trim();
    document.documentElement.style.backgroundColor = background;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", background);
  }, [dark]);

  useEffect(() => {
    const title = isHome
      ? "Martín Fierro — Ingeniería multimedia & Full-stack"
      : `${location.pathname === "/proyectos" ? "Proyectos" : project?.title ?? "Página no encontrada"} — Martín Fierro`;
    document.title = title;
    if (legacyTarget) return;
    const frame = requestAnimationFrame(() => {
      if (!isHome) {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.querySelector("main h1")?.focus({ preventScroll: true });
      } else if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        target?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [isHome, location.hash, location.key, location.pathname, legacyTarget, project?.title]);

  const notFound = (
    <section className="not-found shell">
      <p className="eyebrow">404 / PÁGINA NO ENCONTRADA</p>
      <h1 tabIndex={-1}>Esta ruta no existe.</h1>
      <p>Vuelve al catálogo para explorar los proyectos disponibles.</p>
      <Link className="button primary" to="/proyectos">
        <ArrowLeft size={17} /> Volver a proyectos
      </Link>
    </section>
  );

  return (
    <div className="site" data-theme={dark ? "dark" : "light"}>
      <a
        className="skip-link"
        href="#contenido"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("contenido")?.focus();
        }}
      >
        Saltar al contenido
      </a>
      <Header dark={dark} onToggleTheme={() => setDark(!dark)} />
      <main id="contenido" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={
              legacyTarget ? (
                <Navigate to={legacyTarget} replace />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/proyectos" element={<Projects standalone />} />
          <Route
            path="/proyectos/:slug"
            element={
              project ? (
                <ProjectDetail key={project.slug} project={project} />
              ) : notFound
            }
          />
          <Route
            path="/demos/:demoId"
            element={
              validDemo ? (
                <DemoPage
                  key={demoRoute.params.demoId}
                  demoId={demoRoute.params.demoId}
                />
              ) : notFound
            }
          />
          <Route path="*" element={notFound} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
