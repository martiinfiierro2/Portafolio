# Interfaz del portafolio

Revisión del 29 de octubre de 2026. Rama `portafolio`.

El objetivo es que se pueda ver el trabajo, abrir un proyecto y explorar sus pantallas antes de entrar en la información técnica. Se mantiene la identidad existente: Manrope, azul, temas claro y oscuro, cabecera flotante y teclado interactivo.

## Criterios aplicados

Se combinan Emil Kowalski Design Engineering, Impeccable y Taste Skill. El modo de la superficie es una exposición de proyectos. La referencia compositiva de Taste es **Split stage**, semilla **1296309788**: una introducción estable acompaña las imágenes del trabajo en escritorio y se convierte en una lectura lineal en móvil.

Es una mejora del sistema existente. El teclado, las rutas y los datos de los proyectos se conservan. Los esquemas de retrato, formulario y fotografía de cierre no se utilizan: no hay retrato, dirección de correo ni formulario conectado que los sustenten. Se emplean las capturas reales y los enlaces configurados.

| Antes | Después | Motivo |
| --- | --- | --- |
| Inicio sin proyectos y con acceso a un CV inexistente | Acceso directo a proyectos, selección de trabajo y capturas | La acción principal funciona y permite valorar el trabajo |
| Búsqueda y categorías ocultas | Buscador y filtros visibles con contador y recuperación | Facilita explorar el catálogo |
| Ejemplos distinguibles solo mediante su nombre accesible | Naturaleza del proyecto visible bajo su resumen | Evita confundir demos con trabajos reales |
| Resultados que vuelven a animarse al filtrar | Actualización inmediata y foco en el buscador al limpiar | La respuesta no añade esperas |
| Redes sin URL con apariencia de enlaces | Se muestran solo enlaces configurados | Evita acciones sin destino |
| Transiciones generales y tamaños distintos | Escala compartida, estados de pulsación y curvas explícitas | Da continuidad al recorrido |
| Galería sin bloqueo del fondo | Modal con bloqueo del scroll y devolución del foco | Mantiene el contexto al ampliar y cerrar |

Los vídeos de proyecto se solicitan únicamente al pulsar reproducir. No se añaden vídeos automáticos a la portada. Las entradas de sección son breves y se desactivan los desplazamientos con movimiento reducido. Las interacciones frecuentes, como filtrar, no tienen animaciones de entrada.

## Contenido y mantenimiento

- `src/data/projects.js` mantiene los proyectos, sus textos, tecnologías y medios.
- `src/data/contact.js` mantiene los perfiles y el CV. Las redes sin URL no se publican; el acceso al CV aparece al configurar el documento.
- `src/data/experience.js` mantiene la experiencia real. No se crean puestos de ejemplo.
- Las imágenes del portafolio se actualizan mediante capturas del sitio. Las del TFG conservan su indicación de datos de demostración.
- La cabecera flotante y la iluminación del teclado son decisiones existentes del propietario. Se mantienen sus excepciones visuales.

## Verificación

Revisión visual de inicio, catálogo, perfil, contacto, fichas y demos en escritorio y móvil. Pruebas con Playwright de navegación, filtros, galerías, vídeo bajo demanda, estados de las demos, temas, movimiento reducido y recuperación del foco. Comprobación adicional de ESLint, estructura de fuentes y compilación de producción.

Taste Skill no detecta fallos en el inicio. Su aviso por ausencia de vídeo automático es deliberado: el recorrido permanece en la ficha del proyecto y se descarga por petición del visitante. El detector de Impeccable informa de un aviso sobre la cuadrícula de una composición de Media Lab: pertenece a la propia pieza CSS de la demo, no a la decoración de las páginas. Se conserva.

La crítica visual interna del inicio alcanza 7,7/10 (diseño 7,6; usabilidad 8,1; creatividad 7,2; contenido 7,8). Es una valoración orientativa del resultado, no una certificación externa. Esta revisión no sustituye una auditoría de accesibilidad completa ni pruebas en dispositivos físicos.
