export default function SceneIntro() {
  return (
    <main className="scene-intro" aria-labelledby="person-name">
      <p className="intro-greeting">
        Hola, soy <span className="greeting-arrow" aria-hidden="true" />
      </p>
      <h1 id="person-name">
        Martín <span>Fierro</span>
      </h1>
      <p className="intro-role">Desarrollador full-stack junior</p>
      <p className="intro-description">
        Construyo aplicaciones web robustas
        <br />y de utilidad, de la interfaz a la lógica.
      </p>
    </main>
  );
}
