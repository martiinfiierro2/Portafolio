import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";

export default function ProjectGallery({ views, slug, calendar }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState(null);
  const [errorIndex, setErrorIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const request = useRef(0);
  const cache = useRef(new Map());
  const stageRef = useRef(null);
  const dialogRef = useRef(null);
  const launchRef = useRef(null);
  const animateNext = useRef(false);
  const focusAfterRetry = useRef(false);
  const viewId = useId();
  const captionId = useId();
  const titleId = useId();
  const selected = views[selectedIndex];
  const activeImage = selected.images[activeIndex];
  const isOpen = activeIndex !== null;
  const unavailable = errorIndex === selectedIndex;

  useEffect(() => () => { request.current += 1; }, []);

  useEffect(() => {
    if (!focusAfterRetry.current || errorIndex !== null) return;
    focusAfterRetry.current = false;
    stageRef.current?.focus({ preventScroll: true });
  }, [errorIndex, selectedIndex]);

  // New captures are already decoded before they replace the visible group.
  useEffect(() => {
    if (!animateNext.current) return;
    animateNext.current = false;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const images = stageRef.current?.querySelectorAll("img") ?? [];
    const animations = Array.from(images, image => image.animate?.(
      [{ opacity: .65 }, { opacity: 1 }],
      { duration: 160, easing: getComputedStyle(image).getPropertyValue("--ease-out").trim() },
    ));
    return () => animations.forEach(animation => animation?.cancel());
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  function prepareImage(src) {
    if (!cache.current.has(src)) {
      const image = new Image();
      image.src = src;
      const ready = image.decode().catch(error => {
        cache.current.delete(src);
        throw error;
      });
      cache.current.set(src, ready);
    }
    return cache.current.get(src);
  }

  async function selectView(index, event, retry = false) {
    const version = ++request.current;
    focusAfterRetry.current = retry && event.currentTarget === document.activeElement;
    if (index === selectedIndex && !retry) {
      setPendingIndex(null);
      if (!unavailable) setErrorIndex(null);
      return;
    }
    setPendingIndex(index);
    if (retry) views[index].images.forEach(image => cache.current.delete(image.src));
    const pointer = event.detail > 0;
    try {
      await Promise.all(views[index].images.map(image => prepareImage(image.src)));
      if (request.current !== version) return;
      animateNext.current = pointer;
      setSelectedIndex(index);
      setErrorIndex(null);
    } catch {
      if (request.current !== version) return;
      setErrorIndex(index);
    } finally {
      if (request.current === version) setPendingIndex(null);
    }
  }

  function openCapture(event) {
    // Opening the visible capture cancels a pending view change: the dialog
    // keeps the image the visitor actually chose, even if a response arrives late.
    request.current += 1;
    setPendingIndex(null);
    setErrorIndex(null);
    launchRef.current = event.currentTarget;
    const index = Number(event.target.closest("img")?.dataset.imageIndex ?? 0);
    setActiveIndex(index);
  }

  function restoreFocus() {
    setActiveIndex(null);
    launchRef.current?.focus({ preventScroll: true });
  }

  function moveCapture(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    setActiveIndex(index => Math.max(0, Math.min(selected.images.length - 1, index + direction)));
  }

  return (
    <section className="viewer gallery wide" aria-label="Pantallas del proyecto">
      <div className="gallery-toolbar">
        <div className="view-tabs" role="group" aria-label="Elegir vista">
        {views.map((view, index) => (
          <button className="view-tab" type="button" key={view.label}
            aria-pressed={selectedIndex === index} aria-controls={viewId}
            aria-busy={pendingIndex === index} onClick={event => selectView(index, event)}>
            {view.label}
          </button>
        ))}
        </div>
        {!unavailable && <span className="zoom-note">Pulsa una imagen para ampliarla <Maximize2 aria-hidden="true" /></span>}
      </div>
      <button ref={stageRef} className={`case-stage is-${calendar ? "calendar" : "monitor"}`}
        id={viewId} type="button" disabled={unavailable} aria-busy={pendingIndex !== null}
        aria-label={`Ampliar captura: ${selected.label}`} aria-haspopup="dialog"
        onClick={openCapture} style={{ viewTransitionName: `project-${slug}` }}>
        {unavailable ? <span className="gallery-unavailable">No se ha podido cargar esta captura.</span> : selected.images.map((image, index) => (
          <img key={image.src} data-image-index={index} src={image.src} alt={image.alt}
            decoding="async" onError={() => setErrorIndex(selectedIndex)} />
        ))}
      </button>
      <div className="viewer-caption">
        <p role="status" aria-atomic="true">
          {pendingIndex !== null ? `Cargando ${views[pendingIndex].label.toLowerCase()}…` : errorIndex !== null
            ? `No se ha podido cargar ${views[errorIndex].label.toLowerCase()}.${!unavailable ? " La captura anterior sigue visible." : ""}`
            : selected.caption}
        </p>
      </div>
      {errorIndex !== null && <button className="text-link gallery-retry" type="button" disabled={pendingIndex !== null}
        onClick={event => selectView(errorIndex, event, true)}>Volver a intentar</button>}
      <dialog className="image-dialog" ref={dialogRef} aria-labelledby={titleId} aria-describedby={captionId}
        onClose={restoreFocus} onKeyDown={moveCapture} onClick={event => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
        }}>
        <h2 className="sr-only" id={titleId}>Captura ampliada</h2>
        <button className="dialog-close" type="button" aria-label="Cerrar captura" onClick={() => dialogRef.current.close()} autoFocus><X className="icon" aria-hidden="true" /></button>
        {activeImage && <figure>
          <img src={activeImage.src} alt={activeImage.alt} />
          <figcaption id={captionId}>{activeImage.caption ?? activeImage.alt}</figcaption>
        </figure>}
        {isOpen && selected.images.length > 1 && <div className="capture-navigation">
          <button type="button" aria-label="Captura anterior" disabled={activeIndex === 0} onClick={() => setActiveIndex(index => index - 1)}><ArrowLeft className="icon" aria-hidden="true" /></button>
          <span role="status">{activeIndex + 1} de {selected.images.length}</span>
          <button type="button" aria-label="Siguiente captura" disabled={activeIndex === selected.images.length - 1} onClick={() => setActiveIndex(index => index + 1)}><ArrowRight className="icon" aria-hidden="true" /></button>
        </div>}
      </dialog>
    </section>
  );
}
