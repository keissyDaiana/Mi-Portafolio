const kits = [
    "crash",
    "kick",
    "snare",
    "tom"
];

const containerEl = document.querySelector(".container");

kits.forEach((kit) => {

    // Crear botón
    const btnEl = document.createElement("button");

    btnEl.classList.add("btn");

    btnEl.style.backgroundImage =
        `url(images/${kit}.png)`;

    btnEl.innerHTML = `<span>${kit}</span>`;

    // Crear audio
    const audioEl = document.createElement("audio");

    audioEl.src = `sounds/${kit}.mp3`;

    // Agregar al contenedor
    containerEl.appendChild(btnEl);

    containerEl.appendChild(audioEl);

    // Evento click
    btnEl.addEventListener("click", () => {

        audioEl.currentTime = 0;

        audioEl.play();

        animateButton(btnEl);
    });

    // Evento teclado
    document.addEventListener("keydown", (e) => {

        if(e.key.toLowerCase() === kit.slice(0,1)){

            audioEl.currentTime = 0;

            audioEl.play();

            animateButton(btnEl);
        }
    });
});

// Animación botón
function animateButton(button){

    button.style.transform = "scale(0.9)";

    setTimeout(() => {

        button.style.transform = "scale(1)";

    }, 100);
}