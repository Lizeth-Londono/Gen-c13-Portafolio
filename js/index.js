// Aquí se obtiene la retícula principal de la introducción.
// querySelector = busca el primer elemento que coincida con el selector indicado.
const introReticula = document.querySelector(".intro-reticula");


// Aquí se obtiene la retícula interna del emblema.
// introEmblemaReticula = contendrá las celdas que posteriormente formarán el emblema.
const introEmblemaReticula = document.querySelector(".intro-emblema-reticula");


// Aquí se define la cantidad de columnas de la retícula principal.
const columnasReticula = 14;


// Aquí se define la cantidad de filas de la retícula principal.
const filasReticula = 10;


// Aquí se calcula la cantidad total de celdas de la retícula principal.
// 14 columnas x 10 filas = 140 celdas.
const totalCeldas = columnasReticula * filasReticula;


// Aquí se define la cantidad de columnas de la retícula del emblema.
const columnasEmblema = 30;


// Aquí se define la cantidad de filas de la retícula del emblema.
const filasEmblema = 30;


// Aquí se calcula la cantidad total de celdas del emblema.
// 30 columnas x 30 filas = 900 celdas.
const totalCeldasEmblema = columnasEmblema * filasEmblema;


// Aquí se guardan diferentes grupos de símbolos.
// Los grupos permiten variar la distribución sin repetir siempre la misma secuencia.
const simbolosBase = [
    "0",
    "1",
    "3",
    "5",
    "8",
    "<",
    ">",
    "=",
    "{",
    "}",
    ";",
    "#",
    "%",
    "/",
    "//",
    "?",
    "&",
    "L",
    "X"
];


// Aquí se guardan pequeñas secuencias binarias.
// binario = combinación de ceros y unos utilizada como parte del lenguaje visual tecnológico.
const simbolosBinarios = [
    "01",
    "10",
    "101",
    "010",
    "001",
    "110",
    "1010"
];


// Aquí se guardan símbolos adicionales de código.
// Estos elementos se utilizarán con menor frecuencia para evitar saturación visual.
const simbolosCodigo = [
    "!",
    ":",
    ".",
    "_",
    "-",
    "+",
    "*",
    "[",
    "]",
    "(",
    ")"
];


// Aquí se define una distribución visual para las 140 celdas.
// Cada fila representa una fila de la retícula.
// La distribución es estática para poder validarla antes de crear animaciones.
const distribucionReticula = [

    [
        "?", "?", "3", "3", "3", "1", "//",
        "5", "8", "#", "01", "1", "&", ">"
    ],

    [
        "1", "0", "#", "1", "1", "1", "=",
        "?", "3", "3", "5", "//", "8", ";"
    ],

    [
        ";", "=", "01", "10", "3", "3", "3",
        "?", "&", "5", "1", "0", "#", "/"
    ],

    [
        "5", "5", "5", "X", "L", "01", "10",
        "101", "?", ">", "<", "=", "{", "}"
    ],

    [
        "//", "#", "%", "1", "0", "8", "3",
        "5", "&", "?", ";", "01", "10", "X"
    ],

    [
        "3", "3", "1", "1", "5", "5", "//",
        "?", "?", "#", "101", "010", "L", "="
    ],

    [
        "0", "1", "01", "10", "001", "110", "5",
        "8", "3", "#", "%", "/", "&", "?"
    ],

    [
        "{", "}", ";", "=", "<", ">", "L",
        "X", "1", "3", "5", "8", "01", "10"
    ],

    [
        "?", "#", "//", "101", "010", "001", "110",
        "3", "3", "5", "5", "&", ";", "="
    ],

    [
        "1", "0", "3", "5", "8", "<", ">",
        "=", "{", "}", "#", "%", "/", "//"
    ]

];

