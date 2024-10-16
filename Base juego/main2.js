//BaseJuego/main2.js
"use strict"

// Seleccionamos los botones
const playButton = document.getElementById('playButton');
const controlsButton = document.getElementById('controlsButton');

// Acción al hacer clic en el botón de 'Play'
playButton.addEventListener('click', () => {
    // Ocultar el menú de inicio
    document.querySelector('.menu-container').style.display = 'none';

    // Mostrar el contenedor del juego
    document.getElementById('contenedor').style.display = 'block';

    // Iniciar el ciclo del juego (gameLoop ya se ejecuta automáticamente)
});

// Acción al hacer clic en el botón de 'Controles'
controlsButton.addEventListener('click', () => {
    window.location.href = 'controls.html';  // Redirigimos a la página de controles
});