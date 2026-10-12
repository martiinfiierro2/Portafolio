import { ArrowDown } from "lucide-react";
import portrait from "./img/martin.jpg";
import Reveal from "./components/Reveal";

export default function Bio() {
  return (
    <section className="hero shell" id="inicio" aria-labelledby="hero-title">
      <Reveal className="hero-copy">
        <img
          className="hero-portrait"
          src={portrait}
          alt="Retrato de Martín Fierro"
          width="80"
          height="80"
          fetchPriority="high"
        />
        <p className="hero-greeting">Hola, soy</p>
        <h1 id="hero-title">
          Martín Fierro<span className="accent">.</span>
        </h1>
        <p className="hero-role">
          Ingeniero multimedia · Desarrollador full-stack
        </p>
        <p className="hero-description">
          Creo experiencias digitales que conectan ideas y personas.
        </p>
      </Reveal>
      <Reveal className="hero-discover" delay={0.15}>
        <a className="discover-link" href="#proyectos">
          <span>Descubre mis proyectos</span>
          <span className="discover-hint">
            Desliza o haz clic para explorar
          </span>
          <span className="discover-arrow">
            <ArrowDown size={20} aria-hidden="true" />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
