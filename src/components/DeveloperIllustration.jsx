export default function DeveloperIllustration({ dark }) {
  return (
    <img
      className="developer-illustration"
      src={`/illustrations/martin-${dark ? "dark" : "light"}.png`}
      alt="Ilustración de Martín Fierro mirando su portátil mientras escribe, con la mesa en primer plano y ocho cuadros visibles a su izquierda: React, Angular, SQL, JavaScript, Node.js, Git, HTML y CSS."
      width={1536}
      height={1024}
      fetchPriority="high"
      decoding="async"
    />
  );
}
