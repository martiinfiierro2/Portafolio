import React, { useState, useEffect } from 'react';

export default function Biografia() {
  return (
    <div className="bio-container">
        <div className="perfil">
            <h1>Martín Fierro</h1>
            <h2>Junior Software Developer</h2>
            <div>
                <img className='imgPerfil' src="/img/martin.jpg"/>
            </div>
        </div>
        <div className="trabajo">
            <p>      Martín es un desarrollador full-stack junior al que crea soluciones digitales desde cero, 
                desde el diseño de la interfaz hasta el código del backend en sus proyectos personales. 
                Cuando no está programando, disfruta del deporte en general. 
            </p>
            <div className='botonPortafolio'>
                <button>Mi Portafolio</button>
            </div>
        </div>
    </div>
  );
}