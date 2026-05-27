import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const misProyectos = [
  { id: 1, titulo: "E-commerce Tech", descripcion: "weytvdkwevkcdfvwlejhvflj", foto: "/img/sistemaDistribuido.png" },
  { id: 2, titulo: "App Clima", descripcion: "ervhlwehrcvlhjw dhc lhj weljh lwehj chjlw", foto: "/img/sistemaDistribuido.png" },
  { id: 3, titulo: "App Clima", descripcion: "ervhlwehrcvlhjw dhc lhj weljh lwehj chjlw", foto: "/img/sistemaDistribuido.png" },
  { id: 4, titulo: "App Clima", descripcion: "ervhlwehrcvlhjw dhc lhj weljh lwehj chjlw", foto: "/img/sistemaDistribuido.png" }
];

export default function ListaProyectos() {
  return (
    <div className="proyectos-container">
        <h1 className='titulo-proyectos'>Proyectos</h1>
        <div className="grid-proyectos">
          {misProyectos.map((proyecto) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
    </div>
  );
}

export function TarjetaProyecto({ proyecto }) {
  return (
    <div className="tarjeta-proyecto">
      <div className='imagenTitulo'>
        <img src='../img/sistemaDistribuido.png' alt={proyecto.titulo} />
        <h2>{proyecto.titulo}</h2>
      </div>
      <div className='botonVerMas'>
        <p>{proyecto.descripcion}</p>
        <NavLink to={`${proyecto.id}`}>Ver más</NavLink>
      </div>
    </div>
  );
}