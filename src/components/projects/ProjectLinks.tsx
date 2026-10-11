import { ArrowUpRight, GitBranch } from 'lucide-react';
import type { Project } from '../../types/portfolio';

export default function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.repositoryUrl ? (
        <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">
          <GitBranch size={16} aria-hidden="true" />
          GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ) : (
        <span className="pending-link">
          <GitBranch size={15} aria-hidden="true" />
          GitHub pendiente
        </span>
      )}
      {project.demoUrl && (
        <a className="text-link" href={project.demoUrl} target="_blank" rel="noreferrer">
          Ver demo <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
