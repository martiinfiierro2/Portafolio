import { ArrowUpRight } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import type { Project } from '../../types/portfolio';

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <article
      className="project-card"
      style={{ '--project-accent': project.color } as React.CSSProperties}
    >
      <button
        className="project-card-button"
        id={`open-${project.slug}`}
        onClick={() => onOpen(project)}
        aria-label={`Ver proyecto: ${project.title}`}
      >
        <m.figure
          className="project-cover"
          layoutId={reduced ? undefined : `cover-${project.slug}`}
          transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
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
        <span className="project-card-content">
          <span className="project-card-category">
            <span>
              {project.collection === 'other'
                ? 'Otros'
                : project.collection === 'data'
                  ? 'Data'
                  : project.collection === 'apps'
                    ? 'Apps'
                    : 'Web'}
            </span>
            {project.category}
            <ArrowUpRight size={19} aria-hidden="true" />
          </span>
          <span className="project-card-title">{project.title}</span>
          <span className="project-card-description">{project.description}</span>
        </span>
      </button>
    </article>
  );
}
