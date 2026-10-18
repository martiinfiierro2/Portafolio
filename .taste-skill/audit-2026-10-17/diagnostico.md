# Diagnóstico visual y bocetos — 17 de octubre de 2026

Revisión con playwright-cli y design-taste-frontend. Aplicación examinada en 1440, 768 y 390 px, en ambos temas. Bocetos comprobados además en 320 px.

## Hallazgos confirmados y decisiones

| Hallazgo | Evidencia | Corrección propuesta |
| --- | --- | --- |
| El apellido casi desaparece | Contraste de 1,06:1 sobre blanco y 1,13:1 sobre marino | Azul de la paleta en claro (5,08:1); azul claro en oscuro (9,14:1) |
| Capturas demasiado pequeñas y recortadas en móvil | Marco de 120 × 96 px en el viewport de 390 px | Una columna con marco de 343 × 193 px y object-fit: contain |
| Juntas visibles en contacto | Cruce entre los cuatro cuadrantes en before-dark-390.png | Una superficie continua durante el estado cerrado; conservar los cuatro iconos al abrirse |
| Nombre y especialidad demasiado separados | Especialidad centrada verticalmente frente a la ilustración | Alinear ambas columnas por arriba y reducir el margen bajo el nombre |
| Menú móvil sin control explícito | La hamburguesa es un pseudo-elemento de nav, sin botón ni aria-expanded | Botón visualmente equivalente, estado expandido y cierre con Escape |

La medición inmediata de opacidad durante el foco no se considera prueba de un fallo de teclado: existe una transición. El hallazgo del menú es su falta de un control explícito; no se afirma que todos sus enlaces sean inaccesibles.

## Lo que funcionó

- Sin desbordamiento horizontal en las tres anchuras examinadas.
- Sin imágenes rotas ni errores de ejecución JavaScript durante el recorrido de la aplicación.
- Buscar una cadena sin resultados muestra el estado vacío.
- Restablecer devuelve los cuatro proyectos.
- Abrir el primer proyecto conduce al detalle correcto.
- La ilustración original y los ficheros de cabecera no se han modificado.

## Brief trasladado al diseño

El nombre completo de Martín debe ser la primera lectura; su ilustración y tecnologías deben seguir aportando personalidad. Los cuatro proyectos tienen el mismo peso. Mantener blanco cuadriculado en claro, marino en oscuro, acento azul, fuentes originales, cabecera flotante e interruptor original. Las URL pendientes quedan fuera de la evaluación. No inventar datos ni cambiar la cara.

A — Lista afinada: conserva la estructura de filas, mejora contraste, proporciones, separación y encuadres.
B — Galería: mantiene la portada corregida y muestra los cuatro proyectos en una cuadrícula de dos columnas en escritorio.
Ambas pasan a proyectos de ancho completo en móvil.

## Verificación de los bocetos

- Contraste del apellido: 5,08:1 en claro, 9,14:1 en oscuro.
- Sin desbordamiento en 320, 390, 768 y 1440 px, en ambos temas.
- Clash Display y Manrope cargadas desde los archivos originales; Georgia permanece para los títulos de proyectos.
- Imágenes originales cargadas, sin filtros ni regeneración.
- Menú: aria-expanded pasa a true al pulsar y vuelve a false con Escape.
- Contacto: superficie cerrada continua en escritorio e iconos visibles en móvil.
- Todos los archivos de esta revisión están aislados en .taste-skill/audit-2026-10-17. No se ha implementado la propuesta en src.

El inspector de la skill conserva sus resultados completos en inspect-prototype.json. Se justifican estas excepciones: gradient corresponde a la cuadrícula solicitada; still-page corresponde a un boceto estático; eyebrow confunde el control funcional de búsqueda con un rótulo decorativo. Los avisos sobre cabecera flotante y tipografías corresponden a preferencias ya aceptadas. No se presentan como fallos que obliguen a rediseñar.

Los bocetos son propuestas visuales, no una aplicación funcional completa; la búsqueda de la aplicación real se probó por separado.

