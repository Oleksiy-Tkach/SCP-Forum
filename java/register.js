document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const clearanceSelect = document.getElementById('clearanceLevel');
  const termsCheckbox = document.getElementById('terms');
  const togglePassword = registerForm.querySelector('.toggle-password');
  const message = document.getElementById('message');

  // Перемикання видимості пароля
  togglePassword.addEventListener('click', function() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    confirmPasswordInput.type = type;
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  });

  function validateForm(username, password, confirmPassword, clearance, terms) {
    if (!username || !password || !confirmPassword) {
      showMessage('Всі поля обов’язкові для заповнення', 'red');
      return false;
    }
    if (password !== confirmPassword) {
      showMessage('Паролі не співпадають', 'red');
      return false;
    }
    if (!terms) {
      showMessage('Ви повинні погодитися з умовами', 'red');
      return false;
    }
    if (password.length < 6) {
      showMessage('Пароль повинен містити щонайменше 6 символів', 'red');
      return false;
    }
    return true;
  }

  function showMessage(text, color = 'green') {
    message.textContent = text;
    message.style.color = color;
  }

  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const clearance = clearanceSelect.value;
    const terms = termsCheckbox.checked;

    if (!validateForm(username, password, confirmPassword, clearance, terms)) return;

    let users = JSON.parse(localStorage.getItem('scp-users')) || [];
    if (users.some(u => u.username === username)) {
      showMessage('Користувач з таким логіном вже існує', 'red');
      return;
    }

    users.push({ username, password, clearance });
    localStorage.setItem('scp-users', JSON.stringify(users));
    showMessage('Реєстрація успішна! Тепер можете увійти.', 'green');

    registerForm.reset();
  });
});
