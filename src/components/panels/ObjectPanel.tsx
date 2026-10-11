import { useEffect, useRef } from 'react';
import { m, useAnimationControls, useReducedMotion } from 'framer-motion';
import { X, FileText, MessageCircle, Braces } from 'lucide-react';
import type { PanelState } from '../../types/portfolio';
import useViewport from '../../hooks/useViewport';
import ContactPanel from './ContactPanel';
import CvPanel from './CvPanel';
import StackPanel from './StackPanel';
import { profile } from '../../data/profile';

export default function ObjectPanel({
  panel,
  onClose,
}: {
  panel: PanelState;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  const viewport = useViewport();
  const width = Math.min(
    viewport.width - 32,
    panel.kind === 'cv' ? 860 : panel.kind === 'stack' ? 580 : 520,
  );
  const height = Math.min(
    viewport.height - 40,
    panel.kind === 'cv' ? 720 : panel.kind === 'stack' ? 480 : 570,
  );
  const origin = {
    x: panel.origin.x + panel.origin.width / 2 - viewport.width / 2,
    y: panel.origin.y + panel.origin.height / 2 - viewport.height / 2,
    scaleX: panel.origin.width / width,
    scaleY: panel.origin.height / height,
    opacity: 0,
  };
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    void controls.start({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      transition: { duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
    });
    return () => {
      dialog?.close();
      panel.trigger.focus({ preventScroll: true });
    };
  }, [controls, panel.trigger, reduced]);
  async function close() {
    if (closing.current) return;
    closing.current = true;
    await controls.start({
      ...(reduced ? { opacity: 0 } : origin),
      transition: { duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] },
    });
    onClose();
  }
  const Icon = panel.kind === 'cv' ? FileText : panel.kind === 'contact' ? MessageCircle : Braces;
  const title =
    panel.kind === 'cv'
      ? 'Mi recorrido.'
      : panel.kind === 'contact'
        ? 'Hablemos.'
        : 'developer_info.json';
  return (
    <dialog
      ref={dialogRef}
      className="object-panel-dialog"
      aria-labelledby="panel-title"
      onCancel={(event) => {
        event.preventDefault();
        void close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) void close();
      }}
    >
      <m.section
        className={`object-panel-card panel-${panel.kind}`}
        style={{ width, height }}
        initial={reduced ? { opacity: 1 } : origin}
        animate={controls}
      >
        <header className="panel-header">
          <span className="panel-icon">
            <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <button
            className="icon-button"
            aria-label="Cerrar ventana"
            onClick={() => void close()}
            autoFocus
          >
            <X size={21} aria-hidden="true" />
          </button>
        </header>
        <div className="panel-scroll" tabIndex={0} role="region" aria-labelledby="panel-title">
          <h2 id="panel-title">{title}</h2>
          {panel.kind === 'contact' ? (
            <ContactPanel />
          ) : panel.kind === 'cv' ? (
            <CvPanel />
          ) : (
            <StackPanel />
          )}
        </div>
        <footer className="panel-footer">
          <span>
            {profile.name} /{' '}
            {panel.kind === 'stack' ? 'Stack' : panel.kind === 'cv' ? 'CV' : 'Contacto'}
          </span>
          <button className="text-link" onClick={() => void close()}>
            Cerrar <X size={14} aria-hidden="true" />
          </button>
        </footer>
      </m.section>
    </dialog>
  );
}
