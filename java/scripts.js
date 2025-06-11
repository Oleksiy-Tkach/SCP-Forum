// auth.js
function checkAuthStatus() {
  const username = localStorage.getItem('username');
  const clearance = localStorage.getItem('clearance');
  const authButtons = document.getElementById('authButtons');
  const userPanel = document.getElementById('userPanel');
  const welcomeUser = document.getElementById('welcomeUser');
  const userClearance = document.getElementById('userClearance');
  const profileSummary = document.getElementById('profileSummary');

  if (username) {
    authButtons.style.display = 'none';
    userPanel.style.display = 'flex';
    welcomeUser.textContent = username;
    userClearance.textContent = `Рівень ${clearance}`;

    // Оновлення профілю в сайдбарі
    updateProfileSummary(username, clearance);

    // Перевірка доступу до секретної зони
    if (parseInt(clearance) >= 5) {
      document.getElementById('secretZone').style.display = 'block';
    }
  }
}

function updateProfileSummary(username, clearance) {
  const profileSummary = document.getElementById('profileSummary');
  profileSummary.innerHTML = `
    <div class="profile-info">
      <div class="profile-avatar">
        <i class="fas fa-user-secret"></i>
      </div>
      <div class="profile-details">
        <h5>${username}</h5>
        <p>Рівень доступу: ${clearance}</p>
        <p>Статус: Активний</p>
      </div>
    </div>
    <div class="profile-actions">
      <button class="btn btn-profile" onclick="showProfile()">Профіль</button>
      <button class="btn btn-messages" onclick="showMessages()">
        <i class="fas fa-envelope"></i>
      </button>
    </div>
  `;
}

function showLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function showRegisterModal() {
  closeModal('loginModal');
  document.getElementById('registerModal').style.display = 'block';
}

function showForgotPasswordModal() {
  closeModal('loginModal');
  // Тут буде код для модального вікна відновлення пароля
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function logout() {
  localStorage.clear();
  window.location.reload();
}

// Ініціалізація форми логіну
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  // Тут буде реальна перевірка авторизації
  // Для демонстрації просто збережемо дані
  localStorage.setItem('username', username);
  localStorage.setItem('clearance', '2'); // Приклад рівня доступу
  window.location.reload();
});

// Ініціалізація форми реєстрації
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const clearance = document.getElementById('regClearance').value;
  
  if (password !== confirmPassword) {
    alert('Паролі не співпадають!');
    return;
  }
  
  // Тут буде реальна реєстрація
  // Для демонстрації просто збережемо дані
  localStorage.setItem('username', username);
  localStorage.setItem('clearance', clearance);
  closeModal('registerModal');
  window.location.reload();
});

// search.js
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchCategory = document.getElementById('searchCategory');
  const searchClearance = document.getElementById('searchClearance');
  
  searchInput.addEventListener('input', searchSCP);
  searchCategory.addEventListener('change', searchSCP);
  searchClearance.addEventListener('change', searchSCP);
}

function expandSearch() {
  const searchBox = document.querySelector('.search-box');
  searchBox.classList.add('expanded');
}

