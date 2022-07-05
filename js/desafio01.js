// Contenedor de las tablas de multiplicar.
const outputContainer = document.getElementById('outputContainer');

// Botón [ Generar Tablas ]
const execButton = document.getElementById('execButton');

// Botón [ Limpiar Tablas ]
const clearButton = document.getElementById('clearButton');

// Objeto que contiene los valores de amplitud y profundidad.
const paramValues = {
    amplitudInferior: -10,
    amplitudSuperior: 10,
    profundidad: 10
};

execButton.addEventListener('click', evt => {
    // Volver a cargar los valores de amplitud y profundidad.
    paramValues.amplitudInferior = Number(document.getElementById('rangoLimiteInferior').value);
    paramValues.amplitudSuperior = Number(document.getElementById('rangoLimiteSuperior').value);
    paramValues.profundidad = Number(document.getElementById('profundidad').value);
    limpiarSalida();
    multiplicar(paramValues);
});

clearButton.addEventListener('click', evt => {
    limpiarSalida();
});

function multiplicar(params) {
    for(let i = params.amplitudInferior; i <= params.amplitudSuperior; i++) {
        let tablaActual = outputContainer.appendChild(document.createElement('ul'));
        for(let j = 0; j <= params.profundidad; j++) {
            filaActual = tablaActual.appendChild(document.createElement('li'));
            filaActual.innerHTML = `${i} &times; ${j} &equals; ${i*j}`;
        }
    }
}

function limpiarSalida() {
    if(outputContainer) {
        outputContainer.innerHTML = "";
    }
}