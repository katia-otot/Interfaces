"use strict"

let runner = new Runner();
console.log(runner.status());

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        runner.saltar();
    }
});

let obstaculos = [];
let vidas = 3;

// Almacenar los identificadores de los intervalos
let gameInterval = setInterval(gameLoop, 50);
let obstaculoInterval = setInterval(generarObstaculo, 3000);

/**
 * Chequear estado del runner y de los enemigos
 */
function gameLoop() {
    // Verificar si el juego ha terminado
    if (vidas <= 0) {
        terminarJuego(); // Llamar a la función para terminar el juego
        return; // Salir de la función si el juego ha terminado
    }

    obstaculos.forEach((obstaculo, index) => {
        let obstaculoRect = obstaculo.getBoundingClientRect();
        let runnerRect = runner.status();

        if (
            runnerRect.left < obstaculoRect.right &&
            runnerRect.right > obstaculoRect.left &&
            runnerRect.top < obstaculoRect.bottom &&
            runnerRect.bottom > obstaculoRect.top
        ) {
            // Colisión detectada
            vidas--;
            console.log("Vida perdida! Vidas restantes: " + vidas);
            obstaculos.splice(index, 1); // Remover obstáculo que fue chocado
            obstaculo.remove(); // Eliminar el obstáculo del DOM
        }
    });
}

function generarObstaculo() {
    let obstaculo = new Obstaculo();

    obstaculos.push(obstaculo.enemigo);
    document.getElementById("contenedor").appendChild(obstaculo.enemigo);
}

function terminarJuego() {
    clearInterval(gameInterval); // Detener el ciclo del juego
    clearInterval(obstaculoInterval); // Detener la generación de obstáculos
    alert("Juego terminado. ¡Has perdido todas las vidas!"); // Mostrar alerta
}