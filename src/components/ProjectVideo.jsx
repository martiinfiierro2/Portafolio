import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export default function ProjectVideo({ video, title }) {
  const [requested, setRequested] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);
  const pointerRef = useRef(false);

  useEffect(() => {
    if (!requested) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    videoRef.current?.scrollIntoView({ behavior: pointerRef.current && !reduce ? "smooth" : "instant", block: "center" });
    videoRef.current?.focus({ preventScroll: true });
  }, [requested]);

  function retry() {
    setFailed(false);
    videoRef.current.load();
    videoRef.current.focus({ preventScroll: true });
    videoRef.current.play().catch(() => {});
  }

  return (
    <section className="film walkthrough wide" id="recorrido" aria-label="Recorrido de la interfaz">
      <div className="film-heading">
        <div><h2>De un vistazo,<br />en movimiento.</h2><p>{video.caption} · Sin audio</p></div>
        {!requested && <button className="button" type="button" onClick={event => {
          pointerRef.current = event.detail > 0;
          setRequested(true);
        }}>Ver recorrido <Play className="icon" aria-hidden="true" /></button>}
      </div>
      {requested && <video ref={videoRef} src={video.src} poster={video.poster} controls playsInline autoPlay preload="none"
        aria-label={`Recorrido de ${title}`} onError={() => setFailed(true)}>
        Tu navegador no puede reproducir este vídeo. <a href={video.src}>Abrir vídeo</a>
      </video>}
      {failed && <div className="film-error">
        <p role="alert">No se ha podido reproducir el vídeo. Puedes volver a intentarlo o abrir el archivo.</p>
        <div><button className="text-link" type="button" onClick={retry}>Volver a intentar</button><a className="text-link" href={video.src}>Abrir vídeo</a></div>
      </div>}
    </section>
  );
}
