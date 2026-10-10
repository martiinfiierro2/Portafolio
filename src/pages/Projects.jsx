import useDocumentTitle from '../hooks/useDocumentTitle';
import ProjectWorkspace from '../components/project-deck/ProjectWorkspace';
export default function Projects() {
  useDocumentTitle('Proyectos');
  return (
    <div className="projects-page page-container" style={{ viewTransitionName: 'portfolio-scene' }}>
      <h1 className="sr-only" tabIndex={-1}>
        Proyectos
      </h1>
      <ProjectWorkspace />
    </div>
  );
}
