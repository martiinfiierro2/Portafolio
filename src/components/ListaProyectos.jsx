import React, { useState, useEffect } from 'react';

const misProyectos = [
  { id: 1, titulo: "E-commerce Tech", descripcion: "weytvdkwevkcdfvwlejhvflj", foto: "..." },
  { id: 2, titulo: "App Clima", descripcion: "ervhlwehrcvlhjw dhc lhj weljh lwehj chjlw", foto: "..." },
  { id: 3, titulo: "App Clima", descripcion: "ervhlwehrcvlhjw dhc lhj weljh lwehj chjlw", foto: "..." },
  { id: 4, titulo: "App Clima", descripcion: "ervhlwehrcvlhjw dhc lhj weljh lwehj chjlw", foto: "..." }
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
        <img src={proyecto.foto} alt={proyecto.titulo} />
        <h2>{proyecto.titulo}</h2>
      </div>
      <p>{proyecto.descripcion}</p>
      <div className='botonVerMas'>
        <button>Ver más</button>
      </div>
    </div>
  );
}