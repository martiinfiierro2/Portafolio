import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      className="about section shell"
      id="sobre-mi"
      aria-labelledby="about-title"
    >
      <Reveal>
        <p className="eyebrow">02 / SOBRE MÍ</p>
        <h2 id="about-title">
          Me gusta entender.
          <br />
          <em>Y después, construir.</em>
        </h2>
      </Reveal>
      <Reveal className="about-copy" delay={0.1}>
        <p>
          Disfruto crear soluciones digitales desde cero: desde la primera idea
          de la interfaz hasta la lógica del backend. Mis proyectos personales
          son el lugar donde pruebo, aprendo y convierto esa curiosidad en
          código.
        </p>
        <p>
          Fuera de la pantalla, disfruto del deporte. Dentro, busco el mismo
          equilibrio: constancia, atención al detalle y ganas de mejorar.
        </p>
        <a
          className="text-link"
          href="https://github.com/martiinfiierro2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lo que estoy construyendo <ArrowUpRight size={17} />
        </a>
      </Reveal>
    </section>
  );
}
