/**@type{HTMLCanvasElement} */
let canvas = document.querySelector('#canvas');
/**@type{CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figuras = [];
let delay = 100;
const CANT_FIGURAS = 24;

let mouseDown = false;
let figuraSeleccionada = null;

function main() {
    pintarCanvas();
    crearFiguras();
}

function crearFiguras() {
    if (figuras.length < CANT_FIGURAS) {
        agregarFigura(figuras.length < (CANT_FIGURAS / 2));
        figuras[figuras.length - 1].draw();
        delay = Math.max(10, delay - 10);
        setTimeout(() => { crearFiguras(); }, delay);
    }
}

function agregarFigura(unCirculo) {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomColor();

    if (unCirculo == true) {
        let circulo = new Circulo(posX, posY, Math.round(Math.random() * 50 + 5), color, ctx, false);
        figuras.push(circulo);
    } else {
        let rectangulo = new Rect(posX, posY, Math.round(Math.random() * 100 + 5),
            Math.round(Math.random() * 100 + 5), color, ctx, false);
        figuras.push(rectangulo);
    }
}

function randomColor() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function pintarCanvas() {
    let unColor = 'rgba(245,245,245,255)';
    let rect = new Rect(0, 0, canvasWidth - 1, canvasHeight - 1, unColor, ctx, true);
    rect.draw();
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let figura of figuras) {
        if (figura.estaElPunto(x, y)) {
            alert('Hiciste clic en una figura');
            break;
        }
    }
});

function getMousePos(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    return { x, y };
}

// Manejadores de eventos
canvas.addEventListener('mousedown', (e) => {
    let pos = getMousePos(e);
    let figuraEncontrada = false;

    // Verificar si el clic fue sobre alguna figura
    for (let figura of figuras) {
        if (figura.estaElPunto(pos.x, pos.y)) {
            mouseDown = true;
            figuraSeleccionada = figura;
            figuraEncontrada = true;
            break;
        }
    }

    // Si no se hace clic en ninguna figura, deseleccionar la figura actual
    if (!figuraEncontrada) {
        figuraSeleccionada = null;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown && figuraSeleccionada) {
        let pos = getMousePos(e);

        // Mover la figura a la nueva posición
        figuraSeleccionada.moveTo(pos.x, pos.y);

        // Limpiar el canvas y redibujar todas las figuras
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pintarCanvas();
        figuras.forEach(figura => figura.draw());
    }
});

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;

});

document.addEventListener('keydown', (e) => {
    if (figuraSeleccionada) {
        switch (e.key) {
            case 'ArrowUp':
                figuraSeleccionada.moveTo(figuraSeleccionada.posX, figuraSeleccionada.posY - 5);
                break;
            case 'ArrowDown':
                figuraSeleccionada.moveTo(figuraSeleccionada.posX, figuraSeleccionada.posY + 5);
                break;
            case 'ArrowLeft':
                figuraSeleccionada.moveTo(figuraSeleccionada.posX - 5, figuraSeleccionada.posY);
                break;
            case 'ArrowRight':
                figuraSeleccionada.moveTo(figuraSeleccionada.posX + 5, figuraSeleccionada.posY);
                break;
        }

        // Limpiar el canvas y redibujar todas las figuras
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pintarCanvas();
        figuras.forEach(figura => figura.draw());
    }
});