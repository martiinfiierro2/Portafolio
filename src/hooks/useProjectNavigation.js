import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';
import useProjectSelection from './useProjectSelection';

function transition(update) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && document.startViewTransition) {
    const animation = document.startViewTransition(() => flushSync(update));
    animation.ready.catch(() => {});
  } else update();
}
export default function useProjectNavigation() {
  const navigate = useNavigate();
  const { selectProject } = useProjectSelection();
  return {
    openProject: (project) =>
      transition(() => {
        selectProject(project.slug);
        navigate(`/projects/${project.slug}`);
      }),
    backToProjects: (project) =>
      transition(() => {
        selectProject(project.slug);
        navigate('/projects');
      }),
  };
}
