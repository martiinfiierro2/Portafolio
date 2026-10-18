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
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProjectDetail from "./pages/ProjectDetail";
import DemoPage from "./pages/DemoPage";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { projects } from "./data/projects";

const pageTitles = {
  "/": "Martín Fierro — Ingeniería multimedia & Full-stack",
  "/proyectos": "Proyectos — Martín Fierro",
  "/sobre-mi": "Sobre mí — Martín Fierro",
  "/contacto": "Contacto — Martín Fierro",
};

const legacyPages = {
  "#inicio": "/",
  "#enfoque": "/",
  "#proyectos": "/proyectos",
  "#sobre-mi": "/sobre-mi",
  "#contacto": "/contacto",
};

function readTheme() {
  try {
    return localStorage.getItem("mf-theme") === "dark";
  } catch {
    return false;
  }
}

export default function App() {
  const [dark, setDark] = useState(readTheme);
  const location = useLocation();
  const projectRoute = useMatch("/proyectos/:slug");
  const demoRoute = useMatch("/demos/:demoId");
  const isHome = location.pathname === "/";
  const project = projectRoute
    ? projects.find((item) => item.slug === projectRoute.params.slug)
    : projects.find((item) => item.demoHref === `/demos/${demoRoute?.params.demoId}`);
  const validDemo = projects.some(
    (item) => item.demoHref === `/demos/${demoRoute?.params.demoId}`,
  );
  const legacyTarget = isHome
    ? location.hash.startsWith("#/")
      ? location.hash.slice(1)
      : legacyPages[location.hash] ?? null
    : null;
  const pageName = isHome
    ? "home"
    : location.pathname === "/proyectos"
      ? "projects"
      : location.pathname === "/sobre-mi"
        ? "about"
        : location.pathname === "/contacto"
          ? "contact"
          : "detail";

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
    if (legacyTarget) return;
    document.title = pageTitles[location.pathname]
      ?? `${project?.title ?? "Página no encontrada"} — Martín Fierro`;
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      const heading = document.querySelector("main h1")
        ?? document.getElementById("contenido");
      heading?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.pathname, legacyTarget, project?.title]);

  const notFound = (
    <section className="not-found shell">
      <p>404</p>
      <h1 tabIndex={-1}>Esta ruta no existe.</h1>
      <p>Vuelve al catálogo para explorar los proyectos disponibles.</p>
      <Link className="button primary" to="/proyectos">
        <ArrowLeft size={17} /> Volver a proyectos
      </Link>
    </section>
  );

  return (
    <div className="site" data-theme={dark ? "dark" : "light"} data-page={pageName}>
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
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
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
