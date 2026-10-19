//Done by: Kadedra Mason
//ID: 2304879

// Array of product objects
const products = [
    {
        name: "Off-the-shoulder Top and Skirt",
        price: 19.99,
        description: "This off-the-shoulder top paired with a chic skirt creates a feminine look, </br> perfect for casual and special occasions.",
        image: "Assets/Clothes1.jpg"
    },
    {
        name: "Long Sleeve Pumpkin Print Dress",
        price: 15.99,
        description: "This charming long sleeve dress features a delightful pumpkin print, making it an ideal choice for autumn festivities and cozy gatherings.",
        image: "Assets/Clothes2.jpg"
    },
    {
        name: "Rainbow Print  Top And Shorts ",
        price: 11.00,
        description: "This vibrant rainbow print short sleeve top and shorts set adds a playful touch to any casual outfit, perfect for sunny days and fun adventures. ",
        image: "Assets/Clothes3.jpeg"
    },
    {
        name: " Sleeveless Bowknot Top and Shorts",
        price: 10.29,
        description: "This chic sleeveless bowknot top paired with matching shorts offers a stylish look, ideal for warm weather outings.",
        image: "Assets/Clothes4.jpg"
    },
    {
        name: "Short Sleeve Button Down Shirt and Shorts ",
        price: 9.99,
        description: "This classic short sleeve button-down shirt, paired with coordinating shorts, creates a versatile and polished outfit for any occasion.",
        image: "Assets/Clothes5.jpg"
    },
    {
        name: "Button Down Shirt and Shorts",
        price: 5.99,
        description: "This stylish button-down shirt paired with shorts offers a relaxed yet refined look, perfect for warm-weather outings. ",
        image: "Assets/Clothes6.jpeg"
    },
	{
        name: "Short Sleeved Shirt and Basketball Shorts",
        price: 3.52,
        description: "This comfortable short-sleeved shirt, paired with basketball shorts, is ideal for both casual outings and active days on the court.",
        image: "Assets/Clothes7.jpg"
    },
	{
        name: " Patchwork Breathable Mesh Top and Shorts ",
        price: 12.43,
        description: "This patchwork breathable mesh top and shorts set combines comfort with modern style for warm-weather outings.",
        image: "Assets/Clothes8.jpg"
    },
	{
        name: "Patchwork Jacket and Skirt ",
        price: 16.89,
        description: "This patchwork jacket and skirt set offers a coordinated look perfect for any casual occasion.",
        image: "Assets/Clothes9.jpg"
    },
	{
        name: "Pink Hoodie and Sweater Pants  ",
        price: 19.99,
        description: "A cozy pink hoodie and sweater pants set, ideal for casual outings.",
        image: "Assets/Clothes10.jpg"
    },
	{
        name: " Light Blue Short Sleeve Polo Shirt",
        price: 6.99,
        description: "A classic light blue short sleeve polo shirt, perfect for a casual look.",
        image: "Assets/Clothes11.jpeg"
    },
	{
        name: "Striped Shirt and Pants ",
        price: 20.99,
        description: "A long sleeve striped shirt paired with matching pants for a stylish outfit. ",
        image: "Assets/Clothes12.jpg"
    },
];

// Store products in localStorage
localStorage.setItem("AllProducts", JSON.stringify(products));

// Function to display products
function displayProducts() {
    const productsSection = document.getElementById("products");
    const allProducts = JSON.parse(localStorage.getItem("AllProducts"));

    allProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <a href="#" class="add-to-cart" onclick="addToCart('${product.name.replace(/'/g, "\\'")}', ${product.price})">Add to Cart</a>
            </div>
        `;
        productsSection.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(product => product.name === name); // Find the product object
    const productIndex = cart.findIndex(item => item.name === name);
    
    if (productIndex > -1) {
        cart[productIndex].quantity += 1; // Update quantity if product already exists in cart
    } else {
        cart.push({ name, price, quantity: 1, image: product.image }); // Add new product to cart with image
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showNotification(name); // Show notification after adding to cart
}

// Show notification after adding to cart
function showNotification(productName) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
        <p>${productName} has been added to your cart!</p>
        <button onclick="goToCart()">Go to Cart</button>
        <button onclick="goToCheckout()">Checkout</button>
        <button onclick="closeNotification()">Continue Shopping</button>
    `;
    document.body.appendChild(notification);
    
    // Automatically close the notification after 5 seconds
    setTimeout(() => {
        closeNotification();
    }, 5000); // Change the time as needed (5000 ms = 5 seconds)
}

// Close the notification
function closeNotification() {
    const notification = document.querySelector(".notification");
    if (notification) {
        document.body.removeChild(notification); // Remove notification from DOM
    }
}

// Redirect to cart page
function goToCart() {
    window.location.href = "Cart.html"; // Change this to your cart page URL
}

// Redirect to checkout page
function goToCheckout() {
    window.location.href = "Check out.html"; // Change this to your checkout page URL
}

// Display products when the page loads
document.addEventListener("DOMContentLoaded", displayProducts);

function logout() {
    // Clear local storage/session storage
    localStorage.removeItem('user'); // or sessionStorage.removeItem('user');
    // Redirect to login page
    window.location.href = 'Log in.html';
}