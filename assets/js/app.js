//--------------- Variables
const listaPendientes = document.getElementById("lista-pendientes");

// ---------- Event Listeners ------------

eventListener();

function eventListener() {
  // Cuando se envia el formulario
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarPendiente);

  //Borrar Pendiente
  listaPendientes.addEventListener("click", borrarPendiente);

  // Contenido Cargado
  document.addEventListener("DOMContentLoaded", localStorageListo);
}

//---------- Funciones---------------

// Limpia el text area
function eraseText() {
  document.getElementById("Nuevos").value = "";
}
//Añadir pendiente del formulario
function agregarPendiente(e) {
  e.preventDefault();
  //leer el valor del textarea
  const Nuevos = document.getElementById("Nuevos").value;
  // Crear boton de eliminar
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-pendiente";
  botonBorrar.innerText = "X";
  // Crear elemento y añadirle el contenido a la lista
  const li = document.createElement("li");
  li.innerText = Nuevos;
  // añade el boton de borrar a los pendientes
  li.appendChild(botonBorrar);
  // añade el pendiente a la lista
  listaPendientes.appendChild(li);

  // Añadir a local Storage
  agregarPendienteLocalStorage(Nuevos);
}
// Elimina el pendiente del DOM
function borrarPendiente(e) {
  e.preventDefault();
  if (e.target.className === "borrar-pendiente") {
    e.target.parentElement.remove();
    borrarPendienteLocalStorage(e.target.parentElement.innerText);
    //alert("Pendiente Eliminado");
  }
}

// Mostrar datos de local storage en la lista
function localStorageListo() {
  let pendiente;

  pendiente = obtenerPendienteLocalStorage();

  pendiente.forEach(function (Nuevos) {
    // Crear boton de eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-pendiente";
    botonBorrar.innerText = "X";

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement("li");
    li.innerText = Nuevos;
    // añade el boton de borrar a los pendientes
    li.appendChild(botonBorrar);
    // añade el pendiente a la lista
    listaPendientes.appendChild(li);
  });
}
// Agrega pendiente a local storage
function agregarPendienteLocalStorage(Nuevos) {
  let pendiente;
  pendiente = obtenerPendienteLocalStorage();
  // Añadir el nuevo pendiente
  pendiente.push(Nuevos);
  // Convertir de string a arreglo para local storage
  localStorage.setItem("pendiente", JSON.stringify(pendiente));
}

// Comprobar que haya elementos en local storage, retorna un arreglo
function obtenerPendienteLocalStorage() {
  let pendiente;
  // Revisamos los valores de local storage
  if (localStorage.getItem("pendiente") === null) {
    pendiente = [];
  } else {
    pendiente = JSON.parse(localStorage.getItem("pendiente"));
  }
  return pendiente;
}
// Eliminar pendiente de local Storage
function borrarPendienteLocalStorage(Nuevos) {
  let pendiente, pendienteBorrar;
  // Elimina la X del pendiente
  pendienteBorrar = Nuevos.substring(0, Nuevos.length - 1);
  pendiente = obtenerPendienteLocalStorage();
  pendiente.forEach(function (Nuevos, index) {
    if (pendienteBorrar === Nuevos) {
      pendiente.splice(index, 1);
    }
  });
  localStorage.setItem("pendiente", JSON.stringify(pendiente));
}
