import Navigation from './components/Navigation.jsx';
import Laptop from './components/Laptop.jsx';
import FolderCV from './components/FolderCV.jsx';
import NoteBook from './components/Notebook.jsx';
import Phone from './components/Phone.jsx';

export default function App() {
  return (
    <div className="home">
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
        <p className="home-role">
          Desarrollador full-stack
        </p>
      </main>
      <FolderCV/>
      <Laptop/>
      <NoteBook/>
      <Phone/>
    </div>
  );
}
