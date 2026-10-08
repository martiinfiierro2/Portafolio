import { useState } from 'react';
import Display from './Display';
import ProfileScreen from './ProfileScreen';
import ProjectSelector from './ProjectSelector';
import { projects } from '../../data/projects';

export default function PortfolioExperience() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = projects.find(project => project.id === selectedId);
  return <section className="portfolio-experience container" id="inicio" aria-label="Presentación y proyectos">
    <div className="display-column"><Display><ProfileScreen /></Display><p className="selection-status" role="status">{selected ? `${selected.title}: memoria seleccionada. La conexión se añadirá en la siguiente etapa.` : 'Selecciona una memoria para probar el selector.'}</p></div>
    <ProjectSelector projects={projects} selectedId={selectedId} onSelect={setSelectedId} />
  </section>;
}
