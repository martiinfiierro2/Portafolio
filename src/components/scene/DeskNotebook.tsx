import { profile } from '../../data/profile';
import DeskObjectArt from './DeskObjectArt';
export default function DeskNotebook() {
  return (
    <aside className="desk-notebook" aria-labelledby="notebook-title">
      <DeskObjectArt kind="notebook" />
      <div className="notebook-content">
        <h2 id="notebook-title">Tecnologías</h2>
        <ul className="notebook-technologies">
          {profile.technologies.map((tech) => (
            <li key={tech.id} style={{ color: tech.color }}>
              {tech.label}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
