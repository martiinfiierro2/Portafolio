import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LazyMotion, domMax } from 'framer-motion';
import { projects } from './data/projects';
import { resolveProject } from './utils/deck';
import { ProjectSelectionContext } from './hooks/useProjectSelection';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
const storageKey = 'martin-portfolio-selected-project';
function ProjectRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/?project=${encodeURIComponent(slug)}#proyectos`} replace />;
}
export default function App() {
  const [selectedSlug, setSelectedSlug] = useState(() => {
    try {
      return resolveProject(sessionStorage.getItem(storageKey), projects)?.slug;
    } catch {
      return projects[0]?.slug;
    }
  });
  function selectProject(slug) {
    if (!projects.some((project) => project.slug === slug)) return;
    setSelectedSlug(slug);
    try {
      sessionStorage.setItem(storageKey, slug);
    } catch {
      /* Selection still works when storage is disabled. */
    }
  }
  return (
    <LazyMotion features={domMax} strict>
      <ProjectSelectionContext.Provider
        value={{
          projects,
          selectedSlug,
          selectedProject: resolveProject(selectedSlug, projects),
          selectProject,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="index.html" element={<Navigate to="/" replace />} />
              <Route path="projects" element={<Navigate to="/#proyectos" replace />} />
              <Route path="projects/:slug" element={<ProjectRedirect />} />
              <Route path="cv" element={<Navigate to="/#cv" replace />} />
              <Route path="contact" element={<Navigate to="/#contacto" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProjectSelectionContext.Provider>
    </LazyMotion>
  );
}
