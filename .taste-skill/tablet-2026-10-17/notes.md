# Tablet y cabecera — 17 octubre 2026

Implementación solicitada sobre la dirección ya elegida: nombre como protagonista,
presentación a la izquierda y un objeto que da acceso a los proyectos. No se sortea
otra dirección al sustituir un componente aprobado.

La tablet de la referencia sustituye al disquete. Sus cuatro teclas, de igual tamaño,
abren las fichas reales; la tecla inferior abre /proyectos. El catálogo queda en una
página propia. El antiguo enlace /#proyectos sigue funcionando mediante redirección.

## Decisiones conservadas por petición del usuario

- Claro: marfil #f5f3ee y burdeos #792a35; texto neutral #262626.
- Oscuro: carbón #202123, nombre marfil #f5eee2 y acento coral #f06b4b.
- Cabecera flotante de la referencia. La geometría, colores, luna/sol y transición
  del interruptor original se conservan. Se elimina el botón exterior que contenía
  otro control interactivo, manteniendo el checkbox y su etiqueta.
- Fondo cuadriculado sutil en claro, solicitado en la conversación anterior.
- Ilustraciones originales intactas. La miniatura del portfolio usa la captura real.
- Los enlaces de contacto pendientes permanecen sin rellenar.

## Diagnóstico inicial

El inspector detectó el apellido a 1.1:1 de contraste y etiquetas de búsqueda
interpretadas como adornos. La nueva portada da al nombre el contraste completo
y traslada los controles de búsqueda al catálogo.

## Excepciones del inspector justificadas por el encargo

- pill-nav: la cabecera flotante es una petición explícita del usuario.
- button-fx: el relieve de las teclas reproduce el objeto de la referencia;
  son superficies funcionales, no sombras decorativas añadidas al resto de la web.
- palette-claude: la combinación carbón/marfil/coral fue elegida por el usuario.
- few-pictures: hay cuatro capturas reales en la tablet. El inspector las agrupa
  como un único fragmento de interfaz. Añadir fotos ajenas al encargo rompería
  la portada mínima y el acceso a proyectos que se pidió.

No se incorpora vídeo sin contenido real que lo justifique. El movimiento se limita
a entradas, respuesta de las teclas y leve cambio de perspectiva al interactuar,
respetando movimiento reducido. Los tamaños adicionales del catálogo y las fichas
existentes no se unifican fuera del alcance solicitado.

## Revisión de las capturas

Primera pasada: la tablet conservaba una dominante taupe innecesaria en oscuro;
se ha neutralizado. El nombre ocupaba demasiado alto a 768 px y dejaba un vacío
lateral; en ese intervalo se dispone en una línea sobre presentación y tablet.
Se han reducido las variaciones de tamaño en la presentación y sus controles.

La fuente de exhibición Anton se sirve localmente e incluye su licencia OFL.
Las capturas de los proyectos proceden del propio repositorio.

## Validación final

- Compilación Vite, ESLint y git diff --check completados sin errores.
- Playwright: ambos temas a 1440, 1024, 768, 390 y 320 px. Sin imágenes rotas,
  desbordamiento horizontal ni errores de ejecución. Las cuatro teclas son táctiles.
- Catálogo móvil: imágenes de 358 px de ancho a viewport de 390 px; búsqueda,
  estado vacío y restablecimiento comprobados.
- Las cuatro fichas y sus enlaces de vuelta abren las rutas correctas. El enlace
  antiguo /#proyectos redirige al catálogo.
- Menú móvil comprobado al abrir, navegar y cerrar con Escape. Cambio de tema
  por teclado y persistencia al recargar comprobados.
- Ancla de Sobre mí libre de la cabecera; movimiento reducido sin rotación.
- El bloque CSS original del sol/luna se conserva exactamente, verificado contra
  la copia anterior a la implementación.
- Inspector final en 1440, 768 y 390 px: 0 fallos con las excepciones documentadas.
  Dos avisos estéticos: no hay vídeo y el movimiento es contenido (14 elementos).

Evaluación visual final de la portada: diseño 8, usabilidad 8, creatividad 7,
contenido 8 (7.8 ponderado). El objeto está integrado y la jerarquía es clara;
las miniaturas conservan el aspecto de las demos actuales y la sección Sobre mí
es más sobria que la portada. Son decisiones revisables, no fallos funcionales.
