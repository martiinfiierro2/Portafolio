import Navigation from './Navigation.jsx';
import Laptop from './Laptop.jsx';
import FolderCV from './FolderCV.jsx';
import Notebook from './Notebook.jsx';
import Phone from './Phone.jsx';
import Daylight from './Daylight.jsx';

export default function DeskScene() {
  return (
    <div className="home desk-scene">
      <img
        className="home-background"
        src="/desk/background.webp"
        alt=""
        aria-hidden="true"
        width="1672"
        height="941"
      />
      <header className="site-header">
        <Navigation />
      </header>
      <main className="home-content" id="inicio" aria-labelledby="person-name">
        <h1 id="person-name">
          Martín <span>Fierro</span>
        </h1>
        <p className="home-role">Desarrollador full-stack</p>
      </main>
      <FolderCV />
      <Laptop />
      <Notebook />
      <Phone />
      <Daylight />
    </div>
  );
}
