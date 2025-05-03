let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const carritoContenido = document.getElementById('carritoContenido');
const totalPrecio = document.getElementById('totalPrecio');
const contadorCarrito = document.getElementById('contadorCarrito');

// Inicializa todo lo del carrito
function iniciarCarrito() {
  actualizarCarrito();

  // Botón del navbar para abrir el modal
  const btnVer = document.getElementById('btnCarritoNav');
  if (btnVer) {
    btnVer.addEventListener('click', () => {
      document.getElementById('carritoModal').style.display = 'block';
    });
  }

  // Botón cerrar modal
  const cerrar = document.getElementById('cerrarModal');
  if (cerrar) {
    cerrar.addEventListener('click', () => {
      document.getElementById('carritoModal').style.display = 'none';
    });
  }

  // Vaciar carrito
  const vaciar = document.getElementById('vaciarCarrito');
  if (vaciar) {
    vaciar.addEventListener('click', () => {
      carrito = [];
      localStorage.removeItem('carrito');
      actualizarCarrito();
    });
  }

  // Listeners para agregar productos (delegación segura)
  document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      const precio = parseFloat(btn.dataset.precio);
      const imagen = btn.dataset.imagen;

      const existente = carrito.find(item => item.id === id);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
      }

      actualizarCarrito();
    });
  });
}

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
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  totalPrecio.textContent = `Total: $${total.toLocaleString()}`;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();

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
        carrito.splice(index, 1);
      }
      actualizarCarrito();
    });
  });
}

function actualizarContadorCarrito() {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  if (contadorCarrito) {
    contadorCarrito.textContent = totalItems;
  }
}

// Ejecutar solo si este archivo se carga después del DOM
document.addEventListener('DOMContentLoaded', iniciarCarrito);
