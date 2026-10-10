import { useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowLeft, Triangle, X } from 'lucide-react';
import { profile } from '../../data/profile';
import portrait from '../../img/martin.jpg';
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
      <header className="floppy-header"><a href="#perfil" className="floppy-brand" onClick={event => { event.preventDefault(); load(disks[0]); }}>{profile.name}</a><nav aria-label="Navegación de disquetes"><button className={view === 'profile' ? 'active' : ''} disabled={busy} onClick={() => load(disks[0])}>Perfil</button><button className={view !== 'profile' ? 'active' : ''} disabled={busy} onClick={() => load(null)}>Proyectos</button><button onClick={() => contactRef.current.showModal()}>Contacto</button></nav></header>
      <main ref={contentRef} id="floppy-content" className="floppy-content" tabIndex={-1}>
        <Motion.div className="floppy-view" key={view === 'project' ? disk?.id : view} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .2 }}>
          {view === 'profile' && <section className="floppy-profile" aria-labelledby="floppy-profile-title"><div className="floppy-intro"><p className="floppy-kicker">Desarrollador full-stack junior</p><h1 id="floppy-profile-title" tabIndex={-1}>Hola, soy Martín.</h1><p className="floppy-lead">Diseño y desarrollo aplicaciones web con personalidad.</p><p className="floppy-description">{profile.introduction}</p><div className="floppy-actions"><button className="floppy-button primary" onClick={() => load(null)} disabled={busy}>Ver proyectos <ArrowRight size={16} /></button>{profile.cvUrl ? <a className="floppy-button" href={profile.cvUrl}>Ver CV <ArrowUpRight size={16} /></a> : <button className="floppy-button" disabled>CV pendiente</button>}</div><ul className="floppy-technologies" aria-label="Tecnologías">{profile.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul></div><div className="floppy-collage"><span className="floppy-paper" aria-hidden="true" /><span className="floppy-color-paper" aria-hidden="true" /><span className="floppy-sun" aria-hidden="true" /><img src={portrait} alt="Martín Fierro" /><div className="floppy-monogram" aria-hidden="true">M<span>F</span></div><p>Interfaces cuidadas.<br />Aplicaciones completas.</p></div></section>}
          {view === 'collection' && <section className="floppy-collection" aria-labelledby="floppy-collection-title"><div className="floppy-collection-title"><h1 id="floppy-collection-title" tabIndex={-1}>Un disco, una historia.</h1><p>Elige mi perfil o descubre uno de mis proyectos.</p><small>Proyectos de muestra para comparar el diseño.</small></div><div className="floppy-disk-grid">{disks.map((item, index) => <button className="floppy-choice" key={item.id} disabled={busy} onClick={() => load(item)} style={{ '--disk-angle': `${[-5, -4, 4, -5][index]}deg` }} aria-label={`Abrir ${item.title}`}><FloppyDisk disk={item} /><span>{item.subtitle}</span></button>)}</div></section>}
          {isProject && <article className="floppy-project" aria-labelledby="floppy-project-title"><button className="floppy-back" disabled={busy} onClick={() => load(null)}><ArrowLeft size={15} />Volver a los discos</button><div className="floppy-project-grid"><div><p className="floppy-kicker">Proyecto de muestra</p><h1 id="floppy-project-title" tabIndex={-1}>{contentDisk.title}</h1><p className="floppy-lead">{contentDisk.description}</p><ul className="floppy-technologies" aria-label="Tecnologías de ejemplo">{contentDisk.technologies.map(item => <li key={item}>{item}</li>)}</ul><div className="floppy-actions"><button className="floppy-button primary" disabled>Demo pendiente <ArrowUpRight size={16} /></button><button className="floppy-button" disabled>Código pendiente <ArrowUpRight size={16} /></button></div></div><div className="floppy-project-details"><section><h2>Qué hace</h2><ul>{contentDisk.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section><section><h2>Mi aportación</h2><p>Aquí explicaré mi trabajo, las decisiones técnicas y los aprendizajes del proyecto.</p><small>Contenido provisional; no representa un proyecto publicado.</small></section></div></div></article>}
        </Motion.div>
      </main>
      <footer className="floppy-console"><span className="floppy-copyright">Martín Fierro © {new Date().getFullYear()}</span><div className="floppy-slot" aria-hidden="true"><div className="floppy-slot-mouth" />{disk && <Motion.div key={`${disk.id}-${phase === 'inserting' ? 'insert' : 'rest'}`} className="floppy-loaded" initial={phase === 'inserting' ? { y: 45, opacity: 0 } : false} animate={phase === 'ejecting' ? { y: 45, opacity: 0 } : { y: 0, opacity: 1 }} transition={{ duration: reduced ? 0 : .32, ease: [.22, 1, .36, 1] }} onAnimationComplete={completeAnimation}><FloppyDisk disk={disk} compact /><span>{disk.id === 'profile' ? 'Martín / Perfil' : disk.title}</span></Motion.div>}</div><p className="floppy-reading" role="status"><span className={disk ? 'reading-light on' : 'reading-light'} />{phase === 'ejecting' ? 'Expulsando…' : phase === 'inserting' ? 'Leyendo disco…' : disk ? `Leyendo: ${disk.id === 'profile' ? 'Perfil' : disk.title}` : 'Selecciona un disco'}</p><button className="floppy-eject" disabled={!disk || busy} onClick={() => load(null)}><Triangle size={13} />Expulsar</button><span className="floppy-signoff">Hecho con intención.</span></footer>
    </div>
    <dialog className="floppy-contact" ref={contactRef} aria-labelledby="floppy-contact-title"><button className="floppy-close" aria-label="Cerrar contacto" onClick={() => contactRef.current.close()}><X size={20} /></button><p className="floppy-kicker">Contacto</p><h2 id="floppy-contact-title">Sigamos en contacto.</h2><p>Por ahora puedes encontrarme en GitHub. Añadiré otros canales próximamente.</p><a className="floppy-button primary" href={profile.githubUrl} target="_blank" rel="noreferrer">Ver GitHub <ArrowUpRight size={16} /></a></dialog>
  </div>;
}
