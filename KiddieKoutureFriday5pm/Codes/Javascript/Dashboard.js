// Done by: Khyle Dixon
// ID: 1403921

// Function: ShowUserFrequency
function ShowUserFrequency() {
    // Retrieve registration data from localStorage
    const registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];

    // Calculate gender frequencies
    const genderFrequency = { Male: 0, Female: 0, Other: 0 };
    registrationData.forEach(user => {
        if (genderFrequency[user.gender] !== undefined) {
            genderFrequency[user.gender]++;
        }
    });

    // Calculate age group frequencies
    const ageGroupFrequency = { '18-25': 0, '26-35': 0, '36-50': 0, '50+': 0 };
    const today = new Date();
    registrationData.forEach(user => {
        const birthDate = new Date(user.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age >= 18 && age <= 25) ageGroupFrequency['18-25']++;
        else if (age >= 26 && age <= 35) ageGroupFrequency['26-35']++;
        else if (age >= 36 && age <= 50) ageGroupFrequency['36-50']++;
        else if (age > 50) ageGroupFrequency['50+']++;
    });

    // Helper function to create bars dynamically
    const createBars = (data, containerId, color) => {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear any existing bars
        const maxCount = Math.max(...Object.values(data)); // Find the highest count

        for (const [label, count] of Object.entries(data)) {
            const bar = document.createElement('div');
            const barWidth = (count / maxCount) * 100; // Scale the width based on the highest count
            bar.style.width = `${barWidth}%`; 
            bar.style.backgroundColor = color;
            bar.style.color = 'white';
            bar.style.margin = '5px 0';
            bar.style.borderRadius = '5px';
            bar.textContent = `${label}: ${count}`;
            container.appendChild(bar);
        }
    };

    // Generate gender frequency chart
    createBars(genderFrequency, 'gender-chart', '#4e73df');

    // Generate age group frequency chart
    createBars(ageGroupFrequency, 'age-group-chart', '#1cc88a');
}

function searchInvoicesByTRN(allInvoices, searchTRN) {
    // Normalize TRN (trim spaces and convert to uppercase)
    const normalizedTRN = searchTRN.trim().toUpperCase();

    return allInvoices.filter(invoice => {
        // Ensure customer and TRN exist before comparison
        const invoiceTRN = invoice.customer?.trn?.trim().toUpperCase();
        return invoiceTRN === normalizedTRN;
    });
}


// Function to display invoices in a table or allow download
function displayInvoices(invoices) {
    const invoiceContainer = document.getElementById('invoice-container');
    invoiceContainer.innerHTML = ''; // Clear previous content

    if (invoices.length > 0) {
        // Create a table to display invoices
        const table = document.createElement('table');
        table.setAttribute('border', '1');
        table.style.width = '100%';
        table.style.textAlign = 'left';

        // Table headers
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>TRN</th>
            <th>Name</th>
            <th>Total</th>
            <th>Email</th>
            <th>Action</th>
        `;
        table.appendChild(headerRow);

        // Table rows for each invoice
        invoices.forEach((invoice, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${invoice.customer.trn}</td>
                <td>${invoice.customer.name}</td>
                <td>${invoice.total}</td>
                <td>${invoice.customer.email}</td>
                <td><button onclick="downloadInvoice(${index})"> <i class="fas fa-download"> </i> Download</button></td>
            `;
            table.appendChild(row);
        });

        invoiceContainer.appendChild(table);
    } else {
        invoiceContainer.innerHTML = '<p>No invoices to display.</p>';
    }
}

// Function to download an invoice as a pdf file
async function downloadInvoice(index) {
    const allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    const invoice = allInvoices[index];

    if (!invoice) {
        alert('Invoice not found.');
        return;
    }

    // Import jsPDF
    const { jsPDF } = window.jspdf;

    // Initialize jsPDF
    const doc = new jsPDF();

    // Add invoice title
    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, { align: "center" });

    // Add customer and invoice details
    doc.setFontSize(12);
    doc.text(`TRN: ${invoice.customer.trn}`, 20, 40);
    doc.text(`Name: ${invoice.customer.name}`, 20, 50);
    doc.text(`Email: ${invoice.customer.email}`, 20, 60);
    doc.text(`Date: ${invoice.date || "Not provided"}`, 20, 70);

    // Convert `total` to a number and handle invalid values
    const total = parseFloat(invoice.total) || 0;
    doc.text(`Total: $${total.toFixed(2)}`, 20, 80);

    // Check if invoice has items and add them as a table
    if (invoice.items && invoice.items.length > 0) {
        doc.autoTable({
            startY: 90,
            head: [["Item", "Quantity", "Price"]],
            body: invoice.items.map(item => [
                item.name, 
                item.quantity, 
                `$${parseFloat(item.price).toFixed(2)}`
            ]),
        });
    }

    // Save the PDF
    doc.save(`Invoice_${invoice.customer.trn}_${index + 1}.pdf`);
}



// Updated ShowInvoices to use the helper function
function ShowInvoices() {
    const allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    
    console.log("All Invoices:", allInvoices);

    const searchTRN = prompt("Enter TRN to search for invoices:");
    if (searchTRN) {
        const matchingInvoices = searchInvoicesByTRN(allInvoices, searchTRN);
        if (matchingInvoices.length > 0) {
            console.log(`Invoices for TRN ${searchTRN}:`, matchingInvoices);
            displayInvoices(matchingInvoices);
        } else {
            console.log(`No invoices found for TRN ${searchTRN}.`);
            alert(`No invoices found for TRN ${searchTRN}.`);
        }
    } else {
        console.log("No TRN entered. Exiting search.");
    }
}

// Updated GetUserInvoices to use the helper function
function GetUserInvoices() {
    const allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    console.log("All Invoices:", allInvoices);

    const userTRN = prompt("Enter your TRN to view your invoices:");
    if (userTRN) {
        const userInvoices = searchInvoicesByTRN(allInvoices, userTRN);
        if (userInvoices.length > 0) {
            console.log(`Invoices for User TRN ${userTRN}:`, userInvoices);
            displayInvoices(userInvoices);
        } else {
            console.log(`No invoices found for TRN ${userTRN}.`);
            alert(`No invoices found for TRN ${userTRN}.`);
        }
    } else {
        console.log("No TRN entered. Exiting search.");
    }
}

// Call ShowUserFrequency on page load
document.addEventListener('DOMContentLoaded', () => {
    ShowUserFrequency();

    // Add event listeners for ShowInvoices and GetUserInvoices buttons
    document.getElementById('show-invoices').addEventListener('click', ShowInvoices);
    document.getElementById('get-user-invoices').addEventListener('click', GetUserInvoices);
});
