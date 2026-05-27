import Header from '../components/Header';
import Footer from '../components/Footer';
import DataProyecto from '../components/DataProyecto';

export default function ProyectoPage() {
  return (
    <div className='main-container'>
        <Header />

        <div className="proyecto-data">
            <h1>Name Proyecto</h1>
            <p>   Un sistema para la gestión y monitorización en tiempo real de los cambios de un sistema distribuido.</p>

            <DataProyecto/>
            
            <div className='img-container'>
                <img clasName="proyectoImg" src="../img/sistemaDistribuido.png" alt="imagen proyecto"/>
                <img clasName="proyectoImg" src="../img/sistemaDistribuido.png" alt="imagen proyecto"/>
                <img clasName="proyectoImg" alt="imagen proyecto"/>
            </div>
        </div>

        <Footer />
    </div>
  );
}