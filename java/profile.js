document.addEventListener("DOMContentLoaded", () => {
  const nicknameSpan = document.getElementById("nickname");
  const logoutButton = document.getElementById("logoutButton");

  const username = localStorage.getItem("username");

  if (username) {
    nicknameSpan.textContent = username;
  } else {
    nicknameSpan.textContent = "Гість";
  }

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("username");
    window.location.href = "login.html";
  });
});
