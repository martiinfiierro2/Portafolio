import { profile } from '../../data/profile';
import type { TechnologyCategory } from '../../types/portfolio';
import DeskObjectArt from './DeskObjectArt';
import ReferenceObjectArt from './ReferenceObjectArt';
import TechnologyMark from '../ui/TechnologyMark';
const groups: { id: TechnologyCategory; title: string }[] = [
  { id: 'frontend', title: 'Frontend' },
  { id: 'backend', title: 'Backend' },
  { id: 'database', title: 'Datos / SQL' },
];
export default function DeskNotebook() {
  return (
    <aside className="desk-notebook" aria-labelledby="notebook-title">
      <DeskObjectArt kind="notebook" />
      <ReferenceObjectArt kind="notebook" />
      <div className="notebook-content">
        <h2 id="notebook-title">Tecnologías</h2>
        <div className="notebook-groups">
          {groups.map((group) => {
            const technologies = profile.technologies.filter((tech) => tech.category === group.id);
            if (!technologies.length) return null;
            return (
              <section
                className="notebook-group"
                key={group.id}
                aria-labelledby={`tech-${group.id}`}
              >
                <h3 id={`tech-${group.id}`}>{group.title}</h3>
                <ul className="notebook-technologies" data-category={group.id}>
                  {technologies.map((tech) => (
                    <li key={tech.id} data-technology={tech.id} style={{ color: tech.color }}>
                      <TechnologyMark id={tech.id} />
                      <span>{tech.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
