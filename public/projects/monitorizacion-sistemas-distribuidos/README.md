# Monitorización de sistemas distribuidos

Material visual del Trabajo de Fin de Grado presentado en
`/proyectos/monitorizacion-sistemas-distribuidos`.

- `grafo.png`: topología de dos grupos con doce nodos y diez relaciones.
- `mapa.png`: vista geográfica de los mismos nodos y relaciones.
- `catalogo.png`: catálogo con búsqueda y paginación en español.
- `detalle.png`: consulta de un coordinador, sus procesadores y destinos.
- `demo.webm`: recorrido de 27,8 segundos por filtros, zoom, mapa, catálogo y detalle.

Las imágenes son PNG de 1440 × 900; el vídeo tiene la misma resolución y ocupa
aproximadamente 3,2 MiB. Se generaron con Playwright CLI y Edge sobre la interfaz
del proyecto. El catálogo, las respuestas, los contadores y las coordenadas son
de demostración, identificados en las capturas y en la ficha. No representan
mediciones de rendimiento ni un despliegue geográfico real. La cartografía
conserva la atribución de OpenStreetMap.

La entrada de `src/data/projects.js` define los textos, la galería y el vídeo.
El vídeo se reproduce dentro de la ficha con controles nativos y sin autoplay.
La aplicación monitorizada está disponible para ejecución local desde su
repositorio; no se presenta una demo interactiva desplegada.
