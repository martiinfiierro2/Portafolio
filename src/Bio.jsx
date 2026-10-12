import { ArrowDown, ArrowUpRight } from "lucide-react";
import portrait from "./img/martin.jpg";
import Reveal from "./components/Reveal";

export default function Bio() {
  return (
    <section className="hero shell" id="inicio" aria-labelledby="hero-title">
      <Reveal className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> Full-stack Developer · Junior
        </p>
        <h1 id="hero-title">
          Ideas claras.
          <br />
          Código con <em>propósito.</em>
        </h1>
        <p className="hero-description">
          Soy Martín Fierro, desarrollador full-stack junior. Transformo ideas
          en experiencias digitales, cuidando lo que se ve y lo que hay detrás.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#proyectos">
            Explorar mi trabajo <ArrowUpRight size={18} />
          </a>
          <a className="text-link" href="#sobre-mi">
            Un poco sobre mí <ArrowDown size={16} />
          </a>
        </div>
        <div className="hero-note">
          <span>DISEÑO → DESARROLLO → DETALLE</span>
          <span>Siempre aprendiendo.</span>
        </div>
      </Reveal>
      <Reveal className="portrait-area" delay={0.15}>
        <div className="portrait-frame">
          <img
            src={portrait}
            alt="Retrato de Martín Fierro"
            fetchPriority="high"
          />
        </div>
        <div className="portrait-label">
          <span className="tiny-label">DETRÁS DEL CÓDIGO</span>
          <strong>
            Martín Fierro <ArrowUpRight size={20} aria-hidden="true" />
          </strong>
        </div>
        <span className="portrait-caption">
          Curiosidad como punto de partida.
        </span>
      </Reveal>
    </section>
  );
}
