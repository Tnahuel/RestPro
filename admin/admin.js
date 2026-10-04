// ---------- Salir ----------
const btnSalir = document.getElementById("btnSalir");
if (btnSalir) {
  btnSalir.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../index.html";
  });
}

// ---------- Helpers ----------
function horaActual() {
  const d = new Date();
  return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
}

function agregarLog(mensajeHTML) {
  const logList = document.getElementById("logList");
  if (!logList) return;
  const li = document.createElement("li");
  li.innerHTML = `<span class="log-time">${horaActual()}</span> ${mensajeHTML}`;
  logList.prepend(li);
}

function incrementarStat(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = (parseInt(el.textContent, 10) || 0) + 1;
}

// ---------- Alta de usuarios y profesores ----------
const formAlta = document.getElementById("formAlta");
const altaRol = document.getElementById("altaRol");
const altaDetalleLabel = document.getElementById("altaDetalleLabel");
const altaDetalle = document.getElementById("altaDetalle");
const altaRecientes = document.getElementById("altaRecientes");

const rolLabels = {
  usuario: { label: "Grupo muscular inicial", placeholder: "Ej: Espalda", tag: "Usuario" },
  profesor: { label: "Especialidad", placeholder: "Ej: Hipertrofia, rehabilitación", tag: "Profesor" },
  admin: { label: "Permisos adicionales", placeholder: "Ej: Backups, reportes", tag: "Administrador" }
};

if (altaRol) {
  altaRol.addEventListener("change", () => {
    const cfg = rolLabels[altaRol.value];
    altaDetalleLabel.textContent = cfg.label;
    altaDetalle.placeholder = cfg.placeholder;
  });
}

if (formAlta) {
  formAlta.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("altaNombre").value.trim();
    const email = document.getElementById("altaEmail").value.trim();
    const pass = document.getElementById("altaPass").value.trim();
    const rolValue = altaRol.value;

    if (!nombre || !email || !pass) return;

    const cfg = rolLabels[rolValue];

    const item = document.createElement("div");
    item.className = "mini-item";
    item.innerHTML = `<span>${nombre} — ${email}</span><span class="role-badge">${cfg.tag}</span>`;
    altaRecientes.appendChild(item);

    agregarLog(`Se creó la cuenta de <b>${nombre}</b> (${cfg.tag})`);

    if (rolValue === "profesor") {
      incrementarStat("statProfesores");
    } else {
      incrementarStat("statUsuarios");
    }

    // TODO: acá va a ir el POST real al backend (Python) que crea el registro
    // en PostgreSQL (tabla Usuario, Profesor o Administrador según el rol).
    formAlta.reset();
    altaDetalleLabel.textContent = rolLabels.usuario.label;
  });
}

// ---------- Asignar turno ----------
const formTurno = document.getElementById("formTurno");
const turnosRecientes = document.getElementById("turnosRecientes");

if (formTurno) {
  formTurno.addEventListener("submit", (e) => {
    e.preventDefault();

    const alumno = document.getElementById("turnoAlumno").value;
    const profesor = document.getElementById("turnoProfesor").value;
    const fecha = document.getElementById("turnoFecha").value || "sin fecha";
    const hora = document.getElementById("turnoHora").value || "sin horario";

    const item = document.createElement("div");
    item.className = "mini-item";
    item.innerHTML = `<span>${alumno} con ${profesor}</span><span class="role-badge">${fecha} · ${hora}</span>`;
    turnosRecientes.appendChild(item);

    agregarLog(`Turno asignado: <b>${alumno}</b> con <b>${profesor}</b>, ${hora} hs`);
    incrementarStat("statTurnos");

    // TODO: acá va el POST real que crea el registro en la tabla Turno.
    formTurno.reset();
  });
}

// ---------- Macros, micros y PDF ----------
const formMacros = document.getElementById("formMacros");
const macroPdf = document.getElementById("macroPdf");
const fileLabel = document.getElementById("fileLabel");

if (macroPdf) {
  macroPdf.addEventListener("change", () => {
    fileLabel.textContent = macroPdf.files.length ? macroPdf.files[0].name : "Elegir archivo PDF";
  });
}

if (formMacros) {
  formMacros.addEventListener("submit", (e) => {
    e.preventDefault();

    const alumno = document.getElementById("macroAlumno").value;

    agregarLog(`Macros y plan actualizados para <b>${alumno}</b>`);

    // TODO: acá va el POST real que actualiza la tabla Dieta (proteína,
    // carbohidratos, grasas) y sube el PDF adjunto al storage del backend.
    formMacros.reset();
    fileLabel.textContent = "Elegir archivo PDF";
  });
}
