import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import useProjectSelection from '../../hooks/useProjectSelection';
import useProjectNavigation from '../../hooks/useProjectNavigation';
import ProjectDeck from './ProjectDeck';
import ProjectInspector from './ProjectInspector';
export default function ProjectWorkspace({ expanded = false }) {
  const { projects, selectedSlug, selectedProject, selectProject } = useProjectSelection();
  const { openProject } = useProjectNavigation();
  const reduced = useReducedMotion();
  if (!selectedProject) return <p className="empty-state">Próximamente añadiré mis proyectos.</p>;
  return (
    <div className={`project-workspace${expanded ? ' expanded-workspace' : ''}`}>
      <ProjectDeck
        projects={projects}
        selectedSlug={selectedSlug}
        onSelect={selectProject}
        onOpen={openProject}
      />
      <div className="inspector-switch">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={selectedProject.slug}
            initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -8 }}
            transition={{ duration: reduced ? 0 : 0.14 }}
          >
            <ProjectInspector
              project={selectedProject}
              index={projects.indexOf(selectedProject)}
              total={projects.length}
              expanded={expanded}
              onOpen={openProject}
            />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
