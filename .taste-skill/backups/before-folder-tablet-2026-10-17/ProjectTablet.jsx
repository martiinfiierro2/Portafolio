import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import "./ProjectTablet.css";

export default function ProjectTablet() {
  return (
    <figure className="tablet-scene">
      <Link
        className="project-tablet"
        data-ui
        to="/#proyectos"
        state={{ animateProjects: true }}
        aria-label="Explorar proyectos"
      >
        <div className="tablet-screen" aria-hidden="true" />
        <div className="tablet-keys" aria-hidden="true">
          {projects.map((project) => (
            <div
              className="tablet-key"
              key={project.slug}
            >
              <span className="tablet-key-label">
                {project.listTitle ?? project.title}
                <ArrowUpRight size={17} aria-hidden="true" />
              </span>
              <img
                src={project.gallery[0].src}
                alt=""
                width={1200}
                height={675}
                decoding="async"
              />
            </div>
          ))}
        </div>
        <span className="tablet-explore" aria-hidden="true">
          Explorar proyectos <ArrowUpRight size={20} aria-hidden="true" />
        </span>
      </Link>
      <figcaption>Desliza o abre la tablet para explorar.</figcaption>
    </figure>
  );
}
