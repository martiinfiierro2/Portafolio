import { ArrowDown, ArrowUpRight } from "lucide-react";
import Reveal from "./components/Reveal";

export default function Bio() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-glow hero-glow-violet" />
        <span className="hero-glow hero-glow-mint" />
        <span className="hero-orbit" />
      </div>

      <div className="hero-content shell">
        <Reveal className="hero-copy">
          <p className="hero-greeting">Hola, soy</p>
          <h1 id="hero-title" aria-label="Martín Fierro">
            <span className="hero-name-first">Martín</span>
            <span className="hero-name-last">
              Fierro<span className="hero-name-dot">.</span>
            </span>
          </h1>
        </Reveal>

        <Reveal className="hero-profile" delay={0.12}>
          <span className="hero-profile-mark" aria-hidden="true">
            <ArrowUpRight size={30} strokeWidth={1.5} />
          </span>
          <p className="hero-role-label">Ingeniero multimedia</p>
          <p className="hero-role">
            Desarrollador
            <br />
            <span>full-stack.</span>
          </p>
        </Reveal>
      </div>

      <Reveal className="hero-discover shell" delay={0.2}>
        <a className="discover-link" href="#proyectos">
          <span className="discover-arrow">
            <ArrowDown size={21} aria-hidden="true" />
          </span>
          <span className="discover-copy">
            <span>Descubre mis proyectos</span>
            <span className="discover-hint">
              Desliza o haz clic para explorar
            </span>
          </span>
        </a>
      </Reveal>
    </section>
  );
}
