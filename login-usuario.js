const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      loginError.textContent = "Completá usuario y contraseña.";
      loginError.classList.add("show");
      return;
    }

    loginError.classList.remove("show");

    // TODO: acá va a ir la validación real contra el backend (Python + PostgreSQL).
    // Por ahora, cualquier usuario/contraseña completos te dejan pasar al panel.
    window.location.href = "usuario/Usuario.html";
  });
}
