import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import Bio from "./Bio";
import Footer from "./Footer";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import DemoPage from "./components/DemoPage";
import About from "./components/About";
import { projects } from "./data/projects";
import useHashRoute from "./hooks/useHashRoute";

function readTheme() {
  try {
    return localStorage.getItem("mf-theme") !== "light";
  } catch {
    return true;
  }
}

export default function App() {
  const [dark, setDark] = useState(readTheme);
  const route = useHashRoute();
  const project = projects.find((item) => item.slug === route.slug);
  const validDemo = projects.some(
    (item) => item.demoHref === `#/demos/${route.slug}`,
  );

  useEffect(() => {
    try {
      localStorage.setItem("mf-theme", dark ? "dark" : "light");
    } catch {
      // The theme still works when storage is unavailable.
    }
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const title =
      route.page === "home"
        ? "Martín Fierro — Ingeniería multimedia & Full-stack"
        : `${project?.title ?? "Proyecto"} — Martín Fierro`;
    document.title = title;
    const frame = requestAnimationFrame(() => {
      if (route.page !== "home") {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.querySelector("main h1")?.focus({ preventScroll: true });
      } else if (route.hash && !route.hash.startsWith("#/")) {
        const target = document.getElementById(route.hash.slice(1));
        target?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [route.page, route.slug, route.hash, project?.title]);

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
        {route.page === "home" ? (
          <>
            <Bio />
            <Projects />
            <About />
          </>
        ) : route.page === "proyectos" && project ? (
          <ProjectDetail key={project.slug} project={project} />
        ) : route.page === "demos" && validDemo ? (
          <DemoPage demoId={route.slug} />
        ) : (
          <section className="not-found shell">
            <p className="eyebrow">404 / PROYECTO NO ENCONTRADO</p>
            <h1 tabIndex={-1}>Esta ruta no existe.</h1>
            <p>Vuelve al catálogo para explorar los proyectos disponibles.</p>
            <a className="button primary" href="#proyectos">
              <ArrowLeft size={17} /> Volver a proyectos
            </a>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
