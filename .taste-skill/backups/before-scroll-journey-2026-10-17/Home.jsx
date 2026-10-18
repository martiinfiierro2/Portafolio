import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SocialMedia from "./components/SocialMedia";
import CvPreview from "./components/CvPreview";
import { experience } from "./data/experience";
import { contact } from "./data/contact";
import Reveal from "./components/Reveal";
import ProjectTablet from "./components/ProjectTablet";
import "./Home.css";

export default function Home() {
  return (
    <>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="shell hero-inner">
          <Reveal className="hero-heading">
            <h1 id="hero-title">
              <span>Martín</span>
              <span>Fierro</span>
            </h1>
          </Reveal>

          <div className="hero-intro">
            <div className="hero-copy">
              <Reveal delay={0.08}>
                <h2>Desarrollador full-stack</h2>
                <p className="hero-description">
                  Ingeniería multimedia para conectar diseño, interacción y datos.
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal className="hero-object" delay={0.16}>
            <ProjectTablet />
          </Reveal>
          <Reveal className="hero-links" delay={0.24}>
            <Link to="/#contacto">
              Hablemos <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href={contact.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

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
