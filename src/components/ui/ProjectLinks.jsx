import { ArrowUpRight, Code2 } from 'lucide-react';
export default function ProjectLinks({ project }) {
  return (
    <div className="button-row">
      {project.demoUrl ? (
        <a className="button primary" href={project.demoUrl} target="_blank" rel="noreferrer">
          Ver demo <ArrowUpRight size={16} />
        </a>
      ) : (
        <button className="button primary" disabled>
          Demo pendiente <ArrowUpRight size={16} />
        </button>
      )}
      {project.repositoryUrl ? (
        <a
          className="button secondary"
          href={project.repositoryUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Code2 size={16} /> Código
        </a>
      ) : (
        <button className="button secondary" disabled>
          <Code2 size={16} /> Código pendiente
        </button>
      )}
    </div>
  );
}
