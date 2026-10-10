import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import TechTags from '../ui/TechTags';
import ProjectLinks from '../ui/ProjectLinks';
import ProjectMedia from './ProjectMedia';
export default function ProjectInspector({ project, index, total, expanded = false, onOpen }) {
  return (
    <article
      className={`project-inspector${expanded ? ' expanded' : ''}`}
      aria-labelledby="inspector-title"
    >
      <div className="inspector-topline">
        <span>
          <Star size={13} />
          {project.featured ? 'Proyecto destacado' : 'En la colección'}
        </span>
        <span>
          {index + 1} / {total}
        </span>
      </div>
      <p className="sample-label">
        {project.isPlaceholder ? 'Ficha de muestra · datos por sustituir' : project.type}
      </p>
      <h2 id="inspector-title">{project.title}</h2>
      <p className="inspector-description">{project.shortDescription}</p>
      <TechTags technologies={project.technologies} />
      {project.isPlaceholder && <p className="data-note">{project.technologyNote}</p>}
      <ProjectLinks project={project} />
      <dl className="project-facts">
        <div>
          <dt>Rol</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Tipo</dt>
          <dd>{project.type}</dd>
        </div>
        <div>
          <dt>Estado</dt>
          <dd>{project.status}</dd>
        </div>
      </dl>
      {expanded && (
        <div className="inspector-context">
          <h3>El problema</h3>
          <p>{project.problem}</p>
          <h3>La propuesta</h3>
          <p>{project.solution}</p>
        </div>
      )}
      <ProjectMedia project={project} />
      <Link
        className="text-link inspector-link"
        to={`/projects/${project.slug}`}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          onOpen(project);
        }}
      >
        Ver proyecto <ArrowRight size={17} />
      </Link>
    </article>
  );
}
