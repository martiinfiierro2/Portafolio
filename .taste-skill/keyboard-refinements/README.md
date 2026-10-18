# Cinco ajustes finales

- Nombre horizontal, más ligero y sin punto. En pantallas de poca altura comparte la fila del teclado para mantener visible el contenido; en móvil ocupa una línea compacta.
- «Descargar CV» sustituye al enlace sobre mí. Utiliza `contact.cv` y el atributo nativo `download`. Como todavía no hay PDF, el control muestra un estado no disponible. Se ha comprobado la descarga con un archivo de prueba servido únicamente dentro del navegador, sin añadir un CV ficticio al proyecto.
- Teclado móvil: proyección más contenida, mayor tamaño de letras, pantalla sin solapes y estado debajo del comando. En móviles cortos se permite scroll vertical para mantener el tamaño legible.
- Chasis con profundidad lateral y frontal, bisel superior y paredes de las teclas. Las capas decorativas no capturan clics.
- Movimiento limitado a la entrada del nombre, la aparición del texto y teclado, un pequeño desfase entre tarjetas y el menú móvil. Sin flotación permanente ni animación añadida a todos los bloques. Respeta el movimiento reducido.

Se mantiene la dirección de diseño existente; no se ha vuelto a sortear una identidad para estos ajustes de componentes. Manrope sigue siendo la única familia: cambia el peso y la composición del nombre. El interruptor original del tema conserva su aspecto y animación.

## Comprobaciones

`functional-report.json` registra la descarga nativa con el nombre correcto, los estados del CV, las animaciones, su desactivación con movimiento reducido y Enter entre320y430px.

`touch-report.json` usa un contexto móvil con pantalla táctil a360px: iluminación y liberación de teclas y navegación con Enter, sin errores JavaScript. El feedback transitorio se observa durante la pulsación para evitar medirlo cuando ya ha terminado.

`final-layout-report.json` y las capturas revisan el encaje en escritorio, portátil, tablet y móvil. No hay desbordamiento horizontal ni texto cortado. Las pantallas de320×568 permiten desplazamiento vertical; no se oculta contenido para forzarlo a caber.

ESLint, compilación y auditoría de imports comprueban el código. La auditoría estética de fuente mantiene0FAIL; sus avisos restantes corresponden a bordes de controles/chasis, el diálogo y títulos de página.
