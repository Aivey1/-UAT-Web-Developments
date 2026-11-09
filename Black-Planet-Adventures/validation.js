// Validate the pilot application in the browser before it is sent to PHP.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pilotForm');
  const error = document.getElementById('errorMessage');
  form.addEventListener('submit', (event) => {
    // Clear any message from the previous attempt.
    error.textContent = '';
    const name = form.elements.fullName.value.trim();
    const email = form.elements.email.value.trim();
    const age = Number(form.elements.age.value);
    const hours = Number(form.elements.flightHours.value);
    const license = form.elements.license.value;
    const training = form.querySelector('input[name="training"]:checked');
    const motivation = form.elements.motivation.value.trim();
    let message = '';
    let field = null;
    // Stop submission on the first invalid answer and explain the problem.
    if (name.length < 2) { message = 'Enter your full name (at least 2 characters).'; field = form.elements.fullName; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { message = 'Enter a valid email address.'; field = form.elements.email; }
    else if (form.elements.age.value.trim() === '' || !Number.isInteger(age) || age < 18 || age > 100) { message = 'Age must be a whole number between 18 and 100.'; field = form.elements.age; }
    else if (form.elements.flightHours.value.trim() === '' || !Number.isInteger(hours) || hours < 0 || hours > 100000) { message = 'Flight hours must be a whole number between 0 and 100,000.'; field = form.elements.flightHours; }
    else if (!license) { message = 'Select your pilot license.'; field = form.elements.license; }
    else if (!training) { message = 'Choose Yes or No for mission training.'; field = form.querySelector('input[name="training"]'); }
    else if (motivation.length < 20) { message = 'Explain your motivation in at least 20 characters.'; field = form.elements.motivation; }
    if (message) {
      event.preventDefault(); // Keep the user on the form when invalid.
      error.textContent = message;
      field.focus();
    }
    // If there is no error, the form POSTs to results.php normally.
  });
});