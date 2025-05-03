// alerta de envio formulario

// paso 1: llamar al elemento
let formulario = document.getElementById('miformulario');

// Paso 2: Definir qué hacer cuando se envía
function manejarEnvio(evento) {
  evento.preventDefault(); // Previene que se recargue la página
  alert("Los datos fueron enviados correctamente.");
}

// Paso 3: Conectar el evento con la función
formulario.addEventListener('submit', manejarEnvio);

function vaciar(){
  this.reset();
}