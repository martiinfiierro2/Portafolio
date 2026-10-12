import { ArrowDown } from "lucide-react";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section
      className="experience page-screen"
      id="enfoque"
      aria-labelledby="experience-title"
    >
      <div className="shell experience-inner">
        <Reveal>
          <p className="eyebrow">EL ENFOQUE</p>
          <h2 id="experience-title">
            Lo que ves.
            <br />
            <span>Y lo que lo hace funcionar.</span>
          </h2>
        </Reveal>
        <Reveal className="experience-copy" delay={0.1}>
          <p>
            Una experiencia completa conecta una interfaz clara con la lógica
            que hay detrás. Me gusta construir ambas, cuidando cómo funciona
            cada detalle.
          </p>
        </Reveal>
        <Reveal className="experience-flow" delay={0.15}>
          <span>Interfaz</span>
          <i aria-hidden="true" />
          <span>Lógica</span>
          <i aria-hidden="true" />
          <span>Experiencia</span>
        </Reveal>
        <a className="screen-next" href="#proyectos">
          Mira el resultado <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
