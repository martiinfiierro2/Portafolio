import Daylight from './Daylight.jsx';
import SceneHeader from './SceneHeader.jsx';
import SceneIntro from './SceneIntro.jsx';
import SceneObjects from './SceneObjects.jsx';
import ProjectAnnotation from './ProjectAnnotation.jsx';

export default function MobileStudy() {
  return (
    <div className="visual-study">
      <section className="portrait-scene" aria-label="Escritorio de Martín Fierro">
        <img className="scene-background" src="/desk/background.png" alt="" aria-hidden="true" />
        <SceneHeader />
        <SceneIntro />
        <SceneObjects />
        <ProjectAnnotation />
        <Daylight />
      </section>
    </div>
  );
}
