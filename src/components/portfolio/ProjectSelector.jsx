import { useRef, useState } from 'react';
import { ChevronUp, ChevronDown, X, Check } from 'lucide-react';
import UsbDrive from './UsbDrive';

export default function ProjectSelector({ projects, selectedId, onSelect, busy = false }) {
  const listRef = useRef(null);
  const dialogRef = useRef(null);
  const [position, setPosition] = useState(1);
  const canScroll = projects.length > 1;
  function navigate(direction) {
    const list = listRef.current;
    const horizontal = getComputedStyle(list).flexDirection === 'row';
    const item = list.firstElementChild;
    if (!item) return;
    const distance = horizontal ? item.offsetWidth + 12 : item.offsetHeight + 12;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollBy({ [horizontal ? 'left' : 'top']: direction * distance, behavior: reduced ? 'instant' : 'smooth' });
  }
  function updatePosition() {
    const list = listRef.current;
    const horizontal = getComputedStyle(list).flexDirection === 'row';
    const item = list.firstElementChild;
    if (!item) return;
    const distance = horizontal ? item.offsetWidth + 12 : item.offsetHeight + 12;
    setPosition(Math.min(projects.length, Math.round((horizontal ? list.scrollLeft : list.scrollTop) / distance) + 1));
  }
  return <aside className="project-selector" id="proyectos" aria-labelledby="projects-heading">
    <div className="selector-heading"><h2 id="projects-heading">Mis proyectos</h2>{canScroll && <div className={projects.length <= 3 ? 'selector-controls mobile-controls' : 'selector-controls'}><button onClick={() => navigate(-1)} aria-label="Proyectos anteriores"><ChevronUp size={18} /></button><button onClick={() => navigate(1)} aria-label="Proyectos siguientes"><ChevronDown size={18} /></button></div>}</div>
    <p className="small-label">Proyectos de muestra · diseño en desarrollo</p>
    <div className={`drive-list${projects.length === 1 ? ' single-drive' : ''}`} ref={listRef} onScroll={updatePosition}>
      {projects.map(project => <button key={project.id} className={`drive-button${selectedId === project.id ? ' drive-away' : ''}`} data-project-id={project.id} disabled={busy} aria-pressed={selectedId === project.id} aria-label={`Seleccionar ${project.title}, proyecto de muestra`} onClick={event => onSelect(project.id, event.currentTarget)}><UsbDrive name={project.title} color={project.color} icon={project.icon} selected={selectedId === project.id} />{selectedId === project.id && <span className="drive-selected"><Check size={12} />En la pantalla</span>}</button>)}
      {!projects.length && <p className="empty-projects">Los proyectos estarán disponibles próximamente.</p>}
    </div>
    <div className="selector-footer">{projects.length > 1 && <span className="selector-count">{position} / {projects.length}</span>}{projects.length > 0 && <button className="all-projects" onClick={() => dialogRef.current.showModal()}>Ver todos ({projects.length})</button>}</div>
    <dialog className="projects-dialog" ref={dialogRef} aria-labelledby="all-projects-heading"><div className="selector-heading"><h2 id="all-projects-heading">Todos los proyectos de muestra</h2><button className="dialog-close" onClick={() => dialogRef.current.close()} aria-label="Cerrar lista"><X size={20} /></button></div><p className="small-label">Ejemplos visuales, no proyectos publicados.</p><div className="all-projects-grid">{projects.map(project => <button key={project.id} className="drive-button" aria-label={`Seleccionar ${project.title}`} disabled={busy} onClick={() => { dialogRef.current.close(); const button = listRef.current.querySelector(`[data-project-id="${project.id}"]`); button?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' }); onSelect(project.id, button); }}><UsbDrive name={project.title} color={project.color} icon={project.icon} selected={selectedId === project.id} /></button>)}</div></dialog>
  </aside>;
}
