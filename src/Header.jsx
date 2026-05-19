import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const themeValue = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeValue);
    console.log("Tema actual:", themeValue);
  }, [isDark]);

  return (
    <div className="header-container">
      <span className="header-name">Martín Fierro</span>

      <nav className={`header-nav ${isOpen ? 'is-open' : ''}`}>
        <a href="#proyectos" className="header-link" onClick={() => setIsOpen(false)}>Proyectos</a>
        <a href="#redes" className="header-link" onClick={() => setIsOpen(false)}>Linkedin</a>
        <a href="#redes" className="header-link" onClick={() => setIsOpen(false)}>Github</a>
      </nav>

      <div className="header-actions">
        <button className="change-mode" onClick={() => setIsDark(!isDark)}>
            {isDark ? '☀️' : '🌙'}
        </button>

        <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
          📖
        </button>
      </div>
    </div>
  );
}