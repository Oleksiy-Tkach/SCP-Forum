window.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  if (!username) {
    window.location.href = "login.html";
    return;
  }

  const nicknameEl = document.getElementById("nickname");
  const profileNicknameEl = document.getElementById("profileNickname");
  const birthDateEl = document.getElementById("birthDate");
  const avatarEl = document.getElementById("avatar");

  nicknameEl?.textContent = username;

  // Профільні дані з localStorage
  const profileNickname = localStorage.getItem("profileNickname") || username;
  const birthDate = localStorage.getItem("birthDate") || "Невідомо";
  const avatarSrc = localStorage.getItem("avatar") || "images/default-avatar.png";

  profileNicknameEl?.textContent = profileNickname;
  birthDateEl?.textContent = birthDate;
  avatarEl?.setAttribute("src", avatarSrc);

  // Налаштування
  const settingsButton = document.getElementById("settingsButton");
  const settingsBox = document.getElementById("settingsBox");
  const closeSettings = document.getElementById("closeSettings");

  settingsButton?.addEventListener("click", () => {
    settingsBox?.classList.add("active");
  });

  closeSettings?.addEventListener("click", () => {
    settingsBox?.classList.remove("active");
  });
});
