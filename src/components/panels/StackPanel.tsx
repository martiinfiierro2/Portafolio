import { profile } from '../../data/profile';

export default function StackPanel() {
  const fields: [string, string | string[]][] = [
    ['name', profile.name],
    ['role', profile.role],
    ['focus', ['Frontend', 'Backend', 'UX']],
    ['stack', profile.technologies.map((tech) => tech.label)],
  ];
  if (profile.currentlyLearning.length)
    fields.push(['currently_learning', profile.currentlyLearning]);
  return (
    <>
      <p className="panel-introduction">Un pequeño vistazo a lo que hay detrás de la pantalla.</p>
      <pre className="developer-json" aria-label="Información del desarrollador">
        <code>
          {'{\n'}
          {fields.map(([key, value], index) => (
            <span className="json-line" key={key}>
              {'  '}
              <span className="json-key">{JSON.stringify(key)}</span>
              {': '}
              <span className="json-value">{JSON.stringify(value)}</span>
              {index < fields.length - 1 ? ',' : ''}
              {'\n'}
            </span>
          ))}
          {'}'}
        </code>
      </pre>
      <p className="stack-caption">
        <span />
        Leyendo developer_info.json
      </p>
    </>
  );
}
