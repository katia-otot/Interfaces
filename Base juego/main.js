//BaseJuego/main.js
"use strict"


let runner = new Runner();
let puntos = 0; // Inicializar contador de puntos
let obstaculos = [];
let vidas = 3;
let velocidadPiso = 2; // Velocidad inicial del piso en segundos
let velocidadObstaculos = 5; // Velocidad inicial de los obstáculos en segundos
let tiempoGeneracionObstaculos = 3000; // Tiempo inicial de generación de obstáculos en milisegundos
let tiempoMinimoGeneracion = 1000; // Tiempo mínimo de generación de obstáculos
let colisionesObstaculo2 = 0; // Variable para contar las colisiones con obstaculo2
// Variable para rastrear si la música está sonando
let isMusicPlaying = true;

// Almacenar los identificadores de los intervalos
let gameInterval = setInterval(gameLoop, 50);
let obstaculoInterval = setInterval(generarObstaculo, tiempoGeneracionObstaculos);

document.addEventListener('DOMContentLoaded', (event) => {
    reproducirMusica();
});

// Actualizar la visualización inicial de puntos
actualizarPuntos();

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        runner.saltar();
    }
});

// Reproducir música
function reproducirMusica() {
    let musicaJuego = document.getElementById('gameMusic');
    musicaJuego.play(); // Iniciar la reproducción
}

// Detener la música
function detenerMusica() {
    let musicaJuego = document.getElementById('gameMusic');
    musicaJuego.pause(); // Pausar la reproducción
    musicaJuego.currentTime = 0; // Reiniciar la música
}

function actualizarPuntos() {
    let marcadorPuntos = document.getElementById('marcadorPuntos');
    marcadorPuntos.innerHTML = ''; // Limpiar marcador de puntos

    // Convertir los puntos a string y recorrer cada dígito
    let puntosStr = puntos.toString();
    for (let i = 0; i < puntosStr.length; i++) {
        let digito = puntosStr[i];
        let img = document.createElement('img');
        img.src = `images/numeros/${digito}.png`; // Ruta de la imagen del número
        marcadorPuntos.appendChild(img); // Agregar la imagen al marcador
    }

    // Aumentar velocidad cada 5 puntos
    if (puntos % 5 === 0 && puntos > 0) {
        aumentarVelocidad();
        reducirTiempoGeneracion();
    }
}

function aumentarVelocidad() {
    // Reducir los tiempos de animación para aumentar la velocidad
    velocidadPiso = Math.max(velocidadPiso * 0.9, 1); // Reducir el tiempo y no permitir menos de 1 segundo
    velocidadObstaculos = Math.max(velocidadObstaculos * 0.9, 2); // Reducir el tiempo y no permitir menos de 2 segundos

    // Actualizar las animaciones del piso y de los obstáculos
    document.getElementById('piso').style.animationDuration = `${velocidadPiso}s`;
    document.querySelectorAll('.obstaculo').forEach(obstaculo => {
        obstaculo.style.animationDuration = `${velocidadObstaculos}s`;
    });
   
}

function reducirTiempoGeneracion() {
    // Reducir el intervalo de generación de obstáculos y reiniciar el intervalo
    tiempoGeneracionObstaculos = Math.max(tiempoGeneracionObstaculos * 0.9, tiempoMinimoGeneracion);
    
    clearInterval(obstaculoInterval); // Limpiar el intervalo anterior
    obstaculoInterval = setInterval(generarObstaculo, tiempoGeneracionObstaculos); // Configurar nuevo intervalo

    console.log(`Nuevo tiempo de generación de obstáculos: ${tiempoGeneracionObstaculos} ms`);
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
          // Colisión detectada con cualquier obstáculo
        if (obstaculo.classList.contains('obstaculo2')) {
            
            // Si es el obstáculo2, se recupera una vida
            if (vidas < 3) {
                vidas++; // Recuperar una vida si es menor a 3
                actualizarVidas(); // Actualizar la visualización de los corazones
            }
            puntos++;
            actualizarPuntos(); 
            } else {
                // Colisión con otros obstáculos: perder una vida
                vidas--;
                actualizarVidas(); // Actualizar la visualización de los corazones
            }

        obstaculos.splice(index, 1); // Remover obstáculo que fue chocado
        obstaculo.remove(); // Eliminar el obstáculo del DOM
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

// Acción al hacer clic en el botón de detener música
stopMusicButton.addEventListener('click', () => {
    if (isMusicPlaying) {
        detenerMusica(); // Detiene la música
        stopMusicButton.src = 'images/musicoff.png'; // Cambia a imagen de silencio
    } else {
        reproducirMusica(); // Reproduce la música
        stopMusicButton.src = 'images/music.png'; // Cambia a imagen de sonido
    }
    isMusicPlaying = !isMusicPlaying; // Cambia el estado de la música
});
