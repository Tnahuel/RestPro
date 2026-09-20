const btnSalir = document.getElementById("btnSalir");

if (btnSalir) {
    btnSalir.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "../index.html";
    });
}