// Aquí se define la versión C6 del emblema en matriz 30 x 30.
// Esta validación mantiene el aro, la estrella, el eje y las formas principales.
// También conserva el núcleo central inferior.
// Finalmente agrega una base floral sencilla con dos hojas laterales.
// 0 = la celda permanece en estado normal.
// 1 = la celda forma parte de la estructura actual del emblema.
const mapaEmblemaDetallado = [

    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 1, 1, 0, 0, 1,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        1, 0, 0, 1, 1, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 1, 1, 0, 0, 1, 1,
        0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 0, 0, 1, 1, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 1, 0, 0, 0, 1, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 1, 0, 0, 0, 1, 1, 0,
        0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
        0, 1, 1, 0, 0, 0, 1, 0, 0, 0
    ],

    [
        0, 0, 0, 1, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 1, 0, 0, 0
    ],

    [
        0, 0, 1, 1, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0
    ],

    [
        0, 0, 1, 0, 0, 0, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 1, 0, 0
    ],

    [
        0, 0, 1, 0, 0, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 0, 0, 1, 0, 0
    ],

    [
        0, 0, 1, 0, 0, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 0, 0, 1, 0, 0
    ],

    [
        0, 0, 1, 0, 0, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 0, 0, 1, 0, 0
    ],

    [
        0, 0, 1, 0, 0, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 0, 0, 1, 0, 0
    ],

    [
        0, 0, 1, 0, 0, 0, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 1, 0, 0
    ],

    [
        0, 0, 1, 1, 0, 0, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 0, 0, 1, 1, 0, 0
    ],

    [
        0, 0, 0, 1, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 1, 0, 0, 0
    ],

    [
        0, 0, 0, 1, 0, 0, 0, 1, 0, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 1, 0, 0, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 1, 1, 0, 0, 1, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 1, 1, 0, 0, 1, 1,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 0, 0, 1, 1, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 1, 1, 0, 0, 1,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 1, 1, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
        1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
        0, 1, 1, 0, 0, 0, 0, 1, 1, 0,
        0, 1, 1, 0, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],

    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]

];

// Aquí se recorre la distribución completa de la retícula principal.
// flat = une todas las filas en un solo arreglo.
const simbolosDistribuidos = distribucionReticula.flat();


// Aquí se convierte el mapa detallado del emblema en un solo arreglo.
// Esto permite comparar cada posición directamente dentro del segundo for.
const celdasEmblemaDetallado = mapaEmblemaDetallado.flat();


// Aquí se recorre la cantidad total de celdas de la retícula principal.
// for = permite repetir un bloque de instrucciones varias veces.
for (let indice = 0; indice < totalCeldas; indice++) {

    // Aquí se crea una nueva celda de la retícula principal.
    const celda = document.createElement("div");

    // Aquí se agrega la clase utilizada por el CSS para dar forma a la celda.
    celda.classList.add("intro-celda");


    // Aquí se crea el elemento que contendrá el símbolo.
    const simbolo = document.createElement("span");

    // Aquí se agrega la clase utilizada por el CSS para dar estilo al símbolo.
    simbolo.classList.add("intro-simbolo");


    // Aquí se obtiene el símbolo correspondiente a la posición actual.
    const simboloActual = simbolosDistribuidos[indice];

    // Aquí se coloca el símbolo dentro del elemento span.
    simbolo.textContent = simboloActual;


    // Aquí se agrega el símbolo dentro de la celda.
    celda.appendChild(simbolo);

    // Aquí se agrega la celda dentro de la retícula principal.
    introReticula.appendChild(celda);

}


// Aquí se recorre la cantidad total de celdas necesarias para el emblema.
// Este bloque crea la matriz 30 x 30 y aplica la silueta detallada del emblema.
for (let indiceEmblema = 0; indiceEmblema < totalCeldasEmblema; indiceEmblema++) {

    // Aquí se crea una nueva celda para la retícula interna del emblema.
    const celdaEmblema = document.createElement("div");

    // Aquí se agrega la clase general de las celdas del emblema.
    celdaEmblema.classList.add("intro-emblema-celda");


    // Aquí se verifica si la posición actual pertenece a la silueta.
    if (celdasEmblemaDetallado[indiceEmblema] === 1) {

        // Aquí se activa visualmente la celda seleccionada por el mapa.
        celdaEmblema.classList.add("intro-emblema-celda-activa");

    }


    // Aquí se agrega la celda dentro de la retícula interna del emblema.
    introEmblemaReticula.appendChild(celdaEmblema);

}