// Arreglos para almacenar nombres y notas de los estudiantes
let nombres = [];
let notas = [];

// Obtener elementos del DOM
const formulario = document.getElementById("formulario");
const agregarEstudianteBtn = document.getElementById("agregarEstudiante");
const limpiarListaBtn = document.getElementById("limpiarLista");
const calcularResultadosBtn = document.getElementById("calcularResultados");
const eliminarUltimoEstudianteBtn = document.getElementById("eliminarUltimoEstudiante");
const resultadosDiv = document.getElementById("resultados");
const estudiantesIngresadosOl = document.getElementById("estudiantesIngresados");

// Evento click del botón "Agregar Estudiante"
agregarEstudianteBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Obtener nombre y nota del estudiante del formulario
  const nombreEstudiante = document.getElementById("nombreEstudiante").value;
  const notaEstudiante = parseFloat(document.getElementById("notaEstudiante").value);

  // Agregar nombre y nota a los arreglos
  nombres.push(nombreEstudiante);
  notas.push(notaEstudiante);

  // Crear elemento <li> para mostrar el estudiante ingresado
  const nuevoEstudianteLi = document.createElement("li");
  nuevoEstudianteLi.textContent = `${nombreEstudiante}: ${notaEstudiante}`;
  estudiantesIngresadosOl.appendChild(nuevoEstudianteLi);

  // Limpiar campos del formulario
  document.getElementById("nombreEstudiante").value = "";
  document.getElementById("notaEstudiante").value = "";
});

// Evento click del botón "Limpiar Lista"
limpiarListaBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Reiniciar los arreglos y vaciar la lista de estudiantes ingresados
  nombres = [];
  notas = [];
  estudiantesIngresadosOl.innerHTML = "";

  // Limpiar campos del formulario
  document.getElementById("nombreEstudiante").value = "";
  document.getElementById("notaEstudiante").value = "";

  // Limpiar los resultados
  resultadosDiv.innerHTML = "";
});

// Evento click del botón "Calcular Resultados"
calcularResultadosBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Verificar si se ha ingresado al menos un estudiante
  if (nombres.length === 0) {
    alert("No se ha ingresado ningún estudiante.");
    return;
  }

  // Calcular los resultados
  const promedioGeneral = calcularPromedioGeneral();
  const porcentajeDesaprobados = calcularPorcentajeDesaprobados();
  const porcentajeAprobados = calcularPorcentajeAprobados();
  const porcentajePromocionados = calcularPorcentajePromocionados();

  // Mostrar los resultados en el elemento resultadosDiv
  resultadosDiv.innerHTML = `
    <p>Promedio general: ${promedioGeneral.toFixed(2)}</p>
    <p>Porcentaje de desaprobados: ${porcentajeDesaprobados.toFixed(2)}%</p>
    <p>Porcentaje de aprobados: ${porcentajeAprobados.toFixed(2)}%</p>
    <p>Porcentaje de promocionados: ${porcentajePromocionados.toFixed(2)}%</p>
  `;
});

// Evento click del botón "Eliminar Último Estudiante"
eliminarUltimoEstudianteBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Verificar si hay estudiantes para eliminar
  if (nombres.length === 0) {
    alert("No hay estudiantes para eliminar.");
    return;
  }

  // Eliminar el último estudiante ingresado
  nombres.pop();
  notas.pop();

  // Eliminar el último <li> de la lista de estudiantes ingresados
  const listaEstudiantes = document.getElementById("estudiantesIngresados");
  listaEstudiantes.removeChild(listaEstudiantes.lastChild);
});

// Función para calcular el promedio general
function calcularPromedioGeneral() {
  let total = 0;
  for (let i = 0; i < notas.length; i++) {
    total += notas[i];
  }
  return total / notas.length;
}

// Función para calcular el porcentaje de desaprobados
function calcularPorcentajeDesaprobados() {
  let contadorDesaprobados = 0;
  for (let i = 0; i < notas.length; i++) {
    if (notas[i] < 4) {
      contadorDesaprobados++;
    }
  }
  return (contadorDesaprobados / notas.length) * 100;
}

// Función para calcular el porcentaje de aprobados
function calcularPorcentajeAprobados() {
  let contadorAprobados = 0;
  for (let i = 0; i < notas.length; i++) {
    if (notas[i] >= 4 && notas[i] <= 10) {
      contadorAprobados++;
    }
  }
  return (contadorAprobados / notas.length) * 100;
}

// Función para calcular el porcentaje de promocionados
function calcularPorcentajePromocionados() {
  let contadorPromocionados = 0;
  for (let i = 0; i < notas.length; i++) {
    if (notas[i] >= 7 && notas[i] <= 10) {
      contadorPromocionados++;
    }
  }
  return (contadorPromocionados / notas.length) * 100;
}
