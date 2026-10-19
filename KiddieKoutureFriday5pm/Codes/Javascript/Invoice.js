//Done by: Lemar Angel 
//ID: 2301536 

// Retrieve cart, billing data, and TRN from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const billingInfo = JSON.parse(localStorage.getItem('billingInfo')) || {};
//const customerTRN = billingInfo.trn || 'N/A'; // Get TRN (default to 'N/A' if not available)

// DOM Elements
const invoiceDateElement = document.getElementById('invoice-date');
const invoiceNumberElement = document.getElementById('invoice-number');
const customerNameElement = document.getElementById('customer-name');
const customerEmailElement = document.getElementById('customer-email');
const customerAddressElement = document.getElementById('customer-address');
const customerTrnElement = document.getElementById('customer-trn'); // TRN element
const productTableBody = document.querySelector('.product-table tbody');
const subtotalElement = document.getElementById('cart-subtotal');
const taxAmountElement = document.getElementById('tax-amount');
const totalAmountElement = document.getElementById('total-amount');

// Function to format the current date
function formatDate() {
    const date = new Date();
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Function to display invoice details
function displayInvoice() {
    // Set invoice date and number
    invoiceDateElement.textContent = formatDate();
    invoiceNumberElement.textContent = `INV-${Math.floor(100000 + Math.random() * 900000)}`;

    // Populate customer details
    customerNameElement.textContent = billingInfo.name || 'N/A';
    customerEmailElement.textContent = billingInfo.email || 'N/A';
    customerAddressElement.textContent = billingInfo.address || 'N/A';
    customerTrnElement.textContent = billingInfo.trn || 'N/A'; // Display TRN
    // Populate product table
    let totalPrice = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        productTableBody.appendChild(row);
    });

    // Calculate and display subtotal, tax, and total
    const taxAmount = totalPrice * 0.1; // 10% tax
    const totalAmount = totalPrice + taxAmount;

    subtotalElement.textContent = totalPrice.toFixed(2);
    taxAmountElement.textContent = taxAmount.toFixed(2);
    totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Function to generate the invoice object
function generateInvoiceObject() {
    const invoiceDate = formatDate();
    const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = totalPrice * 0.1;
    const totalAmount = totalPrice + taxAmount;

    const invoice = {
        invoiceDate,
        invoiceNumber,
        customer: {
            name: billingInfo.name || 'N/A',
            email: billingInfo.email || 'N/A',
            address: billingInfo.address || 'N/A',
            trn: billingInfo.trn || 'N/A', // Include TRN in the invoice object
        },
        products: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: totalPrice.toFixed(2),
        tax: taxAmount.toFixed(2),
        total: totalAmount.toFixed(2)
    };

    return invoice;
}

// Function to save the invoice to localStorage and append to the user's invoices
function saveInvoiceToLocalStorage() {
    const newInvoice = generateInvoiceObject();

    // Retrieve existing invoices from localStorage
    let allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];

    // Append the new invoice to the array
    allInvoices.push(newInvoice);

    // Store the updated invoices array back to localStorage
    localStorage.setItem('AllInvoices', JSON.stringify(allInvoices));

    // Optionally, display a message indicating the invoice was "sent" to the user’s email
    alert('Invoice has been sent to your email: ' + billingInfo.email);
}

// Function to download invoice as a PDF
function downloadInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Invoice Title
    doc.setFontSize(18);
    doc.text('Invoice', 14, 20);

    // Invoice Details
    doc.setFontSize(12);
    doc.text(`Date: ${invoiceDateElement.textContent}`, 14, 30);
    doc.text(`Invoice No: ${invoiceNumberElement.textContent}`, 14, 40);

    // Customer Details
    doc.text('Customer Details:', 14, 50);
    doc.text(`Name: ${billingInfo.name || 'N/A'}`, 14, 60);
    doc.text(`Email: ${billingInfo.email || 'N/A'}`, 14, 70);
    doc.text(`Address: ${billingInfo.address || 'N/A'}`, 14, 80);
    doc.text(`TRN: ${billingInfo.trn}`, 14, 90);  // Add TRN to the PDF

    // Products
    let yOffset = 100;
    doc.text('Products:', 14, yOffset);
    yOffset += 10;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        doc.text(`${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}`, 14, yOffset);
        yOffset += 10;
    });

    // Summary
    yOffset += 10;
    doc.text(`Subtotal: $${subtotalElement.textContent}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Tax (10%): $${taxAmountElement.textContent}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Total: $${totalAmountElement.textContent}`, 14, yOffset);

    // Save as PDF
    doc.save('invoice.pdf');

    // Save the invoice to localStorage after downloading
    saveInvoiceToLocalStorage();
}

// Initialize the page
displayInvoice();

// Add functionality to download button
document.getElementById('download-button').addEventListener('click', downloadInvoice);
