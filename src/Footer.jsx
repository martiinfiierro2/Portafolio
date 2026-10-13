import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./components/Reveal";
import "./Footer.css";

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
          <Link className="wordmark" to="/#inicio">
            <span>
              mf<span className="accent">.</span>
            </span>
          </Link>
          <span>© {new Date().getFullYear()} Martín Fierro</span>
          <Link to="/#inicio">
            Volver al inicio <ArrowUp size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
