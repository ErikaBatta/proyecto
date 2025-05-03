// baner de publicidad 

let slidesContainer = document.querySelector('.slides');
let slides = document.querySelectorAll('.slide');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let currentIndex = 0;

function showSlide(index) {
  const offset = -index * 100;
  slidesContainer.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 2000);
}

// Pausar y reanudar al pasar el mouse
let banner = document.querySelector('.banner');
banner.addEventListener('mouseenter', stopAutoSlide);
banner.addEventListener('mouseleave', startAutoSlide);

function stopAutoSlide() {
  clearInterval(autoSlide);
}


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