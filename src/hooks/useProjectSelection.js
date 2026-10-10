import { createContext, useContext } from 'react';
export const ProjectSelectionContext = createContext(null);
export default function useProjectSelection() {
  const context = useContext(ProjectSelectionContext);
  if (!context) throw new Error('Project selection requires the portfolio provider.');
  return context;
}
