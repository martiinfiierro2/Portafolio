import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SocialMedia from "../components/SocialMedia";
import Reveal from "../components/Reveal";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="connect" aria-labelledby="contact-title">
      <div className="shell connect-inner">
        <div className="connect-copy">
          <Reveal><h1 id="contact-title" tabIndex={-1}>Hablemos.</h1></Reveal>
          <Reveal delay={0.06}><p className="connect-lead">Una idea, una pregunta o un próximo proyecto.</p></Reveal>
          <Reveal delay={0.12}><p>Puedes encontrarme en mis redes y seguir lo que construyo.</p></Reveal>
          <Link className="text-link" to="/proyectos">Antes, un vistazo a mi trabajo <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <Reveal className="connect-networks" side={22} delay={0.1}><SocialMedia /></Reveal>
      </div>
    </section>
  );
}
