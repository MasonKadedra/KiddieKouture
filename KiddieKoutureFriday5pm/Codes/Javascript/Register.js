// Done by: Shafeeq Mitchell
// ID: 

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const trn = document.getElementById('trn').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Calculate age
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Validate age
    if (age < 18) {
        errorMessage.textContent = 'You must be over 18 years old to register.';
        successMessage.textContent = '';
        return;
    }

    // Retrieve registration data from localStorage
    let registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];

    // Check if TRN is unique
    const trnExists = registrationData.some(data => data.trn === trn);
    if (trnExists) {
        errorMessage.textContent = 'TRN already exists. Please use a different TRN.';
        successMessage.textContent = '';
        return;
    }

    // Create registration object
    const registrationRecord = {
        firstName,
        lastName,
        dob,
        gender,
        phone,
        email,
        trn,
        password,
        dateOfRegistration: new Date().toISOString(),
        cart: {},
        invoices: []
    };

    // Append registration record to localStorage
    registrationData.push(registrationRecord);
    localStorage.setItem('RegistrationData', JSON.stringify(registrationData));

    successMessage.textContent = 'Registration successful. You can now log in.';
    errorMessage.textContent = '';
    document.getElementById('registrationForm').reset(); // Clear the form
});

document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('registrationForm').reset(); // Clear the form
});
