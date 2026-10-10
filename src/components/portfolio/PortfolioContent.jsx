import { useEffect, useRef } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import ProfileView from './views/ProfileView';
import CollectionView from './views/CollectionView';
import ProjectView from './views/ProjectView';

export default function PortfolioContent({
  view,
  project,
  profile,
  projects,
  busy,
  onProjects,
  onSelect,
}) {
  const contentRef = useRef(null);
  const mountedRef = useRef(false);
  const reduced = useReducedMotion();
  const screenKey = view === 'project' ? project.id : view;

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const frame = requestAnimationFrame(() => {
      contentRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      contentRef.current?.querySelector('h1')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [screenKey]);

  return (
    <main ref={contentRef} id="floppy-content" className="floppy-content" tabIndex={-1}>
      <Motion.div
        className="floppy-view"
        key={screenKey}
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.2 }}
      >
        {view === 'profile' && (
          <ProfileView profile={profile} onProjects={onProjects} busy={busy} />
        )}
        {view === 'collection' && (
          <CollectionView projects={projects} onSelect={onSelect} busy={busy} />
        )}
        {view === 'project' && <ProjectView project={project} onBack={onProjects} busy={busy} />}
      </Motion.div>
    </main>
  );
}
