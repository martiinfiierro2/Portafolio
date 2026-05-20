import React, { useState, useEffect } from 'react';

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
          <a>Martín Fierro</a>
        </li>
        <li className="elemento-cabecera">
          <a>Proyectos</a>
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