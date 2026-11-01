# Diseño del portfolio de Martín Fierro

La identidad combina el escritorio original con una composición sencilla para mostrar los proyectos. La revisión del 1 de noviembre de 2026 recupera la cabecera flotante y sustituye las páginas de presentación duplicadas por secciones completas en la portada.

## Composición

Cabecera y contenido comparten 1100 px de ancho máximo. La cabecera queda fija, separada 18 px del borde superior; en móvil, 12 px. No contiene nombre ni profesión: ambos pertenecen al hero. Los enlaces Inicio, Proyectos, Sobre mí y Contacto navegan a secciones con espacio reservado bajo la cabecera. Hasta 760 px se usa un menú desplegable de dos columnas y el interruptor de tema visible.

El hero distribuye nombre, profesión e introducción a la izquierda y el escritorio a la derecha. A 760 px pasa a una columna: presentación, escritorio y pegatinas. «Mis proyectos» y «Mi CV» se subrayan al pasar el ratón. GitHub queda en la cabecera. Los proyectos usan tarjetas compactas: imagen, título, descripción breve, tecnologías y Abrir proyecto. Se muestran dos columnas desde 600 px y una por debajo; las fichas muestran capturas antes de explicar contexto, rol, tecnologías y decisiones.

Sobre mí incluye presentación, herramientas y nota personal sin una franja de color destacada. Contacto presenta únicamente el canal real configurado. No se inventan correo, métricas, experiencia ni clientes.

## Tipografía y color

Bricolage Grotesque para títulos, DM Sans para lectura y controles, Caveat exclusivamente para las pegatinas. Se sirven archivos locales con sus licencias. Los valores viven en `src/styles/tokens.css`.

Claro: blanco, tinta #252a30, texto #49515b y superficies suaves para las capturas. Oscuro: gris pizarra #2c3036, tinta #f2f3f5, texto #d1d6de y paneles gris/azul grisáceo. Se eliminan el oliva y las inversiones verde claro. El cobre se reserva a las pegatinas y al foco. Las acciones normales usan tinta o gris claro según el tema.

## Interacción

El interruptor conserva el sol/luna deslizante original y la preferencia guardada. El menú móvil permite cerrar con Escape o al pulsar fuera y se recoge al navegar. Las secciones conservan URL y foco; los enlaces con modificadores siguen siendo nativos.

El escritorio mantiene sus SVG y animaciones. La pegatina principal conserva su breve gesto de despegado con ratón. Teclado y movimiento reducido omiten las transiciones de navegación. Galería y vídeo conservan estados de carga, error y reintento. El vídeo se carga solo al solicitarlo.

## Código

Dos pantallas: Home y ProjectDetail. Tres componentes de sección, con contenido completo y sin versiones de resumen. Una sola fuente de proyectos, componentes compartidos de navegación y medios, estilos separados por responsabilidad. No se mantienen pantallas, ejemplos, bibliotecas o recursos sin uso.

El stack muestra logotipos locales de Simple Icons agrupados por área, con nombres visibles y colores adaptados al tema. La lista se comparte con las tarjetas; las fichas mantienen el detalle completo. La licencia está en public/licenses/simple-icons.md.

Mi CV abre un diálogo nativo con vista PDF, apertura externa y descarga. El PDF se configura con contact.cv; no se carga antes de abrir el modal. Sin documento se muestra un estado honesto de no disponibilidad. No se publica un CV de ejemplo.
