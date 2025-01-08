/* script.js: Funcionalidades para la página web con carrito de compras y redirección a WhatsApp */

/**
 * Obtiene el carrito actual desde LocalStorage.
 * @returns {Array} Lista de productos en el carrito.
 */
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

/**
 * Guarda el carrito en LocalStorage.
 * @param {Array} cart - Lista de productos a guardar.
 */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Agregar un producto al carrito.
 * @param {number} productId - ID del producto seleccionado.
 */
function addToCart(productId) {
  let cart = getCart();

  // Buscar si el producto ya está en el carrito
  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    // Incrementar la cantidad si ya existe
    existingProduct.quantity += 1;
  } else {
    // Agregar nuevo producto
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  updateCartBadge();
  renderCart();

  alert(Producto con ID ${productId} agregado al carrito.);
}

/**
 * Elimina un producto del carrito.
 * @param {number} productId - ID del producto a eliminar.
 */
function removeFromCart(productId) {
  let cart = getCart();

  // Filtrar el producto eliminado
  cart = cart.filter(item => item.id !== productId);

  saveCart(cart);
  updateCartBadge();
  renderCart();
}

/**
 * Actualiza el número de productos en el carrito que se muestra en el menú.
 */
function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const cartBadge = document.getElementById('cart-badge');
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

/**
 * Muestra los productos del carrito en la interfaz.
 */
function renderCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const confirmPurchaseBtn = document.getElementById('confirm-purchase-btn');

  // Limpiar contenido anterior
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    confirmPurchaseBtn.style.display = 'none';
  } else {
    cart.forEach(item => {
      const productElement = document.createElement('div');
      productElement.className = 'cart-item';
      productElement.innerHTML = `
        <p>Producto ID: ${item.id}</p>
        <p>Cantidad: ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})" class="btn btn-remove">Eliminar</button>
      `;
      cartItemsContainer.appendChild(productElement);
    });

    confirmPurchaseBtn.style.display = 'block';
  }
}

/**
 * Confirmar compra y redirigir a WhatsApp.
 */
function confirmPurchase() {
  const cart = getCart();

  if (cart.length === 0) {
    alert('Tu carrito está vacío. Agrega productos antes de confirmar la compra.');
    return;
  }

  // Construir el mensaje con los detalles del carrito
  let message = 'Hola, quiero realizar la siguiente compra:%0A';
  cart.forEach(item => {
    message += - Producto ID: ${item.id}, Cantidad: ${item.quantity}%0A;
  });

  message += '%0AGracias.';

  // Redirigir a WhatsApp
  const phoneNumber = '59160981924'; // Reemplaza con tu número de WhatsApp (sin el signo "+")
  const whatsappUrl = https://wa.me/${phoneNumber}?text=${message};
  window.location.href = whatsappUrl;
}

/**
 * Simulación de navegación fluida al hacer clic en los enlaces del menú.
 */
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Ajuste para el header fijo
        behavior: 'smooth'
      });
    }
  });
});

/**
 * Formulario de contacto: Validación y envío simulado.
 */
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = event.target.querySelector('input[placeholder="Nombre"]').value;
    const email = event.target.querySelector('input[placeholder="Correo Electrónico"]').value;
    const message = event.target.querySelector('textarea').value;

    if (name && email && message) {
      alert(Gracias, ${name}. Hemos recibido tu mensaje y te contactaremos pronto.);
      event.target.reset(); // Limpia el formulario
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });
}

/**
 * Testimonios: Rotación automática.
 */
const testimonials = document.querySelectorAll('#reviews blockquote');
let currentTestimonial = 0;

if (testimonials.length > 1) {
  setInterval(() => {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
  }, 5000); // Cambia cada 5 segundos
}

/**
 * Inicialización de la página.
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Página cargada completamente. Scripts inicializados.');
  updateCartBadge();
  renderCart(); // Renderizar el carrito al cargar la página
});