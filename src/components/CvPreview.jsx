import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Download, X } from "lucide-react";
import { contact } from "../data/contact";

export default function CvPreview() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const launchRef = useRef(null);
  const id = useId();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function show(event) {
    launchRef.current = event.currentTarget;
    dialogRef.current.showModal();
    setOpen(true);
  }

  function dismiss() {
    setOpen(false);
    launchRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button className="sticker sticker-secondary" type="button" aria-haspopup="dialog" aria-controls={id} onClick={show}>
        <span className="sticker-label">Mi CV</span>
      </button>
      <dialog className="cv-dialog" id={id} ref={dialogRef} aria-labelledby={titleId} onClose={dismiss}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialogRef.current.close();
        }}>
        <div className="cv-heading">
          <div><h2 id={titleId}>Mi CV</h2><p>Martín Fierro<span>Desarrollador full-stack</span></p></div>
          <button className="cv-close" type="button" aria-label="Cerrar CV" onClick={() => dialogRef.current.close()} autoFocus><X aria-hidden="true" /></button>
        </div>
        {open && (contact.cv ? (
          <>
            <object className="cv-document" data={contact.cv} type="application/pdf" aria-label="Currículum de Martín Fierro">
              <p>Tu navegador no puede mostrar el PDF aquí. Puedes abrirlo en otra pestaña o descargarlo.</p>
            </object>
            <div className="cv-actions">
              <a className="text-link" href={contact.cv} target="_blank" rel="noopener noreferrer">Abrir PDF <ArrowUpRight aria-hidden="true" /><span className="sr-only"> (nueva pestaña)</span></a>
              <a className="button" href={contact.cv} download="CV-Martin-Fierro.pdf">Descargar CV <Download aria-hidden="true" /></a>
            </div>
          </>
        ) : (
          <div className="cv-unavailable">
            <p>El CV todavía no está disponible.</p>
            <a className="text-link" href={contact.github} target="_blank" rel="noopener noreferrer">Ver mi perfil de GitHub <ArrowUpRight aria-hidden="true" /><span className="sr-only"> (nueva pestaña)</span></a>
          </div>
        ))}
      </dialog>
    </>
  );
}
