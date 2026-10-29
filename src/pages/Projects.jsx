import { useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

const categories = ["Todos", ...new Set(projects.map((item) => item.category))];

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const searchRef = useRef(null);
  const filtering = Boolean(query || category !== "Todos");
  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    return projects.filter((project) => {
      const matchesCategory = category === "Todos" || project.category === category;
      const searchableText = [project.title, project.summary, project.category, ...(project.stack ?? [])].join(" ").toLocaleLowerCase("es");
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [category, query]);

  function resetFilters() { setQuery(""); setCategory("Todos"); searchRef.current?.focus(); }

  return (
    <section className="projects projects-page" id="proyectos" aria-labelledby="projects-title">
      <div className="shell catalog-content">
        <div className="catalog-heading">
          <h1 id="projects-title" tabIndex={-1}>Proyectos</h1>
          <p className="catalog-intro">Aplicaciones, herramientas y experimentos donde combino diseño, lógica y datos.</p>
        </div>
        <div className="catalog-toolbar">
          <div className="catalog-filters" role="group" aria-label="Filtrar proyectos por categoría">
            {categories.map((item) => <button className={`catalog-filter${category === item ? " is-active" : ""}`} key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <label className="catalog-search" htmlFor="project-search">
            <Search size={18} aria-hidden="true" /><span className="sr-only">Buscar proyectos</span>
            <input ref={searchRef} id="project-search" type="search" value={query} placeholder="Nombre o tecnología…" onChange={(event) => setQuery(event.target.value)} />
          </label>
        </div>
        <div className="catalog-results-info">
          <p className="catalog-count" role="status" aria-live="polite">{filtering ? `${filteredProjects.length} de ${projects.length} proyectos` : `${projects.length} proyectos para explorar`}</p>
          {filtering && <button className="catalog-reset" type="button" onClick={resetFilters}>Limpiar filtros <X size={16} aria-hidden="true" /></button>}
        </div>
        <div className="catalog-list" data-filtering={filtering}>
          {filteredProjects.map((project) => <div className="catalog-item" key={project.slug}><ProjectCard project={project} /></div>)}
        </div>
        {filteredProjects.length === 0 && <div className="catalog-empty"><Search size={28} aria-hidden="true" /><h2>Sin resultados</h2><p>No hay proyectos con esta búsqueda. Prueba otro nombre o tecnología.</p><button className="button primary" type="button" onClick={resetFilters}>Mostrar todos</button></div>}
      </div>
    </section>
  );
}
