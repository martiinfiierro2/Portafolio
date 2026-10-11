import { profile } from '../../data/profile';
import TechnologyIcon from '../ui/TechnologyIcon';

export default function DeskNotebook() {
  const [firstName, ...familyName] = profile.name.split(' ');

  return (
    <article className="desk-notebook" aria-labelledby="desk-title">
      <div className="notebook-profile">
        <p className="notebook-eyebrow">Hola, soy</p>
        <h1 id="desk-title">
          {firstName}
          <span>{familyName.join(' ')}</span>
        </h1>
        <p className="notebook-role">{profile.role}</p>
        <p className="notebook-description">{profile.introduction}</p>
      </div>
      <div className="notebook-stack">
        <h2>Tecnologías</h2>
        <ul className="notebook-technologies" aria-label="Tecnologías">
          {profile.technologies.map((tech) => (
            <li key={tech.id}>
              <span style={{ color: tech.color }} aria-hidden="true">
                <TechnologyIcon id={tech.id} />
              </span>
              <span className="technology-name">{tech.label}</span>
            </li>
          ))}
        </ul>
        <p className="notebook-note" aria-hidden="true">
          idea → interfaz → API
          <br />
          Menos ruido. Más claridad.
        </p>
      </div>
    </article>
  );
}
