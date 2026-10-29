import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectKeyboard from "../components/ProjectKeyboard";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { projects } from "../data/projects";
import { contact } from "../data/contact";
import "./Home.css";

const selectedProjects = projects.filter((project) => !project.isExample);
const monitoring = selectedProjects.find((project) => project.caseStudy);

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-inner">
          <h1 id="hero-title" className="hero-name" tabIndex={-1}><span>Martín Fierro</span></h1>
          <div className="hero-intro">
            <p className="hero-role">Desarrollador full-stack</p>
            <p className="hero-description">Ingeniería multimedia para conectar diseño, interacción y datos.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/proyectos">Ver proyectos <ArrowUpRight size={19} aria-hidden="true" /></Link>
              {contact.cv && <a className="hero-cv" href={contact.cv} download="CV-Martin-Fierro.pdf">Descargar CV <Download size={18} aria-hidden="true" /></a>}
            </div>
          </div>
          <div className="hero-object"><ProjectKeyboard /></div>
          <a className="hero-scroll" href="#trabajo">Explorar mi trabajo <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="home-work shell" id="trabajo" aria-labelledby="home-work-title">
        <div className="home-work-intro">
          <Reveal><h2 id="home-work-title">El trabajo,<br />en pantalla.</h2></Reveal>
          <Reveal delay={0.06}><p>Aplicaciones donde combino diseño, lógica y datos.</p></Reveal>
          <Link className="text-link" to="/proyectos">Todos los proyectos <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
        <div className="home-work-list">
          {selectedProjects.map((project) => (
            <Reveal key={project.slug} side={20}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {monitoring && (
        <section className="home-perspectives shell" aria-labelledby="home-perspectives-title">
          <Reveal><h2 id="home-perspectives-title">De cerca.</h2><p>El mapa y el detalle de un mismo sistema.</p></Reveal>
          <div className="home-screen-pair">
            {monitoring.gallery.filter((image) => ['Mapa', 'Detalle'].includes(image.label)).map((image, index) => (
              <Reveal key={image.src} side={index ? 16 : -16} delay={index * 0.06}>
                <Link to={`/proyectos/${monitoring.slug}`} className="home-screen" aria-label={`Explorar ${image.label.toLowerCase()} en Monitorización distribuida`}>
                  <img src={image.src} alt={image.alt} width={1440} height={900} loading="lazy" decoding="async" />
                  <span>{image.label}<ArrowUpRight size={19} aria-hidden="true" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="home-about" aria-labelledby="home-about-title">
        <div className="shell home-about-inner">
          <Reveal><h2 id="home-about-title">Diseño, interacción<br />y datos.</h2></Reveal>
          <div>
            <Reveal delay={0.06}><p>Soy ingeniero multimedia y desarrollador full-stack. Me interesa crear experiencias web simples y funcionales.</p></Reveal>
            <Link className="text-link" to="/sobre-mi">Más sobre mí <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
