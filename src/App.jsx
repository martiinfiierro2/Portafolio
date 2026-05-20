import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Bio from './Bio';

export default function App() {
  return (
    <div className="main-container">
      <Header />
      <Bio />
      <Footer />
    </div>
  );
}