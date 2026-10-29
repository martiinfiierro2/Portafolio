import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { contact } from "../data/contact";
import "./Footer.css";

export default function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div className="footer-top">
          <p>Diseño, interacción y datos.</p>
          {pathname !== '/contacto' && <Link className="text-link" to="/contacto">Hablemos <ArrowUpRight size={19} aria-hidden="true" /></Link>}
        </div>
        <Link className="footer-name" to="/" aria-label="Martín Fierro, volver al inicio">Martín Fierro</Link>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Martín Fierro</span>
          <nav aria-label="Navegación al pie"><Link to="/proyectos">Proyectos</Link><Link to="/sobre-mi">Sobre mí</Link>{contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (abre una nueva pestaña)</span></a>}</nav>
        </div>
      </div>
    </footer>
  );
}
