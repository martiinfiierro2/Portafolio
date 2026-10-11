import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import type { PanelKind, Project, View } from '../../types/portfolio';
import { profile } from '../../data/profile';
import ProjectIndex from './ProjectIndex';
import ProjectDetail from './ProjectDetail';
import ProjectPage from './ProjectPage';

interface Props {
  view: Exclude<View, { kind: 'desk' }>;
  projects: Project[];
  busy: boolean;
  onNavigate: (view: View) => void;
  onDesk: () => void;
  onPanel: (kind: PanelKind, event: MouseEvent<HTMLElement>) => void;
}

export default function ProjectsExperience({
  view,
  projects,
  busy,
  onNavigate,
  onDesk,
  onPanel,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const indexScroll = useRef(0);
  const lastProject = useRef<string | null>(null);
  const project = view.kind === 'project' ? projects.find((item) => item.slug === view.slug) : null;
  const key = project?.slug ?? 'index';
  useEffect(() => {
    document.title = `${project?.title ?? 'Proyectos'} — ${profile.name}`;
    if (busy) return;
    const frame = requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = project ? 0 : indexScroll.current;
      const target =
        !project && lastProject.current
          ? document.getElementById(`open-${lastProject.current}`)
          : scrollRef.current?.querySelector<HTMLElement>(`[data-view="${key}"] .digital-title`);
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [key, busy, project]);

  function openProject(item: Project) {
    indexScroll.current = scrollRef.current?.scrollTop ?? 0;
    lastProject.current = item.slug;
    onNavigate({ kind: 'project', slug: item.slug });
  }
  return (
    <div className="digital-scroll" ref={scrollRef}>
      <header className="digital-header">
        <button className="digital-brand" onClick={onDesk} disabled={busy}>
          <span className="brand-mark">
            MF<span>.</span>
          </span>
          <span>{profile.name}</span>
        </button>
        <nav aria-label="Navegación principal">
          <button onClick={onDesk} disabled={busy}>
            Inicio
          </button>
          <button
            aria-current="page"
            onClick={() => onNavigate({ kind: 'projects' })}
            disabled={busy}
          >
            Proyectos
          </button>
          <button onClick={(event) => onPanel('cv', event)} disabled={busy}>
            CV
          </button>
          <button onClick={(event) => onPanel('contact', event)} disabled={busy}>
            Contacto
          </button>
        </nav>
      </header>
      <div className="digital-page-container">
        <button
          className="back-link"
          onClick={project ? () => onNavigate({ kind: 'projects' }) : onDesk}
          disabled={busy}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {project ? 'Volver a proyectos' : 'Volver al escritorio'}
        </button>
        <LayoutGroup id="projects">
          <AnimatePresence initial={false} mode="popLayout">
            <ProjectPage key={key} identity={key}>
              {project ? (
                <ProjectDetail project={project} />
              ) : (
                <ProjectIndex projects={projects} onOpen={openProject} />
              )}
            </ProjectPage>
          </AnimatePresence>
        </LayoutGroup>
        <footer className="digital-footer">
          <span>¿Construimos algo juntos?</span>
          <button onClick={(event) => onPanel('contact', event)}>
            Hablemos <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <small>
            {profile.name} © {new Date().getFullYear()}
          </small>
        </footer>
      </div>
    </div>
  );
}
