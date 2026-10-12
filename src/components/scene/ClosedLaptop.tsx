import type { MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import DeskObjectArt from './DeskObjectArt';

export default function ClosedLaptop({
  onExplore,
}: {
  onExplore: (event: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <div className="laptop-portal">
      <span className="laptop-note" aria-hidden="true">
        Explora
        <br />
        mis proyectos
        <svg viewBox="0 0 150 105">
          <path d="M140 3C91 17 52 45 17 96m-2-24 2 25 25-10M2 54l9 9m17-28 1 13m21-21-5 10" />
        </svg>
      </span>
      <button
        type="button"
        className="explore-button"
        aria-label="Abrir proyectos desde el portátil"
        onClick={onExplore}
      >
        <DeskObjectArt kind="laptop" />
        <span className="mobile-laptop-label" aria-hidden="true">
          Explorar proyectos <ArrowUpRight size={15} />
        </span>
      </button>
    </div>
  );
}
