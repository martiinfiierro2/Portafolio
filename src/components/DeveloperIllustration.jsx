export default function DeveloperIllustration({ dark }) {
  return (
    <img
      className="developer-illustration"
      src={`/illustrations/martin-${dark ? "dark" : "light"}.png`}
      alt="Ilustración de Martín Fierro trabajando en su portátil, con cuatro cuadros de habilidades a su izquierda: Frontend, Backend, Bases de datos y Herramientas."
      width={1536}
      height={1024}
      fetchPriority="high"
      decoding="async"
    />
  );
}
