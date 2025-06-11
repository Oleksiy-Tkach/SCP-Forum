document.addEventListener('DOMContentLoaded', function() {
  // Елементи форми
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.querySelector('.toggle-password');
  const rememberCheckbox = document.getElementById('remember');
  const securityLevel = document.getElementById('securityLevel');
  const levelText = document.getElementById('levelText');
  const scpAlert = document.getElementById('scpAlert');
  const alertMessage = document.getElementById('alertMessage');

  // Ініціалізація рівня безпеки
  let security = 0;
  const securityInterval = setInterval(() => {
    security = Math.min(security + Math.random() * 10, 100);
    securityLevel.style.width = `${security}%`;
    
    // Оновлення текстового відображення
    if (security < 30) {
      levelText.textContent = "НИЗЬКИЙ";
      levelText.style.color = "#2ecc71";
    } else if (security < 70) {
      levelText.textContent = "СЕРЕДНІЙ";
      levelText.style.color = "#f39c12";
    } else {
      levelText.textContent = "ВИСОКИЙ";
      levelText.style.color = "#e74c3c";
    }
  }, 100);

  // Перемикання видимості пароля
  togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  });

  // Перевірка збережених даних
  const savedUsername = localStorage.getItem('scp-remember-username');
  const savedPassword = localStorage.getItem('scp-remember-password');
  
  if (savedUsername && savedPassword) {
    usernameInput.value = savedUsername;
    passwordInput.value = savedPassword;
    rememberCheckbox.checked = true;
  }

  // Обробка події відправки форми
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    // Валідація даних
    if (!username || !password) {
      showError("Будь ласка, заповніть всі поля");
      loginForm.classList.add('shake');
      setTimeout(() => loginForm.classList.remove('shake'), 500);
      return;
    }
    
    // Перевірка користувача в localStorage
    const users = JSON.parse(localStorage.getItem('scp-users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Збереження даних для запам'ятовування
      if (remember) {
        localStorage.setItem('scp-remember-username', username);
        localStorage.setItem('scp-remember-password', password);
      } else {
        localStorage.removeItem('scp-remember-username');
        localStorage.removeItem('scp-remember-password');
      }
      
      // Збереження сесії
      localStorage.setItem('scp-auth-token', generateToken());
      localStorage.setItem('scp-username', username);
      localStorage.setItem('scp-clearance', user.clearance || '1');
      
      // Перенаправлення з анімацією
      loginForm.classList.add('success');
      showAlert("ДОСТУП НАДАНО | Рівень " + (user.clearance || '1'));
      
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1500);
    } else {
      showError("Невірний ідентифікатор або код доступу");
      loginForm.classList.add('shake');
      setTimeout(() => loginForm.classList.remove('shake'), 500);
      
      // Сповіщення про порушення безпеки
      if (Math.random() > 0.7) {
        showAlert("СПРОБА НЕСАНКЦІОНОВАНОГО ДОСТУПУ | ЗАФІКСОВАНО");
      }
    }
  });

  // Генератор токенів
  function generateToken() {
    return 'SCP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Показати помилку
  function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    const existingError = document.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    loginForm.appendChild(errorElement);
    setTimeout(() => errorElement.remove(), 3000);
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
      "ПОРУШЕННЯ УТРИМАННЯ: SCP-173 | УСІМ ЗАЛИШИТИСЬ НА МІСЦЯХ",
      "АКТИВАЦІЯ SCP-096 | УСІМ ЗАКРИТИ ОЧІ",
      "ПРОТОКОЛ 'ЗОЛОТА ЛЮДИНА' АКТИВОВАНО | SCP-106 ВИЯВЛЕНО"
    ];
    
    setTimeout(() => {
      showAlert(alerts[Math.floor(Math.random() * alerts.length)]);
    }, 3000);
  }
});