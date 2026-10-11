import { ArrowUpRight, ArrowRight, Circle } from 'lucide-react';
import { m, useMotionValue, useReducedMotion } from 'framer-motion';
import type { MouseEvent, RefObject } from 'react';
import { profile } from '../../data/profile';
import TechnologyIcon from '../ui/TechnologyIcon';

interface Props {
  screenRef: RefObject<HTMLDivElement | null>;
  onExplore: (event: MouseEvent<HTMLElement>) => void;
}

const rows = [
  ['esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '⌫'],
  ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '↵'],
  ['⇧', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '⇧'],
  ['ctrl', 'fn', '⌘', 'alt', '—', '—', '—', '—', 'alt', '⌘', '◂', '▸'],
];

export default function Laptop({ screenRef, onExplore }: Props) {
  const shineX = useMotionValue(0);
  const shineY = useMotionValue(0);
  const [firstName, ...familyName] = profile.name.split(' ');
  const reduced = useReducedMotion();
  return (
    <div
      className="laptop"
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('button, a') && !window.getSelection()?.toString()) onExplore(event);
      }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') return;
        const box = event.currentTarget.getBoundingClientRect();
        shineX.set(((event.clientX - box.left) / box.width - 0.5) * 6);
        shineY.set(((event.clientY - box.top) / box.height - 0.5) * 6);
      }}
    >
      <div className="laptop-lid">
        <span className="webcam" aria-hidden="true" />
        <div className="laptop-screen" ref={screenRef}>
          <div className="screen-topbar" aria-hidden="true">
            <span className="screen-wordmark">
              MF<span>.</span>
            </span>
            <span>Mi espacio de trabajo</span>
            <Circle size={7} fill="currentColor" />
          </div>
          <div className="screen-introduction">
            <p className="screen-eyebrow">Hola, soy</p>
            <h1 id="desk-title">
              {firstName} <span>{familyName.join(' ')}</span>
              <span className="name-period">.</span>
            </h1>
            <p className="screen-role">{profile.role}</p>
            <p className="screen-description">{profile.introduction}</p>
            <ul className="screen-technologies" aria-label="Tecnologías">
              {profile.technologies.map((tech) => (
                <li key={tech.id}>
                  <span style={{ color: tech.color }}>
                    <TechnologyIcon id={tech.id} />
                  </span>
                  {tech.label}
                </li>
              ))}
            </ul>
            <button className="explore-button" onClick={onExplore}>
              Explorar proyectos <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
          <div className="screen-bottomline">
            <span>Interfaz + lógica + intención</span>
            <button onClick={onExplore} aria-label="Entrar en los proyectos">
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
          <m.span
            className="screen-reflection"
            aria-hidden="true"
            style={{ x: shineX, y: shineY }}
          />
        </div>
        <span className="laptop-model" aria-hidden="true">
          MARTÍN / DEV
        </span>
      </div>
      <button
        className="laptop-base"
        onClick={onExplore}
        aria-label="Abrir proyectos desde el portátil"
      >
        <span className="keyboard" aria-hidden="true">
          {rows.map((row, index) => (
            <span className="key-row" key={index}>
              {row.map((key, position) => (
                <span key={position} className="keyboard-key">
                  {key}
                </span>
              ))}
            </span>
          ))}
        </span>
        <span className="trackpad" aria-hidden="true" />
        <span className="laptop-notch" aria-hidden="true" />
      </button>
    </div>
  );
}
