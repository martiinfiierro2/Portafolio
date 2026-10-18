# Implementación: portfolio con teclado

Se implementa el último boceto claro con cabecera original, con las modificaciones solicitadas: sin cuadrícula, teclado en lugar de las carpetas del hero y sin ilustración de carpeta en Sobre mí. El modo oscuro sigue disponible y se respeta la preferencia guardada. El tema inicial de una visita sin preferencia es claro.

## Dirección y contenido

Dirección heredada del concepto aprobado: name-as-monument, semilla 1634250601, guardada en ../nuevo-archivo-2026-10-17/.taste-skill/direction.json. El redraw de paleta se hizo en el boceto para alejarse de la identidad burdeos/coral; aquí se conserva el fondo claro aprobado y el amarillo latón. No se redibuja una dirección porque el usuario ha aprobado una composición concreta.

Inventario: Martín Fierro; ingeniería multimedia; desarrollo full-stack; React; Angular; Node.js; SQL; Portfolio; Taskflow; Pulse API; Media Lab; GitHub. Idea: su herramienta de desarrollo escribe la puerta de entrada a sus proyectos. Interacción: escritura animada de Proyectos y tecla Enter enlazada a #proyectos en la misma página. Se puede usar con ratón, toque o Enter físico al enfocar el enlace. No se intercepta el teclado global.

Argumento: hero identifica nombre y especialidad; catálogo muestra las cuatro interfaces con igual jerarquía; Sobre mí explica enfoque y tecnologías; contacto conserva las redes configurables. No se inventan enlaces ni credenciales. Las capturas de proyectos son locales; las del propio portfolio se actualizaron desde la implementación, no con imágenes generadas.

Componentes principales: ProjectJourney compone hero y catálogo; ProjectKeyboard controla la escritura y las teclas; Home, Projects y About siguen en pages; Header, Footer, Contact y SocialMedia siguen en components. La transición antigua de tablet deja de usarse: el documento fluye de forma natural, sin un escenario fijado vacío.

## Verificación

- npm run build: correcto.
- npm run lint: correcto.
- git diff --check: correcto.
- Playwright real en Edge: escritura parcial y completa, activación por Enter, foco del título, filtros, búsqueda sin resultados, restablecimiento, navegación a ficha y demo, vuelta al catálogo, selector claro/oscuro, persistencia, menú móvil y movimiento reducido.
- Sin desbordamiento horizontal en 1440×900, 1366×768, 768×1024, 390×844 y 320×568. Hero completo en esas alturas. En pantallas cortas el nombre y la especialidad pasan a una sola línea para mantener acceso al teclado.
- Cuatro secciones con background-image:none. Capturas nuevas del portfolio guardadas en public/projects/portfolio-keyboard-desktop.png y portfolio-keyboard-mobile.png.
- Header.jsx y Header.css conservan sus hashes previos: 6BEC129BF6F626D659D66A22678315476E1F2B0B0EA0A46C81FB7ECB8065A9A8 y E8AF694C0C288A7CEAC846A1500902605A8B69F061877FFD17859ACB61CB9986. Las variables locales mantienen Oswald, el estado activo original y los colores del interruptor; el componente y su animación no se modifican.

El lanzador CDP de inspect.mjs agotó el tiempo en Page.enable tanto con Chrome como con Edge. Por ello no se presenta como una ejecución correcta del inspector completo. Se usaron probe y judge originales de la skill dentro de la sesión de Playwright que sí funciona, en 1440, 768 y 390, además de las capturas y verificaciones funcionales. Resultado: ningún FAIL, ningún título de más de dos líneas, ninguna imagen rota y ningún desbordamiento. taste-report.json contiene los resultados.

Excepciones justificadas: cabecera flotante, su borde y sus colores originales por petición del usuario; profundidad física de carcasa y teclas para hacer visible la pulsación, limitada al objeto teclado; dos fuentes en el contenido más Oswald en la cabecera original. El tono claro aprobado y la ausencia de vídeo generan WARN: se mantiene el color elegido y el teclado animado aporta movimiento sin introducir metraje ajeno al desarrollador. El lint taste devuelve 0 FAIL y un WARN sobre el borde de los botones de filtro, conservado como control funcional.

## Revisión visual

ROUND 1
Seen in one second: nombre y teclado.
Idea: el teclado escribe el acceso al archivo de proyectos de Martín.
Live thing: Enter abre el catálogo; las teclas se pulsan durante la escritura.
Layout words by section: hero=centrado / proyectos=índice / sobre mí=texto dividido / contacto=cierre tipográfico.
Problemas observados y corregidos: hero demasiado alto a 1440; imágenes recortadas por object-fit:cover; vacío de Sobre mí tras eliminar la ilustración. Se redujo la altura del objeto y el espaciado, se usa contain y se distribuyen las tecnologías a todo el ancho.

ROUND 2
Seen in one second: identidad clara y teclado de colores.
Idea: misma interacción de acceso a proyectos, sin bloquear el scroll normal.
Live thing: escritura y Enter accesible, con texto completo inmediato si hay movimiento reducido.
Layout words by section: hero=centrado / proyectos=índice / sobre mí=texto dividido y tecnologías / contacto=cierre tipográfico.
Scores: design 7.5 · usability 8 · creativity 7 · content 7 → overall 7.55.
Caps applied: creatividad limitada a 7 porque el recurso teclado también es válido para otros desarrolladores. Puntuación orientativa de revisión propia, no una evaluación externa ni la ejecución del inspector completo.
Limitaciones: los proyectos de ejemplo siguen siendo demos, los enlaces sociales pendientes siguen sin URL, y el teclado es una ilustración funcional de acceso, no un editor de texto libre.

Capturas: final-desktop.png, final-mobile.png, final-dark-desktop.png y final-full.png. La captura oscura puede mostrar una letra aún en escritura; las comprobaciones funcionales verifican la palabra final completa.
