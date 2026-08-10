const preguntas = [
    {
        letra: "A",
        pregunta: "Capital de Colombia",
        respuesta: "bogota"
    },
    {
        letra: "B",
        pregunta: "Color del cielo",
        respuesta: "azul"
    },
    {
        letra: "C",
        pregunta: "Animal que dice miau",
        respuesta: "gato"
    },
    {
        letra: "D",
        pregunta: "Planeta donde vivimos",
        respuesta: "tierra"
    },
    {
        letra: "E",
        pregunta: "Estrella principal del sistema solar",
        respuesta: "sol"
    },
    {
        letra: "F",
        pregunta: "Fruta amarilla",
        respuesta: "banano"
    },
    {
        letra: "G",
        pregunta: "Animal más alto del mundo",
        respuesta: "jirafa"
    },
    {
        letra: "H",
        pregunta: "Lugar donde vivimos",
        respuesta: "casa"
    },
    {
        letra: "I",
        pregunta: "Dispositivo para navegar en internet",
        respuesta: "computador"
    },
    {
        letra: "J",
        pregunta: "Mes después de junio",
        respuesta: "julio"
    }
];

let preguntaActual = 0;
let tiempo = 60;
let contador;
let cantidadAcertadas = 0;

const pantallaInicial = document.getElementById("pantalla-inicial");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaFinal = document.getElementById("pantalla-final");

const btnComenzar = document.getElementById("btnComenzar");
const btnResponder = document.getElementById("btnResponder");
const btnPasar = document.getElementById("btnPasar");
const btnReiniciar = document.getElementById("btnReiniciar");

const tiempoHTML = document.getElementById("tiempo");
const letraPregunta = document.getElementById("letra-pregunta");
const preguntaHTML = document.getElementById("pregunta");
const respuestaInput = document.getElementById("respuesta");
const cantidadAcertadasHTML = document.getElementById("cantidad-acertadas");

const circuloLetras = document.getElementById("circulo-letras");

crearCirculo();

btnComenzar.addEventListener("click", iniciarJuego);
btnResponder.addEventListener("click", verificarRespuesta);
btnPasar.addEventListener("click", pasarPregunta);
btnReiniciar.addEventListener("click", reiniciarJuego);

respuestaInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        verificarRespuesta();
    }
});

function iniciarJuego(){

    pantallaInicial.style.display = "none";
    pantallaJuego.style.display = "block";

    iniciarContador();
    cargarPregunta();
}

function iniciarContador(){

    contador = setInterval(() => {

        tiempo--;
        tiempoHTML.textContent = tiempo;

        if(tiempo <= 0){
            finalizarJuego();
        }

    },1000);
}

function crearCirculo(){

    const total = preguntas.length;
    const radio = 170;

    preguntas.forEach((pregunta,index)=>{

        const div = document.createElement("div");
        div.classList.add("circle");
        div.id = pregunta.letra;

        div.textContent = pregunta.letra;

        const angulo = (index / total) * (2 * Math.PI);

        const x = radio * Math.cos(angulo);
        const y = radio * Math.sin(angulo);

        div.style.left = `${x + 180}px`;
        div.style.top = `${y + 180}px`;

        circuloLetras.appendChild(div);

    });
}

function cargarPregunta(){

    limpiarActivas();

    const pregunta = preguntas[preguntaActual];

    letraPregunta.textContent = pregunta.letra;
    preguntaHTML.textContent = pregunta.pregunta;

    document
        .getElementById(pregunta.letra)
        .classList.add("activa");

    respuestaInput.value = "";
    respuestaInput.focus();
}

function limpiarActivas(){

    const circles = document.querySelectorAll(".circle");

    circles.forEach(circle=>{
        circle.classList.remove("activa");
    });
}

function verificarRespuesta(){

    const respuestaUsuario =
        respuestaInput.value.toLowerCase().trim();

    const pregunta = preguntas[preguntaActual];

    const circle = document.getElementById(pregunta.letra);

    if(respuestaUsuario === pregunta.respuesta){

        circle.classList.add("correcta");
        cantidadAcertadas++;

    }else{

        circle.classList.add("incorrecta");
    }

    siguientePregunta();
}

function pasarPregunta(){

    siguientePregunta();
}

function siguientePregunta(){

    preguntaActual++;

    if(preguntaActual >= preguntas.length){

        finalizarJuego();
        return;
    }

    cargarPregunta();
}

function finalizarJuego(){

    clearInterval(contador);

    pantallaJuego.style.display = "none";
    pantallaFinal.style.display = "block";

    cantidadAcertadasHTML.textContent =
        cantidadAcertadas;
}

function reiniciarJuego(){

    location.reload();
}