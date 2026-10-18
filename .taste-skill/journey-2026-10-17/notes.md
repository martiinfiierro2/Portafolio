# Portada que abre el catálogo — 17 octubre 2026

Dirección conservada: nombre como protagonista y tablet como entrada. Se implementa
la secuencia pedida sobre la composición aprobada, sin un nuevo sorteo de diseño.

## Comportamiento

El catálogo forma parte de Home una sola vez. La ruta /proyectos redirige a
/#proyectos para conservar los enlaces antiguos. Las fichas individuales siguen
teniendo su URL y vuelven al catálogo integrado.

El scroll controla una escena sticky: salen las letras en direcciones opuestas,
la presentación desaparece, la tablet se centra y se endereza, sus teclas se
abren lateralmente y su superficie se amplía hasta revelar el catálogo real.
El final entrega el desplazamiento al documento sin cambiar de página.
Al volver arriba se recorre la secuencia en sentido inverso.

Toda la tablet y el enlace de la cabecera a Proyectos activan la misma secuencia.
El clic anima el desplazamiento durante un máximo de 1.7 s; rueda, tacto, teclado
y cambio de encuadre pueden interrumpirlo. El scroll manual se mantiene nativo.

Se usa requestAnimationFrame para transformar los elementos sin actualizar React
en cada fotograma. Las medidas se recalculan al cambiar el tamaño, cargar las
fuentes o cambiar la altura del catálogo con sus filtros. No se añade dependencia.

## Accesibilidad y preferencias

- El catálogo es invisible e inert hasta abrirse; la portada deja de recibir foco
  cuando sale. No hay una copia del catálogo dentro de la animación.
- El clic o Enter lleva el foco al encabezado Proyectos al terminar.
- Los enlaces directos y la vuelta desde una ficha abren el catálogo sin repetir
  la secuencia de entrada. También se comprueba el botón Atrás del navegador.
- Movimiento reducido elimina el pin, la distancia adicional de scroll y las
  transformaciones. En encuadres de menos de 560 px de altura se usa el flujo
  normal para mantener todo accesible, incluido móvil en horizontal.
- Cabecera y aspecto/animación de claro-oscuro conservados. Las dos paletas y
  las imágenes originales siguen intactas.

## Verificación

- Compilación Vite, ESLint y git diff --check: correctos.
- Lint de diseño en los cinco archivos nuevos/modificados del componente: 0 fallos,
  0 avisos. Las sombras físicas de la tablet siguen siendo la excepción solicitada.
- Fases 0, 25%, 56%, 78%, 100% y regreso a 0 en 1440×900, 1280×800,
  768×1024, 390×844, 375×667 y 320×700: sin desbordamiento ni solapamiento
  entre la tecla de entrada y los enlaces. Tablet centrada con error menor de
  0.001 px en la fase central. Catálogo único y alineado al final.
- Flujo real en escritorio y móvil: clic animado, misma página, filtros, estado
  vacío, restablecimiento, ficha y vuelta al catálogo. Activación por teclado,
  interrupción con scroll, cambio de tema a mitad de transición, resize,
  enlaces directos, ruta antigua, Atrás, movimiento reducido y horizontal: correctos.
- Sin errores de ejecución en Chrome durante las pruebas.
- Inspector en 1440, 768 y 390 px: 0 fallos, 1 aviso por ausencia de vídeo.
  Excepciones heredadas y autorizadas: cabecera flotante, relieve físico de las
  teclas, paletas elegidas y composición con las capturas reales de los proyectos.

## Revisión visual

Se revisan los encuadres inicial, salida del nombre, tablet centrada, apertura y
catálogo final. El primer cruce de capas daba demasiado peso a las miniaturas;
se adelanta la aparición del catálogo para que la apertura se lea con claridad.
La versión móvil mantiene la entrada visible en la primera pantalla.

Las capturas intermedias muestran recortes de texto mientras se abre la ventana;
el catálogo está inactivo durante ese tramo y completamente legible al terminar.
No se añade vídeo ni movimiento ajeno a la transición solicitada.
