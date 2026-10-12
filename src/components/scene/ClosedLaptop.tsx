import type { MouseEvent, RefObject } from 'react';
import { ArrowUpRight } from 'lucide-react';
import DeskObjectArt from './DeskObjectArt';
import LaptopKeyboard from './LaptopKeyboard';

interface Props {
  portalRef: RefObject<HTMLDivElement | null>;
  onExplore: (event: MouseEvent<HTMLElement>) => void;
  opening: boolean;
}
export default function ClosedLaptop({ portalRef, onExplore, opening }: Props) {
  return (
    <div className={`laptop-portal${opening ? ' is-opening' : ''}`} ref={portalRef}>
      <span className="laptop-note" aria-hidden="true">
        Explora mis
        <br />
        proyectos
        <svg viewBox="0 0 150 105">
          <path d="M140 3C91 17 52 45 17 96m-2-24 2 25 25-10M2 54l9 9m17-28 1 13m21-21-5 10" />
        </svg>
      </span>
      <LaptopKeyboard />
      <button
        type="button"
        className="explore-button"
        aria-label="Abrir proyectos desde el portátil"
        disabled={opening}
        onClick={onExplore}
      >
        <DeskObjectArt kind="laptop" />
        <span className="laptop-lid" aria-hidden="true">
          <span className="laptop-front">
            <svg className="laptop-monogram" viewBox="0 0 80 64">
              <path
                fill="currentColor"
                d="M3 54V10h10l14 23 14-23h36v9H52v10h21v9H52v16H42V27L27 47 12 27v27Z"
              />
            </svg>
            <span className="mobile-laptop-label">
              Explorar proyectos <ArrowUpRight size={15} />
            </span>
          </span>
          <span className="laptop-inner-screen">
            <span>
              MF<span>.</span>
            </span>
            <span>
              Proyectos<span>.</span>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
