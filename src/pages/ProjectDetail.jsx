import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useProjectSelection from '../hooks/useProjectSelection';
import useProjectNavigation from '../hooks/useProjectNavigation';
import useDocumentTitle from '../hooks/useDocumentTitle';
import ProjectMedia from '../components/project-deck/ProjectMedia';
import ProjectLinks from '../components/ui/ProjectLinks';
import TechTags from '../components/ui/TechTags';
import ArchitectureDiagram from '../components/ui/ArchitectureDiagram';
import NotFound from './NotFound';
export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects } = useProjectSelection();
  const project = projects.find((item) => item.slug === slug);
  const { backToProjects } = useProjectNavigation();
  useDocumentTitle(project?.title ?? 'Proyecto no encontrado');
  if (!project) return <NotFound project />;
  return (
    <article className="case-study page-container" style={{ '--project-color': project.color }}>
      <Link
        className="text-link back-link"
        to="/projects"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          backToProjects(project);
        }}
      >
        <ArrowLeft size={16} />
        Todos los proyectos
      </Link>
      <header className="case-heading">
        <div>
          <p className="eyebrow">
            {project.number} / {project.title}
          </p>
          <h1 tabIndex={-1}>{project.shortDescription}</h1>
          <p className="sample-label">
            {project.isPlaceholder ? 'Ficha de muestra · contenido por documentar' : project.type}
          </p>
        </div>
        <ProjectLinks project={project} />
      </header>
      <ProjectMedia key={project.slug} project={project} large />
      <div className="case-body">
        <aside className="case-sidebar">
          <p className="eyebrow">En esta pieza</p>
          <nav aria-label="Secciones del proyecto">
            {[
              'Contexto',
              'Solución',
              'Funcionalidades',
              'Arquitectura',
              'Tecnologías',
              'Decisiones técnicas',
              'Capturas',
              'Aprendizajes',
            ].map((label, index) => (
              <a href={`#section-${index + 1}`} key={label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <div className="case-sections">
          <section id="section-1">
            <p className="section-number">01 — Contexto</p>
            <h2>El punto de partida.</h2>
            <p>{project.problem}</p>
            <p className="data-note">{project.fullDescription}</p>
          </section>
          <section id="section-2">
            <p className="section-number">02 — Solución</p>
            <h2>De la idea a la aplicación.</h2>
            <p>{project.solution}</p>
          </section>
          <section id="section-3">
            <p className="section-number">03 — Funcionalidades</p>
            <h2>Lo esencial.</h2>
            <ul>
              {project.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="section-4">
            <p className="section-number">04 — Arquitectura</p>
            <h2>Cómo encajan las piezas.</h2>
            <ArchitectureDiagram nodes={project.architecture} />
            <p className="data-note">{project.architectureNote}</p>
          </section>
          <section id="section-5">
            <p className="section-number">05 — Tecnologías</p>
            <h2>Las herramientas.</h2>
            <TechTags technologies={project.technologies} />
            <p className="data-note">{project.technologyNote}</p>
          </section>
          <section id="section-6">
            <p className="section-number">06 — Decisiones técnicas</p>
            <h2>El porqué del cómo.</h2>
            <ul>
              {project.decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="section-7">
            <p className="section-number">07 — Capturas</p>
            <h2>Una mirada más cerca.</h2>
            <div className="case-captures">
              {project.media
                .filter((item) => item.type === 'image')
                .map((item) => (
                  <figure key={item.id}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      width="640"
                      height="480"
                    />
                    <figcaption>{item.caption}</figcaption>
                  </figure>
                ))}
            </div>
          </section>
          <section id="section-8">
            <p className="section-number">08 — Aprendizajes</p>
            <h2>Lo que me llevo.</h2>
            <ul>
              {project.learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className="case-bottom">
        <button className="button secondary" onClick={() => backToProjects(project)}>
          <ArrowLeft size={16} />
          Volver a la colección
        </button>
        <Link className="text-link" to="/contact">
          Hablemos de proyectos →
        </Link>
      </div>
    </article>
  );
}
