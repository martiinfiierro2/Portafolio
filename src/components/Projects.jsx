import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Code2,
  Layers,
  ListTodo,
  Search,
  Terminal,
} from "lucide-react";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

const projectVisuals = {
  portfolio: {
    icon: Code2,
    file: "portfolio.jsx",
    lines: ["<Profile />", "<ProjectCatalog />", "<ProjectDetail />"],
    footer: "COMPONENTES → EXPERIENCIA",
  },
  taskflow: {
    icon: ListTodo,
    file: "taskflow.js",
    lines: ['status: "pending"', 'status: "in-progress"', 'status: "done"'],
    footer: "IDEA → TAREA → PROGRESO",
  },
  "pulse-api": {
    icon: Activity,
    file: "response.json",
    lines: ['"status": 200,', '"data": { … },', '"mode": "simulated"'],
    footer: "REQUEST → RESPONSE → JSON",
  },
  "media-lab": {
    icon: Layers,
    file: "media.collection",
    lines: ["collection.filter()", "piece.open()", "view.explore()"],
    footer: "CONTENIDO → INTERACCIÓN",
  },
};

function ProjectVisual({ project }) {
  const visual = projectVisuals[project.slug] ?? projectVisuals.portfolio;
  const Icon = visual.icon;

  return (
    <div
      className="catalog-visual"
      data-variant={project.slug}
      aria-hidden="true"
    >
      <div className="catalog-visual-top">
        <span>
          <span />
          <span />
          <span />
        </span>
        <span>{visual.file}</span>
      </div>
      <div className="catalog-visual-code">
        {visual.lines.map((line, index) => (
          <div className="catalog-code-row" key={line}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <code>{line}</code>
          </div>
        ))}
      </div>
      <div className="catalog-visual-node">
        <Icon size={30} strokeWidth={1.4} />
      </div>
      <div className="catalog-visual-footer">
        <span>{visual.footer}</span>
        <span>/{project.category.toLowerCase()}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const categories = ["Todos", ...new Set(projects.map((item) => item.category))];

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
      className="projects section shell"
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <Reveal className="section-heading catalog-heading">
        <div>
          <p className="eyebrow">01 / PROYECTOS</p>
          <h2 id="projects-title">Código en contexto.</h2>
        </div>
        <p>
          Explora cada proyecto: qué resuelve, cómo se construye y cómo funciona.
          Las demos de ejemplo están identificadas.
        </p>
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
            placeholder="Buscar nombre o tecnología…"
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
              <ProjectVisual project={project} />
              <div className="catalog-card-body">
                <div className="catalog-meta">
                  <span>{project.category}</span>
                  {project.isExample ? (
                    <span className="catalog-badge is-example">Ejemplo</span>
                  ) : (
                    <span className="catalog-badge">Proyecto personal</span>
                  )}
                </div>
                <h3 className="catalog-card-title">{project.title}</h3>
                <p>{project.summary}</p>
                {project.stack?.length > 0 && (
                  <ul className="catalog-tags" aria-label="Tecnologías">
                    {project.stack.slice(0, 3).map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                )}
                <span className="catalog-card-link">
                  Explorar proyecto <ArrowRight size={17} aria-hidden="true" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="catalog-empty">
          <Terminal size={28} aria-hidden="true" />
          <h3>No hay proyectos con esta búsqueda.</h3>
          <p>Prueba otra tecnología o restablece los filtros.</p>
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
    </section>
  );
}
