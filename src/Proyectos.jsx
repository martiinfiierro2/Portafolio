import React, { useState, useEffect } from 'react';
import { supabase } from './datos/proyectos';

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function obtenerProyectos() {
    try {
        const { data, error } = await supabase
          .from('proyectos')
          .select('*')
          .order('id', { ascending: true });
          console.log(data)

        if (error) throw error;
            setProyectos(data);
        } catch (error) {
            console.error('Error cargando proyectos:', error.message);
        } finally {
            setLoading(false);
    }
    }

    obtenerProyectos();
  }, []);

  return (
    <section id="proyectos" className="projects-container">
        <h1 className="projects-name">Proyectos</h1>
        <div className="projects-grid">
          {proyectos.map((p) => (
            <article key={p.id}>
              <div className="bg-[#0a0a0a] aspect-video border border-white/10 rounded-lg overflow-hidden mb-8 flex items-center justify-center relative transition-colors group-hover:border-blue-500/30">
                 <span className="font-black text-8xl text-white/[0.02]" style={{ fontFamily: '"M PLUS Rounded 1c", sans-serif' }}>
                   {p.id}
                 </span>
              </div>
              
              <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter group-hover:text-blue-500 transition-colors"
                  style={{ fontFamily: '"M PLUS Rounded 1c", sans-serif' }}>
                {p.nombre}
              </h3>
              
              {/* Descripción en Arial */}
              <p className="text-white/50 text-sm leading-relaxed mb-6 font-normal">
                {p.descripcion}
              </p>
            </article>
          ))}
        </div>
    </section>
  );
}