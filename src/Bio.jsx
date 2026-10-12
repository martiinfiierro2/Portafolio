import { ArrowDown, ArrowUpRight } from "lucide-react";
import Reveal from "./components/Reveal";
import HeroShowcase from "./components/HeroShowcase";

export default function Bio() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-paper-glow" aria-hidden="true" />
      <Reveal className="hero-heading shell">
        <p className="hero-intro">Hola, soy Martín Fierro</p>
        <h1 id="hero-title" aria-label="Portafolio de Martín Fierro">
          Portafolio<span className="hero-title-mark">.</span>
        </h1>
        <p className="hero-role">
          Ingeniero multimedia · Desarrollador full-stack
        </p>
      </Reveal>
      <Reveal className="hero-art shell" delay={0.12}>
        <HeroShowcase />
      </Reveal>
      <Reveal className="hero-discover shell" delay={0.2}>
        <a className="discover-link" href="#proyectos">
          <span>Explora mis proyectos</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <span className="discover-hint">
          <ArrowDown size={13} aria-hidden="true" /> O desliza para descubrir
          más
        </span>
      </Reveal>
    </section>
  );
}