function searchSCP() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('searchCategory').value;
  const clearance = document.getElementById('searchClearance').value;
  const searchResults = document.getElementById('searchResults');
  
  // Приклад бази даних SCP (в реальному додатку це буде API або більший масив)
  const scpDatabase = [
    { id: 'SCP-173', name: 'SCP-173', class: 'Euclid', clearance: 2, category: 'scp', 
      desc: 'Скульптура, що рухається, коли на неї ніхто не дивиться' },
    { id: 'SCP-682', name: 'SCP-682', class: 'Keter', clearance: 4, category: 'scp', 
      desc: 'Велика рептилія з надзвичайною здатністю до регенерації' },
    { id: 'SCP-999', name: 'SCP-999', class: 'Safe', clearance: 1, category: 'scp', 
      desc: 'Наймиліший серед усіх аномальних об\'єктів' },
    { id: 'MTF-Beta-7', name: 'МОГ Beta-7', clearance: 3, category: 'mtf', 
      desc: '"Maz Hatters" - спеціалізуються на SCP-173' },
    { id: 'MTF-Epsilon-11', name: 'МОГ Epsilon-11', clearance: 4, category: 'mtf', 
      desc: '"Nine-Tailed Fox" - внутрішня безпека Фундації' }
  ];

  // Фільтрація результатів
  let results = scpDatabase.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(query) || 
                        item.desc.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || item.category === category;
    const matchesClearance = clearance === 'all' || item.clearance <= parseInt(clearance);
    
    return matchesQuery && matchesCategory && matchesClearance;
  });

  // Відображення результатів
  if (results.length > 0) {
    searchResults.innerHTML = results.map(item => `
      <div class="scp-result">
        <h4><a href="${item.category}.html?id=${item.id}">${item.name}</a></h4>
        ${item.class ? `<p class="object-class">Клас: ${item.class}</p>` : ''}
        <p>${item.desc}</p>
        <div class="scp-meta">
          <span class="scp-clearance">Рівень доступу: ${item.clearance}</span>
          <a href="${item.category}.html?id=${item.id}" class="btn btn-read-more">Детальніше</a>
        </div>
      </div>
    `).join('');
  } else {
    searchResults.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>Нічого не знайдено. Спробуйте змінити параметри пошуку.</p>
      </div>
    `;
  }
}

// notifications.js
function initNotifications() {
  // Приклад сповіщень (в реальному додатку це буде з API)
  const notifications = [
    {
      icon: 'fa-info-circle',
      message: 'Ласкаво просимо на форум Фундації SCP',
      time: 'Сьогодні'
    },
    {
      icon: 'fa-exclamation-triangle',
      message: 'Оновлені протоколи безпеки для SCP-173',
      time: 'Вчора'
    }
  ];

  const notificationsList = document.getElementById('notificationsList');
  
  notificationsList.innerHTML = notifications.map(notif => `
    <div class="notification-item">
      <div class="notification-icon">
        <i class="fas ${notif.icon}"></i>
      </div>
      <div class="notification-content">
        <p>${notif.message}</p>
        <span class="notification-time">${notif.time}</span>
      </div>
    </div>
  `).join('');
}

// breach-simulator.js
function checkForRandomAlert() {
  // 15% шанс на тривогу
  if (Math.random() < 0.15) {
    const scpEvents = [
      { 
        code: 'SCP-173', 
        message: 'SCP-173 утік із камери утримання! Усі персонал повинен уникати прямого зорового контакту.',
        procedures: [
          'Не моргати при контакті з SCP-173',
          'Триматися групами не менше двох осіб',
          'Чекати інструкцій від МОГ Beta-7 ("Maz Hatters")'
        ]
      },
      { 
        code: 'SCP-106', 
        message: 'SCP-106 помічений у Секторі-19. Активовано протокол "Золота людина".',
        procedures: [
          'Уникати контакту зі стінами та підлогами',
          'Не залишатися наодинці',
          'Чекати інструкцій від МОГ Nu-7 ("Hammer Down")'
        ]
      },
      { 
        code: 'SCP-096', 
        message: 'SCP-096 активовано через несанкціоноване спостереження. Усі персонал повинен закрити очі.',
        procedures: [
          'Не дивитися на SCP-096',
          'Не переглядати жодних зображень або відео',
          'Чекати інструкцій від МОГ Epsilon-11 ("Nine-Tailed Fox")'
        ]
      }
    ];
    
    const event = scpEvents[Math.floor(Math.random() * scpEvents.length)];
    showBreachAlert(event);
  }
}

function showBreachAlert(event) {
  document.getElementById('breachCode').textContent = event.code;
  document.getElementById('breachMessage').innerHTML = `<p>${event.message}</p>`;
  
  const proceduresList = document.getElementById('breachProcedures');
  proceduresList.innerHTML = '';
  event.procedures.forEach(proc => {
    const li = document.createElement('li');
    li.textContent = proc;
    proceduresList.appendChild(li);
  });
  
  document.getElementById('breachModal').style.display = 'block';
  
  // Додаткові ефекти
  document.body.classList.add('breach-active');
  playAlertSound();
}

function acknowledgeBreach() {
  document.getElementById('breachModal').style.display = 'none';
  document.body.classList.remove('breach-active');
}

function playAlertSound() {
  // У реальному застосунку тут буде відтворення звукового сигналу
  const audio = new Audio('sounds/alert.mp3');
  audio.volume = 0.3;
  audio.play().catch(e => console.log('Audio play failed:', e));
}

// dark-mode.js
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  
  // Оновлення іконки
  const icon = document.getElementById('darkModeToggle');
  if (document.body.classList.contains('dark-mode')) {
    icon.innerHTML = '<i class="fas fa-sun"></i>';
    icon.title = 'Увімкнути світлий режим';
  } else {
    icon.innerHTML = '<i class="fas fa-moon"></i>';
    icon.title = 'Увімкнути темний режим';
  }
}

// Ініціалізація темного режиму при завантаженні
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// carousel.js
function initCarousel() {
  const items = document.querySelectorAll('.featured-item');
  let currentItem = 0;
  
  function showItem(index) {
    items.forEach(item => item.classList.remove('active'));
    items[index].classList.add('active');
    currentItem = index;
  }
  
  window.nextFeatured = function() {
    let nextIndex = currentItem + 1;
    if (nextIndex >= items.length) nextIndex = 0;
    showItem(nextIndex);
  }
  
  window.prevFeatured = function() {
    let prevIndex = currentItem - 1;
    if (prevIndex < 0) prevIndex = items.length - 1;
    showItem(prevIndex);
  }
  
  // Автоматична зміна кожні 5 секунд
  setInterval(nextFeatured, 5000);
}

// secret-zone.js
function checkO5Access() {
  const password = document.getElementById('o5Password').value;
  // Приклад пароля (в реальному додатку це буде безпечна перевірка)
  if (password === '████████') {
    document.querySelector('.zone-lock').style.display = 'none';
    document.getElementById('zoneContent').style.display = 'block';
  } else {
    alert('Невірний код доступу O5! Доступ заборонено.');
  }
}

function viewDocument(docId) {
  // Тут буде завантаження документа (в реальному додатку з API)
  const documents = {
    'pandora': {
      title: 'Проект "Pandora\'s Box"',
      clearance: 'O5',
      author: 'Dr. █████',
      date: '██/██/████',
      content: '<p>Це документ з високим рівнем секретності. Інформація доступна лише персоналу з рівнем доступу O5.</p>'
    },
    'scp001': {
      title: 'Звіт про SCP-001',
      clearance: 'O5',
      author: 'O5-█',
      date: '██/██/████',
      content: '<p>Існує кілька можливих варіантів SCP-001. Цей документ містить інформацію про один з них.</p>'
    }
  };
  
  const doc = documents[docId];
  if (doc) {
    document.getElementById('documentTitle').textContent = doc.title;
    document.getElementById('documentClearance').textContent = `Рівень доступу: ${doc.clearance}`;
    document.getElementById('documentAuthor').textContent = `Автор: ${doc.author}`;
    document.getElementById('documentDate').textContent = `Дата: ${doc.date}`;
    document.getElementById('documentContent').innerHTML = doc.content;
    document.getElementById('documentModal').style.display = 'block';
  }
}

function printDocument() {
  window.print();
}

function downloadDocument() {
  alert('Функція завантаження документа буде реалізована в майбутньому');
}

// Ініціалізація всіх компонентів при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
  // Симуляція завантаження
  setTimeout(function() {
    document.getElementById('loading-screen').style.display = 'none';
  }, 2000);
  
  // Ініціалізація компонентів
  checkAuthStatus();
  initCarousel();
  initSearch();
  initNotifications();
  checkForRandomAlert();
  
  // Відновлення темного режиму
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
  }
});