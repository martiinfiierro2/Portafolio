import { m, useReducedMotion } from 'framer-motion';
import ProjectIcon from '../ui/ProjectIcon';
export default function ProjectCard({
  project,
  position,
  spacing = 310,
  detailOpen = false,
  onSelect,
  onOpen,
}) {
  const reduced = useReducedMotion();
  const active = position === 0;
  const visible = Math.abs(position) <= 2;
  const scale = active ? 1 : 1 - Math.abs(position) * 0.15;
  return (
    <m.button
      className={`project-card${active ? ' active' : ''}`}
      style={{
        '--project-color': project.color,
        '--project-tint': project.tint,
        zIndex: 10 - Math.abs(position),
        viewTransitionName: active && !detailOpen ? 'project-card' : 'none',
        visibility: visible ? 'visible' : 'hidden',
      }}
      onPointerMove={(event) => {
        if (reduced) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          '--glare-x',
          `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
        );
        event.currentTarget.style.setProperty(
          '--glare-y',
          `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty('--glare-x');
        event.currentTarget.style.removeProperty('--glare-y');
      }}
      initial={false}
      animate={{
        x: position * spacing,
        y: Math.abs(position) * 23,
        scale,
        z: -Math.abs(position) * 100,
        rotate: 0,
        rotateY: position * -28,
        opacity: 1,
      }}
      transition={
        reduced ? { duration: 0 } : { type: 'spring', stiffness: 230, damping: 28, mass: 0.9 }
      }
      whileHover={reduced ? undefined : { y: Math.abs(position) * 23 - 5, rotate: position * 1.5 }}
      whileTap={reduced ? undefined : { scale: scale - 0.02 }}
      tabIndex={active ? 0 : -1}
      aria-hidden={!visible || undefined}
      aria-current={active ? 'true' : undefined}
      onClick={() => (active ? onOpen(project) : onSelect(project.slug))}
    >
      <span aria-hidden="true" className="card-cover">
        <span className="glass-card-emblem">
          <ProjectIcon name={project.icon} size={68} />
        </span>
        <span className="card-number">{project.number}</span>
      </span>
      <span className="card-body">
        <span className="card-title">{project.title}</span>
        <span className="card-description">{project.shortDescription}</span>
        <span className="card-tech">{project.technologies.slice(0, 3).join(' · ')}</span>
      </span>
    </m.button>
  );
}
