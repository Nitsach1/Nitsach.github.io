// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para añadir un producto al carrito
function addToCart(productId) {
  const products = [
    { id: 1, name: "Camiseta Clásica", price: 20.00 },
    { id: 2, name: "Camiseta Estampada", price: 25.00 }
  ];

  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    alert(${product.name} ha sido añadido al carrito.);
  }
}

// Función para actualizar el ícono del carrito
function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge');
  cartBadge.textContent = cart.length;
  cartBadge.style.display = cart.length > 0 ? 'inline-block' : 'none';
}

// Función para cargar los productos en la sección del carrito
function loadCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})" class="remove-btn">Eliminar</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  loadCartItems();
}

// Función para confirmar la compra y redirigir a WhatsApp
function confirmPurchase() {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const phoneNumber = "1234567890"; // Cambia este número al de tu WhatsApp
  const message = encodeURIComponent(
    "Hola, quiero confirmar mi compra: " +
    cart.map(item => ${item.name} ($${item.price.toFixed(2)})).join(', ')
  );

  const whatsappUrl = https://wa.me/${phoneNumber}?text=${message};
  window.location.href = whatsappUrl;
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  loadCartItems();
});
