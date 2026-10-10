import { Link } from 'react-router-dom';
export default function NotFound({ project = false }) {
  return (
    <div className="not-found narrow-container">
      <p className="eyebrow">404</p>
      <h1 tabIndex={-1}>
        {project ? 'Proyecto no encontrado.' : 'Esta página no está en la colección.'}
      </h1>
      <p>El enlace puede haber cambiado. Puedes volver a explorar los proyectos.</p>
      <Link className="button primary" to="/projects">
        Ver proyectos →
      </Link>
    </div>
  );
}
