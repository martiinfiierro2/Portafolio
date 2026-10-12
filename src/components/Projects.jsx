import { ArrowUpRight, Code2, Layers, MousePointer2 } from "lucide-react";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section
      className="projects section shell"
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow">01 / TRABAJO</p>
          <h2 id="projects-title">Del concepto a la pantalla.</h2>
        </div>
        <p>
          Un espacio para construir,
          <br />
          experimentar y seguir creciendo.
        </p>
      </Reveal>
      <Reveal>
        <a
          className="project-card"
          href="https://github.com/martiinfiierro2/Portafolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="project-art" aria-hidden="true">
            <div className="mini-window">
              <div className="mini-top">
                <span>mf.</span>
                <span>portfolio / 01</span>
              </div>
              <div className="mini-body">
                <span className="mini-eyebrow">
                  DISEÑAR. CONSTRUIR. MEJORAR.
                </span>
                <strong>
                  Un lugar para
                  <br />
                  mis ideas<span>.</span>
                </strong>
                <div className="mini-rule" />
                <span className="mini-button">Explorar →</span>
              </div>
              <div className="mini-orbit">
                <Code2 size={32} />
              </div>
            </div>
            <span className="art-caption">PERSONAL WEBSITE — REACT</span>
          </div>
          <div className="project-info">
            <div className="project-title">
              <h3>Mi portafolio personal</h3>
              <span className="circle-arrow">
                <ArrowUpRight size={22} />
              </span>
            </div>
            <p>
              Mi carta de presentación digital. Una interfaz sencilla,
              componentes reutilizables y movimiento que acompaña la
              experiencia.
            </p>
            <div className="tags">
              <span>React</span>
              <span>Vite</span>
              <span>Framer Motion</span>
            </div>
            <span className="project-source">
              Ver código en GitHub <ArrowUpRight size={15} />
            </span>
          </div>
        </a>
      </Reveal>
      <Reveal className="process-strip">
        <span>
          <Layers size={18} /> Componentes modulares
        </span>
        <span>
          <MousePointer2 size={18} /> Interacciones cuidadas
        </span>
        <span>
          <Code2 size={18} /> Código legible
        </span>
      </Reveal>
    </section>
  );
}
