import { m, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectIcon from '../ui/ProjectIcon';
export default function ProjectCard({ project, position, onSelect, onOpen }) {
  const reduced = useReducedMotion();
  const active = position === 0;
  const visible = Math.abs(position) <= 2;
  const scale = 1 - Math.abs(position) * 0.075;
  return (
    <m.button
      className={`project-card${active ? ' active' : ''}`}
      style={{
        '--project-color': project.color,
        '--project-tint': project.tint,
        zIndex: 10 - Math.abs(position),
        visibility: visible ? 'visible' : 'hidden',
      }}
      initial={false}
      animate={{
        x: position * 52,
        y: Math.abs(position) * 14,
        scale,
        rotate: position * 2.5,
        rotateY: position * -4,
        opacity: Math.abs(position) > 1 ? 0.75 : 1,
      }}
      transition={
        reduced ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 30, mass: 0.85 }
      }
      whileHover={reduced ? undefined : { y: Math.abs(position) * 14 - 5, rotate: position * 1.5 }}
      whileTap={reduced ? undefined : { scale: scale - 0.02 }}
      tabIndex={active ? 0 : -1}
      aria-hidden={!visible || undefined}
      aria-current={active ? 'true' : undefined}
      onClick={() => (active ? onOpen(project) : onSelect(project.slug))}
    >
      <span
        aria-hidden="true"
        className="card-cover"
        style={{ viewTransitionName: active ? 'project-cover' : 'none' }}
      >
        <img
          src={project.cover}
          alt=""
          width="640"
          height="480"
          loading={visible ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="card-number">{project.number}</span>
      </span>
      <span className="card-body">
        <span className="card-heading">
          <span className="card-icon">
            <ProjectIcon name={project.icon} size={19} />
          </span>
          <span className="card-kind">{project.isPlaceholder ? 'Muestra' : 'Proyecto'}</span>
        </span>
        <span className="card-title">{project.title}</span>
        <span className="card-description">{project.shortDescription}</span>
        <span className="card-tech">{project.technologies.slice(0, 3).join(' · ')}</span>
        <span className="card-open">
          {active ? 'Abrir proyecto' : 'Seleccionar'} <ArrowUpRight size={14} />
        </span>
      </span>
    </m.button>
  );
}
