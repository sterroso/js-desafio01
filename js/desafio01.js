// Contenedor de las tablas de multiplicar.
const outputContainer = document.getElementById('outputContainer');

// Botón [ Generar Tablas ]
const execButton = document.getElementById('execButton');

// Botón [ Limpiar Tablas ]
const clearButton = document.getElementById('clearButton');

// Valores mínimo y máximo de amplitud
const MIN_AMPLITUD = -10;
const MAX_AMPLITUD = 10;

// Valores mínimo y máximi de profundidad
const MIN_PROFUNDIDAD = 0;
const MAX_PROFUNDIDAD = 10;

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

// Una función para validar los argumentos pasados para amplitud (inferior y superior)
const isValidAmplitud = input => {
    // Intenta convertir la entrada en un entero con la función parseInt
    let retval = parseInt(input);

    // Si retval no es NaN, no es nulo, es mayor o igual a MIN_AMPLITUD y es menor 
    // o igual a MAX_AMPLITUD, devuelve verdadero (y allí sale de la función)
    if (!isNaN(retval) && retval != null && retval >= MIN_AMPLITUD && retval <= MAX_AMPLITUD) return true;

    // Si llega hasta aquí es porque alguna de las condiciones anteriores no se cumplió
    return false;
}

// Una función para validad la profundidad
const isValidProfundidad = input => {
    // Intenta convertir la entrada en un entero
    let retval = parseInt(input);

    // Si retval no es NaN, no es null, es mayor o igual a MIN_PROFUNDIDAD y es menor
    // o igual a MAX_PROFUNDIDAD, devuelve verdadero (y allí sale de la función)
    if (!isNaN(retval) && retval !== null & retval >= MIN_PROFUNDIDAD && retval <= MAX_PROFUNDIDAD) return true;

    // Si llega hasta aquí es porque alguna de las condiciones anteriores no se cumplió
    return false;
}

execButton.addEventListener('click', evt => {
    // Cargar los valores de amplitud y profundidad en el objeto contenedor paramValues:

    // Primero recupero la cadena de texto que se encuentra en el campo #rangoLimiteInferior de mi página.
    let stringRangoLimiteInferior = document.getElementById('rangoLimiteInferior').value;

    // Si stringRangoLimiteInferior es válido...
    if (isValidAmplitud(stringRangoLimiteInferior)) {
        // ... se convierte a entero y el resultado se guarda en
        // la propiedad amplitudInferior del objeto paramValues.
        paramValues.amplitudInferior = parseInt(stringRangoLimiteInferior);
    } else {
        // ... de lo contrario se muestra un mensaje al usuario
        alert(`El Límite inferior de la Amplitud debe ser un entero entre ${MIN_AMPLITUD} y ${MAX_AMPLITUD} inclusive.`);
        // Termina la ejecución del escuchador del evento 'click' devolviendo un false.
        return false;
    }

    // Luego recupero la cadena de texto que se encuentra en el campo #rangoLimiteSuperior de mi página.
    let stringRangoLimiteSuperior = document.getElementById('rangoLimiteSuperior').value;

    // Si stringRangoLimiteInferior es válido...
    if (isValidAmplitud(stringRangoLimiteSuperior)) {
        // se convierte a entero y el resultado se guarda en la propiedad amplitudInferior del objeto paramValues.
        paramValues.amplitudSuperior = parseInt(stringRangoLimiteSuperior);

        // Si el valor de paramValues.amplitudSuperior es menor al valor de paramValues.amplitudInferior...
        if(paramValues.amplitudSuperior < paramValues.amplitudInferior) {
            // Notifica al usuario que el valor superior debe ser mayor al valor inferior
            alert('El valor de Límite Superior de la Amplitud debe ser mayor al valor de Límite Inferior de la Amplitud');
            // Termina la ejecución del escuchador del evento 'click' devolviendo un false.
            return false;
        }
    } else {
        // ... de lo contrario se muestra un mensaje al usuario
        alert(`El Límite superior de la Amplitud debe ser un entero entre ${MIN_AMPLITUD} y ${MAX_AMPLITUD} inclusive.`);
        // Termina la ejecución del escuchador del evento 'click' devolviendo un false.
        return false;
    }

    // Finalmente, recupero la cadena de texto que se encuentra en el campo #profundidad de mi página.
    let stringProfundidad = document.getElementById('profundidad').value;

    // Si stringProfundidad es válido ...
    if(isValidProfundidad(stringProfundidad)) {
        // ... se convierte a entero y el resultado se guarda en la propiedad
        // profundidad del objeto paramValues
        paramValues.profundidad = parseInt(stringProfundidad);
    } else {
        // ... de lo contrario se muestra un mensaje al usuario
        alert(`La profundidad debe ser un entero entre ${MIN_PROFUNDIDAD} y ${MAX_PROFUNDIDAD} inclusive.`);
        // Termina la ejecución del escuchador del evento 'click' devolviendo un false.
        return false;
    }

    // Se limpia cualquier contenido anterior del área de salida.
    limpiarSalida();

    // Se llena el área de salida con los nuevos valores de parámetros.
    multiplicar(paramValues);
});

clearButton.addEventListener('click', evt => {
    // Limpia todo el contenido del contenedor de salida.
    limpiarSalida();
});

const multiplicar = params => {
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

const limpiarSalida = () => {
    // Primero verifica que la variable outputContainer apunte a un elemento válido en el documento.
    if(outputContainer) {
        // Borra todo el contenido del elemento outputContainer.
        outputContainer.innerHTML = "";
    }
}