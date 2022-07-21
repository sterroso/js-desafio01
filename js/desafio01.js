// Contenedor de las tablas de multiplicar.
const outputContainer = document.getElementById('outputContainer');

// Botón [ Generar Tablas ]
const execButton = document.getElementById('execButton');

// Botón [ Limpiar Tablas ]
const clearButton = document.getElementById('clearButton');

// Multiplicador de cada tabla de multiplicar (0, 1, 2, ..., n)
let multiplicador = 0

// Objeto que contiene los valores de amplitud y profundidad.
const paramValues = {
    // la tabla inferior que se va a calcular.
    amplitudInferior: -10,
    // la tabla superior que se va a calcular.
    amplitudSuperior: 10,
    // el entero máximo por el que se va a multiplicar cada tabla.
    profundidad: 10
};

execButton.addEventListener('click', evt => {
    // Cargar los valores de amplitud y profundidad en el objeto contenedor paramValues:

    // paramValues.amplitudInferior: la tabla inferior que se va a calcular.
    paramValues.amplitudInferior = Number(document.getElementById('rangoLimiteInferior').value);

    // paramValues.amplitudSuperior: la tabla superior que se va a calcular.
    paramValues.amplitudSuperior = Number(document.getElementById('rangoLimiteSuperior').value);

    // paramValues.profundidad: el entero máximo por el que se va a multiplicar cada tabla.
    paramValues.profundidad = Number(document.getElementById('profundidad').value);

    // Se limpia cualquier contenido anterior del área de salida.
    limpiarSalida();

    // Se llena el área de salida con los nuevos valores de parámetros.
    multiplicar(paramValues);
});

clearButton.addEventListener('click', evt => {
    // Limpia todo el contenido del contenedor de salida.
    limpiarSalida();
});

function multiplicar(params) {
    for(let i = params.amplitudInferior; i <= params.amplitudSuperior; i++) {
        // Por cada tabla crea un div contenedor ...
        let contenedorTabla = outputContainer.appendChild(document.createElement('div'));
        // ... con la clase table-container (.table-container para css)
        contenedorTabla.classList.add('table-container')

        // Agrega un título por cada tabla
        let tituloTabla = contenedorTabla.appendChild(document.createElement('h4'));
        tituloTabla.innerHTML = `Tabla del ${i}`
        tituloTabla.classList.add('times-table-title')

        // Dentro del contenedor va el unordered list (ul) ...
        let tablaActual = contenedorTabla.appendChild(document.createElement('ul'));
        // ... con la clase 'times-table' (.times-table para css)
        tablaActual.classList.add('times-table')

        // En cada ciclo reseteamos el multiplicador a 0 (cero)
        multiplicador = 0

        // Comienza el ciclo de multiplicación de cada tabla 'n', desde 0 hasta j ...
        // n x 0 = 0, n x 1 = n, n x 2 = 2n, n x 3 = 3n, ... n x j = jn
        while (multiplicador <= paramValues.profundidad) {
            // Cada fila es un elemento li ...
            let filaActual = tablaActual.appendChild(document.createElement('li'));
            // ... con la clase 'times-row' (.times-row para css)
            filaActual.classList.add('times-row')

            // El contenido del elemento li es el texto n x 0 = 0, n x 1 = n, 
            // n x 2 = 2n, n x 3 = 3n, ... n x j = jn, donde j = profundidad
            filaActual.innerHTML = `${i} &times; ${multiplicador} &equals; ${i*multiplicador}`;

            // Incrementamos el valor del multiplicador por 1 (uno)
            multiplicador += 1;
        }
    }
}

function limpiarSalida() {
    // Primero verifica que la variable outputContainer apunte a un elemento válido en el documento.
    if(outputContainer) {
        // Borra todo el contenido del elemento outputContainer.
        outputContainer.innerHTML = "";
    }
}