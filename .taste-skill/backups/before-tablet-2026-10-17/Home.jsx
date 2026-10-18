import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SocialMedia from "./components/SocialMedia";
import CvPreview from "./components/CvPreview";
import { experience } from "./data/experience";
import { contact } from "./data/contact";
import Reveal from "./components/Reveal";
import Projects from "./components/Projects";
import "./Home.css";

export default function Home({ dark }) {
  return (
    <>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="shell hero-inner">
          <Reveal className="hero-heading">
            <h1 id="hero-title">
              Martín <span className="hero-surname">Fierro</span>
            </h1>
          </Reveal>

          <div className="hero-intro">
            <div className="hero-copy">
              <Reveal delay={0.08}>
                <h2>Desarrollador full-stack</h2>
                <p className="hero-description">
                  Soy ingeniero multimedia. Desarrollo interfaces web y exploro
                  cómo conectar diseño, interacción y datos.
                </p>
              </Reveal>
              <Reveal className="hero-actions" delay={0.16}>
                <Link className="discover-link" to="/#proyectos">
                  Ver proyectos <ArrowUpRight size={21} aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
            <Reveal className="hero-art" delay={0.12}>
              <img
                className="developer-illustration"
                src={`/illustrations/martin-${dark ? "dark" : "light"}.png`}
                alt="Ilustración original de Martín Fierro trabajando en su portátil, con sus tecnologías de frontend, backend, bases de datos y herramientas."
                width={1536}
                height={1024}
                fetchPriority="high"
                decoding="async"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Projects />

      <section className="about" id="sobre-mi" aria-labelledby="about-title">
        <div className="shell about-inner">
          <Reveal className="about-story">
            <h2 id="about-title">Sobre mí</h2>
            <p className="about-lead">
              Me interesa crear experiencias web simples y funcionales, donde el{" "}
              <strong>diseño, la interacción y los datos</strong> se complementan
              para resolver problemas reales.
            </p>
            <p className="about-personal">
              Fuera de la pantalla, disfruto del deporte. Dentro, me mueven las
              ganas de entender y mejorar.
            </p>
          </Reveal>

          {(experience.length > 0 || contact.cv) && (
            <Reveal className="experience-panel" delay={0.1}>
              {experience.length > 0 && (
                <>
                  <h3>Experiencia profesional</h3>
                  <ol className="experience-list">
                    {experience.map((job) => (
                      <li key={`${job.company}-${job.role}-${job.period}`}>
                        <p className="experience-period">{job.period}</p>
                        <h4>{job.role}</h4>
                        <p className="experience-company">{job.company}</p>
                        <p>{job.description}</p>
                      </li>
                    ))}
                  </ol>
                </>
              )}
              {contact.cv && <CvPreview url={contact.cv} />}
            </Reveal>
          )}
        </div>
      </section>

      <section className="connect" id="contacto" aria-labelledby="contact-title">
        <div className="shell connect-inner">
          <Reveal className="connect-copy">
            <h2 id="contact-title">Hablemos.</h2>
            <p>Puedes encontrarme en mis redes y seguir lo que construyo.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <SocialMedia />
          </Reveal>
        </div>
      </section>
    </>
  );
}