class Rect extends Figura {
    constructor(posX, posY, width, height, fill, context, estilo) {
        super(posX, posY, fill, context, estilo);
        this.width = width;
        this.height = height;
    }

    draw() {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.rect(this.posX, this.posY, this.width, this.height);
        this.ctx.fill();
        if (this.estilo){
            this.ctx.stroke();
        }
    }

    estaElPunto(x, y) {
        return ((x > this.posX && x < this.posX + this.width && y > this.posY  && y < this.posY + this.height));
    }
}