import { m, useReducedMotion } from 'framer-motion';
import { Boxes, Lightbulb, Layers } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import ProjectLinks from './ProjectLinks';
import ProjectGallery from './ProjectGallery';
export default function ProjectDetail({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  return (
    <article className="project-detail">
      <div className="detail-hero">
        <m.figure
          className="detail-cover"
          layoutId={reduced ? undefined : `cover-${project.slug}`}
          transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={project.cover}
            alt={project.coverAlt}
            width="1200"
            height="900"
            decoding="async"
          />
        </m.figure>
        <header className="detail-heading">
          <p
            className="category-badge"
            style={{ backgroundColor: `${project.color}22`, color: project.color }}
          >
            {project.category}
          </p>
          <h1 className="digital-title" tabIndex={-1}>
            {project.title}
          </h1>
          <p>{project.description}</p>
          <ul className="tech-tags" aria-label="Tecnologías">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </header>
      </div>
      {project.isSample && (
        <p className="sample-notice">
          Ficha de muestra · ilustración conceptual. El contenido y los enlaces reales se
          incorporarán aquí.
        </p>
      )}
      <div className="detail-overview">
        <section>
          <h2>
            <Boxes size={20} aria-hidden="true" />
            Qué hace
          </h2>
          <ul>
            {project.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>
            <Layers size={20} aria-hidden="true" />
            Tecnologías
          </h2>
          <p>{project.technologies.join(', ')}.</p>
          <p className="detail-role">{project.role}</p>
        </section>
        <section>
          <h2>
            <Lightbulb size={20} aria-hidden="true" />
            Qué aprendí
          </h2>
          <ul>
            {project.learnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <details className="technical-notes">
        <summary>Más sobre el desarrollo</summary>
        <div className="detail-notes-grid">
          <section>
            <h2>El reto</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>La solución</h2>
            <p>{project.solution}</p>
          </section>
          <section>
            <h2>Decisiones técnicas</h2>
            <ul>
              {project.decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Arquitectura</h2>
            <ul>
              {project.architecture.map((node) => (
                <li key={node.title}>
                  <strong>{node.title}.</strong> {node.description}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </details>
      {project.media.length > 1 && <ProjectGallery media={project.media} />}
    </article>
  );
}
