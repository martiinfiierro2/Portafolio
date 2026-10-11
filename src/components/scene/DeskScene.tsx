import { MessageCircle, Download, Braces } from 'lucide-react';
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { MouseEvent, RefObject } from 'react';
import type { PanelKind } from '../../types/portfolio';
import Laptop from './Laptop';
import ObjectButton from './ObjectButton';
import { profile } from '../../data/profile';

interface Props {
  active: boolean;
  activePanel: PanelKind | null;
  screenRef: RefObject<HTMLDivElement | null>;
  onExplore: (event: MouseEvent<HTMLElement>) => void;
  onPanel: (kind: PanelKind, event: MouseEvent<HTMLElement>) => void;
}

export default function DeskScene({ active, activePanel, screenRef, onExplore, onPanel }: Props) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
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
        x.set((event.clientX / window.innerWidth - 0.5) * 4);
        y.set((event.clientY / window.innerHeight - 0.5) * 4);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <m.div className="desk-light" aria-hidden="true" style={{ x: springX, y: springY }} />
      <div className="desk-topline">
        <span className="brand-mark" aria-label={profile.name}>
          MF<span>.</span>
        </span>
        <span className="desk-status">
          <i />
          Disponible para nuevas ideas
        </span>
      </div>
      <div className={`desk-stage${active ? '' : ' is-away'}`}>
        <svg
          className="drive-cable"
          viewBox="0 0 1200 730"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 1000 360 C 1090 346 1150 362 1150 412 S 1090 477 1120 520"
            className="cable-shadow"
          />
          <path d="M 1000 360 C 1090 346 1150 362 1150 412 S 1090 477 1120 520" />
        </svg>
        <div className="laptop-position">
          <Laptop screenRef={screenRef} onExplore={onExplore} />
        </div>
        <div
          className={`phone-position secondary-object${activePanel === 'contact' ? ' is-open' : ''}`}
        >
          <ObjectButton
            className="phone-object"
            label="Abrir contacto"
            onClick={(event) => onPanel('contact', event)}
          >
            <span className="phone-glass">
              <span className="phone-island" />
              <span className="phone-content">
                <MessageCircle size={30} strokeWidth={1.3} />
                <span>Contacto</span>
              </span>
              <span className="phone-home" />
            </span>
          </ObjectButton>
          <span className="object-caption">Conectemos</span>
        </div>
        <div
          className={`folder-position secondary-object${activePanel === 'cv' ? ' is-open' : ''}`}
        >
          <ObjectButton
            className="folder-object"
            label="Abrir CV de Martín Fierro"
            onClick={(event) => onPanel('cv', event)}
          >
            <span className="folder-back" />
            <span className="folder-paper">
              <span>CURRICULUM VITAE</span>
              <i />
              <i />
              <i />
            </span>
            <span className="folder-cover">
              <span className="folder-label">
                CV <Download size={16} />
                <small>{profile.name}</small>
              </span>
              <span className="folder-elastic" />
            </span>
          </ObjectButton>
          <span className="object-caption">Mi recorrido</span>
        </div>
        <div className="drive-position secondary-object">
          <ObjectButton
            className={`drive-object${activePanel === 'stack' ? ' is-reading' : ''}`}
            label="Abrir información del stack"
            onClick={(event) => onPanel('stack', event)}
          >
            <span className="drive-grooves" />
            <span className="drive-label">
              <Braces size={18} />
              <span>Stack</span>
            </span>
            <span className="drive-led" />
          </ObjectButton>
          <span className="object-caption">Un poco más de mí</span>
        </div>
      </div>
      <footer className="desk-bottomline">
        <span>Diseñado para explorar. Construido para funcionar.</span>
        <span>
          {profile.name} © {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  );
}
