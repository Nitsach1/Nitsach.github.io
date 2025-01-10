// Función para redirigir a WhatsApp con información del producto
function redirectToWhatsApp(productId) {
  const products = [
    { id: 1, name: "Alien Gansta", price: 80.00 },
    { id: 2, name: "Mario theft auto", price: 80.00 },
    { id: 3, name: "Mario Samurai", price: 80.00 },
    { id: 4, name: "Blooming 💙", price: 120.00 },
    { id: 5, name: "Polera Personalizadas ✨", price: cuanto lo hace }
  ];

  // Buscar el producto por su ID
  const product = products.find(p => p.id === productId);

  if (product) {
    // Número de teléfono (reemplázalo con tu número de WhatsApp)
    const phoneNumber = "59160981924"; // Cambiar este número por el tuyo

    // Generar mensaje dinámico
    const message = encodeURIComponent(
      `Hola, estoy interesado en comprar el producto "${product.name}" por ${product.price}bs.`
    );

    // Generar URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Redirigir a WhatsApp
    window.location.href = whatsappUrl;
  } else {
    alert("Producto no encontrado.");
  }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  console.log("Página cargada. Botones listos para redirigir a WhatsApp.");
});
