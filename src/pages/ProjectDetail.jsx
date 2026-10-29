import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Code2, Maximize2, Play, X } from "lucide-react";
import Reveal from "../components/Reveal";
import "./ProjectDetail.css";

export default function ProjectDetail({ project }) {
  const [activeImage, setActiveImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [videoRequested, setVideoRequested] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const recordingRef = useRef(null);
  const titleId = useId();
  const recordingId = useId();

  useEffect(() => {
    if (activeImage && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [activeImage]);

  function openImage(item, event) {
    triggerRef.current = event.currentTarget;
    setActiveImage(item);
  }

  function closeViewer() {
    dialogRef.current?.close();
  }

  function handleClose() {
    setActiveImage(null);
    triggerRef.current?.focus();
  }

  if (!project) return null;

  const preview = project.gallery?.find((image) => image.src === previewSrc)
    ?? project.gallery?.find((image) => image.type !== "mobile")
    ?? project.gallery?.[0];
  const DemoLink = project.demoHref?.startsWith("/") ? Link : "a";
  const demoLinkProps = DemoLink === Link ? { to: project.demoHref } : { href: project.demoHref };
  const hasFacts = Boolean(project.type || project.role || project.status);

  return (
    <article className="detail-shell shell" aria-labelledby="project-title">
      <Link className="detail-back" to="/proyectos">
        <ArrowLeft size={17} aria-hidden="true" /> Volver a proyectos
      </Link>

      <Reveal className={`detail-hero${preview ? "" : " detail-hero-text"}`}>
        <div className="detail-hero-copy">
          <div className="detail-meta">
            <span>{project.type ?? project.category}</span>
            {project.isExample && <span className="project-badge is-example">Ejemplo</span>}
          </div>
          <h1 id="project-title" tabIndex={-1}>{project.title}</h1>
          <p className="detail-intro">{project.summary}</p>
          <div className="detail-actions">
            {project.video?.src && (
              <button
                type="button"
                className="detail-action is-primary"
                onClick={() => {
                  recordingRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
                  recordingRef.current?.focus({ preventScroll: true });
                }}
              >
                <Play size={17} aria-hidden="true" /> Ver recorrido
              </button>
            )}
            {project.demoHref && (
              <DemoLink className="detail-action is-primary" {...demoLinkProps}>
                <Play size={17} aria-hidden="true" />
                {project.demoLabel ?? "Abrir demo"}
                <ArrowUpRight size={17} aria-hidden="true" />
              </DemoLink>
            )}
            {project.sourceHref && (
              <a className="detail-action" href={project.sourceHref} target="_blank" rel="noopener noreferrer">
                <Code2 size={18} aria-hidden="true" /> Ver código
                <ArrowUpRight size={17} aria-hidden="true" />
                <span className="sr-only"> (abre una nueva pestaña)</span>
              </a>
            )}
          </div>
          {project.isExample && <p className="detail-example-note">Proyecto de ejemplo · Datos locales o simulados.</p>}
        </div>

        {preview && (
          <div className="detail-preview">
            <button
              className="detail-preview-open"
              type="button"
              aria-label={`Ampliar vista: ${preview.label ?? preview.caption ?? preview.alt}`}
              aria-haspopup="dialog"
              onClick={(event) => openImage(preview, event)}
            >
              <img src={preview.src} alt={preview.alt} loading="eager" fetchPriority="high" decoding="async" />
              <span><Maximize2 size={16} aria-hidden="true" /> Ampliar vista</span>
            </button>
            {project.gallery.length > 1 && (
              <div className="detail-preview-options" role="group" aria-label="Vistas del proyecto">
                {project.gallery.map((image) => (
                  <button
                    key={image.src}
                    type="button"
                    aria-pressed={image.src === preview.src}
                    onClick={() => setPreviewSrc(image.src)}
                  >
                    {image.label ?? image.caption ?? image.alt}
                  </button>
                ))}
              </div>
            )}
            {preview.caption && <p className="detail-preview-caption">{preview.caption}</p>}
          </div>
        )}

        {project.stack?.length > 0 && (
          <section className="detail-stack" aria-label="Tecnologías del proyecto">
            <h2>Tecnologías</h2>
            <ul className="project-tags" aria-label="Tecnologías">
              {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </section>
        )}
      </Reveal>

      {project.video?.src && (
        <Reveal className="detail-recording-section">
          <div className="detail-recording-intro">
            <h2>Recorrido de la interfaz</h2>
            {project.video.description && <p>{project.video.description}</p>}
            <p id={recordingId} className="detail-recording-caption">{project.video.caption}</p>
            <a className="detail-recording-download" href={project.video.src} download>Descargar vídeo (WebM)</a>
          </div>
          <div className="detail-recording-player" ref={recordingRef} tabIndex={-1}>
            {videoRequested ? (
              <video
                className="detail-recording-video"
                controls
                playsInline
                autoPlay
                preload="none"
                poster={project.video.poster}
                aria-label="Recorrido de la interfaz"
                aria-describedby={recordingId}
              >
                <source src={project.video.src} type="video/webm" />
                Tu navegador no puede reproducir este vídeo.
              </video>
            ) : (
              <button className="detail-recording-start" type="button" onClick={() => setVideoRequested(true)} aria-label="Reproducir recorrido">
                {(project.video.poster ?? preview?.src) && <img src={project.video.poster ?? preview.src} alt="" loading="lazy" />}
                <span><Play size={20} aria-hidden="true" /> Reproducir recorrido</span>
              </button>
            )}
          </div>
        </Reveal>
      )}

      <div className="detail-layout">
        <div className="detail-main">
          {project.overview && (
            <Reveal className="detail-section">
              <div className="detail-section-heading"><h2>El proyecto</h2></div>
              <p>{project.overview}</p>
            </Reveal>
          )}
          {(project.problem || project.solution) && (
            <Reveal className="detail-section detail-split">
              {project.problem && <div className="detail-box"><h2>Qué resolver</h2><p>{project.problem}</p></div>}
              {project.solution && <div className="detail-box"><h2>Cómo abordarlo</h2><p>{project.solution}</p></div>}
            </Reveal>
          )}
          {project.architecture?.length > 0 && (
            <Reveal className="detail-section">
              <div className="detail-section-heading"><h2>Decisiones técnicas</h2></div>
              <div className="detail-architecture">
                {project.architecture.map((decision) => (
                  <div className="detail-architecture-item" key={decision.title}>
                    <Code2 size={20} aria-hidden="true" />
                    <div><h3>{decision.title}</h3><p>{decision.description}</p></div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
          {project.development?.length > 0 && (
            <Reveal className="detail-section">
              <div className="detail-section-heading"><h2>Proceso de desarrollo</h2></div>
              <ol className="detail-timeline">
                {project.development.map((step, index) => (
                  <li className="detail-step" key={step.title}>
                    <span className="detail-step-number" aria-hidden="true">{index + 1}</span>
                    <div><h3>{step.title}</h3><p>{step.description}</p></div>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}
          {project.gallery?.length > 0 && (
            <Reveal className="detail-section">
              <div className="detail-section-heading"><h2>El proyecto en pantalla</h2></div>
              <p className="detail-note">Abre una captura para verla en detalle.</p>
              <div className="gallery-grid">
                {project.gallery.map((item) => (
                  <figure className="gallery-item" key={item.src}>
                    <button
                      className="gallery-open"
                      type="button"
                      aria-label={`Ampliar captura: ${item.caption ?? item.alt}`}
                      aria-haspopup="dialog"
                      onClick={(event) => openImage(item, event)}
                    >
                      <img className={`gallery-image${item.type === "mobile" ? " is-mobile" : ""}`} src={item.src} alt={item.alt} loading="lazy" />
                      <span><Maximize2 size={17} aria-hidden="true" /> Ampliar</span>
                    </button>
                    {item.caption && <figcaption className="gallery-caption">{item.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {(hasFacts || project.features?.length > 0) && (
          <aside className="detail-sidebar" aria-label="Datos del proyecto">
            {hasFacts && (
              <Reveal className="detail-box">
                <h2>Ficha técnica</h2>
                <dl className="detail-facts">
                  {project.type && <div><dt>Tipo</dt><dd>{project.type}</dd></div>}
                  {project.role && <div><dt>Participación</dt><dd>{project.role}</dd></div>}
                  {project.status && <div><dt>Estado</dt><dd>{project.status}</dd></div>}
                </dl>
              </Reveal>
            )}
            {project.features?.length > 0 && (
              <Reveal className="detail-box">
                <h3>Qué puedes explorar</h3>
                <ul className="detail-features">
                  {project.features.map((feature) => (
                    <li key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></li>
                  ))}
                </ul>
              </Reveal>
            )}
          </aside>
        )}
      </div>

      {project.gallery?.length > 0 && (
        <dialog
          className="gallery-viewer"
          ref={dialogRef}
          aria-labelledby={titleId}
          onClose={handleClose}
          onClick={(event) => { if (event.target === event.currentTarget) closeViewer(); }}
        >
          <div className="gallery-viewer-header">
            <h2 id={titleId}>{activeImage?.caption ?? "Captura del proyecto"}</h2>
            <button className="gallery-viewer-close" type="button" aria-label="Cerrar captura" onClick={closeViewer} autoFocus>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          {activeImage && (
            <div className="gallery-viewer-stage">
              <img className="gallery-viewer-image" src={activeImage.src} alt={activeImage.alt} />
              <p className="gallery-viewer-caption">Esc para cerrar · {activeImage.caption ?? activeImage.alt}</p>
            </div>
          )}
        </dialog>
      )}
    </article>
  );
}
