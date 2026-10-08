import { Code2, Layers } from 'lucide-react';

export default function AboutSection() {
  return <section className="about-section container" id="sobre-mi" aria-labelledby="about-heading">
    <div><p className="eyebrow">Sobre mí</p><h2 id="about-heading">De la interfaz<br />a lo que hay detrás.</h2></div>
    <div className="about-copy"><p>Me interesa construir aplicaciones completas: desde cómo se usan y se ven hasta cómo funcionan por dentro.</p><p>Este portafolio está en desarrollo. Aquí compartiré mis proyectos, las decisiones que tomé y lo que aprendí al construirlos.</p><div className="about-details"><span><Code2 size={18} />Frontend</span><span><Layers size={18} />Backend</span></div></div>
  </section>;
}
