const btnEl = document.querySelector(".btn");

const inputEl = document.querySelector("input");

const messageEl = document.querySelector(".message");

const errorEl = document.querySelector(".error");

btnEl.addEventListener("click", displayMessage);

function displayMessage(){

    if(inputEl.value.trim() !== ""){

        messageEl.textContent = inputEl.value;

        inputEl.value = "";

        errorEl.style.display = "none";

    }else{

        errorEl.style.display = "block";

        setTimeout(() => {

            errorEl.style.display = "none";

        }, 3000);
    }
}