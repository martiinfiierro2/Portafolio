import React, { useState, useEffect } from 'react';
import fotoMartin from './img/martin.jpg';

export default function Header() {

  return (
    <div className="data-wrapper">
      <div className="text-data-name">
          <h1 className="name-user">Martín Fierro</h1>
          <p>Full Stack Developer</p>
          <span className="work-state">Open to work</span>
      </div>
      <img className="foto" src={fotoMartin}/>
    </div>
  );
}