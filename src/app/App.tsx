import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, domMax, useReducedMotion } from 'framer-motion';
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
  const [opening, setOpening] = useState(false);
  const openingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  const [panel, setPanel] = useState<PanelState | null>(null);
  const digital = view.kind !== 'desk';
  useScrollLock(digital || busy || opening || panel !== null);
  useEffect(
    () => () => {
      if (openingTimer.current) clearTimeout(openingTimer.current);
    },
    [],
  );
  useEffect(() => {
    if (!opening) return;
    function cancelOpening() {
      if (!openingTimer.current) return;
      clearTimeout(openingTimer.current);
      openingTimer.current = null;
      setOpening(false);
      requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
    }
    window.addEventListener('hashchange', cancelOpening);
    window.addEventListener('popstate', cancelOpening);
    return () => {
      window.removeEventListener('hashchange', cancelOpening);
      window.removeEventListener('popstate', cancelOpening);
    };
  }, [opening]);
  useEffect(() => {
    if (digital) return;
    document.title = `${profile.name} — ${profile.role}`;
    if (busy) return;
    const frame = requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [digital, busy]);

  function explore(event: MouseEvent<HTMLElement>) {
    if (busy || opening || !portalRef.current) return;
    triggerRef.current =
      event.currentTarget instanceof HTMLButtonElement
        ? event.currentTarget
        : event.currentTarget.querySelector<HTMLElement>('.explore-button');
    setOrigin(readRectangle(portalRef.current));
    setOpening(true);
    openingTimer.current = setTimeout(
      () => {
        openingTimer.current = null;
        if (portalRef.current) setOrigin(readRectangle(portalRef.current));
        setOpening(false);
        setBusy(true);
        navigate({ kind: 'projects' });
      },
      reduced ? 0 : 620,
    );
  }
  function returnToDesk() {
    if (busy) return;
    triggerRef.current ??= document.querySelector<HTMLElement>('.explore-button');
    if (portalRef.current) setOrigin(readRectangle(portalRef.current));
    setBusy(true);
    navigate({ kind: 'desk' });
  }
  function openPanel(kind: PanelKind, event: MouseEvent<HTMLElement>) {
    if (busy || opening) return;
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
            .querySelector<HTMLElement>(digital ? '.digital-title' : '.explore-button')
            ?.focus();
        }}
      >
        Saltar al contenido
      </a>
      <DeskScene
        active={!digital && !busy && !opening}
        opening={opening}
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
