const tarea = document.getElementById("task");
const lista = document.querySelector(".lists");

function clicked(){

    if(tarea.value === ""){
        alert("Debes escribir una tarea");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = tarea.value;
        lista.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "×";
        li.appendChild(span);
    }

    tarea.value = "";
    guardar();
}

lista.addEventListener("click",(e)=>{

    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        guardar();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        guardar();
    }

},false);

function guardar(){
    localStorage.setItem("data", lista.innerHTML);
}

function getData(){
    lista.innerHTML = localStorage.getItem("data");
}
getData();
