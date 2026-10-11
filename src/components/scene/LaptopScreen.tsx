import { ArrowRight, Circle } from 'lucide-react';
import type { MouseEvent, RefObject } from 'react';
import { profile } from '../../data/profile';
import TechnologyIcon from '../ui/TechnologyIcon';

interface Props {
  screenRef: RefObject<HTMLDivElement | null>;
  onExplore: (event: MouseEvent<HTMLElement>) => void;
}

export default function LaptopScreen({ screenRef, onExplore }: Props) {
  const [firstName, ...familyName] = profile.name.split(' ');

  return (
    <div
      className="laptop-screen"
      ref={screenRef}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('button, a') && !window.getSelection()?.toString()) onExplore(event);
      }}
    >
      <div className="screen-topbar" aria-hidden="true">
        <span className="screen-wordmark">
          MF<span>.</span>
        </span>
        <span>Mi espacio de trabajo</span>
        <Circle size={6} fill="currentColor" />
      </div>
      <div className="screen-introduction">
        <p className="screen-eyebrow">Hola, soy</p>
        <h1 id="desk-title">
          {firstName} <span>{familyName.join(' ')}</span>
          <span>.</span>
        </h1>
        <p className="screen-role">{profile.role}</p>
        <p className="screen-description">{profile.introduction}</p>
        <ul className="screen-technologies" aria-label="Tecnologías">
          {profile.technologies.map((tech) => (
            <li key={tech.id}>
              <span style={{ color: tech.color }} aria-hidden="true">
                <TechnologyIcon id={tech.id} />
              </span>
              <span className="technology-name">{tech.label}</span>
            </li>
          ))}
        </ul>
        <button className="explore-button" onClick={onExplore}>
          Explorar proyectos <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
