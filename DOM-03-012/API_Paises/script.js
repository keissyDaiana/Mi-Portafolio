const inputEL = document.querySelector("#nombre-pais");
const buscador = document.querySelector(".busqueda");
const result = document.querySelector(".resutaldo");

async function getResults() {
    const countryName = inputEL.value.trim();

    if (countryName.length === 0) {
        result.innerHTML = `<h3>El campo no puede estar vacio!</h3>`;
        return;
    }

    try {
        result.innerHTML = `<h2 class="loading">Cargando resultados...</h2>`;
        const fetchUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fulltext=true`;
        const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new Error("Pais no encontrado");
        }

        const data = await response.json();
        const country = data[0];
        const capital = country.capital?.[0] || "No disponible";
        const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : null;
        const currency = currencyCode
            ? `${country.currencies[currencyCode].name} - ${currencyCode}`
            : "No disponible";
        const languages = country.languages
            ? Object.values(country.languages).join(", ")
            : "No disponible";

        result.innerHTML = `
        <img src="${country.flags.svg}" class="flag-img" alt="Bandera de ${country.name.common}">
        <h2>${country.name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${capital}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continente:</h4>
                <span>${country.continents?.[0] || "No disponible"}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                    <h4>Poblacion:</h4>
                    <span>${country.population.toLocaleString("es-ES")}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                    <h4>Moneda:</h4>
                    <span>${currency}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                    <h4>Idioma:</h4>
                    <span>${languages}</span>
            </div>
        </div>
            `;
    }
    catch (error) {
        result.innerHTML = `<h3>Por favor ingrese un pais correcto</h3>`;
    }
}

buscador.addEventListener("click", getResults);
inputEL.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getResults();
    }
});
