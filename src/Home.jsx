import { useRef } from "react";
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Reveal from "./components/Reveal";
import Projects from "./components/Projects";
import "./Home.css";

export default function Home({ dark }) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <>
      <section
        ref={sectionRef}
        className="hero"
        id="inicio"
        aria-labelledby="hero-title"
      >
        <Reveal className="hero-heading shell">
          <p className="hero-role">Ingeniería multimedia</p>
          <h1 id="hero-title">
            Desarrollador
            <br />
            <span>full-stack</span>
          </h1>
        </Reveal>
        <Motion.div
          className="hero-art shell"
          style={reducedMotion ? undefined : { scale, opacity, y }}
        >
          <img
            className="developer-illustration"
            src={`/illustrations/martin-${dark ? "dark" : "light"}.png`}
            alt="Ilustración de Martín Fierro trabajando en su portátil, con cuatro cuadros de habilidades a su izquierda: Frontend, Backend, Bases de datos y Herramientas."
            width={1536}
            height={1024}
            fetchPriority="high"
            decoding="async"
          />
        </Motion.div>
        <div className="hero-discover shell">
          <a className="discover-link" href="#proyectos">
            Ver mis proyectos <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="discover-hint" href="#enfoque">
            <ArrowDown size={13} aria-hidden="true" /> Sigue explorando
          </a>
        </div>
      </section>
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
      <Projects />
      <section
        className="about page-screen"
        id="sobre-mi"
        aria-labelledby="about-title"
      >
        <div className="shell about-inner">
          <Reveal>
            <p className="eyebrow">SOBRE MÍ</p>
            <h2 id="about-title">
              Siempre curioso.
              <br />
              <span>Siempre construyendo.</span>
            </h2>
          </Reveal>
          <Reveal className="about-copy" delay={0.1}>
            <p>
              Soy Martín Fierro, ingeniero multimedia y desarrollador
              full-stack. Convierto ideas en herramientas útiles y aprendo algo
              nuevo con cada proyecto.
            </p>
            <p>
              Fuera de la pantalla, disfruto del deporte. Dentro, me mueven las
              ganas de entender y mejorar.
            </p>
          </Reveal>
          <a className="screen-next" href="#contacto">
            Sigamos en contacto <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
    </>
  );
}
