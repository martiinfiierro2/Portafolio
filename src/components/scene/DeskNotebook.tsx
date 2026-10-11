import { profile, technologyCategories } from '../../data/profile';
import TechnologyIcon from '../ui/TechnologyIcon';

export default function DeskNotebook() {
  return (
    <aside className="desk-notebook" aria-labelledby="notebook-title">
      <h2 id="notebook-title">Tecnologías</h2>
      <div className="notebook-groups">
        {technologyCategories.map((category) => {
          const technologies = profile.technologies.filter((tech) => tech.category === category.id);
          if (!technologies.length) return null;
          return (
            <section
              className="notebook-group"
              key={category.id}
              aria-labelledby={`tech-${category.id}`}
            >
              <h3 id={`tech-${category.id}`}>{category.label}</h3>
              <ul className="notebook-technologies">
                {technologies.map((tech) => (
                  <li key={tech.id}>
                    <TechnologyIcon id={tech.id} />
                    <span>{tech.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
