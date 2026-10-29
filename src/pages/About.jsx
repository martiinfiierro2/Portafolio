import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import CvPreview from "../components/CvPreview";
import Reveal from "../components/Reveal";
import { experience } from "../data/experience";
import { contact } from "../data/contact";
import "./About.css";

export default function About() {
  return (
    <section className="about about-page" id="sobre-mi" aria-labelledby="about-title">
      <div className="shell about-inner">
        <div className="about-title-block">
          <Reveal><h1 id="about-title" tabIndex={-1}>Sobre mí</h1></Reveal>
          <Link className="text-link" to="/proyectos">Ver mi trabajo <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
        <div className="about-story">
          <Reveal side={16}><p className="about-intro">Soy ingeniero multimedia y desarrollador full-stack.</p></Reveal>
          <Reveal delay={0.06}><p className="about-lead">Me interesa crear experiencias web simples y funcionales, donde el <strong>diseño, la interacción y los datos</strong> se complementan para resolver problemas reales.</p></Reveal>
          <Reveal delay={0.12}><p className="about-personal">Fuera de la pantalla, disfruto del deporte. Dentro, me mueven las ganas de entender y mejorar.</p></Reveal>
        </div>
        <section className="about-skills-wrap" aria-labelledby="about-skills-title">
          <Reveal><h2 id="about-skills-title">Con qué trabajo.</h2></Reveal>
          <dl className="about-skills">
            <Reveal><dt>Frontend</dt><dd>React, Angular, JavaScript, HTML y CSS</dd></Reveal>
            <Reveal delay={0.06}><dt>Backend</dt><dd>Node.js, Express, Java y .NET</dd></Reveal>
            <Reveal delay={0.12}><dt>Datos y herramientas</dt><dd>SQL, PostgreSQL, MySQL, Git y GitHub</dd></Reveal>
          </dl>
        </section>
        {(experience.length > 0 || contact.cv) && (
          <Reveal className="experience-panel">
            {experience.length > 0 && <><h2>Experiencia profesional</h2><ol className="experience-list">{experience.map((job) => <li key={`${job.company}-${job.role}-${job.period}`}><p className="experience-period">{job.period}</p><h3>{job.role}</h3><p className="experience-company">{job.company}</p><p>{job.description}</p></li>)}</ol></>}
            {contact.cv && <CvPreview url={contact.cv} />}
          </Reveal>
        )}
        <Link className="about-next" to="/proyectos"><span>Del perfil al proyecto.</span><ArrowUpRight size={30} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
