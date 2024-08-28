/**@type{HTMLCanvasElement} */

let canvas = document.querySelector('#canvas');
/**@type{CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let figuras = [];
let delay= 100;
const CANT_FIGURAS = 24;

function main() 
{
    pintarCanvas();
    crearFiguras();
}

function crearFiguras() {
    if (figuras.length < CANT_FIGURAS) {
        agregarFigura( figuras.length < (CANT_FIGURAS/2) );
        figuras[figuras.length - 1].draw();
        delay = Math.max(10, delay - 10);
        setTimeout(() => {crearFiguras();}, delay);
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
    let r = Math.round( Math.random() * 255);
    let g = Math.round( Math.random() * 255);
    let b = Math.round( Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function pintarCanvas() {
    let unColor = 'rgba(245,245,245,255)';
    let rect = new Rect(0, 0, canvasWidth-1, canvasHeight-1, unColor, ctx, true);
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