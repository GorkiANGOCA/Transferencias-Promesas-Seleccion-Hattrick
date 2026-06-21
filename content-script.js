// content-script.js

function buildTransferList() {
    // 1. Evitar duplicar la lista si ya la generamos en el DOM actual
    if (document.querySelector('.transfer-extension-box')) return;

    // 2. Buscar iconos de transferencia (ignorando la tabla oculta nativa de Hattrick '#playersTable')
    const transferIcons = Array.from(document.querySelectorAll('.icon-transferlisted')).filter(icon => {
        return !icon.closest('#playersTable');
    });
    
    // Si no hay jugadores en transferencia, detenemos la ejecución
    if (transferIcons.length === 0) return;

    // 3. Extraer los contenedores completos de los jugadores
    const clonedPlayers = [];
    let isTableFormat = false;

    transferIcons.forEach(icon => {
        // En las páginas de Selecciones, los jugadores están en divs con ID terminado en '_upPlayerList'
        let playerBlock = icon.closest('div[id*="_upPlayerList"]');
        
        // Soporte dual: por si acaso la utilizas en la página de un Club (que usa tablas <tr>)
        if (!playerBlock) {
            playerBlock = icon.closest('tr');
            isTableFormat = true;
        }

        if (playerBlock) {
            // Clonamos el nodo completo para mantener el diseño visual idéntico y los enlaces funcionales
            const clonedBlock = playerBlock.cloneNode(true);
            
            // Limpiamos los IDs del clon para evitar conflictos con el HTML original
            clonedBlock.removeAttribute('id');
            clonedBlock.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));

            clonedPlayers.push(clonedBlock);
        }
    });

    if (clonedPlayers.length === 0) return;

    // 4. Crear el contenedor principal interactivo y sus estilos nativos
    const transferBox = document.createElement('div');
    transferBox.className = 'transfer-extension-box';
    transferBox.style.margin = "15px 0";
    transferBox.style.border = "1px solid #c2c2c2";
    transferBox.style.borderRadius = "4px";
    transferBox.style.overflow = "hidden";

    // Encabezado clickeable (Expandir/Colapsar)
    const toggleHeader = document.createElement('div');
    toggleHeader.style.backgroundColor = "#e4e4e4";
    toggleHeader.style.padding = "10px 15px";
    toggleHeader.style.cursor = "pointer";
    toggleHeader.style.display = "flex";
    toggleHeader.style.justifyContent = "space-between";
    toggleHeader.style.alignItems = "center";
    
    const title = document.createElement('h3');
    title.style.margin = "0";
    title.style.fontSize = "14px";
    title.style.fontWeight = "bold";
    title.textContent = `💰 Jugadores en Transferencia (${clonedPlayers.length})`;
    
    const iconSpan = document.createElement('span');
    iconSpan.textContent = "▼";
    iconSpan.style.fontSize = "12px";
    iconSpan.style.opacity = "0.7";
    
    toggleHeader.appendChild(title);
    toggleHeader.appendChild(iconSpan);
    
    // Cuerpo de la lista (colapsado por defecto)
    const listBody = document.createElement('div');
    listBody.style.display = "none"; 
    listBody.style.backgroundColor = "#fff";
    listBody.style.padding = isTableFormat ? "0" : "0 10px 10px 10px";

    // Insertar los jugadores en el cuerpo correcto dependiendo de si es tabla o divs
    if (isTableFormat) {
        const table = document.createElement('table');
        table.className = "standard";
        table.style.width = "100%";
        const tbody = document.createElement('tbody');
        clonedPlayers.forEach(player => tbody.appendChild(player));
        table.appendChild(tbody);
        listBody.appendChild(table);
    } else {
        clonedPlayers.forEach(player => listBody.appendChild(player));
    }
    
    transferBox.appendChild(toggleHeader);
    transferBox.appendChild(listBody);

    // 5. Ubicación dinámica debajo del encabezado de "X jugadores"
    const allHeaders = Array.from(document.querySelectorAll('h1, h2, h3'));
    const playersHeader = allHeaders.find(el => el.innerText && el.innerText.match(/\d+\s+(jugadores|players)/i));

    if (playersHeader) {
        let target = playersHeader;
        // Las selecciones a veces tienen un divisor (.byline) que debemos saltar para no romper el diseño
        if (target.nextElementSibling && target.nextElementSibling.classList.contains('byline')) {
            target = target.nextElementSibling;
        }
        target.insertAdjacentElement('afterend', transferBox);
    } else {
        // Fallback: Si Hattrick cambia el texto, ubicamos la caja antes del primer jugador listado
        const firstPlayer = document.querySelector('.teamphoto-player, table.standard');
        if (firstPlayer && firstPlayer.parentNode) {
            firstPlayer.parentNode.insertBefore(transferBox, firstPlayer);
        }
    }

    // 6. Lógica de interactividad (Expandir/Colapsar)
    toggleHeader.addEventListener('click', () => {
        if (listBody.style.display === 'none') {
            listBody.style.display = 'block';
            iconSpan.textContent = '▲';
            toggleHeader.style.backgroundColor = "#dcdcdc";
        } else {
            listBody.style.display = 'none';
            iconSpan.textContent = '▼';
            toggleHeader.style.backgroundColor = "#e4e4e4";
        }
    });
}

// Ejecutar inmediatamente cuando el DOM cargue
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTransferList);
} else {
    buildTransferList();
}

// Observador para mantener la lista funcional si usas los filtros/ordenamientos de Hattrick (AJAX)
const observer = new MutationObserver(() => {
    buildTransferList();
});
observer.observe(document.body, { childList: true, subtree: true });