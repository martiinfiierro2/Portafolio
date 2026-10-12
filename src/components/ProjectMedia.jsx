import { useEffect, useId, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";

export default function ProjectMedia({ gallery }) {
  const [activeImage, setActiveImage] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (activeImage && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [activeImage]);

  function closeViewer() {
    dialogRef.current?.close();
  }

  function handleClose() {
    setActiveImage(null);
    triggerRef.current?.focus();
  }

  return (
    <>
      <div className="gallery-grid">
        {gallery.map((item) => (
          <figure className="gallery-item" key={item.src}>
            <button
              className="gallery-open"
              type="button"
              aria-label={`Ampliar captura: ${item.caption ?? item.alt}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActiveImage(item);
              }}
            >
              <img
                className={`gallery-image${item.type === "mobile" ? " is-mobile" : ""}`}
                src={item.src}
                alt={item.alt}
                loading="lazy"
              />
              <span>
                <Maximize2 size={17} aria-hidden="true" /> Ampliar
              </span>
            </button>
            {item.caption && (
              <figcaption className="gallery-caption">{item.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      <dialog
        className="gallery-viewer"
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeViewer();
        }}
      >
        <div className="gallery-viewer-header">
          <h2 id={titleId}>{activeImage?.caption ?? "Captura del proyecto"}</h2>
          <button
            className="gallery-viewer-close"
            type="button"
            aria-label="Cerrar captura"
            onClick={closeViewer}
            autoFocus
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        {activeImage && (
          <div className="gallery-viewer-stage">
            <img
              className="gallery-viewer-image"
              src={activeImage.src}
              alt={activeImage.alt}
            />
            <p className="gallery-viewer-caption">
              Esc para cerrar · {activeImage.caption ?? activeImage.alt}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
