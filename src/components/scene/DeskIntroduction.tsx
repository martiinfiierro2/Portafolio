import { profile } from '../../data/profile';

export default function DeskIntroduction() {
  const [firstName, ...familyName] = profile.name.split(' ');
  return (
    <article className="desk-introduction" aria-labelledby="desk-title">
      <p className="desk-eyebrow">Hola, soy</p>
      <h1 id="desk-title">
        {firstName} <span>{familyName.join(' ')}</span>
      </h1>
      <p className="desk-role">{profile.role}</p>
      <p className="desk-description">{profile.introduction}</p>
    </article>
  );
}
