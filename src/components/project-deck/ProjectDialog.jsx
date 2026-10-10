import { useLayoutEffect, useRef } from 'react';
import { m, useReducedMotion, useAnimationControls } from 'framer-motion';
import { X } from 'lucide-react';
import ProjectDetail from '../../pages/ProjectDetail';
import { profile } from '../../data/profile';
import { transition } from '../../utils/viewTransition';

export default function ProjectDialog({ project, onClose, origin }) {
  const ref = useRef(null);
  const sheetRef = useRef(null);
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  const closing = useRef(false);
  const nativeTransition = !reduced && Boolean(document.startViewTransition);
  async function close() {
    if (closing.current) return;
    closing.current = true;
    if (nativeTransition) {
      transition(onClose);
      return;
    }
    if (!reduced)
      await controls.start({
        opacity: 0,
        scaleX: 0.95,
        scaleY: 0.95,
        transition: { duration: 0.18 },
      });
    onClose();
  }
  useLayoutEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    if (!nativeTransition && !reduced && origin) {
      const bounds = sheetRef.current.getBoundingClientRect();
      controls.set({
        x: origin.left - bounds.left,
        y: origin.top - bounds.top,
        scaleX: origin.width / bounds.width,
        scaleY: origin.height / bounds.height,
        opacity: 0.8,
      });
    }
    controls.start({ opacity: 1, scaleX: 1, scaleY: 1, x: 0, y: 0 });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
      document.title = `Inicio · ${profile.name}`;
    };
  }, [controls, nativeTransition, reduced, origin]);
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
        ref={sheetRef}
        className="project-dialog-sheet"
        style={{
          transformOrigin: '0 0',
          '--project-tint': project.tint,
          viewTransitionName: 'project-card',
        }}
        initial={false}
        animate={controls}
        transition={{ duration: reduced || nativeTransition ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
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
