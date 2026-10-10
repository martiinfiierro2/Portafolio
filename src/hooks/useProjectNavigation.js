import { useNavigate } from 'react-router-dom';
import useProjectSelection from './useProjectSelection';
import { transition } from '../utils/viewTransition';

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
