import { useRef } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import Display from './Display';
import ProfileScreen from './ProfileScreen';
import ProjectScreen from './ProjectScreen';
import ProjectSelector from './ProjectSelector';
import UsbDrive from './UsbDrive';
import useUsbConnection from '../../hooks/useUsbConnection';
import { projects } from '../../data/projects';

export default function PortfolioExperience() {
  const containerRef = useRef(null);
  const displayRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { phase, drive, project, geometry, scope, connect, disconnect } = useUsbConnection(containerRef, displayRef);
  const busy = phase === 'connecting' || phase === 'disconnecting';
  const connected = Boolean(drive);
  return <section ref={containerRef} className={`portfolio-experience container${connected ? ' has-connected-drive' : ''}`} id="inicio" aria-label="Presentación y proyectos">
    <div className="display-column"><div ref={displayRef}><Display><Motion.div key={project?.id || 'profile'} initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: .2 }}>{project ? <ProjectScreen project={project} onDisconnect={disconnect} busy={busy} /> : <ProfileScreen />}</Motion.div></Display></div><p className="selection-status" role="status">{phase === 'connecting' ? `Conectando ${drive?.title}…` : phase === 'disconnecting' ? 'Desconectando memoria…' : project ? `${project.title} conectado. Proyecto de muestra.` : 'Selecciona una memoria para explorar los proyectos de muestra.'}</p></div>
    <ProjectSelector projects={projects} selectedId={drive?.id} onSelect={(id, element) => connect(projects.find(project => project.id === id), element)} busy={busy} />
    {drive && geometry && <div className="traveling-drive" ref={scope} style={{ left: 0, top: 0, transform: `translate(${geometry.x}px, ${geometry.y}px)`, width: geometry.width, height: geometry.height }} aria-hidden="true"><UsbDrive name={drive.title} color={drive.color} icon={drive.icon} selected={phase === 'connected'} /></div>}
  </section>;
}
