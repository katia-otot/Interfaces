//BaseJuego/Obstaculo.js
class Obstaculo extends Personaje {
    constructor() {
        super();

        this.enemigo = document.createElement("div");

        // Elegir un obstáculo aleatorio entre 1 y 4
        let randomObstaculo = Math.floor(Math.random() * 4) + 1;

        // Asignar clase y dimensiones según el obstáculo aleatorio
        switch (randomObstaculo) {
            case 1:
                this.enemigo.classList.add("obstaculo1");
                this.enemigo.style.width = "73px";
                this.enemigo.style.height = "46px";
                break;
            case 2:
                this.enemigo.classList.add("obstaculo2");
                this.enemigo.style.width = "49px";
                this.enemigo.style.height = "41px";
                break;
            case 3:
                this.enemigo.classList.add("obstaculo3");
                this.enemigo.style.width = "50px";
                this.enemigo.style.height = "41px";
                break;
            case 4:
                this.enemigo.classList.add("obstaculo4");
                this.enemigo.style.width = "90px";
                this.enemigo.style.height = "54px";
                break;
            case 5:
                this.enemigo.classList.add("obstaculo5");
                this.enemigo.style.width = "116px";
                this.enemigo.style.height = "44px";
                break;
    }

        // Aplicar las clases de estilo genérico para todos los obstáculos
        this.enemigo.classList.add("obstaculo");
    }

    status() {
        super.status();
    }
}