document.addEventListener('DOMContentLoaded', function() {
  // Елементи форми
  const registerForm = document.getElementById('registerForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const clearanceSelect = document.getElementById('clearanceLevel');
  const termsCheckbox = document.getElementById('terms');
  const togglePassword = document.querySelector('.toggle-password');
  const strengthBar = document.querySelector('.strength-bar');
  const strengthText = document.getElementById('strengthText');
  const securityLevel = document.getElementById('securityLevel');
  const levelText = document.getElementById('levelText');
  const scpAlert = document.getElementById('scpAlert');
  const alertMessage = document.getElementById('alertMessage');

  // Ініціалізація рівня перевірки
  let security = 0;
  const securityInterval = setInterval(() => {
    security = Math.min(security + Math.random() * 10, 100);
    securityLevel.style.width = `${security}%`;
    
    // Оновлення текстового відображення
    if (security < 30) {
      levelText.textContent = "ПОЧАТКОВИЙ";
      levelText.style.color = "#2ecc71";
    } else if (security < 70) {
      levelText.textContent = "СЕРЕДНІЙ";
      levelText.style.color = "#f39c12";
    } else {
      levelText.textContent = "ДЕТАЛЬНИЙ";
      levelText.style.color = "#e74c3c";
    }
  }, 100);

  // Перемикання видимості пароля
  togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    confirmPasswordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  });

  // Перевірка складності пароля
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = calculatePasswordStrength(password);
    
    // Оновлення індикатора
    strengthBar.style.width = `${strength.percent}%`;
    strengthBar.style.backgroundColor = strength.color;
    strengthText.textContent = strength.text;
    strengthText.style.color = strength.color;
  });

  // Обробка події відправки форми
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const clearance = clearanceSelect.value;
    const terms = termsCheckbox.checked;
    
    // Валідація даних
    if (!validateForm(username, password, confirmPassword, clearance, terms)) {
      return;
    }
    
    // Перевірка, чи вже є такий користувач
    const users = JSON.parse(localStorage.getItem('scp-users')) || [];
    const userExists = users.some(user => user.username === username);
    
    if (userExists) {
      showError("Користувач з таким ідентифікатором вже зареєстрований", usernameInput);
      return;
    }
    
    // Додавання нового користувача
    users.push({
      username,
      password,
      clearance,
      registrationDate: new Date().toISOString(),
      status: 'pending'
    });
    
    localStorage.setItem('scp-users', JSON.stringify(users));
    
    // Сповіщення про успішну реєстрацію
    showAlert("ЗАЯВКА НА РЕЄСТРАЦІЮ ПРИЙНЯТА | ОЧІКУЙТЕ ПІДТВЕРДЖЕННЯ");
    registerForm.classList.add('success');
    
    // Перенаправлення з затримкою
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  });

  // Функції валідації
  function validateForm(username, password, confirmPassword, clearance, terms) {
    let isValid = true;
    
    // Валідація імені користувача
    if (username.length < 5) {
      showError("Ідентифікатор повинен містити щонайменше 5 символів", usernameInput);
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      showError("Ідентифікатор може містити лише латинські літери та цифри", usernameInput);
      isValid = false;
    }
    
    // Валідація пароля
    if (password.length < 8) {
      showError("Код доступу повинен містити щонайменше 8 символів", passwordInput);
      isValid = false;
    }
    
    // Підтвердження пароля
    if (password !== confirmPassword) {
      showError("Коди доступу не співпадають", confirmPasswordInput);
      isValid = false;
    }
    
    // Рівень доступу
    if (!clearance) {
      showError("Будь ласка, оберіть рівень доступу", clearanceSelect);
      isValid = false;
    }
    
    // Умови використання
    if (!terms) {
      showError("Ви повинні прийняти Протоколи безпеки", termsCheckbox);
      isValid = false;
    }
    
    return isValid;
  }

  // Перевірка складності пароля - ВИПРАВЛЕНА ВЕРСІЯ
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = calculatePasswordStrength(password);
    
    // Оновлення індикатора
    strengthBar.style.width = `${strength.percent}%`;
    strengthBar.style.backgroundColor = strength.color;
    strengthText.textContent = strength.text;
    strengthText.style.color = strength.color;
  });

  // Нова покращена функція оцінки складності пароля
  function calculatePasswordStrength(password) {
    let strength = 0;
    let text = "Дуже слабкий";
    let color = "#ff4d4d"; // червоний
    let percent = 0;
    
    const length = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    // Оцінка за довжину
    if (length === 0) {
      return { text: "Введіть пароль", color, percent: 0 };
    } else if (length < 5) {
      strength += 1;
    } else if (length < 8) {
      strength += 2;
    } else if (length < 12) {
      strength += 3;
    } else {
      strength += 4;
    }
    
    // Оцінка за складність
    if (hasUpper) strength += 1;
    if (hasLower) strength += 1;
    if (hasNumber) strength += 1;
    if (hasSpecial) strength += 2; // Додаткові бали за спецсимволи
    
    // Визначення рівня складності
    if (strength >= 8) {
      text = "Надійний";
      color = "#2ecc71"; // зелений
      percent = 100;
    } else if (strength >= 6) {
      text = "Добрий";
      color = "#27ae60"; // світло-зелений
      percent = 75;
    } else if (strength >= 4) {
      text = "Середній";
      color = "#f39c12"; // жовтий
      percent = 50;
    } else if (strength >= 2) {
      text = "Слабкий";
      color = "#e67e22"; // помаранчевий
      percent = 25;
    } else {
      text = "Дуже слабкий";
      color = "#e74c3c"; // червоний
      percent = 10;
    }
    
    return { text, color, percent };
  }

  // Показати помилку
  function showError(message, element) {
    // Видалити попередні помилки
    const existingError = element.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
      existingError.remove();
    }
    
    // Додати нову помилку
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    element.insertAdjacentElement('afterend', errorElement);
    element.focus();
    
    // Анімація
    registerForm.classList.add('shake');
    setTimeout(() => registerForm.classList.remove('shake'), 500);
    
    // Сповіщення про порушення безпеки (10% шанс)
    if (Math.random() < 0.1) {
      showAlert("СПРОБА НЕКОРЕКТНОЇ РЕЄСТРАЦІЇ | ЗАФІКСОВАНО");
    }
  }

  // Показати сповіщення SCP
  function showAlert(message) {
    alertMessage.textContent = message;
    scpAlert.classList.add('show');
    
    setTimeout(() => {
      scpAlert.classList.remove('show');
    }, 5000);
  }

  // Випадкова тривога (5% шанс)
  if (Math.random() < 0.05) {
    const alerts = [
      "УВАГА: АКТИВОВАНО ПРОТОКОЛ 'ЧЕРВОНИЙ КОД'",
      "ЗАФІКСОВАНО СПРОБУ НЕСАНКЦІОНОВАНОГО ДОСТУПУ ДО БАЗИ ДАНИХ",
      "ПОПЕРЕДЖЕННЯ: SCP-███ ВИЙШОВ ЗІ СТАНУ СПОКОЮ"
    ];
    
    setTimeout(() => {
      showAlert(alerts[Math.floor(Math.random() * alerts.length)]);
    }, 3000);
  }
});