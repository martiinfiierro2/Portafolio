import { useEffect, useRef } from "react";
import { Download, ExternalLink, FileText, X } from "lucide-react";

export default function CvPreview({ url }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const restoreScroll = () => {
      document.body.style.overflow = previousOverflow;
    };
    let previousOverflow = document.body.style.overflow;
    const lockScroll = () => {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    };
    dialog.addEventListener("close", restoreScroll);
    dialog.addEventListener("cv-open", lockScroll);
    return () => {
      restoreScroll();
      dialog.removeEventListener("close", restoreScroll);
      dialog.removeEventListener("cv-open", lockScroll);
    };
  }, []);

  function openPreview() {
    dialogRef.current.showModal();
    dialogRef.current.dispatchEvent(new Event("cv-open"));
  }

  return (
    <>
      <button className="cv-card" type="button" onClick={openPreview} disabled={!url} aria-haspopup="dialog">
        <FileText size={36} aria-hidden="true" />
        <span><strong>Ver currículum completo</strong><small>{url ? "Ver y descargar CV" : "Próximamente disponible"}</small></span>
        <ExternalLink size={20} aria-hidden="true" />
      </button>
      <dialog ref={dialogRef} className="cv-dialog" aria-labelledby="cv-title" onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
        }
      }}>
        <div className="cv-toolbar">
          <h2 id="cv-title">Currículum · Martín Fierro</h2>
          <button type="button" className="cv-close" onClick={() => dialogRef.current.close()} aria-label="Cerrar currículum" autoFocus><X size={22} aria-hidden="true" /></button>
        </div>
        {url && <>
          <div className="cv-actions">
            <a className="button primary" href={url} download="CV-Martin-Fierro.pdf"><Download size={18} aria-hidden="true" /> Descargar CV</a>
            <a className="button secondary" href={url} target="_blank" rel="noopener noreferrer"><ExternalLink size={18} aria-hidden="true" /> Abrir PDF</a>
          </div>
          <p className="cv-help">Si el PDF no se muestra, puedes abrirlo en otra pestaña o descargarlo.</p>
          <iframe className="cv-document" src={url} title="Currículum de Martín Fierro en PDF" />
        </>}
      </dialog>
    </>
  );
}
