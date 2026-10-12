import { ArrowUp, ArrowUpRight } from "lucide-react";
import Reveal from "./components/Reveal";

export default function Footer({ immersive = false }) {
  return (
    <footer
      id="contacto"
      className={`footer${immersive ? " contact-screen" : ""}`}
    >
      <div className="shell">
        <Reveal className="contact">
          <div>
            <p className="eyebrow">CONECTEMOS</p>
            <h2>Lo siguiente empieza con una conversación.</h2>
            <p>Puedes encontrarme y seguir mis proyectos en GitHub.</p>
          </div>
          <a
            className="button secondary"
            href="https://github.com/martiinfiierro2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mi GitHub <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <div className="footer-bottom">
          <a className="wordmark" href="#inicio">
            <span>
              mf<span className="accent">.</span>
            </span>
          </a>
          <span>© {new Date().getFullYear()} Martín Fierro</span>
          <a href="#inicio">
            Volver al inicio <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
