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