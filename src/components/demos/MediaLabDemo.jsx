import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Image, Play, SlidersHorizontal } from "lucide-react";

const pieces = [
  {
    id: "signal",
    title: "Signal field",
    type: "Imagen",
    variant: "signal",
    palette: "Cian / azul profundo",
    technique: "Gradientes radiales y retícula CSS",
    description:
      "Un campo de señales construido con luz, capas y una retícula regular. La intensidad controla el contraste de la composición.",
  },
  {
    id: "orbit",
    title: "Orbital system",
    type: "Motion",
    variant: "orbit",
    palette: "Cian / violeta",
    technique: "Anillos CSS con rotación continua",
    description:
      "Tres órbitas exploran profundidad y ritmo. Ajusta la velocidad para cambiar la duración de cada ciclo.",
  },
  {
    id: "spectrum",
    title: "Spectrum matrix",
    type: "Imagen",
    variant: "spectrum",
    palette: "Azul / verde eléctrico",
    technique: "Capas de gradientes y bandas diagonales",
    description:
      "Una matriz abstracta combina bandas de color y geometría. La pieza se genera en el navegador, sin archivos de imagen.",
  },
  {
    id: "wave",
    title: "Frequency wave",
    type: "Motion",
    variant: "wave",
    palette: "Cian / azul hielo",
    technique: "Barras CSS con animaciones desfasadas",
    description:
      "Un ritmo visual formado por diez barras con fases distintas. La velocidad modifica el pulso y la intensidad su luminosidad.",
  },
];

function Composition({ piece, intensity, speed, reducedMotion }) {
  const isMotion = piece.type === "Motion";

  return (
    <span
      className={`media-art media-art-${piece.variant}`}
      aria-hidden="true"
      data-reduced-motion={reducedMotion ? "true" : "false"}
      style={{
        "--media-intensity": intensity / 100,
        "--media-duration": `${12 / speed}s`,
        "--media-pulse-duration": `${2.4 / speed}s`,
        filter: `saturate(${0.35 + intensity / 75}) brightness(${0.7 + intensity / 160})`,
      }}
    >
      <span className="media-art-grid" />
      {piece.variant === "wave" ? (
        <span className="media-wave-bars">
          {Array.from({ length: 10 }, (_, index) => (
            <span
              key={index}
              className="media-wave-bar"
              style={{
                height: `${25 + ((index * 17) % 65)}%`,
                animationDelay: `${-(index * 0.16) / speed}s`,
                animationPlayState: reducedMotion ? "paused" : "running",
              }}
            />
          ))}
        </span>
      ) : (
        <>
          <span
            className="media-art-shape media-art-shape-one"
            style={{
              animationPlayState:
                reducedMotion || !isMotion ? "paused" : "running",
            }}
          />
          <span
            className="media-art-shape media-art-shape-two"
            style={{
              animationPlayState:
                reducedMotion || !isMotion ? "paused" : "running",
            }}
          />
          <span className="media-art-core" />
        </>
      )}
      <span className="media-art-marker">{piece.id.toUpperCase()} / CSS</span>
    </span>
  );
}

export default function MediaLabDemo() {
  const [filter, setFilter] = useState("Todos");
  const [selectedId, setSelectedId] = useState("signal");
  const [intensity, setIntensity] = useState(70);
  const [speed, setSpeed] = useState(1);
  const reducedMotion = useReducedMotion();
  const visiblePieces = pieces.filter(
    (piece) => filter === "Todos" || piece.type === filter,
  );
  const selected = pieces.find((piece) => piece.id === selectedId);

  function changeFilter(nextFilter) {
    setFilter(nextFilter);

    if (nextFilter !== "Todos" && selected.type !== nextFilter) {
      setSelectedId(pieces.find((piece) => piece.type === nextFilter).id);
    }
  }

  return (
    <div className="media-layout">
      <div className="media-library">
        <div className="media-controls">
          <div>
            <p className="demo-section-label">GALERÍA GENERATIVA</p>
            <h2>Geometría en movimiento.</h2>
          </div>
          <div
            className="media-filters"
            role="group"
            aria-label="Filtrar piezas"
          >
            {["Todos", "Imagen", "Motion"].map((option) => (
              <button
                key={option}
                className={filter === option ? "is-active" : ""}
                aria-pressed={filter === option}
                onClick={() => changeFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <p className="media-library-description">
          Selecciona una composición para consultar su ficha. Todas las piezas
          son experimentos de ejemplo realizados con CSS.
        </p>
        <div className="media-grid">
          {visiblePieces.map((piece) => (
            <button
              className={`media-card${selectedId === piece.id ? " is-selected" : ""}`}
              key={piece.id}
              onClick={() => setSelectedId(piece.id)}
              aria-pressed={selectedId === piece.id}
              aria-label={`Ver ${piece.title}, ${piece.type}`}
            >
              <Composition
                piece={piece}
                intensity={intensity}
                speed={speed}
                reducedMotion={reducedMotion}
              />
              <span className="media-card-info">
                <strong>{piece.title}</strong>
                <span>
                  {piece.type === "Motion" ? (
                    <Play size={13} aria-hidden="true" />
                  ) : (
                    <Image size={13} aria-hidden="true" />
                  )}
                  {piece.type}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <aside className="media-detail" aria-labelledby="media-detail-title">
        <p className="demo-section-label">FICHA DE LA PIEZA</p>
        <h3 id="media-detail-title">{selected.title}</h3>
        <p>{selected.description}</p>
        <dl className="media-metadata">
          <div>
            <dt>Formato</dt>
            <dd>
              {selected.type === "Motion" ? "Animación CSS" : "Imagen CSS"}
            </dd>
          </div>
          <div>
            <dt>Paleta</dt>
            <dd>{selected.palette}</dd>
          </div>
          <div>
            <dt>Técnica</dt>
            <dd>{selected.technique}</dd>
          </div>
        </dl>
        <div className="media-sliders">
          <h4>
            <SlidersHorizontal size={15} aria-hidden="true" /> Ajustar
            composición
          </h4>
          <label htmlFor="media-intensity">
            Intensidad <output htmlFor="media-intensity">{intensity}%</output>
          </label>
          <input
            id="media-intensity"
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))}
          />
          <label htmlFor="media-speed">
            Velocidad <output htmlFor="media-speed">{speed.toFixed(1)}×</output>
          </label>
          <input
            id="media-speed"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            disabled={reducedMotion || filter === "Imagen"}
            onChange={(event) => setSpeed(Number(event.target.value))}
            aria-describedby="media-motion-note"
          />
          <p className="media-motion-note" id="media-motion-note">
            {reducedMotion
              ? "Las animaciones están pausadas según tu preferencia de movimiento reducido."
              : "La velocidad se aplica a las piezas Motion. Las imágenes permanecen estáticas."}
          </p>
        </div>
      </aside>
    </div>
  );
}
