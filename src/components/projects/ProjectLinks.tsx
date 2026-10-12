import { ArrowUpRight, Code2 } from 'lucide-react';
import type { Project } from '../../types/portfolio';
export default function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.demoUrl ? (
        <a className="button primary" href={project.demoUrl} target="_blank" rel="noreferrer">
          Ver demo <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      ) : (
        <button className="button primary" disabled>
          Demo pendiente <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      )}
      {project.repositoryUrl ? (
        <a
          className="button secondary"
          href={project.repositoryUrl}
          target="_blank"
          rel="noreferrer"
        >
          Ver código <Code2 size={17} aria-hidden="true" />
        </a>
      ) : (
        <button className="button secondary" disabled>
          Código pendiente <Code2 size={17} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
