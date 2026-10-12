import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      className="about section shell"
      id="sobre-mi"
      aria-labelledby="about-title"
    >
      <Reveal>
        <p className="eyebrow">SOBRE MÍ</p>
        <h2 id="about-title">
          Curiosidad para aprender.
          <br />
          Ganas de construir.
        </h2>
      </Reveal>
      <Reveal className="about-copy" delay={0.1}>
        <p>
          Soy ingeniero multimedia y desarrollador full-stack. Me gusta
          convertir ideas en herramientas útiles y aprender algo nuevo con cada
          proyecto.
        </p>
        <p>
          Cuando no estoy programando, disfruto del deporte. Aquí comparto lo
          que construyo y el proceso que hay detrás.
        </p>
      </Reveal>
    </section>
  );
}
