import { useLayoutEffect, useRef } from 'react';
import { m, useReducedMotion, useAnimationControls } from 'framer-motion';
import { X } from 'lucide-react';
import ProjectDetail from '../../pages/ProjectDetail';
import { profile } from '../../data/profile';

export default function ProjectDialog({ project, onClose, origin }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  const closing = useRef(false);
  async function close() {
    if (closing.current) return;
    closing.current = true;
    if (!reduced)
      await controls.start({ opacity: 0, scale: 0.9, y: 25, transition: { duration: 0.18 } });
    onClose();
  }
  useLayoutEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    controls.start({ opacity: 1, scale: 1, y: 0 });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
      document.title = `Inicio · ${profile.name}`;
    };
  }, [controls]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-label={`Proyecto: ${project.title}`}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <m.div
        className="project-dialog-sheet"
        style={{ transformOrigin: origin, '--project-tint': project.tint }}
        initial={reduced ? false : { opacity: 0, scale: 0.82, y: 35 }}
        animate={controls}
        transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          className="icon-button project-dialog-close"
          onClick={close}
          aria-label="Cerrar proyecto"
        >
          <X size={22} />
        </button>
        <ProjectDetail project={project} onClose={close} />
      </m.div>
    </dialog>
  );
}
