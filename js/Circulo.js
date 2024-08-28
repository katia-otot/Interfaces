class Circulo extends Figura {
    constructor(posX, posY, radio, fill, context, estilo) {
        super(posX, posY, fill, context, estilo);
        this.radius = radio;
    }

    draw() {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        if (this.estilo){
            this.ctx.stroke();
        }
    }

    estaElPunto(x, y) {
        let xx = this.posX-x ;
        let yy = this.posY-y ;
        return ((Math.sqrt(xx * xx + yy * yy) < this.radius));
    }
}