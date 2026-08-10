let menuVisible = false;
let cierreMenu;

// Función que oculta o muestra el menú
function mostrarocultarMenu() {
    const nav = document.getElementById("nav");
    clearTimeout(cierreMenu);

    if (menuVisible) {
        nav.classList.add("cerrando");
        menuVisible = false;
        cierreMenu = setTimeout(function () {
            if (!menuVisible) {
                nav.className = "";
            }
        }, 450);
    } else {
        nav.className = "responsive";
        menuVisible = true;
    }
}

// Función que oculta el menú cuando se hace click en una opción
function seleccionar() {
    const nav = document.getElementById("nav");
    clearTimeout(cierreMenu);
    nav.classList.add("cerrando");
    menuVisible = false;
    cierreMenu = setTimeout(function () {
        if (!menuVisible) {
            nav.className = "";
        }
    }, 450);
}

// Función para activar las animaciones de las barras de habilidades
let skillsAnimado = false;

function efectoHabilidades() {
    const skills = document.getElementById("skills");
    const distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

    if (distancia_skills >= 300 && !skillsAnimado) {
        skillsAnimado = true;

        const listaSkills = document.querySelectorAll("#skills .skill");

        listaSkills.forEach(function (skill) {
            const porcentaje = parseInt(skill.getAttribute("data-percent"), 10);
            const barra = skill.querySelector(".progreso");
            const circulo = skill.querySelector(".circulo");
            const numero = skill.querySelector(".numero");

            // Anima la barra
            barra.style.width = porcentaje + "%";

            // Anima el número dentro del círculo
            let actual = 0;
            const duracion = 1400; // ms, igual que la transición en CSS
            const pasos = 60;
            const incremento = porcentaje / pasos;
            const intervalo = duracion / pasos;

            const conteo = setInterval(function () {
                actual += incremento;
                if (actual >= porcentaje) {
                    actual = porcentaje;
                    clearInterval(conteo);
                }
                numero.textContent = Math.round(actual);
                circulo.style.left = actual + "%";
            }, intervalo);
        });
    }

}

// Muestra los elementos del currículo cuando entran en la pantalla
function efectoCurriculum() {
    const items = document.querySelectorAll("#curriculum .item");

    items.forEach(function (item, indice) {
        const distancia = item.getBoundingClientRect().top;

        if (distancia < window.innerHeight - 80) {
            item.style.transitionDelay = (indice * 120) + "ms";
            item.style.setProperty("opacity", "1", "important");
            item.style.setProperty("transform", "translateX(0)", "important");
            item.classList.add("mostrar");
        }
    });
}

// Captura el scrolling del navegador para disparar la animación
window.onscroll = function() {
    efectoHabilidades();
    efectoCurriculum();
    efectoPortfolio();
};

efectoHabilidades();
efectoCurriculum();
efectoPortfolio();


// Función para animar las tarjetas del Portafolio al hacer scroll
let portfolioAnimado = false;

function efectoPortfolio() {
    const portfolio = document.getElementById("portafolio");
    if (!portfolio) return;

    const distancia_portfolio = window.innerHeight - portfolio.getBoundingClientRect().top;

    if (distancia_portfolio >= 200 && !portfolioAnimado) {
        portfolioAnimado = true;

        const proyectos = document.querySelectorAll("#portafolio .proyecto");
        proyectos.forEach(function (proyecto, index) {
            setTimeout(function () {
                proyecto.style.setProperty("opacity", "1", "important");
                proyecto.style.setProperty("transform", "translateY(0)", "important");
                proyecto.classList.add("mostrar");
            }, index * 100); // aparecen en cascada
        });
    }
}

const formularioContacto = document.getElementById("contact-form");

if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const datos = new FormData(formularioContacto);
        const nombre = datos.get("nombre");
        const correo = datos.get("correo");
        const asunto = datos.get("asunto");
        const mensaje = datos.get("mensaje");
        const cuerpo = `Nombre: ${nombre}\nCorreo: ${correo}\n\n${mensaje}`;
        const enlaceCorreo = `mailto:keissydaianabeniteztrujillo@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        const estado = document.getElementById("form-status");

        window.location.href = enlaceCorreo;
        estado.textContent = "Se abrió tu aplicación de correo con el mensaje preparado.";
        estado.classList.add("visible");
        formularioContacto.reset();
    });
}