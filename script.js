// Aquí se guardan los productos que el cliente va eligiendo
let carrito = {};

// Cambia aquí el número de WhatsApp del negocio (52 + 10 dígitos)
const TELEFONO_NEGOCIO = "526567990972";

function cambiarCantidad(nombre, precio, cambio) {
  // Si el producto no existe en el carrito, lo inicializamos en 0
  if (!carrito[nombre]) {
    carrito[nombre] = { cantidad: 0, precio: precio };
  }

  // Sumamos o restamos
  carrito[nombre].cantidad += cambio;

  // Evitamos números negativos
  if (carrito[nombre].cantidad <= 0) {
    delete carrito[nombre];
    document.getElementById(`cant-${nombre}`).innerText = 0;
  } else {
    document.getElementById(`cant-${nombre}`).innerText = carrito[nombre].cantidad;
  }

  actualizarBarra();
}

function actualizarBarra() {
  let totalItems = 0;
  let totalDinero = 0;

  // Recorremos el carrito para sumar cantidades y precios
  for (let producto in carrito) {
    totalItems += carrito[producto].cantidad;
    totalDinero += carrito[producto].cantidad * carrito[producto].precio;
  }

  const barra = document.getElementById("barra-carrito");

  if (totalItems > 0) {
    barra.classList.remove("oculto");
    document.getElementById("total-items").innerText = totalItems;
    document.getElementById("total-dinero").innerText = `$${totalDinero}`;
  } else {
    barra.classList.add("oculto");
  }
}

function enviarWhatsApp() {
  let mensaje = "Hola, me gustaría hacer el siguiente pedido:\n\n";
  let totalDinero = 0;

  for (let producto in carrito) {
    let item = carrito[producto];
    let subtotal = item.cantidad * item.precio;
    totalDinero += subtotal;
    mensaje += `• ${item.cantidad}x ${producto} ($${subtotal})\n`;
  }

  mensaje += `\n*Total a pagar: $${totalDinero}*`;

  // Codificamos el texto para URL y abrimos WhatsApp
  const url = `https://wa.me/${TELEFONO_NEGOCIO}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}