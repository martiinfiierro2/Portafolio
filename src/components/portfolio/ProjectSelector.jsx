import { useEffect, useRef, useState } from 'react';
import { ChevronUp, ChevronDown, X, Check, ArrowUpRight } from 'lucide-react';
import UsbDrive from './UsbDrive';

function measureList(list, count) {
  const horizontal = getComputedStyle(list).flexDirection === 'row';
  const item = list.firstElementChild;
  const gap = parseFloat(getComputedStyle(list).gap) || 0;
  const distance = item ? (horizontal ? item.offsetWidth : item.offsetHeight) + gap : 1;
  const offset = horizontal ? list.scrollLeft : list.scrollTop;
  const maximum = horizontal ? list.scrollWidth - list.clientWidth : list.scrollHeight - list.clientHeight;
  return { horizontal, distance, position: Math.min(count || 1, Math.round(offset / distance) + 1), start: offset <= 2, end: offset >= maximum - 2, overflow: maximum > 2 };
}

export default function ProjectSelector({ projects, selectedId, onSelect, busy = false }) {
  const listRef = useRef(null);
  const dialogRef = useRef(null);
  const [scroll, setScroll] = useState({ position: 1, start: true, end: false, overflow: false });

  useEffect(() => {
    const list = listRef.current;
    const update = () => setScroll(measureList(list, projects.length));
    const observer = new ResizeObserver(update);
    observer.observe(list);
    for (const item of list.children) observer.observe(item);
    list.addEventListener('scroll', update, { passive: true });
    return () => { observer.disconnect(); list.removeEventListener('scroll', update); };
  }, [projects.length]);

  function navigate(direction) {
    const list = listRef.current;
    const { horizontal, distance } = measureList(list, projects.length);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollBy({ [horizontal ? 'left' : 'top']: direction * distance, behavior: reduced ? 'instant' : 'smooth' });
  }

  function selectFromDialog(project) {
    dialogRef.current.close();
    const button = listRef.current.querySelector(`[data-project-id="${project.id}"]`);
    button?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
    onSelect(project.id, button);
  }

  return (
    <aside className="project-selector" id="proyectos" aria-labelledby="projects-heading">
      <div className="selector-heading">
        <h2 id="projects-heading">Mis proyectos</h2>
        {scroll.overflow && <div className="selector-controls">
          <button onClick={() => navigate(-1)} disabled={scroll.start || busy} aria-label="Proyectos anteriores"><ChevronUp size={18} /></button>
          <button onClick={() => navigate(1)} disabled={scroll.end || busy} aria-label="Proyectos siguientes"><ChevronDown size={18} /></button>
        </div>}
      </div>
      <p className="small-label">Selecciona una memoria para explorar.</p>
      <div className={`drive-list${projects.length === 1 ? ' single-drive' : ''}`} ref={listRef}>
        {projects.map(project => <button key={project.id} className={`drive-button${selectedId === project.id ? ' drive-away' : ''}`} data-project-id={project.id} disabled={busy} aria-pressed={selectedId === project.id} aria-label={`Seleccionar ${project.title}, proyecto de muestra`} onClick={event => onSelect(project.id, event.currentTarget)}>
          <UsbDrive name={project.title} color={project.color} icon={project.icon} selected={selectedId === project.id} />
          {selectedId === project.id && <span className="drive-selected"><Check size={14} />En la pantalla</span>}
        </button>)}
        {!projects.length && <p className="empty-projects">Los proyectos estarán disponibles próximamente.</p>}
      </div>
      <div className="docking-lane" aria-hidden="true" />
      <div className="selector-footer">
        {projects.length > 1 && <span className="selector-count">{scroll.position} / {projects.length}</span>}
        {projects.length > 0 && <button className="all-projects" onClick={() => dialogRef.current.showModal()}>Ver todos ({projects.length})<ArrowUpRight size={14} /></button>}
      </div>
      <p className="selector-example-note">Colección de muestra</p>
      <dialog className="projects-dialog" ref={dialogRef} aria-labelledby="all-projects-heading">
        <div className="selector-heading"><h2 id="all-projects-heading">Todos los proyectos de muestra</h2><button className="dialog-close" onClick={() => dialogRef.current.close()} aria-label="Cerrar lista"><X size={20} /></button></div>
        <p className="small-label">Elige una memoria para abrirla en la pantalla.</p>
        <div className="all-projects-grid">{projects.map(project => <button key={project.id} className="drive-button" aria-label={`Seleccionar ${project.title}`} disabled={busy} onClick={() => selectFromDialog(project)}><UsbDrive name={project.title} color={project.color} icon={project.icon} selected={selectedId === project.id} /></button>)}</div>
      </dialog>
    </aside>
  );
}
