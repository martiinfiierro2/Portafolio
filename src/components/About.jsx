import { Braces, Database, Monitor, Workflow } from "lucide-react";
import Reveal from "./Reveal";

const approach = [
  {
    icon: Monitor,
    title: "Interfaz",
    description:
      "Componentes reutilizables, estados claros y una experiencia accesible en cualquier pantalla.",
  },
  {
    icon: Database,
    title: "Lógica y datos",
    description:
      "Pensar cómo se conectan las interfaces, las APIs y la información que necesita cada producto.",
  },
  {
    icon: Workflow,
    title: "Proceso",
    description:
      "Descomponer problemas, construir por módulos y comprobar cada interacción.",
  },
];

export default function About() {
  return (
    <section
      className="about section shell"
      id="sobre-mi"
      aria-labelledby="about-title"
    >
      <Reveal className="about-intro">
        <p className="eyebrow">02 / PERFIL</p>
        <h2 id="about-title">
          Pensar en sistemas.
          <br />
          <span className="muted">Construir de extremo a extremo.</span>
        </h2>
        <p>
          Mi enfoque une la ingeniería multimedia con el desarrollo full-stack:
          entender la experiencia de quien usa un producto y la lógica que lo
          hace funcionar.
        </p>
        <p>
          Este espacio documenta mi forma de trabajar. Cada proyecto tiene su
          contexto, decisiones técnicas y una demo para explorar el resultado.
        </p>
        <div className="about-signature">
          <Braces size={18} />
          <span>Menos ruido. Más intención en cada módulo.</span>
        </div>
      </Reveal>
      <Reveal className="approach-list" delay={0.1}>
        {approach.map(({ icon: Icon, title, description }, index) => (
          <div className="approach-item" key={title}>
            <span className="approach-number">0{index + 1}</span>
            <Icon size={20} />
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
