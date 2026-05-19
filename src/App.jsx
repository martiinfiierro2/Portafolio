import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Data from './Data';
import Proyectos from './Proyectos';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function App() {
  return (
    <div className="main-container" 
         style={{ fontFamily: 'Arial, sans-serif' }}>
        
      <Header />

      <div className="body-field">
        <Data />
        <Proyectos/>
      </div>
      

      <footer className="py-40 text-center border-t border-white/5">
        <motion.a 
          whileHover={{ scale: 1.05 }}
          href="mailto:tu@email.com" 
          className="text-4xl md:text-7xl font-black text-white hover:text-blue-500 transition-all tracking-tighter"
          style={{ fontFamily: '"M PLUS Rounded 1c", sans-serif' }}
        >
          HABLEMOS →
        </motion.a>
      </footer>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}</style>
    </div>
  );
}