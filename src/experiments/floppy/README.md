# Comparación visual del portafolio

Con Vite en ejecución, `/` conserva la versión USB y `/disquetes` abre esta variante. También se admite `/disquetes/`.

La variante se carga por separado y todos sus estilos están bajo `.floppy-portfolio`. No modifica los componentes, datos ni estilos del portafolio USB.

El reproductor ocupa toda la ventana, también en móvil. La cabecera y la ranura permanecen visibles; el contenido central se desplaza si necesita más espacio. El enlace «Versión USB» de la cabecera permite comparar las propuestas.

Mientras está montada esta vista, sus estilos eliminan los límites de ancho, márgenes y relleno de `html`, `body` y `#root`. Así el reproductor llena el contenedor desde sus bordes, sin scroll exterior. Estas reglas dejan de aplicarse al volver a la versión USB.

El perfil está abierto inicialmente. «Proyectos» y «Expulsar» llevan a la colección; elegir un disco carga su contenido. «Perfil» vuelve a la presentación. «Contacto» abre un diálogo independiente. La expulsión está desactivada si la unidad está vacía.

La foto procede del repositorio. Los proyectos son ejemplos identificados como tales y los enlaces de demo, código y CV quedan pendientes; no se inventan enlaces ni experiencia. Los disquetes y la unidad son SVG. La animación de inserción respeta la preferencia de movimiento reducido.
