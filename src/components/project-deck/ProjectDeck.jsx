import { useEffect, useRef, useState } from 'react';
import { m, animate, useMotionValue, useReducedMotion } from 'framer-motion';
import { relativePosition, swipeDirection, wrapIndex } from '../../utils/deck';
import ProjectCard from './ProjectCard';
import ProjectNavigation from './ProjectNavigation';
export default function ProjectDeck({
  projects,
  selectedSlug,
  onSelect,
  onOpen,
  detailOpen = false,
}) {
  const regionRef = useRef(null),
    startRef = useRef(null),
    swipedRef = useRef(false);
  const offset = useMotionValue(0);
  const reduced = useReducedMotion();
  const resetOffset = () => animate(offset, 0, { duration: reduced ? 0 : 0.2 });
  const [stageWidth, setStageWidth] = useState(470);
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    const stage = regionRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width));
    observer.observe(stage);
    return () => observer.disconnect();
  }, [projects.length]);
  const spacing = Math.min(345, Math.max(185, stageWidth * 0.29));
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
        <div>
          <h2 className="deck-title">La colección</h2>
          <p className="deck-subtitle">Proyectos seleccionados</p>
        </div>
        <span className="deck-total">{String(projects.length).padStart(2, '0')} proyectos</span>
      </div>
      <div
        ref={regionRef}
        className={`deck-stage${dragging ? ' is-dragging' : ''}`}
        role="group"
        aria-roledescription="baraja de proyectos"
        aria-label="Desliza o usa las flechas para elegir y Enter para abrir"
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
          if (start && swipeDirection(event.clientX - start.x, event.clientY - start.y)) {
            swipedRef.current = true;
            offset.set(Math.max(-140, Math.min(140, (event.clientX - start.x) * 0.55)));
            if (!event.currentTarget.hasPointerCapture(event.pointerId))
              event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
          }
        }}
        onPointerCancel={() => {
          startRef.current = null;
          swipedRef.current = false;
          setDragging(false);
          resetOffset();
        }}
        onPointerUp={(event) => {
          setDragging(false);
          resetOffset();
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
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
        <m.div className="carousel-track" style={{ x: offset }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              position={relativePosition(index, activeIndex, projects.length)}
              spacing={spacing}
              detailOpen={detailOpen}
              onSelect={onSelect}
              onOpen={onOpen}
            />
          ))}
        </m.div>
      </div>
      <ProjectNavigation projects={projects} activeIndex={activeIndex} onChange={change} />
      <p className="deck-note">Desliza para explorar. Pulsa la tarjeta central para abrir.</p>
      <p className="sr-only">
        Proyecto seleccionado: {projects[activeIndex].title}.{' '}
        {projects[activeIndex].isPlaceholder ? 'Ficha de muestra.' : ''}
      </p>
    </section>
  );
}
