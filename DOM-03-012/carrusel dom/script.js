const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const botones = document.querySelectorAll(".btn");
const imagenes = document.querySelector(".imagenes");

let imgMuestra =["IM1.jpg", "IM2.png", "IM3.jpg", "IM4.jpg"];
let contador = 0;

function mostrarImagen() {
    imagenes.style.backgroundImage = `url("img/${imgMuestra[contador]}")`;
}

btnLeft.addEventListener("click", (evento) => {
    evento.preventDefault();
    izquierda();
});
btnRight.addEventListener("click", (evento) => {
    evento.preventDefault();
    derecha();
});

function derecha() {
    contador++;
    if (contador > imgMuestra.length-1) {
        contador = 0;
    }
    mostrarImagen();
}

function izquierda() {
    contador--;
    if (contador < 0) {
        contador = imgMuestra.length - 1;
    }
    mostrarImagen();
}

mostrarImagen();