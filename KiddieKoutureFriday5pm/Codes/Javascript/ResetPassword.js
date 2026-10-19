// Done by: Shafeeq Mitchell
// ID: 

document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const trn = document.getElementById('trn').value;
    const newPassword = document.getElementById('newPassword').value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Retrieve registration data from localStorage
    let registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];

    // Find the user by TRN
    const userIndex = registrationData.findIndex(data => data.trn === trn);

    if (userIndex !== -1) {
        // Update password
        registrationData[userIndex].password = newPassword;
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
        successMessage.textContent = 'Password reset successfully. You can now log in with your new password.';
        errorMessage.textContent = '';
    } else {
        errorMessage.textContent = 'Invalid TRN. Please try again.';
        successMessage.textContent = '';
    }
});
