import { m, useReducedMotion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import ProjectLinks from './ProjectLinks';
import ProjectGallery from './ProjectGallery';

export default function ProjectDetail({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  return (
    <article className="project-detail">
      <header className="detail-heading">
        <p className="eyebrow">
          {project.number} / {project.category}
        </p>
        <h1 className="digital-title" tabIndex={-1}>
          {project.title}
        </h1>
        <p>{project.description}</p>
        <ProjectLinks project={project} />
      </header>
      <m.figure
        className="detail-cover"
        layoutId={reduced ? undefined : `cover-${project.slug}`}
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={project.cover}
          alt={project.coverAlt}
          width="1200"
          height="800"
          decoding="async"
        />
        <figcaption>
          {project.isSample
            ? 'Ilustración conceptual · captura real pendiente'
            : 'Vista general del proyecto'}
        </figcaption>
      </m.figure>
      {project.isSample && (
        <p className="sample-notice">
          Ficha de muestra. Los textos y el stack son orientativos; no describen una aplicación
          publicada.
        </p>
      )}
      <div className="detail-facts">
        <section>
          <h2>Mi aportación</h2>
          <p>{project.role}</p>
        </section>
        <section>
          <h2>Tecnologías</h2>
          <ul className="tech-tags">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>
      </div>
      <div className="detail-sections">
        <section>
          <span>01</span>
          <h2>El reto</h2>
          <p>{project.problem}</p>
        </section>
        <section>
          <span>02</span>
          <h2>La solución</h2>
          <p>{project.solution}</p>
        </section>
        <section>
          <span>03</span>
          <h2>Funcionalidades</h2>
          <ul>
            {project.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <span>04</span>
          <h2>Decisiones técnicas</h2>
          <ul>
            {project.decisions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className="architecture-section">
        <p className="eyebrow">
          <Layers size={15} aria-hidden="true" />
          Una mirada a la arquitectura
        </p>
        <ol>
          {project.architecture.map((node, index) => (
            <li key={node.title}>
              <div>
                <h3>{node.title}</h3>
                <p>{node.description}</p>
              </div>
              {index < project.architecture.length - 1 && (
                <ArrowRight size={20} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
        {project.isSample && (
          <small>Esquema orientativo; sustituir por la arquitectura real.</small>
        )}
      </section>
      <section className="detail-learnings">
        <p className="eyebrow">Después de construir</p>
        <h2>Lo que me llevo.</h2>
        <ul>
          {project.learnings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <ProjectGallery media={project.media} />
    </article>
  );
}
