import { ArrowRight, Folder } from 'lucide-react';
import type { MouseEvent } from 'react';

interface Props {
  onExplore: (event: MouseEvent<HTMLElement>) => void;
}

export default function ProjectEntry({ onExplore }: Props) {
  return (
    <div className="project-entry">
      <button className="project-entry-button" type="button" onClick={onExplore}>
        <Folder size={22} strokeWidth={1.6} aria-hidden="true" />
        Ver mis proyectos
        <ArrowRight size={21} strokeWidth={1.6} aria-hidden="true" />
      </button>
      <span className="project-entry-note" aria-hidden="true">
        <svg viewBox="0 0 80 48" focusable="false">
          <path d="M72 36C53 7 27 8 7 28M8 15 6 29 20 27" />
        </svg>
        Explora
        <br />
        mis proyectos
      </span>
    </div>
  );
}
