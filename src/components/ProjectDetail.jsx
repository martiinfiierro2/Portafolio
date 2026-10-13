import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Code2,
  Maximize2,
  Play,
  X,
} from "lucide-react";
import Reveal from "./Reveal";
import "./ProjectDetail.css";

export default function ProjectDetail({ project }) {
  const [activeImage, setActiveImage] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (activeImage && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [activeImage]);

  function closeViewer() {
    dialogRef.current?.close();
  }

  function handleClose() {
    setActiveImage(null);
    triggerRef.current?.focus();
  }

  if (!project) return null;

  const hasFacts = Boolean(
    project.type || project.role || project.status || project.stack?.length,
  );

  return (
    <article className="detail-shell shell" aria-labelledby="project-title">
      <a className="detail-back" href="#proyectos">
        <ArrowLeft size={17} aria-hidden="true" /> Volver a proyectos
      </a>

      <Reveal className="detail-hero">
        <div className="detail-meta">
          <span className="eyebrow">PROYECTO / {project.category}</span>
          {project.isExample && (
            <span className="project-badge is-example">Ejemplo</span>
          )}
          {project.status && <span>{project.status}</span>}
        </div>
        <h1 id="project-title" tabIndex={-1}>
          {project.title}
        </h1>
        <p className="detail-intro">{project.summary}</p>
        <div className="detail-actions">
          {project.demoHref && (
            <a className="detail-action is-primary" href={project.demoHref}>
              <Play size={17} aria-hidden="true" />
              {project.demoLabel ?? "Abrir demo"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
          {project.sourceHref && (
            <a
              className="detail-action"
              href={project.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 size={18} aria-hidden="true" /> Ver código
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only"> (abre una nueva pestaña)</span>
            </a>
          )}
        </div>
        {project.isExample && (
          <p className="detail-example-note">
            Proyecto de ejemplo · Demo con datos locales o simulados.
          </p>
        )}
      </Reveal>

      <div className="detail-layout">
        <div className="detail-main">
          {project.overview && (
            <Reveal className="detail-section">
              <div className="detail-section-heading">
                <span aria-hidden="true">01</span>
                <h2>El proyecto</h2>
              </div>
              <p>{project.overview}</p>
            </Reveal>
          )}

          {(project.problem || project.solution) && (
            <Reveal className="detail-section detail-split">
              {project.problem && (
                <div className="detail-box">
                  <p className="eyebrow">EL RETO</p>
                  <h2>Qué resolver</h2>
                  <p>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="detail-box">
                  <p className="eyebrow">LA PROPUESTA</p>
                  <h2>Cómo abordarlo</h2>
                  <p>{project.solution}</p>
                </div>
              )}
            </Reveal>
          )}

          {project.architecture?.length > 0 && (
            <Reveal className="detail-section">
              <div className="detail-section-heading">
                <span aria-hidden="true">02</span>
                <h2>Decisiones técnicas</h2>
              </div>
              <div className="detail-architecture">
                {project.architecture.map((decision) => (
                  <div
                    className="detail-architecture-item"
                    key={decision.title}
                  >
                    <Code2 size={20} aria-hidden="true" />
                    <div>
                      <h3>{decision.title}</h3>
                      <p>{decision.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {project.development?.length > 0 && (
            <Reveal className="detail-section">
              <div className="detail-section-heading">
                <span aria-hidden="true">03</span>
                <h2>Proceso de desarrollo</h2>
              </div>
              <ol className="detail-timeline">
                {project.development.map((step, index) => (
                  <li className="detail-step" key={step.title}>
                    <span className="detail-step-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          {project.gallery?.length > 0 && (
            <Reveal className="detail-section">
              <div className="detail-section-heading">
                <span aria-hidden="true">04</span>
                <h2>El proyecto en pantalla</h2>
              </div>
              <p className="detail-note">
                Abre una captura para verla en detalle.
              </p>
              <>
                <div className="gallery-grid">
                  {project.gallery.map((item) => (
                    <figure className="gallery-item" key={item.src}>
                      <button
                        className="gallery-open"
                        type="button"
                        aria-label={`Ampliar captura: ${item.caption ?? item.alt}`}
                        aria-haspopup="dialog"
                        onClick={(event) => {
                          triggerRef.current = event.currentTarget;
                          setActiveImage(item);
                        }}
                      >
                        <img
                          className={`gallery-image${item.type === "mobile" ? " is-mobile" : ""}`}
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                        />
                        <span>
                          <Maximize2 size={17} aria-hidden="true" /> Ampliar
                        </span>
                      </button>
                      {item.caption && (
                        <figcaption className="gallery-caption">
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>

                <dialog
                  className="gallery-viewer"
                  ref={dialogRef}
                  aria-labelledby={titleId}
                  onClose={handleClose}
                  onClick={(event) => {
                    if (event.target === event.currentTarget) closeViewer();
                  }}
                >
                  <div className="gallery-viewer-header">
                    <h2 id={titleId}>
                      {activeImage?.caption ?? "Captura del proyecto"}
                    </h2>
                    <button
                      className="gallery-viewer-close"
                      type="button"
                      aria-label="Cerrar captura"
                      onClick={closeViewer}
                      autoFocus
                    >
                      <X size={22} aria-hidden="true" />
                    </button>
                  </div>
                  {activeImage && (
                    <div className="gallery-viewer-stage">
                      <img
                        className="gallery-viewer-image"
                        src={activeImage.src}
                        alt={activeImage.alt}
                      />
                      <p className="gallery-viewer-caption">
                        Esc para cerrar ·{" "}
                        {activeImage.caption ?? activeImage.alt}
                      </p>
                    </div>
                  )}
                </dialog>
              </>
            </Reveal>
          )}
        </div>

        {(hasFacts || project.features?.length > 0) && (
          <aside className="detail-sidebar" aria-label="Datos del proyecto">
            {hasFacts && (
              <Reveal className="detail-box">
                <p className="eyebrow">FICHA TÉCNICA</p>
                <dl className="detail-facts">
                  {project.type && (
                    <div>
                      <dt>Tipo</dt>
                      <dd>{project.type}</dd>
                    </div>
                  )}
                  {project.role && (
                    <div>
                      <dt>Participación</dt>
                      <dd>{project.role}</dd>
                    </div>
                  )}
                  {project.status && (
                    <div>
                      <dt>Estado</dt>
                      <dd>{project.status}</dd>
                    </div>
                  )}
                </dl>
                {project.stack?.length > 0 && (
                  <>
                    <h3>Stack</h3>
                    <ul className="project-tags" aria-label="Tecnologías">
                      {project.stack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </>
                )}
              </Reveal>
            )}
            {project.features?.length > 0 && (
              <Reveal className="detail-box">
                <h3>Qué puedes explorar</h3>
                <ul className="detail-features">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </aside>
        )}
      </div>
    </article>
  );
}
