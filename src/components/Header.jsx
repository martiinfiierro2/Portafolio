import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [isMode, setIsMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const themeValue = isMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', themeValue);
    console.log("Tema actual:", themeValue);
  }, [isMode]);

  return (
    <div className="header-container">
      <ul className="lista-cabecera">
        <li className="nombre-cabecera">
          <Link to="/">Martín Fierro</Link>
        </li>
        <li className="elemento-cabecera">
          <NavLink to="/proyectos">Proyectos</NavLink>
        </li>
        <li className="elemento-cabecera">
          <a>LindenIn</a>
        </li>
        <li className="elemento-cabecera">
          <a>GitHub</a>
        </li>
        <li className="boton-cabecera">
          <button>Claro/Oscuro</button>
        </li>
      </ul>
    </div>
  );
}