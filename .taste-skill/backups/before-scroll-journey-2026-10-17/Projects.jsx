import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers, Search } from "lucide-react";
import { projects } from "../data/projects";
import Reveal from "./Reveal";
import "./Projects.css";

const categories = ["Todos", ...new Set(projects.map((item) => item.category))];

export default function Projects({ standalone = false }) {
  const Heading = standalone ? "h1" : "h2";
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
      className={`projects${standalone ? " projects-page" : ""}`}
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <div className="shell catalog-content">
        <Reveal className="catalog-heading">
          <Heading id="projects-title" tabIndex={standalone ? -1 : undefined}>Proyectos</Heading>
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
            <p className="catalog-count" role="status" aria-live="polite">
              {filteredProjects.length} de {projects.length} proyectos
            </p>
          </details>
        </Reveal>

        <div className="catalog-list">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <article>
                <Link
                  className="catalog-row"
                  to={`/proyectos/${project.slug}`}
                  aria-label={`Ver ${project.title}${project.isExample ? ", proyecto de ejemplo" : ""}`}
                >
                  <div className="catalog-preview" data-project={project.slug} aria-hidden="true">
                    {project.gallery?.[0]?.src ? (
                      <img
                        src={project.gallery[0].src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={1200}
                        height={675}
                      />
                    ) : (
                      <Layers size={36} strokeWidth={1.2} />
                    )}
                  </div>
                  <div className="catalog-row-copy">
                    <h3>{project.listTitle ?? project.title}</h3>
                    <p>{project.listSummary ?? project.summary}</p>
                  </div>
                  <ArrowUpRight className="catalog-arrow" size={32} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

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
