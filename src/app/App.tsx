import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, domMax } from 'framer-motion';
import type { MouseEvent } from 'react';
import type { PanelKind, PanelState, Rectangle } from '../types/portfolio';
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
  const portalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [origin, setOrigin] = useState<Rectangle | null>(null);
  const [busy, setBusy] = useState(false);
  const [panel, setPanel] = useState<PanelState | null>(null);
  const digital = view.kind !== 'desk';
  useScrollLock(digital || busy || panel !== null);
  useEffect(() => {
    if (digital) return;
    document.title = `${profile.name} — ${profile.role}`;
    if (busy) return;
    const frame = requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [digital, busy]);

  function explore(event: MouseEvent<HTMLElement>) {
    if (busy || !portalRef.current) return;
    triggerRef.current =
      event.currentTarget instanceof HTMLButtonElement
        ? event.currentTarget
        : event.currentTarget.querySelector<HTMLElement>('.explore-button');
    setOrigin(readRectangle(portalRef.current));
    setBusy(true);
    navigate({ kind: 'projects' });
  }
  function returnToDesk() {
    if (busy) return;
    triggerRef.current ??= document.querySelector<HTMLElement>('.project-entry-button');
    if (portalRef.current) setOrigin(readRectangle(portalRef.current));
    setBusy(true);
    navigate({ kind: 'desk' });
  }
  function openPanel(kind: PanelKind, event: MouseEvent<HTMLElement>) {
    if (busy) return;
    setPanel({ kind, origin: readRectangle(event.currentTarget), trigger: event.currentTarget });
  }
  function closePanel() {
    setPanel(null);
  }

  return (
    <LazyMotion features={domMax} strict>
      <a
        className="skip-link"
        href="#contenido"
        onClick={(event) => {
          event.preventDefault();
          document
            .querySelector<HTMLElement>(digital ? '.digital-title' : '.project-entry-button')
            ?.focus();
        }}
      >
        Saltar al contenido
      </a>
      <DeskScene
        active={!digital && !busy}
        activePanel={panel?.kind ?? null}
        portalRef={portalRef}
        onExplore={explore}
        onPanel={openPanel}
      />
      <AnimatePresence
        custom={origin}
        onExitComplete={() => {
          setBusy(false);
        }}
      >
        {digital && (
          <DigitalSurface
            key="digital"
            origin={origin}
            busy={busy}
            onEntered={() => setBusy(false)}
          >
            <Suspense
              fallback={
                <div className="loading-surface" role="status">
                  Abriendo el espacio de proyectos…
                </div>
              }
            >
              <ProjectsExperience
                view={view}
                projects={projects}
                busy={busy}
                onNavigate={navigate}
                onDesk={returnToDesk}
                onPanel={openPanel}
              />
            </Suspense>
          </DigitalSurface>
        )}
      </AnimatePresence>
      {panel && <ObjectPanel panel={panel} onClose={closePanel} />}
    </LazyMotion>
  );
}
