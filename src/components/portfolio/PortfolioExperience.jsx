import { Usb, ArrowUpRight } from 'lucide-react';
import Display from './Display';
import ProfileScreen from './ProfileScreen';

export default function PortfolioExperience() {
  return <section className="portfolio-experience container" id="inicio" aria-label="Presentación y proyectos">
    <Display><ProfileScreen /></Display>
    <aside className="project-placeholder" id="proyectos" aria-labelledby="projects-heading">
      <div className="section-heading"><h2 id="projects-heading">Mis proyectos</h2><span className="small-label">En preparación</span></div>
      <div className="placeholder-illustration" aria-hidden="true"><Usb size={48} strokeWidth={1.2} /><span className="placeholder-orbit" /></div>
      <h3>Una conexión.<br />Un nuevo proyecto.</h3>
      <p>Aquí podrás explorar mis proyectos mediante memorias USB interactivas.</p>
      <div className="coming-next"><span className="status-dot" />Selector USB · próxima etapa <ArrowUpRight size={16} /></div>
    </aside>
  </section>;
}
