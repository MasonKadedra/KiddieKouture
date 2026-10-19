//Done by: Kadedra Mason
//ID: 2304879

// Load cart from localStorage or initialize an empty array if no cart exists
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const subtotalElement = document.getElementById('cart-subtotal');
const taxElement = document.getElementById('cart-tax');
const totalElement = document.getElementById('cart-total');
const cartItemsContainer = document.getElementById('cart-items');
const amountToPayInput = document.getElementById('amount-to-pay');

// Initialize total prices
let totalPrice = 0;

// Function to display cart items
function displayCartItems() {
    cartItemsContainer.innerHTML = ''; // Clear previous items
    totalPrice = 0; // Reset total price for recalculation

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal; // Calculate total price for display

        // Create a paragraph element for each item in the cart
        const itemElement = document.createElement('p');
        itemElement.innerHTML = `${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}`;

        // Append the item to the cart items container
        cartItemsContainer.appendChild(itemElement);
    });

    // Update subtotal, tax, and total
    const taxAmount = (totalPrice * 0.1); // Assuming 10% tax
    const total = totalPrice + taxAmount;

    subtotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    taxElement.textContent = `$${taxAmount.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    // Automatically populate the amount to pay field
    amountToPayInput.value = total.toFixed(2);
}

// Function to add item to cart
function addToCart(item) {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name && cartItem.size === item.size);
    
    if (existingItemIndex !== -1) {
        // If item exists, just update the quantity
        cart[existingItemIndex].quantity += item.quantity; // Update the quantity based on user input
    } else {
        // If item doesn't exist, add a new item
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCartItems(); // Refresh the displayed cart items
    updateCartCount(); // Update cart count after addition
}

// Initialize cart display on checkout page load
displayCartItems();

// Save billing information when the form is submitted
const checkoutForm = document.querySelector('form');
checkoutForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('fname').value;
	const trn = document.getElementById('trn').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('adr').value;
	
    
    // Store billing information in localStorage
    const billingInfo = { name, trn, email, address };
    console.log(billingInfo);
    localStorage.setItem('billingInfo', JSON.stringify(billingInfo));

    // Proceed to invoice page
    window.location.href = "Invoice.html";
});

// Checkout button action
// document.getElementById('checkout').onclick = function() {
//     alert("Proceeding to invoice...");
//     window.location.href = "Invoice.html";
// };
