import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MiPage from './pages/miPage';
import Proyectos from './pages/proyectos';
import ProyectoPage from './pages/proyectosPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MiPage/> }/>
        <Route path="proyectos" element={ <Proyectos/> }/>
        <Route path="proyectos/:id" element={ <ProyectoPage/> }>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}