export default function TechTags({ technologies, label = 'Tecnologías' }) {
  return (
    <ul className="tech-tags" aria-label={label}>
      {technologies.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
