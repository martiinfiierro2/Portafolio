import CvPreview from "../components/CvPreview";
import Reveal from "../components/Reveal";
import { experience } from "../data/experience";
import { contact } from "../data/contact";
import "./About.css";

export default function About() {
  return (
    <section className="about about-page" id="sobre-mi" aria-labelledby="about-title">
      <div className="shell about-inner">
        <Reveal><h1 id="about-title" tabIndex={-1}>Sobre mí</h1></Reveal>
        <Reveal className="about-story">
          <p className="about-intro">Soy ingeniero multimedia y desarrollador full-stack.</p>
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

        <Reveal className="about-skills-wrap" delay={0.08}>
          <dl className="about-skills">
            <div><dt>Frontend</dt><dd>React, Angular, JavaScript, HTML y CSS</dd></div>
            <div><dt>Backend</dt><dd>Node.js, Express, Java y .NET</dd></div>
            <div><dt>Datos y herramientas</dt><dd>SQL, PostgreSQL, MySQL, Git y GitHub</dd></div>
          </dl>
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
  );
}
