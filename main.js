// Asegúrate de que `cart`, `auth`, y `submitOrder` estén disponibles
// Si están definidos en otro archivo, deberías importarlos o definirlos aquí también

// Este código se asegura que PayPal se cargue cuando el DOM está listo
window.addEventListener('DOMContentLoaded', () => {
  const paypalContainer = document.getElementById('paypal-button-container');

  if (!paypalContainer || typeof window.paypal === 'undefined') {
    console.warn('PayPal SDK no está cargado o el contenedor no existe.');
    return;
  }

  // Renderizar botón PayPal
  window.paypal.Buttons({
    createOrder: function(data, actions) {
      if (!cart || cart.length === 0) {
        alert('El carrito está vacío');
        return;
      }

      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 35.00;

      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2)
          }
        }]
      });
    },

    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert(`Gracias por tu pago, ${details.payer.name.given_name}!`);
        submitOrder(); // Ejecuta tu lógica para finalizar pedido
      });
    },

    onError: function(err) {
      console.error('Error en el botón de PayPal:', err);
      alert('Hubo un problema al procesar el pago. Intenta de nuevo.');
    }
  }).render('#paypal-button-container');
});
