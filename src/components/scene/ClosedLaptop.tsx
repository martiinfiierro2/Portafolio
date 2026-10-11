import { useId } from 'react';
import type { MouseEvent, RefObject } from 'react';

interface Props {
  portalRef: RefObject<HTMLDivElement | null>;
  onExplore: (event: MouseEvent<HTMLElement>) => void;
}

export default function ClosedLaptop({ portalRef, onExplore }: Props) {
  const finishId = useId();

  return (
    <div className="laptop-portal" ref={portalRef}>
      <button
        type="button"
        className="explore-button"
        aria-label="Explora mis proyectos"
        onClick={onExplore}
      >
        <svg className="laptop-monogram" viewBox="0 0 80 64" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={finishId} x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0" stopColor="#282b2e" />
              <stop offset="0.42" stopColor="#101214" />
              <stop offset="1" stopColor="#171a1d" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${finishId})`}
            d="M3 54V10h10l14 23 14-23h36v9H52v10h21v9H52v16H42V27L27 47 12 27v27Z"
          />
        </svg>
        <span className="laptop-invitation">
          Explora mis proyectos
          <svg viewBox="0 0 60 48" aria-hidden="true" focusable="false">
            <path d="M4 6C28 3 47 16 50 42M42 34l8 9 6-11" />
          </svg>
        </span>
      </button>
    </div>
  );
}
