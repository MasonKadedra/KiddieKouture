//Done by: Kadedra Mason
//ID: 2304879


// Get cart data from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Calculate totals and update the display
function updateCartSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + tax;

    document.getElementById("cart-subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("cart-tax").innerText = tax.toFixed(2);
    document.getElementById("cart-total").innerText = total.toFixed(2);
}

// Render the cart items
function renderCart() {
    const cartContainer = document.querySelector("#cart-items tbody");
    const cart = getCart();
    cartContainer.innerHTML = ""; // Clear existing content

    cart.forEach(item => {
        const productRow = document.createElement("tr");
        productRow.innerHTML = `
            <td data-label="Product">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
                ${item.name.replace(/'/g, "&#39;")}
            </td>
            <td data-label="Price">$${item.price.toFixed(2)}</td>
            <td data-label="Quantity">
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.name.replace(/'/g, "\\'")}', this.value)" 
                style="border: 1px solid #ccc; font-family: Times New Roman; border-radius: 5px;">
            </td>
            <td data-label="Subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
            <td data-label="Remove">
                <button class="remove-item" onclick="removeItem('${item.name.replace(/'/g, "\\'")}', this.value)" 
                style="background-color: #ff4d4d; color: white; font-family: Times New Roman; border: none; padding: 5px 10px; 
                cursor: pointer; border-radius: 50px; transition: background-color 0.3s ease;">Remove</button>
            </td>
        `;
        cartContainer.appendChild(productRow);
    });
    updateCartSummary();
}


// Update product quantity in the cart
function updateQuantity(name, quantity) {
    const cart = getCart();
    const productIndex = cart.findIndex(item => item.name === name);

    if (productIndex > -1) {
        cart[productIndex].quantity = parseInt(quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

// Remove item from the cart
function removeItem(name) {
    const cart = getCart().filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Clear the entire cart
document.getElementById("clear-cart").onclick = function() {
    localStorage.removeItem("cart");
    renderCart();
};

// Checkout button action
document.getElementById("checkout").onclick = function() {
    alert("Proceeding to checkout...");
     window.location.href = "Check out.html"; // Change to your products page URL
};

// Close cart button action
document.getElementById("close-cart").onclick = function() {
    // Redirect to the products page
    window.location.href = "Products.html"; // Change to your products page URL
};

// Initial render
document.addEventListener("DOMContentLoaded", renderCart);

