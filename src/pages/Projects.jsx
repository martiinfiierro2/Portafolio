import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { projects } from "../data/projects";
import Reveal from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

const categories = ["Todos", ...new Set(projects.map((item) => item.category))];

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    return projects.filter((project) => {
      const matchesCategory =
        category === "Todos" || project.category === category;
      const searchableText = [
        project.title,
        project.summary,
        project.category,
        ...(project.stack ?? []),
      ].join(" ").toLocaleLowerCase("es");
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [category, query]);

  return (
    <section
      className="projects projects-page"
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <div className="shell catalog-content">
        <div className="catalog-heading">
          <h1 id="projects-title" tabIndex={-1}>Proyectos</h1>
          <p className="catalog-intro">Aplicaciones, herramientas y experimentos donde combino diseño, lógica y datos.</p>
          <details className="catalog-tools">
            <summary>
              <Search size={17} aria-hidden="true" /> Buscar y filtrar
            </summary>
            <div className="catalog-toolbar">
              <div
                className="catalog-filters"
                role="group"
                aria-label="Filtrar proyectos por categoría"
              >
                {categories.map((item) => (
                  <button
                    className={`catalog-filter${category === item ? " is-active" : ""}`}
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label className="catalog-search" htmlFor="project-search">
                <span className="sr-only">Buscar proyectos</span>
                <input
                  id="project-search"
                  type="search"
                  value={query}
                  placeholder="Nombre o tecnología…"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>
          </details>
        </div>

        <div className="catalog-list">
          {filteredProjects.map((project, index) => (
            <Reveal className="catalog-item" key={project.slug} delay={Math.min(index, 3) * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {(query || category !== "Todos") && (
          <p className="catalog-count" role="status" aria-live="polite">
            {filteredProjects.length} de {projects.length} proyectos
          </p>
        )}

        {filteredProjects.length === 0 && (
          <div className="catalog-empty">
            <h3>No hay proyectos con esta búsqueda.</h3>
            <p>Prueba otro nombre o restablece los filtros.</p>
            <button
              className="catalog-filter"
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("Todos");
              }}
            >
              Mostrar todos los proyectos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
