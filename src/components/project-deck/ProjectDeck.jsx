import { useRef } from 'react';
import { relativePosition, swipeDirection, wrapIndex } from '../../utils/deck';
import ProjectCard from './ProjectCard';
import ProjectNavigation from './ProjectNavigation';
export default function ProjectDeck({ projects, selectedSlug, onSelect, onOpen }) {
  const regionRef = useRef(null),
    startRef = useRef(null),
    swipedRef = useRef(false);
  const activeIndex = Math.max(
    0,
    projects.findIndex((project) => project.slug === selectedSlug),
  );
  const change = (index) => {
    if (projects.length) onSelect(projects[wrapIndex(index, projects.length)].slug);
  };
  if (!projects.length)
    return (
      <section className="empty-state">
        <h2>La colección está en camino.</h2>
        <p>Los proyectos aparecerán aquí.</p>
      </section>
    );
  return (
    <section className="project-deck" aria-label="Baraja de proyectos">
      <div className="deck-caption">
        <span>La colección</span>
        <span>{String(projects.length).padStart(2, '0')} piezas</span>
      </div>
      <div
        ref={regionRef}
        className="deck-stage"
        role="group"
        aria-roledescription="baraja de proyectos"
        aria-label="Usa las flechas para elegir y Enter para abrir"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            change(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
            regionRef.current.focus({ preventScroll: true });
          } else if (event.key === 'Enter' && event.target === event.currentTarget) {
            event.preventDefault();
            onOpen(projects[activeIndex]);
          }
        }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          startRef.current = { x: event.clientX, y: event.clientY };
          swipedRef.current = false;
        }}
        onPointerMove={(event) => {
          const start = startRef.current;
          if (start && swipeDirection(event.clientX - start.x, event.clientY - start.y))
            swipedRef.current = true;
        }}
        onPointerCancel={() => {
          startRef.current = null;
        }}
        onPointerUp={(event) => {
          const start = startRef.current;
          startRef.current = null;
          if (!start) return;
          const direction = swipeDirection(event.clientX - start.x, event.clientY - start.y);
          if (direction) {
            swipedRef.current = true;
            change(activeIndex + direction);
          }
        }}
        onClickCapture={(event) => {
          if (swipedRef.current) {
            event.preventDefault();
            event.stopPropagation();
            swipedRef.current = false;
          }
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            position={relativePosition(index, activeIndex, projects.length)}
            onSelect={onSelect}
            onOpen={onOpen}
          />
        ))}
      </div>
      <ProjectNavigation projects={projects} activeIndex={activeIndex} onChange={change} />
      <p className="deck-note">Explora las tarjetas y abre un proyecto.</p>
      <p className="sr-only">
        Proyecto seleccionado: {projects[activeIndex].title}.{' '}
        {projects[activeIndex].isPlaceholder ? 'Ficha de muestra.' : ''}
      </p>
    </section>
  );
}
