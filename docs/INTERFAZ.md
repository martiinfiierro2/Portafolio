# Interfaz y estructura

La dirección vigente se documenta en DESIGN.md. La portada presenta el escritorio, el nombre y la profesión; después muestra las dos fichas de trabajo, el contenido completo sobre mí y el canal de contacto disponible.

| Antes | Después | Motivo |
| --- | --- | --- |
| Nombre en cabecera y lema en hero | Navegación flotante; nombre y profesión en hero | Separar navegación y presentación |
| Resúmenes en inicio y páginas separadas | Secciones completas con anclajes | Evitar contenido duplicado |
| Cabecera estrecha en móvil | Menú desplegable con tema visible | Mantener controles legibles y utilizables |
| Oliva oscuro y franja verde de presentación | Carbón y superficies neutras | Reservar protagonismo al trabajo |
| Ejemplos, bocetos y estilos antiguos en el repositorio | Solo la aplicación y sus fuentes vigentes | Reducir tamaño y mantenimiento |

Home compone tres secciones completas. ProjectDetail genera la ficha desde los datos. Header, SectionLink y Footer comparten la navegación; ProjectCard, ProjectGallery, ProjectVideo y ProjectLink resuelven la presentación y las interacciones de los proyectos.

Para adaptar el diseño, modificar los tokens y las hojas de su responsabilidad. Para añadir contenido, modificar los datos o el componente de sección correspondiente. Las pruebas reutilizables están en scripts/qa.
