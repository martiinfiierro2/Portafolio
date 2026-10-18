import SocialMedia from "./components/SocialMedia";
import CvPreview from "./components/CvPreview";
import { experience } from "./data/experience";
import { contact } from "./data/contact";
import Reveal from "./components/Reveal";
import ProjectJourney from "./components/ProjectJourney";
import "./Home.css";

export default function Home() {
  return (
    <>
      <ProjectJourney />

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
