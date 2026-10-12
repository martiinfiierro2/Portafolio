import type { MouseEvent } from 'react';
import type { PanelKind } from '../../types/portfolio';
interface Props {
  onHome: () => void;
  onProjects: (event: MouseEvent<HTMLElement>) => void;
  onPanel: (kind: PanelKind, event: MouseEvent<HTMLElement>) => void;
  busy?: boolean;
  current: 'desk' | 'projects';
}
export default function SiteHeader({ onHome, onProjects, onPanel, busy = false, current }: Props) {
  return (
    <header className={`site-header ${current === 'desk' ? 'desk-header' : 'digital-header'}`}>
      {current !== 'desk' && (
        <button
          className="site-brand"
          aria-label="Volver al escritorio"
          disabled={busy}
          onClick={onHome}
        >
          <svg viewBox="0 0 80 64" aria-hidden="true">
            <path
              fill="currentColor"
              d="M3 54V10h10l14 23 14-23h36v9H52v10h21v9H52v16H42V27L27 47 12 27v27Z"
            />
          </svg>
        </button>
      )}
      <nav className="site-menu" aria-label="Navegación principal">
        <button
          className="note-home"
          disabled={busy}
          onClick={onHome}
          aria-current={current === 'desk' ? 'page' : undefined}
        >
          Inicio
        </button>
        <button
          className="note-projects"
          disabled={busy}
          onClick={onProjects}
          aria-current={current === 'projects' ? 'page' : undefined}
        >
          Proyectos
        </button>
        <button className="note-cv" disabled={busy} onClick={(event) => onPanel('cv', event)}>
          CV
        </button>
        <button
          className="note-contact"
          disabled={busy}
          onClick={(event) => onPanel('contact', event)}
        >
          Contacto
        </button>
      </nav>
    </header>
  );
}
