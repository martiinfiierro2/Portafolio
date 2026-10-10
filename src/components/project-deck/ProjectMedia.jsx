import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useId, useState } from 'react';
import ArchitectureDiagram from '../ui/ArchitectureDiagram';
export default function ProjectMedia({ project, large = false }) {
  const [selectedId, setSelectedId] = useState(project.media[0]?.id);
  const media = project.media.find((item) => item.id === selectedId) ?? project.media[0];
  const id = useId();
  const reduced = useReducedMotion();
  if (!media) return <p className="muted">Capturas pendientes.</p>;
  return (
    <div className={`project-media${large ? ' large' : ''}`}>
      <div className="media-tabs" role="tablist" aria-label={`Vistas de ${project.title}`}>
        {project.media.map((item, index) => (
          <button
            key={item.id}
            role="tab"
            id={`${id}-${item.id}`}
            aria-controls={`${id}-panel`}
            aria-selected={item.id === media.id}
            tabIndex={item.id === media.id ? 0 : -1}
            onClick={() => setSelectedId(item.id)}
            onKeyDown={(event) => {
              let next;
              if (event.key === 'ArrowRight') next = (index + 1) % project.media.length;
              if (event.key === 'ArrowLeft')
                next = (index - 1 + project.media.length) % project.media.length;
              if (event.key === 'Home') next = 0;
              if (event.key === 'End') next = project.media.length - 1;
              if (next !== undefined) {
                event.preventDefault();
                setSelectedId(project.media[next].id);
                document.getElementById(`${id}-${project.media[next].id}`)?.focus();
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <figure id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${media.id}`} tabIndex={0}>
        <div
          className="media-frame"
          style={{
            '--project-tint': project.tint,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={media.id}
              className={`media-content ${media.presentation === 'mobile' ? 'mobile-preview' : ''}`}
              initial={{ opacity: reduced ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.12 }}
            >
              {media.type === 'architecture' ? (
                <ArchitectureDiagram nodes={project.architecture} />
              ) : (
                <img
                  src={media.src}
                  alt={media.alt}
                  width="640"
                  height="480"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </m.div>
          </AnimatePresence>
        </div>
        <figcaption>{media.caption}</figcaption>
      </figure>
    </div>
  );
}
