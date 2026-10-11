import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { MouseEvent, RefObject } from 'react';
import type { PanelKind } from '../../types/portfolio';
import DeskNotebook from './DeskNotebook';
import DeskIntroduction from './DeskIntroduction';
import ClosedLaptop from './ClosedLaptop';
import DeskAccess from './DeskAccess';
import { profile } from '../../data/profile';

interface Props {
  active: boolean;
  activePanel: PanelKind | null;
  portalRef: RefObject<HTMLDivElement | null>;
  onExplore: (event: MouseEvent<HTMLElement>) => void;
  onPanel: (kind: PanelKind, event: MouseEvent<HTMLElement>) => void;
}

export default function DeskScene({ active, activePanel, portalRef, onExplore, onPanel }: Props) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 25 });
  const springY = useSpring(y, { stiffness: 90, damping: 25 });

  return (
    <main
      id="escritorio"
      className="desk-scene"
      aria-labelledby="desk-title"
      inert={!active}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') return;
        x.set((event.clientX / window.innerWidth - 0.5) * 2);
        y.set((event.clientY / window.innerHeight - 0.5) * 2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <m.div className={`desk-stage${active ? '' : ' is-away'}`} style={{ x: springX, y: springY }}>
        <header className="desk-topline">
          <span className="brand-mark" aria-label={profile.name}>
            MF<span>.</span>
          </span>
          <span className="desk-status">
            <i aria-hidden="true" />
            <span>Disponible para nuevas ideas</span>
          </span>
        </header>
        <div className="desk-workspace">
          <picture className="desk-photograph" aria-hidden="true">
            <source media="(max-width: 900px)" srcSet="/desk/workspace-mobile.webp" />
            <img
              src="/desk/workspace.webp"
              width="1586"
              height="993"
              alt=""
              fetchPriority="high"
              decoding="async"
              draggable={false}
            />
          </picture>
          <DeskIntroduction />
          <DeskNotebook />
          <ClosedLaptop portalRef={portalRef} onExplore={onExplore} />
          {(['contact', 'cv'] as const).map((kind) => (
            <DeskAccess key={kind} kind={kind} selected={activePanel === kind} onOpen={onPanel} />
          ))}
        </div>
      </m.div>
      <footer className="desk-bottomline">
        <span>Diseñado para explorar. Construido para funcionar.</span>
        <span>
          {profile.name} © {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  );
}
