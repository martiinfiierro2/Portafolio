import { useMemo, useState } from "react";
import { ArrowRight, Layers, Search } from "lucide-react";
import { projects } from "../data/projects";
import Reveal from "./Reveal";
import "./Projects.css";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const categories = [
    "Todos",
    ...new Set(projects.map((item) => item.category)),
  ];

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
      ]
        .join(" ")
        .toLocaleLowerCase("es");

      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [category, query]);

  return (
    <section
      className="projects page-screen"
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <div className="shell catalog-content">
        <Reveal className="section-heading catalog-heading">
          <div>
            <p className="eyebrow">PROYECTOS</p>
            <h2 id="projects-title">Construido para explorar.</h2>
          </div>
          <p>Abre un proyecto para conocerlo y probarlo.</p>
        </Reveal>

        <Reveal className="catalog-toolbar">
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
                <span className="catalog-filter-count" aria-hidden="true">
                  {item === "Todos"
                    ? projects.length
                    : projects.filter((project) => project.category === item)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <label className="catalog-search" htmlFor="project-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Buscar proyectos</span>
            <input
              id="project-search"
              type="search"
              value={query}
              placeholder="Buscar un proyecto…"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </Reveal>

        <p className="catalog-count" role="status" aria-live="polite">
          {filteredProjects.length} de {projects.length}{" "}
          {projects.length === 1 ? "proyecto" : "proyectos"}
          {category !== "Todos" ? ` · ${category}` : ""}
        </p>

        <div className="catalog-grid">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <a
                className="catalog-card"
                href={`#/proyectos/${project.slug}`}
                aria-label={`Explorar ${project.title}${project.isExample ? ", proyecto de ejemplo" : ""}`}
              >
                <div
                  className="catalog-preview"
                  data-project={project.slug}
                  aria-hidden="true"
                >
                  {project.gallery?.[0]?.src ? (
                    <img
                      src={project.gallery[0].src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="catalog-preview-placeholder">
                      <Layers size={42} strokeWidth={1.2} />
                      <span>{project.title}</span>
                    </div>
                  )}
                </div>
                <div className="catalog-card-body">
                  <div className="catalog-meta">
                    <span>{project.category}</span>
                    {project.isExample ? (
                      <span className="project-badge is-example">Ejemplo</span>
                    ) : (
                      <span className="project-badge">Proyecto personal</span>
                    )}
                  </div>
                  <h3 className="catalog-card-title">{project.title}</h3>
                  <p>{project.summary}</p>
                  <span className="catalog-card-link">
                    Ver proyecto <ArrowRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="catalog-empty">
            <Search size={28} aria-hidden="true" />
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
