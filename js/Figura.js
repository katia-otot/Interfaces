class Figura {
    constructor(posX, posY, fill, context, estilo) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = context;
        this.estilo = estilo;
    }

    draw() {
        // Nothing to do
    }

    moveTo(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    selected(estilo) {
        this.estilo = estilo;
    }

    estaElPunto(x, y) {
        return null;
    }

}