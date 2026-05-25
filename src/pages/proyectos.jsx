import Footer from '../components/Footer';
import Header from '../components/Header';
import ListaProyectos from '../components/ListaProyectos';

export default function Proyectos() {
  return (
    <div className='main-container'>
      <Header />
      <ListaProyectos />
      <Footer />
    </div>
  );
}