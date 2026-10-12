import { profile } from '../../data/profile';
import type { TechnologyCategory } from '../../types/portfolio';
import DeskObjectArt from './DeskObjectArt';

const groups: { id: TechnologyCategory; title: string }[] = [
  { id: 'frontend', title: 'Frontend' },
  { id: 'backend', title: 'Backend' },
  { id: 'database', title: 'Datos / SQL' },
];

export default function DeskNotebook() {
  return (
    <aside className="desk-notebook" aria-labelledby="notebook-title">
      <DeskObjectArt kind="notebook" />
      <div className="visually-hidden">
        <h2 id="notebook-title">Tecnologías</h2>
        {groups.map((group) => {
          const technologies = profile.technologies.filter((tech) => tech.category === group.id);
          if (!technologies.length) return null;
          return (
            <section key={group.id} aria-labelledby={`tech-${group.id}`}>
              <h3 id={`tech-${group.id}`}>{group.title}</h3>
              <ul>
                {technologies.map((tech) => (
                  <li key={tech.id}>{tech.label}</li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
