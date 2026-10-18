import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { contact } from "../data/contact";
import useProjectJourney from "../hooks/useProjectJourney";
import ProjectTablet from "./ProjectTablet";
import Projects from "./Projects";
import "./ProjectJourney.css";

export default function ProjectJourney() {
  const journeyRef = useProjectJourney();

  return (
    <div className="portfolio-journey" ref={journeyRef}>
      <div className="journey-track">
        <div className="journey-stage">
          <section className="hero" id="inicio" aria-labelledby="hero-title">
            <div className="shell hero-inner">
              <div className="hero-heading">
                <h1 id="hero-title" aria-label="Martín Fierro">
                  {["Martín", "Fierro"].map((word, wordIndex) => (
                    <span className="hero-name-word" key={word} aria-hidden="true">
                      {[...word].map((letter, index) => (
                        <span
                          className="hero-name-letter"
                          data-hero-letter
                          data-direction={wordIndex === 0 ? "left" : "right"}
                          key={`${word}-${index}`}
                        >
                          {letter}
                        </span>
                      ))}
                    </span>
                  ))}
                </h1>
              </div>
              <div className="hero-intro">
                <div className="hero-copy">
                  <h2>Desarrollador full-stack</h2>
                  <p className="hero-description">
                    Ingeniería multimedia para conectar diseño, interacción y datos.
                  </p>
                </div>
              </div>
              <div className="hero-object">
                <ProjectTablet />
              </div>
              <div className="hero-links">
                <Link to="/#contacto">
                  Hablemos <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <a href={contact.github} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="journey-catalog">
        <Projects />
      </div>
    </div>
  );
}
