import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import type { Project } from '../../types/portfolio';
import ProjectLinks from './ProjectLinks';

export default function ProjectIndex({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (project: Project) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <>
      <header className="projects-introduction">
        <p className="eyebrow">
          Ideas llevadas al código / {String(projects.length).padStart(2, '0')}
        </p>
        <h1 className="digital-title" tabIndex={-1}>
          Proyectos
          <br />
          <span>seleccionados.</span>
        </h1>
        <div className="projects-intro-bottom">
          <p>Aplicaciones donde combino desarrollo frontend, backend y diseño de producto.</p>
          <ArrowDown size={23} aria-hidden="true" />
        </div>
      </header>
      {projects.some((project) => project.isSample) && (
        <p className="sample-notice">
          Colección de muestra · las capturas y fichas reales se incorporarán aquí.
        </p>
      )}
      <div className="editorial-projects">
        {projects.map((project) => (
          <article
            className="editorial-project"
            key={project.slug}
            style={{ '--project-accent': project.color } as React.CSSProperties}
          >
            <button
              className="project-image-button"
              onClick={() => onOpen(project)}
              aria-label={`Ver ${project.title}`}
            >
              <m.figure
                className="project-cover"
                layoutId={reduced ? undefined : `cover-${project.slug}`}
                transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={project.cover}
                  alt=""
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </m.figure>
              <span className="image-explore">
                Explorar <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </button>
            <div className="project-editorial-content">
              <p className="project-number">
                {project.number} / {project.category}
                {project.year && ` / ${project.year}`}
              </p>
              <h2>{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <ul className="tech-tags" aria-label={`Tecnologías de ${project.title}`}>
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <button
                id={`open-${project.slug}`}
                className="text-link project-open"
                onClick={() => onOpen(project)}
              >
                Ver proyecto <ArrowUpRight size={19} aria-hidden="true" />
              </button>
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </div>
      {!projects.length && (
        <p className="empty-projects">Estoy preparando la colección. Vuelve pronto.</p>
      )}
    </>
  );
}
