// Accede desde window
window.paypal.Buttons({
  createOrder: (data, actions) => {
    const total = 19.99;
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2)
        }
      }]
    });
  },
  onApprove: (data, actions) => {
    return actions.order.capture().then(details => {
      alert(`Gracias por tu compra, ${details.payer.name.given_name}`);
    });
  }
}).render('#paypal-button-container');
