import { ArrowUpRight, Code2, Layers, ListTodo } from "lucide-react";
import CreativeWorkspace from "./CreativeWorkspace";
import { projects } from "../data/projects";

const previewProjects = projects
  .filter((project) => project.slug !== "portfolio")
  .slice(0, 2);
const categoryIcons = { Web: ListTodo, Backend: Code2, Multimedia: Layers };

export default function HeroShowcase() {
  return (
    <a
      className="hero-showcase"
      href="#proyectos"
      aria-label="Abrir mis proyectos"
    >
      <div className="showcase-collage" aria-hidden="true">
        <div className="showcase-window showcase-projects">
          <div className="showcase-bar">
            <span className="showcase-dots">
              <i />
              <i />
              <i />
            </span>
            <span>Para explorar</span>
            <ArrowUpRight size={15} />
          </div>
          <div className="showcase-project-list">
            {previewProjects.map((project) => {
              const Icon = categoryIcons[project.category] ?? Layers;
              return (
                <div key={project.slug}>
                  <span className="showcase-project-icon">
                    <Icon size={22} />
                  </span>
                  <span>
                    <strong>{project.title}</strong>
                    <small>{project.type}</small>
                  </span>
                  <ArrowUpRight size={16} />
                </div>
              );
            })}
            {previewProjects.length === 0 && (
              <p className="showcase-empty">
                Cada proyecto empieza con una idea.
              </p>
            )}
          </div>
          <span className="showcase-example">
            {previewProjects.some((project) => project.isExample)
              ? "Incluye demos de ejemplo"
              : "Un vistazo a mis proyectos"}
          </span>
        </div>
        <div className="showcase-window showcase-main">
          <div className="showcase-bar">
            <span className="showcase-dots">
              <i />
              <i />
              <i />
            </span>
            <span>Mi espacio creativo</span>
            <span className="showcase-window-mark">mf.</span>
          </div>
          <CreativeWorkspace />
          <div className="showcase-caption">
            <span>Ideas que toman forma.</span>
            <ArrowUpRight size={17} />
          </div>
        </div>
        <span className="showcase-sticker">{"</>"}</span>
        <span className="showcase-orbit" />
      </div>
    </a>
  );
}
