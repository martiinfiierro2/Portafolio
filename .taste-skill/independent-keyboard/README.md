# Páginas independientes y teclado 3D

Petición: convertir el portfolio en páginas independientes, quitar el color permanente de las teclas, iluminar las pulsaciones y añadir sonido, mejorar el volumen del teclado y cambiar la composición del hero.

## Resultado

- `/`: solo hero, con nombre grande a la izquierda y teclado a la derecha; composición vertical en móvil.
- `/proyectos`: catálogo, búsqueda y filtros.
- `/sobre-mi`: perfil y tecnologías, sin carpeta ilustrada.
- `/contacto`: redes y cierre tipográfico.
- Se mantienen `/proyectos/:slug` y `/demos/:demoId`, además de las redirecciones de hashes antiguos.

El concepto sigue la dirección name-as-monument del diseño aprobado (semilla 1634250601). Se redistribuye su geometría conforme a la petición de improvisar el hero, sin redibujar paleta ni tipo. El nombre y el teclado son las dos masas visuales principales; no hay catálogo de proyectos en Inicio.

La carcasa, el bisel, las paredes de las teclas, la pantalla hundida y la perspectiva se construyen en CSS. Las sombras y degradados describen ese objeto físico y sus pulsaciones, excepción solicitada expresamente por el usuario; no son fondos decorativos de página. Las teclas son controles reales y solo toman el acento al pulsarse. El botón Enter y el Enter físico dentro del teclado abren `/proyectos`. Ctrl, Alt, espacio y flechas también responden al toque. Un foco itinerante evita 31 paradas de Tab; no se registran atajos globales.

La introducción automática no inicia audio. Una interacción permite crear AudioContext y sintetizar un clic mecánico de unos 45 ms con ruido filtrado y un componente tonal breve. Repetir la escritura puede reproducir esos clics. El control de sonido persiste su preferencia. Al abandonar el teclado se cierra el contexto tras permitir que termine el clic de Enter.

## Verificación

`navigation-report.json`: introducción muda, palabra completa, teclas sin clases multicolor, iluminación y apagado, AudioContext real en estado running con nodos iniciados, silenciamiento, repetición, foco por flechas, Enter físico, rutas independientes, h1 único, sección única por ruta, enlaces activos, recarga directa, hashes heredados, filtros, búsqueda vacía, restablecimiento, ficha, demo y 404. Todas las comprobaciones pasan.

`responsive-report.json`: sin desbordamiento horizontal y teclado/Enter dentro del ancho en 1440×900, 1366×768, 1024×768, 768×1024, 390×844 y 320×568. Inicio completo, incluido el pie, en los primeros cinco tamaños. En 320×568 se permite el scroll vertical natural del contenido de esa página; la tecla Abrir queda visible inicialmente. Se verifican menú móvil, ambos temas, persistencia entre rutas y movimiento reducido.

Build y ESLint pasan. El lint de taste devuelve 0 FAIL y dos WARN sobre los bordes físicos de carcasa y teclas, conservados para sus biseles. La apariencia del selector de tema original permanece; se ajusta únicamente la selección de navegación a aria-current=page.

No se repite el inspector CDP que falló en Page.enable en la tarea anterior; esta revisión se apoya en las capturas y pruebas de Playwright real sobre Edge. No se presenta como una ejecución completa de ese inspector.

## Revisión visual

ROUND 1
Seen in one second: nombre a la izquierda y teclado con volumen a la derecha.
Idea: una herramienta de desarrollo sirve como entrada al trabajo de Martín.
Live thing: pulsación, luz, sonido opcional y Enter para navegar.
Layout words by page: inicio=asimétrico; proyectos=índice; sobre mí=texto dividido; contacto=cierre tipográfico.
Problemas corregidos: el objeto alargaba 39 px el Inicio en portátil; Inicio móvil necesitaba 23 px adicionales; las capturas completas no habían disparado las entradas de las dos últimas filas de proyectos. Se ajustaron los espacios del objeto/hero y se recorre el catálogo antes de fotografiarlo.

ROUND 2
Seen in one second: identidad y teclado.
Idea: misma herramienta funcional, sin teclas de color permanente.
Live thing: Enter abre una página real; audio solo después de un gesto.
Scores: design 7.8 · usability 8 · creativity 7 · content 7 → overall 7.62.
Caps applied: creatividad limitada a 7 porque la metáfora teclado es compartida por otros desarrolladores; puntuación propia orientativa, no evaluación externa.
Limitaciones conocidas: las URL sociales aún vacías siguen configurables por el usuario; no se añaden credenciales ni datos inventados. La acústica real depende del volumen y dispositivo del visitante; se ha comprobado el grafo de audio y su estado con el navegador, sin afirmar una escucha física externa.

Capturas: home-1440.png, home-1366.png, home-1024.png, home-768.png, home-390.png, home-320.png, home-dark-1440.png; proyectos, sobre-mi y contacto a 1440 y 390. Las miniaturas del propio portfolio se actualizan con capturas de la nueva implementación.
