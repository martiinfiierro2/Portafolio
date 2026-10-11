import { ArrowUpRight, FolderCode } from 'lucide-react';
import type { MouseEvent, RefObject } from 'react';

interface Props {
  portalRef: RefObject<HTMLDivElement | null>;
  onExplore: (event: MouseEvent<HTMLElement>) => void;
}

export default function ClosedLaptop({ portalRef, onExplore }: Props) {
  return (
    <div className="laptop-portal" ref={portalRef}>
      <button
        type="button"
        className="explore-button"
        aria-label="Explorar proyectos"
        onClick={onExplore}
      >
        <span className="laptop-sticker">
          <FolderCode size={22} aria-hidden="true" />
          <span>Proyectos</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </span>
        <span className="laptop-hint">Pulsa para explorar</span>
      </button>
    </div>
  );
}
