import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLink from "./SectionLink";

export default function Footer() {
  return (
    <footer className="footer wide">
      <p><Link to="/">Martín Fierro</Link></p>
      <div><SectionLink className="text-link" section="contacto">Contacto</SectionLink><SectionLink className="to-top text-link" section="inicio">Volver arriba <ArrowUp aria-hidden="true" /></SectionLink></div>
    </footer>
  );
}
