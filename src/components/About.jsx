import Reveal from "./Reveal";

export default function About() {
  return (
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
            Soy Martín Fierro, ingeniero multimedia y desarrollador full-stack.
            Convierto ideas en herramientas útiles y aprendo algo nuevo con cada
            proyecto.
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
  );
}
