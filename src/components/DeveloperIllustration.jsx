export default function DeveloperIllustration({ dark }) {
  return (
    <img
      className="developer-illustration"
      src={`/illustrations/martin-${dark ? "dark" : "light"}.png`}
      alt="Ilustración de Martín Fierro sentado frente a un portátil orientado hacia la izquierda, mirando la pantalla mientras escribe."
      width={1536}
      height={1024}
      fetchPriority="high"
      decoding="async"
    />
  );
}
