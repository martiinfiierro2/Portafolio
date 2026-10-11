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
        <span className="laptop-monogram" aria-hidden="true">
          MF
        </span>
        <span className="laptop-hint">Explorar proyectos</span>
      </button>
    </div>
  );
}
