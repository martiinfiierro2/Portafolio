# Objetos vectoriales del escritorio

22 SVG independientes y con fondo transparente. Su contenido utiliza trazados, formas, degradados, texto y filtros SVG. No hay fotografías incrustadas, referencias a WebP/PNG, JavaScript ni recursos de red.

La portada actual se conserva para poder sustituir los objetos uno a uno. Con Vite en marcha, `/desk/svg/index.html` muestra una galería con acceso y descarga de cada archivo.

## Objetos completos

| Archivo                   | Contenido                                                           |
| ------------------------- | ------------------------------------------------------------------- |
| `portatil.svg`            | Portátil cerrado, canto, monograma MF y sombra                      |
| `libreta-tecnologias.svg` | Libreta con Frontend, Backend y Datos / SQL, sus iconos y etiquetas |
| `carpeta-cv.svg`          | Carpeta con documentos, respaldo azul, clip y anotaciones del CV    |
| `telefono-contacto.svg`   | Teléfono con pantalla blanca, icono y texto de contacto             |

Estas versiones ya incluyen sus textos y logotipos. Si mantienes las etiquetas HTML de los componentes actuales, utiliza las variantes sin contenido para evitar duplicarlas.

## Piezas para modularizar

- `portatil-tapa.svg`, `portatil-base.svg` y `portatil-pantalla.svg` comparten un lienzo de 760 × 470. Pueden superponerse en un contenedor para animar tapa y base por separado. El eje de la tapa está arriba; la base debe permanecer fija. El SVG por sí solo no abre la colección: el botón y la transición pertenecen a React/CSS.
- `libreta.svg`, `carpeta.svg` y `telefono.svg` conservan la geometría de sus versiones completas y omiten las anotaciones.
- `logo-mf.svg` contiene el monograma aislado.
- `saludo.svg`, `descripcion.svg`, `flecha-proyectos.svg` y `navegacion.svg` contienen los detalles gráficos de la portada. El nombre y la profesión se mantienen como texto HTML.
- `icono-react.svg`, `icono-javascript.svg`, `icono-nodejs.svg`, `icono-java.svg`, `icono-python.svg`, `icono-sql.svg` e `icono-contacto.svg` son independientes y tienen un lienzo de 48 × 48.

Los SVG de los objetos incluyen su inclinación. No apliques además la rotación del contenido HTML anterior. Todos tienen `viewBox`; conserva su proporción con `width: 100%; height: auto`.

Los enlaces y botones deben seguir siendo elementos HTML accesibles. Un dibujo de navegación o un teléfono SVG no se convierte en enlace por su aspecto. Por ejemplo:

```tsx
<button type="button" aria-label="Abrir proyectos" onClick={onExplore}>
  <img src="/desk/svg/portatil.svg" alt="" />
</button>
```

## Edición y regeneración

Los archivos están indentados y pueden editarse directamente. La fuente modular de los dibujos es `scripts/generate-desk-svg.mjs`: ahí se definen la geometría, los colores, las etiquetas y los grupos de tecnologías. Tras editarla:

```bash
node scripts/generate-desk-svg.mjs
```

El generador usa Node y las dependencias ya declaradas en el proyecto. También actualiza `manifest.json` y la galería. Regenerar sobrescribe los SVG de esta carpeta; para conservar cambios manuales, trasládalos al generador.

Los archivos con texto incluyen Caveat o DM Sans en WOFF2 mediante `@font-face` para funcionar de forma independiente en navegadores, también como `<img>`. Las licencias OFL están en `FONT-LICENSES.txt`. Algunos editores SVG no admiten fuentes incrustadas: instala estas fuentes en ese editor si muestra una sustitución tipográfica.

## Aspecto

Son dibujos vectoriales de los objetos actuales, con volumen, sombras y textura procedural. Conservan el sentido de la composición, pero no son copias fotográficas idénticas. La mesa y la lámpara permanecen en `background.webp`.
