import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { m, useIsPresent, useReducedMotion } from 'framer-motion';

// A departing page stays in the shared image animation but leaves keyboard navigation.
const ProjectPage = forwardRef<HTMLElement, { identity: string; children: ReactNode }>(
  function ProjectPage({ identity, children }, ref) {
    const present = useIsPresent();
    const reduced = useReducedMotion();
    return (
      <m.main
        ref={ref}
        id={present ? 'contenido' : undefined}
        data-view={identity}
        className="project-page"
        inert={!present}
        aria-hidden={!present}
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.24 }}
      >
        {children}
      </m.main>
    );
  },
);

export default ProjectPage;
