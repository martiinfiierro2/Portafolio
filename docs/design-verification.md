# Verificación · 1 de noviembre de 2026

Repositorio Portafolio, rama portafolio. Aplicación local: http://localhost:5174/.

- Lint, compilación de producción y auditoría de estructura correctos; sin imports rotos ni módulos huérfanos.
- Cuadrícula y stack: 28 combinaciones de catorce anchos (320, 360, 390, 480, 599, 600, 640, 760, 768, 820, 1024, 1280, 1440 y 1920 px) y dos temas. Sin desbordamientos de página, navegación ni logotipos; dos columnas desde 600 px y una por debajo. Jerarquía de tarjeta verificada e imágenes de un máximo de 220 px de alto.
- Navegación completa, cinco enlaces de cabecera, pegatinas subrayadas, menú móvil táctil, persistencia del tema, dos fichas, galería, vídeo bajo petición, redirecciones y 404. Sin errores de JavaScript ni peticiones fallidas en el recorrido normal.
- CV sin configurar: estado real de no disponibilidad, Escape y devolución del foco. Con PDF de prueba aislado: vista y descarga verificadas a 1440×900, 820×1180, 390×844, 320×568 y 844×390. Los controles quedan dentro del diálogo y el PDF no se pide antes de abrirlo. El CV real lo añadirá el propietario; no se ha publicado ningún documento ficticio.
- Oscuro aclarado a #2c3036. Capturas revisadas en escritorio, tablet y móvil. Stack con 14 tecnologías; 13 marcas de Simple Icons y símbolo de base de datos para SQL, con nombres visibles y licencia local.
- El escritorio conserva sus dos SVG originales y sus animaciones. No se modifica el contenido ni el comportamiento de las fichas.

Pruebas reutilizables: scripts/qa; instrucciones: docs/qa/README.md. La emulación en Microsoft Edge no sustituye pruebas en dispositivos físicos ni en todos los navegadores.
