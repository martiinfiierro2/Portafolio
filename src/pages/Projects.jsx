import useDocumentTitle from '../hooks/useDocumentTitle';
import useProjectSelection from '../hooks/useProjectSelection';
import ProjectWorkspace from '../components/project-deck/ProjectWorkspace';
export default function Projects() {
  useDocumentTitle('Proyectos');
  const { projects, selectedSlug, selectProject } = useProjectSelection();
  return (
    <div className="projects-page page-container">
      <header className="page-heading">
        <p className="eyebrow">Trabajo & aprendizaje</p>
        <h1 tabIndex={-1}>
          Una colección de ideas.
          <br />{' '}
          <span>Y lo que aprendo construyéndolas.</span>
        </h1>
        <p>Elige una pieza de la baraja para explorar su contexto, su solución y sus decisiones.</p>
      </header>
      <ProjectWorkspace expanded />
      <details className="project-index">
        <summary>
          Índice de proyectos <span>{projects.length} fichas</span>
        </summary>
        <ul>
          {projects.map((project) => (
            <li key={project.slug}>
              <button
                aria-pressed={selectedSlug === project.slug}
                onClick={() => {
                  selectProject(project.slug);
                  document.querySelector('.project-workspace')?.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                      ? 'instant'
                      : 'smooth',
                    block: 'start',
                  });
                }}
              >
                <span>{project.number}</span>
                {project.title}
                <span>{project.isPlaceholder ? 'Muestra' : project.status}</span>
              </button>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
