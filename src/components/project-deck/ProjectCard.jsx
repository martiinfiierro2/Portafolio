import { m, useReducedMotion } from 'framer-motion';
import ProjectIcon from '../ui/ProjectIcon';
import { ArrowUpRight } from 'lucide-react';
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
  const scale = active ? 1 : 1 - Math.abs(position) * 0.18;
  const distance = Math.abs(position) <= 1 ? Math.abs(position) : 1.65;
  return (
    <m.button
      className={`project-card${active ? ' active' : ''}`}
      style={{
        '--project-color': project.color,
        '--project-tint': project.tint,
        zIndex: 10 - Math.abs(position),
        visibility: visible && !(active && detailOpen) ? 'visible' : 'hidden',
      }}
      initial={false}
      animate={{
        x: Math.sign(position) * distance * spacing,
        y: Math.abs(position) * 10,
        scale,
        z: -Math.abs(position) * 80,
        rotate: position * -3,
        rotateY: position * -16,
        opacity: 1,
      }}
      transition={
        reduced ? { duration: 0 } : { type: 'spring', stiffness: 230, damping: 28, mass: 0.9 }
      }
      whileHover={reduced ? undefined : { y: Math.abs(position) * 10 - 4 }}
      whileTap={reduced ? undefined : { scale: scale - 0.02 }}
      tabIndex={active ? 0 : -1}
      aria-hidden={!visible || undefined}
      aria-current={active ? 'true' : undefined}
      aria-label={`${active ? 'Explorar proyecto' : 'Seleccionar'}: ${project.title}`}
      onClick={() => (active ? onOpen(project) : onSelect(project.slug))}
    >
      <span aria-hidden="true" className="card-cover">
        <span className="card-topline">
          <span className="card-number">{project.number} / Proyecto</span>
          <ArrowUpRight size={18} />
        </span>
        <span className="card-emblem">
          <ProjectIcon name={project.icon} size={34} />
        </span>
        <span className="card-folio">{project.number}</span>
      </span>
      <span className="card-body">
        <span className="card-title">{project.title}</span>
        <span className="card-context">
          {[project.type, !project.isPlaceholder && project.role, project.year]
            .filter(Boolean)
            .join(' · ')}
        </span>
        <span className="card-description">{project.shortDescription}</span>
        <span className="card-preview">
          <img src={project.cover} alt={project.coverAlt} loading="lazy" draggable={false} />
        </span>
        <span className="card-footer">
          <span className="card-tech">
            {project.technologies.slice(0, 3).map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </span>
          {active && (
            <span className="card-explore" aria-hidden="true">
              Explorar proyecto <ArrowUpRight size={13} />
            </span>
          )}
        </span>
      </span>
    </m.button>
  );
}
