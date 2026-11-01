import SocialMedia from "../SocialMedia";

export default function ContactSection() {
  return (
    <section className="contact wide" id="contacto" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title" tabIndex={-1}>Seguimos<br />por aquí.</h2>
        <p>En GitHub puedes encontrar mi código, seguir los proyectos y ver en qué estoy trabajando.</p>
      </div>
      <SocialMedia />
    </section>
  );
}
