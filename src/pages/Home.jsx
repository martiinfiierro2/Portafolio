import { Download } from "lucide-react";
import ProjectKeyboard from "../components/ProjectKeyboard";
import { contact } from "../data/contact";
import "./Home.css";

export default function Home() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-inner">
        <h1 id="hero-title" className="hero-name" tabIndex={-1}>
          <span>Martín Fierro</span>
        </h1>
        <div className="hero-intro">
          <p className="hero-role">Desarrollador full-stack</p>
          <p className="hero-description">Ingeniería multimedia para conectar diseño, interacción y datos.</p>
          {contact.cv ? (
            <a className="hero-cv" href={contact.cv} download="CV-Martin-Fierro.pdf">
              Descargar CV <Download size={18} aria-hidden="true" />
            </a>
          ) : (
            <button className="hero-cv" type="button" aria-disabled="true" title="CV todavía no disponible">
              Descargar CV <Download size={18} aria-hidden="true" />
              <span className="sr-only">. Todavía no disponible.</span>
            </button>
          )}
        </div>
        <div className="hero-object"><ProjectKeyboard /></div>
      </div>
    </section>
  );
}
