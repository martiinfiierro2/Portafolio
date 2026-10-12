import type { Project } from '../../types/portfolio';
import ProjectCard from './ProjectCard';
export type ProjectFilter = 'all' | Project['collection'];
const projectFilters: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'web', label: 'Web' },
  { id: 'apps', label: 'Apps' },
  { id: 'data', label: 'Data' },
  { id: 'other', label: 'Otros' },
];
interface Props {
  projects: Project[];
  onOpen: (project: Project) => void;
  filter: ProjectFilter;
  onFilter: (filter: ProjectFilter) => void;
}
export default function ProjectIndex({ projects, onOpen, filter, onFilter }: Props) {
  const visible = projects.filter((project) => filter === 'all' || project.collection === filter);
  return (
    <>
      <header className="projects-introduction">
        <p className="eyebrow">Ideas llevadas al código</p>
        <h1 className="digital-title" tabIndex={-1}>
          Proyectos<span>.</span>
        </h1>
      </header>
      <div className="project-filters" role="group" aria-label="Filtrar proyectos">
        {projectFilters.map((item) => (
          <button key={item.id} aria-pressed={filter === item.id} onClick={() => onFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <p className="collection-status" role="status">
        {visible.length} {visible.length === 1 ? 'proyecto' : 'proyectos'}
        {projects.some((project) => project.isSample) && ' · Colección de muestra'}
      </p>
      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} onOpen={onOpen} />
        ))}
      </div>
      {!visible.length && (
        <p className="empty-projects">Todavía no hay proyectos en esta categoría.</p>
      )}
    </>
  );
}
