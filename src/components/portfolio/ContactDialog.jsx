import { useEffect, useId, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export default function ContactDialog({ open, onClose, githubUrl }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog className="floppy-contact" ref={dialogRef} aria-labelledby={titleId} onClose={onClose}>
      <button className="floppy-close" aria-label="Cerrar contacto" onClick={onClose}>
        <X size={20} />
      </button>
      <p className="floppy-kicker">Contacto</p>
      <h2 id={titleId}>Sigamos en contacto.</h2>
      <p>Por ahora puedes encontrarme en GitHub. Añadiré otros canales próximamente.</p>
      <a className="floppy-button primary" href={githubUrl} target="_blank" rel="noreferrer">
        Ver GitHub <ArrowUpRight size={16} />
      </a>
    </dialog>
  );
}
