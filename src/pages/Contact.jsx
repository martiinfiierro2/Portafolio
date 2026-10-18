import SocialMedia from "../components/SocialMedia";
import Reveal from "../components/Reveal";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="connect" aria-labelledby="contact-title">
      <div className="shell connect-inner">
        <Reveal className="connect-copy">
          <h1 id="contact-title" tabIndex={-1}>Hablemos.</h1>
          <p className="connect-lead">Una idea, una pregunta o un próximo proyecto.</p>
          <p>Puedes encontrarme en mis redes y seguir lo que construyo.</p>
        </Reveal>
        <Reveal delay={0.08}><SocialMedia /></Reveal>
      </div>
    </section>
  );
}
