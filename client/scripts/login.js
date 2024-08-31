// Prototype for validation for the login page
/*document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
  
      if (email === '' || password === '') {
        alert('Both fields are required.');
        return;
      }
  
      // Simulate form submission and validation...
      alert('Form submitted successfully!');
    });
  });*/


//get started button click event...
document.addEventListener('DOMContentLoaded', function() {
  const getStartedButton = document.getElementById('get-started');
  const btnContainer = document.getElementById('btn-container');

  getStartedButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link action
    getStartedButton.classList.add('hidden');
    btnContainer.classList.remove('hidden');
  });
});
