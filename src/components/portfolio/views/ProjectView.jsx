import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import TechnologyList from '../../TechnologyList';

export default function ProjectView({ project, onBack, busy }) {
  return (
    <article className="floppy-project" aria-labelledby="floppy-project-title">
      <button className="floppy-back" disabled={busy} onClick={onBack}>
        <ArrowLeft size={15} />
        Volver a los discos
      </button>
      <div className="floppy-project-grid">
        <div className="floppy-project-intro">
          <p className="floppy-kicker">
            <span className="floppy-project-number">{project.number}</span>Proyecto de muestra
          </p>
          <h1 id="floppy-project-title" tabIndex={-1}>
            {project.title}
          </h1>
          <p className="floppy-lead">{project.description}</p>
          <TechnologyList technologies={project.technologies} label="Tecnologías de ejemplo" />
          <div className="floppy-actions">
            <button className="floppy-button" disabled>
              Demo pendiente <ArrowUpRight size={16} />
            </button>
            <button className="floppy-button" disabled>
              Código pendiente <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
        <div className="floppy-project-details">
          <section>
            <h2>Qué hace</h2>
            <ul>
              {project.features.map((feature, index) => (
                <li key={feature}>
                  <span className="floppy-feature-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Mi aportación</h2>
            <p>
              Aquí explicaré mi trabajo, las decisiones técnicas y los aprendizajes del proyecto.
            </p>
            <small>Contenido provisional; no representa un proyecto publicado.</small>
          </section>
        </div>
      </div>
    </article>
  );
}
