//BaseJuego/main.js
"use strict"

let runner = new Runner();
console.log(runner.status());

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        runner.saltar();
    }
});

let puntos = 0; // Inicializar contador de puntos
let obstaculos = [];
let vidas = 3;
    
// Almacenar los identificadores de los intervalos
let gameInterval = setInterval(gameLoop, 50);
let obstaculoInterval = setInterval(generarObstaculo, 3000);

// Actualizar la visualización inicial de puntos
actualizarPuntos();

function actualizarPuntos() {
    let marcadorPuntos = document.getElementById('marcadorPuntos');
    marcadorPuntos.innerHTML = ''; // Limpiar marcador de puntos

    // Si el puntaje es 0, mostrar la imagen de "0"
    if (puntos === 0) {
        let img = document.createElement('img');
        img.src = `images/numeros/0.png`; // Ruta de la imagen del número 0
        marcadorPuntos.appendChild(img);
    } else {
        // Convertir los puntos a string y recorrer cada dígito
        let puntosStr = puntos.toString();
        for (let i = 0; i < puntosStr.length; i++) {
            let digito = puntosStr[i];
            let img = document.createElement('img');
            img.src = `images/numeros/${digito}.png`; // Ruta de la imagen del número
            marcadorPuntos.appendChild(img); // Agregar la imagen al marcador
        }
    }
}


function actualizarVidas() {
    let corazones = document.querySelectorAll(".corazon");
    
    corazones.forEach((corazon, index) => {
        if (index < vidas) {
            corazon.classList.remove("vacio"); // Corazones llenos
        } else {
            corazon.classList.add("vacio"); // Corazones vacíos
        }
    });
}

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
            obstaculos.splice(index, 1); // Remover obstáculo que fue chocado
            obstaculo.remove(); // Eliminar el obstáculo del DOM
            actualizarVidas(); // Actualizar la visualización de los corazones
        }

         // Verificar si el obstáculo ha pasado completamente al personaje
        if (obstaculoRect.right < runnerRect.left) {
            // Incrementar puntos cuando el obstáculo pasa
            puntos++;
            actualizarPuntos(); // Actualizar la interfaz de usuario con imágenes de números
            obstaculos.splice(index, 1); // Remover obstáculo del array
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
    // Detener el ciclo del juego
    clearInterval(gameInterval);
    clearInterval(obstaculoInterval);

    // Ocultar el personaje y los obstáculos
    document.getElementById("personaje").style.display = "none"; // Ocultar personaje
    const obstaculos = document.querySelectorAll(".obstaculo");
    obstaculos.forEach(obstaculo => obstaculo.style.display = "none"); // Ocultar obstáculos

    // Mostrar solo los corazones perdidos, fondo y piso
    const vidas = document.getElementById("contenedor-vidas");
    vidas.style.display = "block"; // Mostrar solo los corazones

    // Mostrar imagen de "Game Over"
    mostrarGameOver();
}

function mostrarGameOver() {
    const gameOverImg = document.createElement("img");
    gameOverImg.src = "images/gameover.png";
    gameOverImg.alt = "Game Over";
    gameOverImg.id = "gameOver";

    // Añadir la imagen al contenedor principal
    const contenedor = document.getElementById("contenedor");
    contenedor.appendChild(gameOverImg);
}
