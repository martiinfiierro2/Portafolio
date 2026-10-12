const sections = [
  { id: 'inicio', label: 'Inicio', available: true },
  { id: 'proyectos', label: 'Proyectos', available: false },
  { id: 'cv', label: 'CV', available: false },
  { id: 'contacto', label: 'Contacto', available: false },
];

export default function Navigation() {
  return (
    <nav className="navigation" aria-label="Navegación principal">
      {sections.map((section) =>
        section.available ? (
          <a key={section.id} href={`#${section.id}`} aria-current="page">
            {section.label}
          </a>
        ) : (
          <button key={section.id} type="button" disabled>
            {section.label}
          </button>
        ),
      )}
    </nav>
  );
}
