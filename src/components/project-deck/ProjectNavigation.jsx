import { ChevronLeft, ChevronRight } from 'lucide-react';
export default function ProjectNavigation({ projects, activeIndex, onChange }) {
  return (
    <div className="deck-navigation">
      <button
        className="icon-button"
        onClick={() => onChange(activeIndex - 1)}
        disabled={projects.length < 2}
        aria-label="Proyecto anterior"
      >
        <ChevronLeft size={19} />
      </button>
      <span className="deck-counter" aria-live="polite" aria-atomic="true">
        {activeIndex + 1} <span>/ {projects.length}</span>
      </span>
      {projects.length <= 7 ? (
        <div className="deck-dots" aria-label="Seleccionar proyecto">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              className={index === activeIndex ? 'selected' : ''}
              onClick={() => onChange(index)}
              aria-label={`Seleccionar ${project.title}`}
              aria-pressed={index === activeIndex}
            >
              <span />
            </button>
          ))}
        </div>
      ) : (
        <label className="deck-select">
          <span className="sr-only">Seleccionar proyecto</span>
          <select value={activeIndex} onChange={(event) => onChange(Number(event.target.value))}>
            {projects.map((project, index) => (
              <option key={project.slug} value={index}>
                {project.title}
              </option>
            ))}
          </select>
        </label>
      )}
      <button
        className="icon-button"
        onClick={() => onChange(activeIndex + 1)}
        disabled={projects.length < 2}
        aria-label="Proyecto siguiente"
      >
        <ChevronRight size={19} />
      </button>
    </div>
  );
}
