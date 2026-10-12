import { ArrowDown } from "lucide-react";
import Reveal from "./components/Reveal";

export default function Bio() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-aura" />
        <span className="hero-halo" />
      </div>

      <Reveal className="hero-composition shell">
        <p className="hero-greeting">Hola, soy</p>
        <p className="hero-role-label">Ingeniero multimedia</p>
        <h1 id="hero-title" aria-label="Martín Fierro">
          <span className="hero-name-first">Martín</span>
          <span className="hero-name-last">
            Fierro<span className="hero-name-dot">.</span>
          </span>
        </h1>
        <p className="hero-role">
          Desarrollador <strong>full-stack</strong>
        </p>
      </Reveal>

      <Reveal className="hero-discover shell" delay={0.2}>
        <a className="discover-link" href="#proyectos">
          <span className="discover-copy">
            <span>Descubre mis proyectos</span>
            <span className="discover-hint">
              Desliza o haz clic para explorar
            </span>
          </span>
          <span className="discover-arrow">
            <ArrowDown size={20} aria-hidden="true" />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
