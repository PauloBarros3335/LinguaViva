// Utilitários de autenticação
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(logout, 3600000); // 1 hora
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

function setupInactivityListener() {
  window.addEventListener("mousemove", resetInactivityTimer);
  window.addEventListener("keypress", resetInactivityTimer);
  window.addEventListener("scroll", resetInactivityTimer);
  window.addEventListener("click", resetInactivityTimer);

  resetInactivityTimer();
}

function verificarAutenticacao() {
  if (
    !localStorage.getItem("loggedIn") &&
    !window.location.pathname.endsWith("index.html")
  ) {
    window.location.href = "index.html";
  }
}

// Login simples para fins didáticos
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.endsWith("index.html")) {
    document
      .getElementById("loginForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Credenciais fixas para fins didáticos
        if (username === "admin" && password === "admin123") {
          localStorage.setItem("loggedIn", "true");
          window.location.href = "landing.html";
        } else {
          alert("Usuário ou senha incorretos!");
        }
      });
  } else {
    verificarAutenticacao();
    setupInactivityListener();
  }
});
