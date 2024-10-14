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
                this.enemigo.style.width = "250px";
                this.enemigo.style.height = "170px";
                break;
            case 2:
                this.enemigo.classList.add("obstaculo2");
                this.enemigo.style.width = "192px";
                this.enemigo.style.height = "146px";
                break;
            case 3:
                this.enemigo.classList.add("obstaculo3");
                this.enemigo.style.width = "185px";
                this.enemigo.style.height = "54px";
                break;
            case 4:
                this.enemigo.classList.add("obstaculo4");
                this.enemigo.style.width = "276px";
                this.enemigo.style.height = "134px";
                break;
        }

        // Aplicar las clases de estilo genérico para todos los obstáculos
        this.enemigo.classList.add("obstaculo");
    }

    status() {
        super.status();
    }
}