import { useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { profile } from '../../data/profile';
import { ProfileView, CollectionView, ProjectView } from './FloppyViews';
import FloppyDisk from './FloppyDisk';
import { disks } from '../../data/disks';
import './floppy.css';
import Footer from './Footer';
import Header from './Header';

export default function FloppyPortfolio() {
  const [view, setView] = useState('profile');
  const [contentDisk, setContentDisk] = useState(null);
  const [disk, setDisk] = useState(null);
  const [pending, setPending] = useState(null);
  const [phase, setPhase] = useState('idle');
  const contactRef = useRef(null);
  const contentRef = useRef(null);
  const emptyViewRef = useRef('collection');
  const reduced = useReducedMotion();
  const busy = phase !== 'idle';
  const isProject = view === 'project';

  function showView(next) {
    setView(next);
    requestAnimationFrame(() => {
      contentRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      contentRef.current?.querySelector('h1')?.focus({ preventScroll: true });
    });
  }
  function load(next, emptyView = 'collection') {
    if (busy || (disk?.id === next?.id && next)) return;
    emptyViewRef.current = emptyView;
    setPending(next);
    if (disk) setPhase('ejecting');
    else if (next) {
      setDisk(next);
      setPhase('inserting');
    } else {
      showView(emptyView);
    }
  }

  return (
    <div className="floppy-portfolio">
      <div className="floppy-player">
        <Header
          view={view}
          busy={busy}
          load={load}
        />
        <main ref={contentRef} id="floppy-content" className="floppy-content" tabIndex={-1}>
          <Motion.div
            className="floppy-view"
            key={view === 'project' ? contentDisk.id : view}
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            {view === 'profile' && 
              <ProfileView load={load} busy={busy} />
            }
            {view === 'collection' && 
              <CollectionView disks={disks} load={load} busy={busy} />
            }
            {isProject && 
              <ProjectView disk={contentDisk} load={load} busy={busy} />
            }
          </Motion.div>
        </main>
        <Footer
          disk={disk}
          busy={busy}
          reduced={reduced}
          phase={phase}
          pending={pending}
          emptyViewRef={emptyViewRef}
          setContentDisk={setContentDisk}
          showView={showView}
          setPhase={setPhase}
        />
      </div>
    </div>
  );
}
