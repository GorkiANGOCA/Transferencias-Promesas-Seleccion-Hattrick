# Hattrick - Lista de Transferencias (NT)

Esta es una extensión para el navegador Firefox diseñada específicamente para la comunidad del juego de gestión de fútbol en línea [Hattrick](https://www.hattrick.org).

## ¿De qué trata este proyecto?

Como mánager de Hattrick, monitorear a los jugadores promesas de las Selecciones Nacionales (tanto Adultas como Sub21) puede ser una tarea tediosa, especialmente cuando se busca identificar rápidamente quiénes están en venta.

Esta extensión soluciona este problema consolidando a todos los jugadores que se encuentran listados para transferencia en una sección única, destacada y colapsable en la parte superior de las páginas de listados de jugadores de selección (NT). Es una herramienta ideal para quienes buscan oportunidades deportivas o económicas sin tener que navegar por todo el listado manualmente.

## Características

* **Consolidación automática:** Agrupa a los jugadores en venta en un solo contenedor visual.
* **Interactividad:** Sección colapsable y expansible para mantener la interfaz limpia.
* **Diseño integrado:** Se ajusta visualmente al estilo nativo del juego.
* **Soporte Multi-dominio:** Compatible con las distintas versiones de Hattrick (www, stage, etc.).

## Instrucciones de Instalación

Para instalar esta extensión en Firefox de forma temporal, sigue estos pasos:

1. Crea una carpeta en tu computadora (por ejemplo: `HT-Extension-Transferencias`).
2. Guarda los tres archivos proporcionados (`manifest.json`, `content-script.js`, `styles.css`) dentro de esa carpeta. Asegúrate de que los nombres sean exactos.
3. Abre **Firefox**.
4. Escribe `about:debugging` en la barra de direcciones y presiona Enter.
5. En el menú lateral izquierdo, haz clic en **"Este Firefox"** (This Firefox).
6. Haz clic en el botón **"Cargar un complemento temporal..."** (Load Temporary Add-on...).
7. Busca la carpeta que creaste, selecciona el archivo `manifest.json` y ábrelo.

¡Listo! La extensión está instalada y activa.

## Manual de Uso

* **¿Dónde funciona?** La extensión se activa automáticamente al visitar las páginas de jugadores de selecciones (ej. `NTPlayers.aspx` o `NTProspectPlayers.aspx`).
* **Funcionamiento:** Al cargar la página, la extensión detectará automáticamente si hay jugadores en transferencia y creará un cuadro de aviso en la parte superior con el recuento total.
* **Interacción:**
* Haz clic en el encabezado **"💰 Jugadores en Transferencia (X)"** para expandir o colapsar la lista de jugadores.
* El diseño se adapta automáticamente dependiendo de si la página usa un formato de lista en bloques o una tabla clásica, manteniendo los enlaces y funcionalidades originales del juego.



---

*Nota: Esta extensión es un proyecto de código abierto diseñado para mejorar la experiencia del usuario y facilitar la gestión de los equipos de los mánagers dentro de la comunidad de Hattrick.*
