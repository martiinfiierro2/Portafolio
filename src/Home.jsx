import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Github, Instagram, Linkedin, Whatsapp } from "./components/SocialIcons";
import CvPreview from "./components/CvPreview";
import { experience } from "./data/experience";
import { contact } from "./data/contact";
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
        <div className="hero-inner">
          <div className="info-container">
            <div className="info-profesion">
              <Reveal className="hero-heading">
                <h1 id="hero-title">Martín Fierro</h1>
              </Reveal>
              <Reveal className="hero-copy" delay={0.08}>
                <h2>
                  Desarrollador
                  <br />
                  <span>full-stack</span>
                </h2>
                <p className="hero-description">
                  Construyo experiencias web claras, modernas y funcionales.
                </p>
              </Reveal>
              <div className="hero-discover">
                <div className="hero-actions">
                  <Link className="discover-link" to="/#proyectos">
                    Ver mis proyectos
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </Link>
                  <Link className="hero-secondary-link" to="/#sobre-mi">
                    Sobre mí <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </div>
                <Link className="discover-hint" to="/#proyectos">
                  <ArrowDown size={13} aria-hidden="true" /> Sigue explorando
                </Link>
              </div>
            </div>
            <Motion.div
              className="hero-art"
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
          </div>
        </div>
      </section>
      <Projects />
      <section
        className="about page-screen"
        id="sobre-mi"
        aria-labelledby="about-title"
      >
        <div className="shell about-inner">
          <div className="about-story">
            <Reveal>
              <p className="eyebrow">SOBRE MÍ</p>
              <h2 id="about-title">
                Siempre curioso.<br />
                <span>Siempre construyendo.</span>
              </h2>
            </Reveal>
            <Reveal className="about-copy" delay={0.1}>
              <p>Soy Martín Fierro, ingeniero multimedia y desarrollador full-stack. Convierto ideas en herramientas útiles y aprendo algo nuevo con cada proyecto.</p>
              <p>Fuera de la pantalla, disfruto del deporte. Dentro, me mueven las ganas de entender y mejorar.</p>
            </Reveal>
          </div>
          <Reveal className="experience-panel" delay={0.15}>
            <p className="eyebrow">MI TRAYECTORIA</p>
            <h3>Experiencia profesional</h3>
            {experience.length > 0 ? (
              <ol className="experience-list">
                {experience.map((job, index) => (
                  <li key={`${job.company}-${job.role}-${index}`}>
                    <p className="experience-period">{job.period}</p>
                    <h4>{job.role}</h4>
                    <p className="experience-company">{job.company}</p>
                    <p>{job.description}</p>
                  </li>
                ))}
              </ol>
            ) : <p className="experience-empty">Próximamente compartiré aquí mi experiencia profesional.</p>}
          </Reveal>
        </div>
      </section>
      <section className="connect page-screen" id="contacto" aria-labelledby="contact-title">
        <div className="shell connect-inner">
          <Reveal className="connect-copy">
            <p className="eyebrow">CONECTEMOS</p>
            <h2 id="contact-title">Lo siguiente empieza con una conversación.</h2>
            <p className="contact-intro">Conoce mi trayectoria o escríbeme a través de mis redes.</p>
          </Reveal>
          <Reveal className="about-contact" delay={0.15}>
            <CvPreview url={contact.cv} />
            <div className="social-links" aria-label="Redes sociales">
              {[
                { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
                { key: "instagram", label: "Instagram", Icon: Instagram },
                { key: "whatsapp", label: "WhatsApp", Icon: Whatsapp },
                { key: "github", label: "GitHub", Icon: Github },
              ].map(({ key, label, Icon }) => contact[key] ? (
                <a key={key} href={contact[key]} target="_blank" rel="noopener noreferrer" className="social-link">
                  <Icon size={20} aria-hidden="true" /><span>{label}</span><ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ) : (
                <span key={key} className="social-link unavailable" aria-disabled="true" title="Enlace pendiente de configurar">
                  <Icon size={20} aria-hidden="true" /><span>{label}</span><small>Pendiente</small>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
