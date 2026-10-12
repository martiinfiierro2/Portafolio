export default function DeveloperIllustration({ dark }) {
  return (
    <img
      className="developer-illustration"
      src={`/illustrations/martin-${dark ? "dark" : "light"}.png`}
      alt="Ilustración de Martín Fierro sentado en su escritorio, trabajando en un portátil."
      width={1536}
      height={1024}
      fetchPriority="high"
      decoding="async"
    />
  );
}
