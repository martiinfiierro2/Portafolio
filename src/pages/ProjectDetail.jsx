import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Maximize2, Play, Plus, X } from "lucide-react";
import "./ProjectDetail.css";

function CaseReveal({ children, className = "", delay = 0, side = 0 }) {
  const reduced = useReducedMotion();
  return (
    <Motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, x: side, y: side ? 0 : 22 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  );
}

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
    if (activeImage && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [activeImage]);

  function openImage(item, event) {
    triggerRef.current = event.currentTarget;
    setActiveImage(item);
  }

  function closeViewer() { dialogRef.current?.close(); }
  function handleClose() {
    setActiveImage(null);
    triggerRef.current?.focus();
  }

  if (!project) return null;

  const story = project.caseStudy;
  const cover = project.gallery?.find((image) => image.type !== "mobile") ?? project.gallery?.[0];
  const scenes = story?.views?.map((view) => ({ ...view, image: project.gallery?.find((image) => image.src.endsWith('/' + view.image)) })).filter((view) => view.image)
    ?? project.gallery?.map((image) => ({ image, label: image.label ?? image.caption ?? image.alt, description: image.alt })) ?? [];
  const scene = scenes.find((view) => view.image.src === previewSrc) ?? scenes[0];
  const DemoLink = project.demoHref?.startsWith("/") ? Link : "a";
  const demoProps = DemoLink === Link ? { to: project.demoHref } : { href: project.demoHref };

  return (
    <article className="project-case detail-shell shell" aria-labelledby="project-title">
      <nav aria-label="Navegación del proyecto"><Link className="case-back" to="/proyectos"><ArrowLeft size={17} aria-hidden="true" /> Volver a proyectos</Link></nav>

      <header className={`case-hero${cover ? "" : " case-hero-text"}`}>
        <div className="case-hero-copy">
          <CaseReveal><h1 id="project-title" tabIndex={-1}>{story?.headline ?? project.listTitle ?? project.title}</h1></CaseReveal>
          <CaseReveal delay={0.08}><p className="case-lead">{story?.intro ?? project.summary}</p></CaseReveal>
          <CaseReveal delay={0.16}>
            <div className="case-actions">
              {project.video?.src && (
                <button className="case-primary" type="button" onClick={() => {
                  recordingRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
                  recordingRef.current?.focus({ preventScroll: true });
                }}><Play size={18} aria-hidden="true" /> Ver recorrido</button>
              )}
              {project.demoHref && <DemoLink className="case-primary" {...demoProps}>{project.demoLabel ?? "Abrir demo"}<ArrowUpRight size={18} aria-hidden="true" /></DemoLink>}
              {project.sourceHref && <a className="case-source" href={project.sourceHref} target="_blank" rel="noopener noreferrer">Ver código <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (abre una nueva pestaña)</span></a>}
            </div>
            <p className="case-origin">{project.type}{project.isExample ? ' · Proyecto de ejemplo con datos locales' : ''}</p>
          </CaseReveal>
          {story?.roles?.length > 0 && (
            <div className="case-roles" aria-label="Roles del sistema">
              {story.roles.map((role, index) => <CaseReveal key={role.name} delay={0.2 + index * 0.08}><img src={role.image} alt="" width={36} height={36} /><span>{role.name}</span></CaseReveal>)}
            </div>
          )}
        </div>
        {cover && (
          <div className="case-stage">
            <button className="case-cover" type="button" aria-label="Ampliar portada del proyecto" aria-haspopup="dialog" onClick={(event) => openImage(cover, event)}>
              <img src={cover.src} alt={cover.alt} fetchPriority="high" loading="eager" decoding="async" />
              <span><Maximize2 size={16} aria-hidden="true" /> Explorar la pantalla</span>
            </button>
          </div>
        )}
      </header>

      {project.stack?.length > 0 && (
        <CaseReveal className="case-stack" delay={0.1}>
          <h2>Hecho con</h2>
          <ul aria-label="Tecnologías">{project.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </CaseReveal>
      )}

      <section className="case-intro" aria-labelledby="case-intro-title">
        <CaseReveal><h2 id="case-intro-title">{story?.statement ?? 'Una mirada al proyecto.'}</h2></CaseReveal>
        <CaseReveal delay={0.1}><p>{story?.statementBody ?? project.summary}</p></CaseReveal>
      </section>

      {scene && scenes.length > 1 && (
        <section className="case-perspectives" aria-label="Explora las vistas del proyecto">
          <div className="case-view-index">
            <CaseReveal><h2>Elige cómo verlo.</h2></CaseReveal>
            <div className="case-view-options" role="group" aria-label="Vistas del proyecto">
              {scenes.map((view, index) => (
                <CaseReveal key={view.image.src} delay={index * 0.06}>
                  <button type="button" aria-pressed={scene.image.src === view.image.src} aria-controls="case-active-view" onClick={() => setPreviewSrc(view.image.src)} onMouseEnter={() => setPreviewSrc(view.image.src)} onFocus={() => setPreviewSrc(view.image.src)}>
                    <span>{view.label}</span><ArrowUpRight size={24} aria-hidden="true" />
                  </button>
                </CaseReveal>
              ))}
            </div>
          </div>
          <CaseReveal className="case-view-detail" side={24} delay={0.1}>
            <div id="case-active-view" aria-live="polite">
              <button className="case-view-screen" type="button" aria-label={`Ampliar vista: ${scene.label}`} aria-haspopup="dialog" onClick={(event) => openImage(scene.image, event)}>
                <img key={scene.image.src} src={scene.image.src} alt={scene.image.alt} loading="lazy" />
                <span><Maximize2 size={16} aria-hidden="true" /> Ampliar</span>
              </button>
              <p className="case-view-description">{scene.description}</p>
              <p className="case-caption">{scene.image.caption}</p>
            </div>
          </CaseReveal>
        </section>
      )}

      {project.video?.src && (
        <section className="case-film" aria-labelledby="case-film-title">
          <CaseReveal className="case-film-heading"><h2 id="case-film-title">Ahora, en movimiento.</h2><p id={recordingId}>{project.video.caption}</p></CaseReveal>
          <CaseReveal className="case-film-player" side={-20}>
            <div className="detail-recording-player" ref={recordingRef} tabIndex={-1}>
              {videoRequested ? (
                <video className="detail-recording-video" controls playsInline autoPlay preload="none" poster={project.video.poster} aria-label="Recorrido de la interfaz" aria-describedby={recordingId}>
                  <source src={project.video.src} type="video/webm" />Tu navegador no puede reproducir este vídeo.
                </video>
              ) : (
                <button className="detail-recording-start" type="button" onClick={() => setVideoRequested(true)} aria-label="Reproducir recorrido">
                  {(project.video.poster ?? cover?.src) && <img src={project.video.poster ?? cover.src} alt="" loading="lazy" />}
                  <span><Play size={24} aria-hidden="true" /> Reproducir recorrido</span>
                </button>
              )}
            </div>
          </CaseReveal>
          <div className="case-film-footer"><p>{project.video.description}</p><a href={project.video.src} download>Descargar vídeo (WebM) <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        </section>
      )}

      {project.gallery?.length > 0 && (
        <section className="case-gallery" aria-labelledby="case-gallery-title">
          <CaseReveal><h2 id="case-gallery-title">En pantalla.</h2><p>Acércate a cada vista para explorar los detalles.</p></CaseReveal>
          <div className="gallery-grid">
            {project.gallery.map((item, index) => (
              <CaseReveal key={item.src} delay={(index % 2) * 0.1} side={index % 2 ? 16 : -16}>
                <figure className="gallery-item">
                  <button className="gallery-open" type="button" aria-label={`Ampliar captura: ${item.caption ?? item.alt}`} aria-haspopup="dialog" onClick={(event) => openImage(item, event)}>
                    <img className="gallery-image" src={item.src} alt={item.alt} loading="lazy" />
                    <span>{item.label ?? 'Ver captura'}<Maximize2 size={18} aria-hidden="true" /></span>
                  </button>
                  {item.caption && <figcaption className="gallery-caption">{item.caption}</figcaption>}
                </figure>
              </CaseReveal>
            ))}
          </div>
        </section>
      )}

      <section className="case-making" aria-labelledby="case-making-title">
        <CaseReveal><h2 id="case-making-title">Detrás del proyecto.</h2></CaseReveal>
        <dl className="case-facts">
          {project.type && <div><dt>Proyecto</dt><dd>{project.type}</dd></div>}
          {project.role && <div><dt>Mi trabajo</dt><dd>{project.role}</dd></div>}
          {project.status && <div><dt>Estado</dt><dd>{project.status}</dd></div>}
        </dl>
        {(project.overview || project.problem || project.solution) && (
          <details className="case-disclosure">
            <summary>La idea y el reto<Plus size={24} aria-hidden="true" /></summary>
            <div className="case-disclosure-body">
              {project.overview && <p>{project.overview}</p>}
              {project.problem && <div><h3>Qué había que resolver</h3><p>{project.problem}</p></div>}
              {project.solution && <div><h3>Cómo lo abordé</h3><p>{project.solution}</p></div>}
            </div>
          </details>
        )}
        {project.architecture?.length > 0 && (
          <details className="case-disclosure">
            <summary>Decisiones de desarrollo<Plus size={24} aria-hidden="true" /></summary>
            <div className="case-disclosure-body">{project.architecture.map((decision) => <div key={decision.title}><h3>{decision.title}</h3><p>{decision.description}</p></div>)}</div>
          </details>
        )}
        {project.development?.length > 0 && (
          <details className="case-disclosure">
            <summary>El proceso, paso a paso<Plus size={24} aria-hidden="true" /></summary>
            <ol className="case-disclosure-body case-process">{project.development.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
          </details>
        )}
        {project.features?.length > 0 && (
          <details className="case-disclosure">
            <summary>Todo lo que permite<Plus size={24} aria-hidden="true" /></summary>
            <ul className="case-feature-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </details>
        )}
      </section>

      <Link className="case-next" to="/proyectos"><span>Más proyectos</span><ArrowUpRight aria-hidden="true" /></Link>

      {project.gallery?.length > 0 && (
        <dialog className="gallery-viewer" ref={dialogRef} aria-labelledby={titleId} onClose={handleClose} onClick={(event) => { if (event.target === event.currentTarget) closeViewer(); }}>
          <div className="gallery-viewer-header"><h2 id={titleId}>{activeImage?.caption ?? 'Captura del proyecto'}</h2><button className="gallery-viewer-close" type="button" aria-label="Cerrar captura" onClick={closeViewer} autoFocus><X size={24} aria-hidden="true" /></button></div>
          {activeImage && <div className="gallery-viewer-stage"><img className="gallery-viewer-image" src={activeImage.src} alt={activeImage.alt} /><p className="gallery-viewer-caption">Esc para cerrar · {activeImage.caption ?? activeImage.alt}</p></div>}
        </dialog>
      )}
    </article>
  );
}
