import { useLayoutEffect, useRef } from 'react';
import { m, useReducedMotion, useAnimationControls } from 'framer-motion';
import { X } from 'lucide-react';
import ProjectDetail from '../../pages/ProjectDetail';
import { profile } from '../../data/profile';

const easing = [0.22, 1, 0.36, 1];
const identity = { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 };

export default function ProjectDialog({ project, onClose, origin }) {
  const ref = useRef(null);
  const sheetRef = useRef(null);
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  const contentControls = useAnimationControls();
  const closing = useRef(false);
  const mounted = useRef(false);

  function cardGeometry(rectangle) {
    if (!rectangle) return null;
    const dialog = ref.current;
    const sheet = sheetRef.current;
    const bounds = dialog.getBoundingClientRect();
    return {
      x: rectangle.left - bounds.left - sheet.offsetLeft + dialog.scrollLeft,
      y: rectangle.top - bounds.top - sheet.offsetTop + dialog.scrollTop,
      scaleX: rectangle.width / sheet.offsetWidth,
      scaleY: rectangle.height / sheet.offsetHeight,
    };
  }

  async function close() {
    if (closing.current) return;
    closing.current = true;
    controls.stop();
    contentControls.stop();
    if (!reduced) {
      // Keep returning to the card predictable even after scrolling the case study.
      sheetRef.current.scrollTop = 0;
      const target = cardGeometry(origin?.element?.getBoundingClientRect() ?? origin);
      await Promise.all([
        contentControls.start({ opacity: 0, transition: { duration: 0.12 } }),
        controls.start({
          ...(target ?? { scaleX: 0.96, scaleY: 0.96 }),
          opacity: target ? 0.85 : 0,
          transition: { duration: 0.28, ease: easing },
        }),
      ]);
    }
    if (mounted.current) onClose();
  }

  useLayoutEffect(() => {
    const dialog = ref.current;
    const previousFocus = origin?.element ?? document.activeElement;
    const previousOverflow = document.body.style.overflow;
    mounted.current = true;
    closing.current = false;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('.project-dialog-close')?.focus({ preventScroll: true });
    const geometry = cardGeometry(origin);
    controls.set(reduced ? identity : { ...(geometry ?? identity), opacity: geometry ? 1 : 0 });
    controls.start({ ...identity, transition: { duration: reduced ? 0 : 0.42, ease: easing } });
    contentControls.set({ opacity: reduced ? 1 : 0 });
    contentControls.start({
      opacity: 1,
      transition: { duration: reduced ? 0 : 0.22, delay: reduced ? 0 : 0.16 },
    });
    return () => {
      mounted.current = false;
      controls.stop();
      contentControls.stop();
      dialog.close();
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => {
        if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      });
      document.title = `Inicio · ${profile.name}`;
    };
  }, [controls, contentControls, reduced, origin]);

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
        style={{ transformOrigin: '0 0', '--project-tint': project.tint }}
        initial={false}
        animate={controls}
      >
        <button
          className="icon-button project-dialog-close"
          onClick={close}
          aria-label="Cerrar proyecto"
        >
          <X size={22} />
        </button>
        <m.div initial={false} animate={contentControls}>
          <ProjectDetail project={project} onClose={close} />
        </m.div>
      </m.div>
    </dialog>
  );
}
