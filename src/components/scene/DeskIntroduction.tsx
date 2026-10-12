import { profile } from '../../data/profile';
export default function DeskIntroduction() {
  const [firstName, ...familyName] = profile.name.split(' ');
  return (
    <article className="desk-introduction" aria-labelledby="desk-title">
      <p className="desk-eyebrow">
        Hola, soy{' '}
        <svg viewBox="0 0 90 25" aria-hidden="true">
          <path d="M3 19 82 7m-9-4 10 4-7 8" />
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
