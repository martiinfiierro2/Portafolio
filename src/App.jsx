import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LazyMotion, domMax } from 'framer-motion';
import { projects } from './data/projects';
import { resolveProject } from './utils/deck';
import { ProjectSelectionContext } from './hooks/useProjectSelection';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CV from './pages/CV';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
const storageKey = 'martin-portfolio-selected-project';
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
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:slug" element={<ProjectDetail />} />
              <Route path="cv" element={<CV />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProjectSelectionContext.Provider>
    </LazyMotion>
  );
}
