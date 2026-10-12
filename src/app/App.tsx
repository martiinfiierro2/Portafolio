import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { LazyMotion, domMax } from 'framer-motion';
import type { MouseEvent } from 'react';
import type { PanelKind, PanelState } from '../types/portfolio';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { readRectangle } from '../utils/navigation';
import useExperience from '../hooks/useExperience';
import useScrollLock from '../hooks/useScrollLock';
import DeskScene from '../components/scene/DeskScene';
import DigitalSurface from './DigitalSurface';
import ObjectPanel from '../components/panels/ObjectPanel';

const ProjectsExperience = lazy(() => import('../components/projects/ProjectsExperience'));

export default function App() {
  const { view, navigate } = useExperience(projects.map((project) => project.slug));
  const triggerRef = useRef<HTMLElement | null>(null);
  const [panel, setPanel] = useState<PanelState | null>(null);
  const digital = view.kind !== 'desk';
  useScrollLock(digital || panel !== null);

  useEffect(() => {
    if (digital) return;
    document.title = `${profile.name} — ${profile.role}`;
    const frame = requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [digital]);

  function explore(event: MouseEvent<HTMLElement>) {
    triggerRef.current = event.currentTarget;
    navigate({ kind: 'projects' });
  }

  function returnToDesk() {
    triggerRef.current ??= document.querySelector<HTMLElement>('.explore-button');
    navigate({ kind: 'desk' });
  }

  function openPanel(kind: PanelKind, event: MouseEvent<HTMLElement>) {
    setPanel({ kind, origin: readRectangle(event.currentTarget), trigger: event.currentTarget });
  }

  return (
    <LazyMotion features={domMax} strict>
      <a
        className="skip-link"
        href="#contenido"
        onClick={(event) => {
          event.preventDefault();
          document
            .querySelector<HTMLElement>(digital ? '.digital-title' : '.explore-button')
            ?.focus();
        }}
      >
        Saltar al contenido
      </a>
      <DeskScene
        active={!digital}
        activePanel={panel?.kind ?? null}
        onExplore={explore}
        onPanel={openPanel}
      />
      {digital && (
        <DigitalSurface>
          <Suspense
            fallback={
              <div className="loading-surface" role="status">
                Cargando proyectos…
              </div>
            }
          >
            <ProjectsExperience
              view={view}
              projects={projects}
              onNavigate={navigate}
              onDesk={returnToDesk}
              onPanel={openPanel}
            />
          </Suspense>
        </DigitalSurface>
      )}
      {panel && <ObjectPanel panel={panel} onClose={() => setPanel(null)} />}
    </LazyMotion>
  );
}
