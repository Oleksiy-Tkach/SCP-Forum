document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('usernameLogin');
  const passwordInput = document.getElementById('passwordLogin');
  const togglePassword = loginForm.querySelector('.toggle-password');
  const rememberCheckbox = document.getElementById('remember');
  const message = document.getElementById('message');

  togglePassword.addEventListener('click', function() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  });

  // Автоматичне заповнення з localStorage
  if(localStorage.getItem('scp-remember-username') && localStorage.getItem('scp-remember-password')) {
    usernameInput.value = localStorage.getItem('scp-remember-username');
    passwordInput.value = localStorage.getItem('scp-remember-password');
    rememberCheckbox.checked = true;
  }

  function showMessage(text, color = 'red') {
    message.textContent = text;
    message.style.color = color;
  }

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;

    if (!username || !password) {
      showMessage('Будь ласка, заповніть всі поля', 'red');
      return;
    }

    let users = JSON.parse(localStorage.getItem('scp-users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      showMessage('Вхід успішний! Ласкаво просимо, ' + username, 'green');
      if (remember) {
        localStorage.setItem('scp-remember-username', username);
        localStorage.setItem('scp-remember-password', password);
      } else {
        localStorage.removeItem('scp-remember-username');
        localStorage.removeItem('scp-remember-password');
      }
      loginForm.reset();
    } else {
      showMessage('Невірний логін або пароль', 'red');
    }
  });
});
