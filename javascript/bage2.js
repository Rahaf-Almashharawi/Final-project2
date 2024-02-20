function showThanks() {
    alert("Thank You 😍");
}

// 

const menu = document.getElementById('menu');
const openCartBtn = document.getElementById('openCartBtn');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const paymentModal = document.getElementById('paymentModal');
const invoiceModal = document.getElementById('invoiceModal');
const invoiceDetailsContainer = document.getElementById('invoiceDetails');
let cart = [];

function addToCart(button) {
    const menuItem = button.parentElement;
    const itemId = menuItem.dataset.id;
    const itemName = menuItem.dataset.name;
    const itemPrice = parseFloat(menuItem.dataset.price);

    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
    }

    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    openCartBtn.textContent = `Cart (${cartCount})`;
}

function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cartItem');
        cartItemElement.innerHTML = `
  <img src="${item.id}.jpg" alt="${item.name}">
  <span>${item.name} x ${item.quantity}</span>
  <span>$${(item.price * item.quantity).toFixed(2)}</span>
`;
        cartItemsContainer.appendChild(cartItemElement);

        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = total.toFixed(2);
}

function openCart() {
    updateCartModal();
    cartModal.style.display = 'flex';
}

function closeCart() {
    cartModal.style.display = 'none';
}

function openPayment() {
    paymentModal.style.display = 'flex';
}

function closePayment() {
    paymentModal.style.display = 'none';
}

function generateInvoice(paymentMethod) {
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const invoiceDetails = `
<h3>Items:</h3>
<div>${cart.map(item => `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('<br>')}</div>
<h3>Total:</h3>
<div>$${total.toFixed(2)}</div>
<h3>Payment Method:</h3>
<div>${paymentMethod}</div>
<p>Thank you for your order!</p>
`;
    invoiceDetailsContainer.innerHTML = invoiceDetails;

    cart = [];
    updateCartCount();
    closeCart();
    closePayment();

    invoiceModal.style.display = 'flex';
}

function closeInvoice() {
    invoiceModal.style.display = 'none';
}