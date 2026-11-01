# Verificación de la interfaz

```sh
npm run lint
npm run check:structure
npm run build
npm run dev -- --port 5174 --strictPort
```

Con la aplicación en marcha, abrir otra terminal en la raíz del repositorio:

```powershell
playwright-cli -s=portfolio-qa open http://127.0.0.1:5174/ --browser=msedge
playwright-cli -s=portfolio-qa run-code --filename=scripts/qa/portfolio-flow.js
playwright-cli -s=portfolio-qa run-code --filename=scripts/qa/portfolio-interactions.js
playwright-cli -s=portfolio-qa run-code --filename=scripts/qa/portfolio-responsive.js
playwright-cli -s=portfolio-qa run-code --filename=scripts/qa/portfolio-cv.js
playwright-cli -s=portfolio-qa close
```

Los archivos contienen funciones evaluadas por Playwright CLI, no scripts para ejecutar con Node. En otro sistema, elegir un navegador disponible.

El recorrido comprueba las secciones, cabecera alineada, subrayado de las pegatinas, menú móvil, temas persistidos, fichas, ampliación de capturas, vídeo bajo petición, redirecciones antiguas y 404. Las pruebas de interacción fuerzan retrasos, respuestas fuera de orden y errores de imágenes/vídeo para verificar recuperación, foco y movimiento reducido. Los errores de red de esa segunda prueba son deliberados.

La matriz responsive recorre tres páginas, doce anchos entre 320 y 1920 px y ambos temas, además de cuatro contextos táctiles. Comprueba desbordamientos, cabecera/contenido, imágenes, titulares y disponibilidad del menú. Las capturas se guardan en `output/qa`.

La emulación no sustituye pruebas en dispositivos físicos ni en todos los motores de navegador.

La prueba de CV verifica el estado sin documento y utiliza un PDF de prueba únicamente dentro de un navegador aislado para comprobar visualización, descarga, foco y controles visibles en cinco tamaños. No añade archivos de ejemplo a la aplicación.
