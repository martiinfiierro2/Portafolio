import TechnologyList from "../TechnologyList";

const groups = [
  { name: "Frontend", technologies: ["React", "Angular", "JavaScript", "HTML", "CSS"] },
  { name: "Backend", technologies: ["Node.js", "Express", "Java", ".NET"] },
  { name: "Datos y herramientas", technologies: ["PostgreSQL", "MySQL", "SQL", "Git", "GitHub"] },
];

export default function AboutSection() {
  return (
    <section className="about wide" id="sobre-mi" aria-labelledby="about-title">
      <div className="about-intro">
        <h2 id="about-title" tabIndex={-1}>La interfaz.<br />Y todo lo demás.</h2>
        <div>
          <p>Me gusta construir aplicaciones que se entiendan al usarlas y al mirar lo que hay detrás.</p>
          <p>Interfaz, interacción y datos forman parte del mismo trabajo: resolver un problema y hacerlo comprensible.</p>
        </div>
      </div>
      <div className="toolbox">
        <h3>Las piezas con las que trabajo.</h3>
        <div className="technology-groups">
          {groups.map(group => (
            <section className="technology-group" aria-label={group.name} key={group.name}>
              <h4>{group.name}</h4>
              <TechnologyList technologies={group.technologies} label={group.name} />
            </section>
          ))}
        </div>
      </div>
      <div className="personal-note"><h3>Fuera de la pantalla.</h3><p>Disfruto del deporte. Dentro, me mueven las ganas de entender y mejorar.</p></div>
    </section>
  );
}
