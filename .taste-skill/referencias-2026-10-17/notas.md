# Exploración a partir de tus referencias

## Brief
El usuario prefiere el equilibrio entre claridad y detalles con personalidad. No quiere una réplica de las referencias, una estética de revista ni una escena que oculte quién es. Son bocetos para revisar antes de implementar.

## Inventario real
Martín Fierro; ingeniero multimedia; desarrollador full-stack; cuatro proyectos concretos (Portfolio, Taskflow, Pulse API y Media Lab); tecnologías organizadas en cuatro familias; ilustración original con dos variantes de tema; cabecera flotante; interruptor original con animación sol/luna; Clash Display y Manrope locales; azul #4267d5 y marino #151e2d; enlaces de contacto aún pendientes que se dejan intactos; proyectos sin favorito.

## Dirección de la skill
The page is the object, seed 547621430. Se conserva la paleta y las fuentes de marca.
Primero se exploró contact-sheet (seed 422250239). Se descartó porque pide aproximadamente 24 capturas y hay cuatro proyectos principales; llenar el esquema habría obligado a duplicar o inventar material.
El patrón de equipo y el formulario de cupón no se trasladan: se trata de una persona y no hay un servicio de formularios configurado. Se usa la biografía real y el grupo social existente.

Idea: las capturas y los cuatro proyectos de Martín se convierten en las hojas, pestañas y teclas de su espacio de trabajo.
La interacción: abrir proyectos con los accesos físicos de cada composición; hover y pulsación con respuesta breve, temas intercambiables y menú móvil controlable.

## Tres propuestas
- Cuaderno de trabajo: hoja con encuadernación azul, cuadrícula y pequeños fragmentos de cinta, sin escritura ficticia ni pegatinas decorativas en todas partes. Nombre en grande y la ilustración original en la portada.
- Archivo de proyectos: nombre y rol antes de una carpeta con cuatro pestañas y cuatro capturas de igual tamaño. La ilustración original está en Sobre mí.
- Teclado interactivo: presentación personal junto a cuatro teclas del mismo nivel, cada una asociada a un proyecto real. La ilustración original está en Sobre mí. El botón de la barra espaciadora es la única llamada principal azul del hero.

## Primera revisión visual
Se ajustó el espacio entre nombre y apellido para que no se lean unidos.
La especialidad vuelve a tinta principal para aumentar legibilidad.
Se acercó la especialidad al nombre en el cuaderno.
Se evitó duplicar dos llamadas azules en la portada del teclado.
Las capturas finales se exportan después de cargar y decodificar todas las imágenes y recorrer la página.

## Excepciones deliberadas a la skill
La cuadrícula es una preferencia explícita y también está en las referencias; su implementación mediante linear-gradient no implica un degradado de color.
La profundidad sólida de las teclas representa el objeto de la referencia, no una sombra difusa decorativa de tarjeta.
La cabecera flotante y el interruptor original se conservan por petición previa.
No se usan fotos genéricas, caras generadas, estadísticas, clientes ni proyectos inventados.
Los bocetos usan las imágenes locales originales mediante img: no hay edición ni regeneración de la cara.

Los archivos de la aplicación en src y los PNG originales no se han editado en esta exploración. Todos los nuevos archivos están dentro de esta carpeta de bocetos.

## Comprobaciones finales
- Doce capturas exportadas: tres conceptos, dos temas, escritorio de 1440 px y móvil de 390 px.
- Inspector en 1440, 768 y 390 px: cuaderno y archivo sin FAIL; teclado sin FAIL al permitir las excepciones documentadas de profundidad física (shadow y button-fx), además de la cuadrícula.
- Sin imágenes rotas ni desbordamiento en las doce vistas; se comprobó también el ancho de 320 px en los tres conceptos.
- Apertura del menú y cierre con Escape comprobados; el cambio de tema carga la imagen original que corresponde.
- Los enlaces de pestañas y teclas llevan al proyecto previsto.
- Los hashes SHA256 de ambas ilustraciones y de Header.jsx y Header.css coinciden con los originales.
- Avisos restantes defendidos: cabecera flotante y Contacto son elementos preservados; variaciones pequeñas de tamaño responden a las escalas de las fuentes; no se introduce vídeo genérico para cumplir una cuota; la animación es moderada para priorizar claridad.

