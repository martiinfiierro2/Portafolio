import { profile } from '../../data/profile';
export default function DeskIntroduction() {
  const [firstName, ...familyName] = profile.name.split(' ');
  return (
    <article className="desk-introduction" aria-labelledby="desk-title">
      <p className="desk-eyebrow">
        Hola, soy{' '}
        <svg viewBox="0 0 80 20" aria-hidden="true">
          <path d="M2 15Q40 0 76 11" />
        </svg>
      </p>
      <h1 id="desk-title">
        {firstName} <span>{familyName.join(' ')}</span>
      </h1>
      <p className="desk-role">{profile.role}</p>
      <p className="desk-description">
        Construyo aplicaciones web robustas
        <br />y de utilidad, de la interfaz a la lógica.
      </p>
    </article>
  );
}
