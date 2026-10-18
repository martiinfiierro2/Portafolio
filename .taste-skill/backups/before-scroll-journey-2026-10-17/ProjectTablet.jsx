import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import "./ProjectTablet.css";

export default function ProjectTablet() {
  return (
    <figure className="tablet-scene">
      <div className="project-tablet" data-ui>
        <nav className="tablet-keys" aria-label="Acceso directo a los proyectos">
          {projects.map((project) => (
            <Link
              className="tablet-key"
              key={project.slug}
              to={`/proyectos/${project.slug}`}
              aria-label={`Abrir proyecto ${project.listTitle ?? project.title}`}
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
            </Link>
          ))}
        </nav>
        <Link className="tablet-explore" to="/proyectos">
          Explorar proyectos <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>
      <figcaption>Elige una tecla. Descubre lo que hay detrás.</figcaption>
    </figure>
  );
}
