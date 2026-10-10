import { useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Triangle, X } from 'lucide-react';
import { profile } from '../../data/profile';
import { ProfileView, CollectionView, ProjectView } from './FloppyViews';
import FloppyDisk from './FloppyDisk';
import { disks } from './data';
import './floppy.css';

export default function FloppyPortfolio() {
  const [view, setView] = useState('profile');
  const [contentDisk, setContentDisk] = useState(disks[0]);
  const [disk, setDisk] = useState(disks[0]);
  const [pending, setPending] = useState(null);
  const [phase, setPhase] = useState('idle');
  const contactRef = useRef(null);
  const contentRef = useRef(null);
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
  function load(next) {
    if (busy || (disk?.id === next?.id && next)) return;
    setPending(next);
    if (disk) setPhase('ejecting');
    else if (next) { setDisk(next); setPhase('inserting'); }
  }
  function completeAnimation() {
    if (phase === 'ejecting') {
      if (pending) { setDisk(pending); setPhase('inserting'); }
      else { setDisk(null); showView('collection'); setPhase('idle'); }
    } else if (phase === 'inserting') {
      setContentDisk(disk);
      showView(disk.id === 'profile' ? 'profile' : 'project');
      setPhase('idle');
    }
  }
  return <div className="floppy-portfolio">
    <a className="floppy-skip" href="#floppy-content">Saltar al contenido</a>
    <div className="floppy-comparison"><a href="/">← Ver versión USB</a><span>Propuesta alternativa · Disquetes</span></div>
    <div className="floppy-player">
      <header className="floppy-header"><a href="#perfil" className="floppy-brand" onClick={event => { event.preventDefault(); load(disks[0]); }}>{profile.name}</a><nav aria-label="Navegación de disquetes"><button className={view === 'profile' ? 'active' : ''} aria-current={view === 'profile' ? 'page' : undefined} disabled={busy} onClick={() => load(disks[0])}>Perfil</button><button className={view !== 'profile' ? 'active' : ''} aria-current={view !== 'profile' ? 'page' : undefined} disabled={busy} onClick={() => load(null)}>Proyectos</button><button onClick={() => contactRef.current.showModal()}>Contacto</button></nav></header>
      <main ref={contentRef} id="floppy-content" className="floppy-content" tabIndex={-1}>
        <Motion.div className="floppy-view" key={view === 'project' ? contentDisk.id : view} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .2 }}>
          {view === 'profile' && <ProfileView load={load} busy={busy} />}
          {view === 'collection' && <CollectionView disks={disks} load={load} busy={busy} />}
          {isProject && <ProjectView disk={contentDisk} load={load} busy={busy} />}
        </Motion.div>
      </main>
      <footer className="floppy-console">
        <div className="floppy-console-credit">
          <span className="floppy-copyright">Martín Fierro © {new Date().getFullYear()}</span>
          <span className="floppy-signoff">Hecho con intención.</span>
        </div>
        <div className="floppy-slot" aria-hidden="true">
          <div className="floppy-slot-housing" />
          <div className="floppy-slot-mouth" />
          {disk && (
            <Motion.div
              key={`${disk.id}-${phase === 'inserting' ? 'insert' : 'rest'}`}
              className="floppy-loaded"
              initial={phase === 'inserting' ? { y: 45, opacity: 0 } : false}
              animate={phase === 'ejecting' ? { y: 45, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: reduced ? 0 : .32, ease: [.22, 1, .36, 1] }}
              onAnimationComplete={completeAnimation}
            >
              <FloppyDisk disk={disk} compact />
              <span>{disk.id === 'profile' ? 'Martín / Perfil' : disk.title}</span>
            </Motion.div>
          )}
          <div className="floppy-slot-lip" />
        </div>
        <div className="floppy-console-status">
          <p className="floppy-reading" role="status">
            <span className={disk ? 'reading-light on' : 'reading-light'} />
            {phase === 'ejecting' ? 'Expulsando…' : phase === 'inserting' ? 'Leyendo disco…' : disk ? `Leyendo: ${disk.id === 'profile' ? 'Perfil' : disk.title}` : 'Selecciona un disco'}
          </p>
          <button className="floppy-eject" disabled={!disk || busy} onClick={() => load(null)}><Triangle size={13} />Expulsar</button>
        </div>
      </footer>
    </div>
    <dialog className="floppy-contact" ref={contactRef} aria-labelledby="floppy-contact-title"><button className="floppy-close" aria-label="Cerrar contacto" onClick={() => contactRef.current.close()}><X size={20} /></button><p className="floppy-kicker">Contacto</p><h2 id="floppy-contact-title">Sigamos en contacto.</h2><p>Por ahora puedes encontrarme en GitHub. Añadiré otros canales próximamente.</p><a className="floppy-button primary" href={profile.githubUrl} target="_blank" rel="noreferrer">Ver GitHub <ArrowUpRight size={16} /></a></dialog>
  </div>;
}
