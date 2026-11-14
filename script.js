const casos = [
  {
    pregunta: "Paciente con fiebre, tos y disnea. ¿Cuál es la primera prueba a solicitar?",
    opciones: ["Radiografía de tórax", "Hemograma completo", "PCR de SARS-CoV-2", "Ecografía abdominal"],
    correcta: 0
  },
  {
    pregunta: "Mujer de 30 años con dolor abdominal en fosa ilíaca derecha y fiebre. ¿Diagnóstico más probable?",
    opciones: ["Apendicitis aguda", "Gastroenteritis", "Cólico renal", "Enfermedad inflamatoria pélvica"],
    correcta: 0
  },
  {
    pregunta: "Hombre de 65 años con dolor torácico opresivo y sudoración. ¿Primera acción?",
    opciones: ["Realizar ECG", "Administrar analgésico", "Solicitar troponinas", "Dar de alta"],
    correcta: 0
  }
];

let indice = 0;
let aciertos = 0;
let respondido = false;

const preguntaEl = document.getElementById("pregunta");
const opcionesEl = document.getElementById("opciones");
const feedbackEl = document.getElementById("feedback");
const siguienteBtn = document.getElementById("siguiente");
const progresoEl = document.getElementById("progreso");
const puntajeEl = document.getElementById("puntaje");

function cargarPregunta() {
  respondido = false;
  feedbackEl.textContent = "";
  siguienteBtn.disabled = true;
  opcionesEl.innerHTML = "";

  const caso = casos[indice];
  preguntaEl.textContent = caso.pregunta;
  progresoEl.textContent = `Pregunta ${indice + 1} de ${casos.length}`;

  caso.opciones.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.addEventListener("click", () => seleccionar(i, btn));
    opcionesEl.appendChild(btn);
  });
}

function seleccionar(i, btn) {
  if (respondido) return;
  respondido = true;
  const caso = casos[indice];
  const botones = opcionesEl.querySelectorAll("button");

  botones.forEach((b, idx) => {
    b.disabled = true;
    if (idx === caso.correcta) b.classList.add("correcta");
    else if (idx === i) b.classList.add("incorrecta");
  });

  if (i === caso.correcta) {
    aciertos++;
    feedbackEl.textContent = "✅ ¡Correcto!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = `❌ Incorrecto. La respuesta correcta era: ${caso.opciones[caso.correcta]}`;
    feedbackEl.style.color = "red";
  }

  puntajeEl.textContent = `Aciertos: ${aciertos}`;
  siguienteBtn.disabled = false;
}

siguienteBtn.addEventListener("click", () => {
  indice++;
  if (indice < casos.length) {
    cargarPregunta();
  } else {
    preguntaEl.textContent = "¡Terminaste!";
    opcionesEl.innerHTML = "";
    feedbackEl.textContent = `Obtuviste ${aciertos} de ${casos.length} aciertos.`;
    progresoEl.textContent = "";
    siguienteBtn.disabled = true;
  }
});

cargarPregunta();
