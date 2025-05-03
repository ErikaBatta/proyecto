// cambio de texto
// 1. seleccionamos los textos una sola vez
let texto1 = document.getElementById("texto1");
let texto2 = document.getElementById("texto2");

//2. Creamos una variable para saber qué texto está visible
let mostrandoTexto1 = true;

//3.setInterval para repetir la función
setInterval(function() {
  if (mostrandoTexto1) {
    // Ocultamos el primer texto y mostramos el segundo
    texto1.classList.remove("visible");
    texto1.classList.add("oculto");

    texto2.classList.remove("oculto");
    texto2.classList.add("visible");

    mostrandoTexto1 = false; // Ahora el texto 2 está visible
  } else {
    // Ocultamos el segundo texto y mostramos el primero
    texto2.classList.remove("visible");
    texto2.classList.add("oculto");

    texto1.classList.remove("oculto");
    texto1.classList.add("visible");

    mostrandoTexto1 = true; // Ahora el texto 1 está visible
  }
}, 3000); 



// Variables globales
const cards = document.querySelectorAll('.card');
const carritoContenido = document.getElementById('carritoContenido');
const totalPrecio = document.getElementById('totalPrecio');
const carrito = [];
let total = 0;

// Filtros y orden
document.getElementById('filtroCategoria').addEventListener('change', filtrarProductos);
document.getElementById('filtroPrenda').addEventListener('change', filtrarProductos);
document.getElementById('filtroPrecio').addEventListener('input', filtrarProductos);
document.getElementById('ordenarPrecio').addEventListener('change', filtrarProductos);

function filtrarProductos() {
  const categoria = document.getElementById('filtroCategoria').value;
  const prenda = document.getElementById('filtroPrenda').value;
  const precioMax = parseFloat(document.getElementById('filtroPrecio').value) || Infinity;
  const orden = document.getElementById('ordenarPrecio').value;

  let productos = Array.from(cards);

  productos.forEach(card => {
    const cardCategoria = card.dataset.categoria;
    const cardPrenda = card.dataset.prenda;
    const cardPrecio = parseFloat(card.dataset.precio);

    const cumpleCategoria = categoria === 'todas' || cardCategoria === categoria;
    const cumplePrenda = prenda === 'todas' || cardPrenda === prenda;
    const cumplePrecio = cardPrecio <= precioMax;

    if (cumpleCategoria && cumplePrenda && cumplePrecio) {
      card.parentElement.style.display = 'block';
    } else {
      card.parentElement.style.display = 'none';
    }
  });

  // Ordenar
  if (orden !== 'ninguno') {
    productos = productos.sort((a, b) => {
      const precioA = parseFloat(a.dataset.precio);
      const precioB = parseFloat(b.dataset.precio);
      return orden === 'asc' ? precioA - precioB : precioB - precioA;
    });

    const container = document.querySelector('.tarjetas-container');
    productos.forEach(card => container.appendChild(card.parentElement));
  }
}

// Carrito
document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      const precio = parseFloat(btn.dataset.precio);
      const imagen = btn.dataset.imagen;
  
      // Verificar si ya está en el carrito
      const existente = carrito.find(item => item.id === id);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
      }
  
      actualizarCarrito();
    });
  });
  
  document.getElementById('btnCarritoNav').addEventListener('click', () => {
    document.getElementById('carritoModal').style.display = 'block';
  });
  

function actualizarCarrito() {
    carritoContenido.innerHTML = '';
    carrito.forEach((item, index) => {
      const div = document.createElement('div');
      div.innerHTML = `
        ${item.nombre} - $${item.precio.toLocaleString()} x ${item.cantidad}
        <button data-index="${index}" class="sumar">+</button>
        <button data-index="${index}" class="restar">-</button>
      `;
      carritoContenido.appendChild(div);
      actualizarContadorCarrito();
    });
  
    total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalPrecio.textContent = `Total: $${total.toLocaleString()}`;
  
    // Event listeners para los botones de + y -
    document.querySelectorAll('.sumar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        carrito[index].cantidad++;
        actualizarCarrito();
      });
    });
  
    document.querySelectorAll('.restar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        carrito[index].cantidad--;
        if (carrito[index].cantidad <= 0) {
          carrito.splice(index, 1); // Elimina si cantidad llega a 0
        }
        actualizarCarrito();
      });
    });
  }
  

// Modal
const modal = document.getElementById('carritoModal');
const cerrarModal = document.getElementById('cerrarModal');

document.getElementById('cerrarModal').addEventListener('click', () => {
  modal.style.display = 'none';
});

// Mostrar modal al hacer clic en un botón (puedes agregar un botón que lo abra)
document.addEventListener('DOMContentLoaded', () => {
  btnVerCarrito.onclick = () => modal.style.display = 'block';
  document.body.insertBefore(btnVerCarrito, document.querySelector('.tarjetas-container'));
});

// Vaciar carrito
document.getElementById('vaciarCarrito').addEventListener('click', () => {
  carrito.length = 0;
  total = 0;
  actualizarCarrito();
});

function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById('contadorCarrito').textContent = totalItems;
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

