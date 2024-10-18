//BaseJuego/main2.js
"use strict"

// Seleccionamos los botones
const playButton = document.getElementById('playButton');
// Obtener el modal
const modal = document.getElementById("aboutModal");
// Obtener el botón que abre el modal
const aboutBtn = document.getElementById("aboutButton");
// Obtener el elemento <span> que cierra el modal
const closeBtn = document.querySelector(".close");

// Acción al hacer clic en el botón de 'Play'
playButton.addEventListener('click', () => {
    // Ocultar el menú de inicio
    document.querySelector('.menu-container').style.display = 'none';

    // Mostrar el contenedor del juego
    document.getElementById('contenedor').style.display = 'block';

    // Iniciar el ciclo del juego (gameLoop ya se ejecuta automáticamente)
    detenerMusicaMenu(); // Detenemos la música del menú
});

// Reproducir música del menú
function reproducirMusicaMenu() {
    let musicaMenu = document.getElementById('menuMusic');
    musicaMenu.play(); // Iniciar la reproducción
}

// Detener la música del menú
function detenerMusicaMenu() {
    let musicaMenu = document.getElementById('menuMusic');
    musicaMenu.pause(); // Pausar la reproducción
    musicaMenu.currentTime = 0; // Reiniciar la música
}

// Al cargar el menú
document.addEventListener('DOMContentLoaded', (event) => {
    reproducirMusicaMenu(); // Reproduce la música cuando el menú esté listo
});


// Cuando el usuario hace clic en el botón de About, se abre el modal
aboutBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Cuando el usuario hace clic en la X, se cierra el modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cuando el usuario hace clic en cualquier lugar fuera del modal, se cierra
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});