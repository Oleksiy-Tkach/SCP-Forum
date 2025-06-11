// scripts/auth.js

/**
 * Перевіряє статус автентифікації користувача та оновлює інтерфейс.
 */
function checkAuthStatus() {
    const username = localStorage.getItem('username');
    const clearance = localStorage.getItem('clearance');
    const authButtons = document.getElementById('authButtons');
    const userPanel = document.getElementById('userPanel');
    const welcomeUser = document.getElementById('welcomeUser');
    const userClearance = document.getElementById('userClearance');
    const profileSummary = document.getElementById('profileSummary');
    const secretZone = document.getElementById('secretZone'); // Отримаємо елемент секретної зони

    if (username) {
        if (authButtons) authButtons.style.display = 'none';
        if (userPanel) userPanel.style.display = 'flex';
        if (welcomeUser) welcomeUser.textContent = username;
        if (userClearance) userClearance.textContent = `Рівень ${clearance}`;

        updateProfileSummary(username, clearance);

        // Перевірка рівня доступу для відображення секретної зони
        if (secretZone) {
            if (parseInt(clearance) >= 5) {
                secretZone.style.display = 'block';
            } else {
                secretZone.style.display = 'none'; // Приховуємо, якщо рівень доступу недостатній
            }
        }
    } else {
        if (authButtons) authButtons.style.display = 'block';
        if (userPanel) userPanel.style.display = 'none';
        if (secretZone) secretZone.style.display = 'none'; // Завжди приховуємо для неавторизованих
    }
}

/**
 * Оновлює короткий опис профілю в бічній панелі.
 * @param {string} username - Ім'я користувача.
 * @param {string} clearance - Рівень доступу користувача.
 */
function updateProfileSummary(username, clearance) {
    const profileSummary = document.getElementById('profileSummary');
    if (!profileSummary) return;

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

/**
 * Показує модальне вікно входу.
 */
function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'block';
    }
}

/**
 * Показує модальне вікно реєстрації.
 */
function showRegisterModal() {
    closeModal('loginModal'); // Закриваємо модальне вікно входу, якщо воно відкрите
    const registerModal = document.getElementById('registerModal');
    if (registerModal) {
        registerModal.style.display = 'block';
    }
}

/**
 * Показує модальне вікно для відновлення пароля (заглушка).
 */
function showForgotPasswordModal() {
    closeModal('loginModal');
    alert('Функція відновлення пароля ще не реалізована. Зверніться до адміністратора.');
}

/**
 * Закриває вказане модальне вікно.
 * @param {string} modalId - ID модального вікна, яке потрібно закрити.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Виконує вихід користувача із системи.
 */
function logout() {
    localStorage.clear(); // Очищаємо всі дані користувача
    window.location.reload(); // Перезавантажуємо сторінку
}

// === Логіка автентифікації (для демонстрації) ===
// У реальному проекті це були б виклики до бекенду
function authenticateUser(username, password) {
    // Приклад статичних користувачів для демонстрації
    const users = {
        "admin": { password: "admin123", clearance: "5" },
        "researcher": { password: "pass", clearance: "3" },
        "agent": { password: "secure", clearance: "4" }
    };

    if (users[username] && users[username].password === password) {
        return users[username].clearance;
    }
    return null; // Невірні облікові дані
}

function registerUser(username, email, password, clearance) {
    // В реальному застосунку тут була б логіка збереження нового користувача (наприклад, у базі даних)
    console.log(`Спроба реєстрації: ${username}, ${email}, рівень доступу: ${clearance}`);
    // Для простоти демонстрації, просто "реєструємо" та дозволяємо вхід
    return true; // Успішна реєстрація
}


// === Обробники подій для форм ===

// Обробка форми входу
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Запобігаємо стандартній відправці форми

    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');

    const username = usernameInput.value;
    const password = passwordInput.value;

    const clearance = authenticateUser(username, password);

    if (clearance) {
        localStorage.setItem('username', username);
        localStorage.setItem('clearance', clearance);
        closeModal('loginModal');
        checkAuthStatus(); // Оновлюємо інтерфейс
        alert('Вхід успішний!');
    } else {
        alert('Невірне ім\'я користувача або пароль.');
    }
});

// Обробка форми реєстрації
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Запобігаємо стандартній відправці форми

    const regUsername = document.getElementById('regUsername').value;
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;
    const regConfirmPassword = document.getElementById('regConfirmPassword').value;
    const regClearance = document.getElementById('regClearance').value;

    if (regPassword !== regConfirmPassword) {
        alert('Паролі не співпадають!');
        return;
    }

    if (registerUser(regUsername, regEmail, regPassword, regClearance)) {
        // Після "успішної" реєстрації автоматично входимо користувача
        localStorage.setItem('username', regUsername);
        localStorage.setItem('clearance', regClearance);
        closeModal('registerModal');
        checkAuthStatus(); // Оновлюємо інтерфейс
        alert('Реєстрація успішна! Ви увійшли.');
    } else {
        alert('Помилка реєстрації. Спробуйте ще раз.');
    }
});

// Додаткові функції-заглушки для викликів з HTML
function showProfile() {
    alert('Функція профілю ще не реалізована!');
}

function showMessages() {
    alert('Функція повідомлень ще не реалізована!');
}

function showRules() {
    alert('Правила форуму: дотримуйтесь чистоти мови, поважайте інших користувачів та зберігайте конфіденційність Фонду!');
}