import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getProyectos } from '../services/apiProyectos';

export default function ListaProyectos() {

  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      const datos = await getProyectos();
      if (datos) {
        setProyectos(datos);
      }
      setCargando(false);
    }
    
    cargarDatos();
  }, []);

  return (
    <div className="proyectos-container">
        <h1 className='titulo-proyectos'>Proyectos</h1>
        <div className="grid-proyectos">
          {proyectos.map((proyecto) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
    </div>
  );
}

export function TarjetaProyecto({ proyecto }) {
  console.log("Datos del proyecto:", proyecto);
  return (
    <div className="tarjeta-proyecto">
      <div className='imagenTitulo'>
        <img src={proyecto.portada} alt={proyecto.nombre} />
        <h2>{proyecto.nombre}</h2>
      </div>
      <div className='botonVerMas'>
        <p>{proyecto.descripcion}</p>
        <NavLink className='botonVerMasNavLink' to={`${proyecto.id}`}>Ver más</NavLink>
      </div>
    </div>
  );
}