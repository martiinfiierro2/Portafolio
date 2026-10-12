import { ArrowUp, ArrowUpRight, Code2, Terminal } from "lucide-react";
import Reveal from "./components/Reveal";

export default function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="shell">
        <Reveal className="contact">
          <div>
            <p className="eyebrow">03 / CONECTAR</p>
            <h2>¿Construimos lo siguiente?</h2>
            <p>Encuentra mi código y sigue el desarrollo de mis proyectos.</p>
          </div>
          <a
            className="button secondary"
            href="https://github.com/martiinfiierro2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code2 size={18} /> Conectar en GitHub <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <div className="footer-bottom">
          <a className="wordmark" href="#inicio">
            <Terminal size={17} />
            <span>
              mf<span className="accent">.dev</span>
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
