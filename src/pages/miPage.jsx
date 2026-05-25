import Biografia from '../components/Biografia'
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MiPage() {
  return (
    <div className='main-container'>
        <Header />
        <Biografia />
        <Footer />
    </div>
  );
}