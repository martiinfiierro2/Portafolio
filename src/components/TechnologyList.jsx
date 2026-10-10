import TechnologyIcon from './TechnologyIcon';

export default function TechnologyList({ technologies, label = 'Tecnologías' }) {
  return (
    <ul className="floppy-technologies" aria-label={label}>
      {technologies.map((technology) => (
        <li key={technology}>
          <TechnologyIcon name={technology} />
          {technology}
        </li>
      ))}
    </ul>
  );
}
