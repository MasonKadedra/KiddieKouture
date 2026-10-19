// Done by: Shafeeq Mitchell
// ID: 


let attempts = 0;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const trn = document.getElementById('trn').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Retrieve registration data from localStorage
    let registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];


    // Find the user by TRN and password
    const user = registrationData.find((data) => data.trn === trn && data.password === password);
    for (const element of registrationData) {
        console.log(element);
    }
    console.log(registrationData);

    if (user) {
        // Successful login
        window.location.href = 'Products.html'; // Redirect to products page
    } else {
        attempts++;
        errorMessage.textContent = 'Invalid TRN or password. Please try again.';

        // Check for three attempts
        if (attempts >= 3) {
            window.location.href = 'Error.html'; // Redirect to error page
        }
    }
});

document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('loginForm').reset(); // Clear the form
});
