const roleButtons = document.querySelectorAll(".role-btn");
const loginTag = document.getElementById("loginTag");
const loginTitle = document.getElementById("loginTitle");
const loginSub = document.getElementById("loginSub");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

let selectedRole = "profesor";

const roleCopy = {
  profesor: {
    tag: "PROFESOR",
    sub: "Gestioná tus alumnos, horarios y rutinas.",
    redirect: "profesor/Profesor.html"
  },
  admin: {
    tag: "ADMINISTRADOR",
    sub: "Gestioná usuarios, profesores, turnos y planes nutricionales.",
    redirect: "admin/Admin.html"
  }
};

roleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    roleButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedRole = btn.dataset.role;

    const copy = roleCopy[selectedRole];
    loginTag.textContent = copy.tag;
    loginSub.textContent = copy.sub;
  });
});

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

    // TODO: acá va a ir la validación real contra el backend (Python + PostgreSQL),
    // que además debería confirmar que el rol ingresado coincide con el de la cuenta.
    window.location.href = roleCopy[selectedRole].redirect;
  });
}
