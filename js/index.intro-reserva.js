// Aquí se obtiene la retícula principal de la introducción.
// querySelector = busca el primer elemento que coincida con el selector indicado.
// const = crea una variable que no será reasignada.
// introReticula = nombre de la variable utilizada para guardar este dato o referencia.
// ".intro-reticula" = selector utilizado para identificar el elemento dentro del documento.
const introReticula = document.querySelector(".intro-reticula");


// Aquí se obtiene la retícula interna del emblema.
// introEmblemaReticula = contendrá las celdas que posteriormente formarán el emblema.
// querySelector = busca el primer elemento que coincide con el selector.
// ".intro-emblema-reticula" = selector utilizado para identificar el elemento dentro del documento.
const introEmblemaReticula = document.querySelector(".intro-emblema-reticula");


// Aquí se define la cantidad de columnas de la retícula principal.
// const = crea una variable que no será reasignada.
// columnasReticula = nombre de la variable utilizada para guardar este dato o referencia.
const columnasReticula = 14;


// Aquí se define la cantidad de filas de la retícula principal.
// filasReticula = nombre de la variable utilizada para guardar este dato o referencia.
const filasReticula = 10;


// Aquí se calcula la cantidad total de celdas de la retícula principal.
// 14 columnas x 10 filas = 140 celdas.
// const = crea una variable que no será reasignada.
// totalCeldas = nombre de la variable utilizada para guardar este dato o referencia.
const totalCeldas = columnasReticula * filasReticula;


// Aquí se define la cantidad de columnas de la retícula del emblema.
// columnasEmblema = nombre de la variable utilizada para guardar este dato o referencia.
const columnasEmblema = 30;


// Aquí se define la cantidad de filas de la retícula del emblema.
// const = crea una variable que no será reasignada.
// filasEmblema = nombre de la variable utilizada para guardar este dato o referencia.
const filasEmblema = 30;


// Aquí se calcula la cantidad total de celdas del emblema.
// 30 columnas x 30 filas = 900 celdas.
// totalCeldasEmblema = nombre de la variable utilizada para guardar este dato o referencia.
const totalCeldasEmblema = columnasEmblema * filasEmblema;


// Aquí se guardan diferentes grupos de símbolos.
// Los grupos permiten variar la distribución sin repetir siempre la misma secuencia.
// const = crea una variable que no será reasignada.
// simbolosBase = nombre de la variable utilizada para guardar este dato o referencia.
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
// const = crea una variable que no será reasignada.
// simbolosBinarios = nombre de la variable utilizada para guardar este dato o referencia.
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
// const = crea una variable que no será reasignada.
// simbolosCodigo = nombre de la variable utilizada para guardar este dato o referencia.
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
// const = crea una variable que no será reasignada.
// distribucionReticula = nombre de la variable utilizada para guardar este dato o referencia.
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
// const = crea una variable que no será reasignada.
// mapaEmblemaDetallado = nombre de la variable utilizada para guardar este dato o referencia.
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
// const = crea una variable que no será reasignada.
// simbolosDistribuidos = nombre de la variable utilizada para guardar este dato o referencia.
const simbolosDistribuidos = distribucionReticula.flat();


// Aquí se convierte el mapa detallado del emblema en un solo arreglo.
// Esto permite comparar cada posición directamente dentro del segundo for.
// celdasEmblemaDetallado = nombre de la variable utilizada para guardar este dato o referencia.
const celdasEmblemaDetallado = mapaEmblemaDetallado.flat();


// Aquí se recorre la cantidad total de celdas de la retícula principal.
// for = permite repetir un bloque de instrucciones varias veces.
for (let indice = 0; indice < totalCeldas; indice++) {

    // Aquí se crea una nueva celda de la retícula principal.
    // const = crea una variable que no será reasignada.
    // celda = nombre de la variable utilizada para guardar este dato o referencia.
    // createElement = crea un nuevo elemento HTML desde JavaScript.
    // createElement = crea un nuevo elemento HTML desde JavaScript.
    const celda = document.createElement("div");

    // Aquí se agrega la clase utilizada por el CSS para dar forma a la celda.
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    celda.classList.add("intro-celda");


    // Aquí se crea el elemento que contendrá el símbolo.
    // const = crea una variable que no será reasignada.
    // simbolo = nombre de la variable utilizada para guardar este dato o referencia.
    // createElement = crea un nuevo elemento HTML desde JavaScript.
    // createElement = crea un nuevo elemento HTML desde JavaScript.
    const simbolo = document.createElement("span");

    // Aquí se agrega la clase utilizada por el CSS para dar estilo al símbolo.
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    simbolo.classList.add("intro-simbolo");


    // Aquí se obtiene el símbolo correspondiente a la posición actual.
    // const = crea una variable que no será reasignada.
    // simboloActual = nombre de la variable utilizada para guardar este dato o referencia.
    const simboloActual = simbolosDistribuidos[indice];

    // Aquí se coloca el símbolo dentro del elemento span.
    simbolo.textContent = simboloActual;


    // Aquí se agrega el símbolo dentro de la celda.
    // appendChild = agrega un nodo como hijo de otro elemento.
    celda.appendChild(simbolo);

    // Aquí se agrega la celda dentro de la retícula principal.
    introReticula.appendChild(celda);

}


// ========================================
// PREPARACIÓN DEL CAMPO AMPLIO DE CARACTERES
// ========================================

// Aquí se prepara una variación controlada para cada carácter.
// La posición, profundidad y retraso dependen de la fila y la columna para evitar random puro.
// function = crea un bloque reutilizable de instrucciones.
// prepararCampoCaracteres = nombre de la función que agrupa esta parte del proceso.
function prepararCampoCaracteres() {

    // Aquí se obtienen todas las celdas creadas dentro de la retícula principal.
    // const = crea una variable que no será reasignada.
    // celdasIntro = nombre de la variable utilizada para guardar este dato o referencia.
    // querySelector = busca el primer elemento que coincide con el selector.
    // querySelectorAll = busca todos los elementos que coinciden con el selector.
    // ".intro-celda" = selector utilizado para identificar el elemento dentro del documento.
    const celdasIntro = introReticula.querySelectorAll(".intro-celda");

    celdasIntro.forEach((celda, indice) => {

        // Aquí se calcula la fila actual dentro de la matriz 14 x 10.
        // const = crea una variable que no será reasignada.
        // fila = nombre de la variable utilizada para guardar este dato o referencia.
        const fila = Math.floor(indice / columnasReticula);

        // Aquí se calcula la columna actual dentro de la matriz.
        // columna = nombre de la variable utilizada para guardar este dato o referencia.
        const columna = indice % columnasReticula;

        // Aquí se obtiene la distancia aproximada respecto al centro de la matriz.
        // const = crea una variable que no será reasignada.
        // distanciaX = nombre de la variable utilizada para guardar este dato o referencia.
        const distanciaX = columna - ((columnasReticula - 1) / 2);
        // distanciaY = nombre de la variable utilizada para guardar este dato o referencia.
        const distanciaY = fila - ((filasReticula - 1) / 2);

        // Aquí se crea una onda reproducible que dará profundidad a cada carácter.
        // profundidad = distancia simulada de la celda dentro del espacio 3D.
        const profundidad = Math.sin((fila + 1) * 0.9 + columna * 0.62) * 68;

        // Aquí se calcula un desplazamiento inicial pequeño para que el campo aparezca de forma orgánica.
        // const = crea una variable que no será reasignada.
        // desplazamientoX = nombre de la variable utilizada para guardar este dato o referencia.
        const desplazamientoX = distanciaX * 2.8 + Math.cos((indice + 3) * 0.45) * 9;
        // desplazamientoY = nombre de la variable utilizada para guardar este dato o referencia.
        const desplazamientoY = distanciaY * 2.4 + Math.sin((indice + 5) * 0.38) * 8;

        // Aquí se calcula un retraso progresivo basado en fila y columna.
        // retardo = nombre de la variable utilizada para guardar este dato o referencia.
        const retardo = 0.48 + (fila * 0.045) + (columna * 0.026);

        // Aquí se crea una duración ligeramente diferente sin utilizar números aleatorios.
        // const = crea una variable que no será reasignada.
        // duracion = nombre de la variable utilizada para guardar este dato o referencia.
        const duracion = 1.28 + ((indice % 5) * 0.08);

        // Aquí se define una opacidad controlada para evitar saturación visual.
        // opacidad = nombre de la variable utilizada para guardar este dato o referencia.
        const opacidad = 0.48 + ((indice % 4) * 0.1);

        // Aquí se guarda cada valor para que CSS realice la animación.
        // style = permite modificar estilos CSS directamente desde JavaScript.
        celda.style.setProperty("--intro-x-inicial", `${desplazamientoX.toFixed(2)}px`);
        celda.style.setProperty("--intro-y-inicial", `${desplazamientoY.toFixed(2)}px`);
        celda.style.setProperty("--intro-z-inicial", `${(profundidad - 95).toFixed(2)}px`);
        celda.style.setProperty("--intro-z-final", `${profundidad.toFixed(2)}px`);
        celda.style.setProperty("--intro-retardo", `${retardo.toFixed(3)}s`);
        celda.style.setProperty("--intro-duracion", `${duracion.toFixed(2)}s`);
        celda.style.setProperty("--intro-opacidad", opacidad.toFixed(2));
        celda.style.setProperty("--intro-escala-inicial", "0.72");

    });

}


// Aquí se espera un fotograma para preparar el campo después de crear las 140 celdas.
// requestAnimationFrame = ejecuta esta preparación una sola vez antes del siguiente repintado.
requestAnimationFrame(prepararCampoCaracteres);




// ========================================
// LOGO LIHEN PIXEL CODE - DESTINO MODULAR
// ========================================

// Aquí se define la resolución lógica del logo LIHEN.
// La matriz permanece igual aunque cambie el tamaño físico en pantalla.
// const = crea una variable que no será reasignada.
// lihenLogoFilas = nombre de la variable utilizada para guardar este dato o referencia.
const lihenLogoFilas = 72;
// lihenLogoColumnas = nombre de la variable utilizada para guardar este dato o referencia.
const lihenLogoColumnas = 72;


// Aquí se conserva la silueta del logo mediante una matriz lógica.
// 0 = espacio vacío.
// 1 = celda verde.
// 2 = celda púrpura.
// const = crea una variable que no será reasignada.
// lihenLogoMap = nombre de la variable utilizada para guardar este dato o referencia.
const lihenLogoMap = [
    "000000000000000000000000000000011122221221110000000000000000000000000000",
    "000000000000000000000000002222211122222221112222000000000000000000000000",
    "000000000000000000000000222221111000220001112222210000000000000000000000",
    "000000000000000000000022112222000000222000000221211220000000000000000000",
    "000000000000000000000022110000000000222000000000011222000000000000000000",
    "000000000000000000022222110000000000212000000000012222120000000000000000",
    "000000000000000000112222000000000000111000000000000222211000000000000000",
    "000000000000000022112000000000000001111200000000000002211220000000000000",
    "000000000000000222200000000000000001112200000000000000002222000000000000",
    "000000000000002222000000000000000111212211000000000000000222200000000000",
    "000000000000021220000000000000000111212211000000000000000222120000000000",
    "000000000000211120000000000000002222212222000000000000000021112000000000",
    "000000000002221000001000000012222222222222222200000001100001122200000000",
    "000000000022220000221000000012211122221221112210000001122000222220000000",
    "000000000222220000221200000012221122221221222200000002222000022220000000",
    "000000000211000000222200000000021112211111200000000002222000002112000000",
    "000000002211000001121200000000000112212211000000000022221100000112200000",
    "000000022210000001122120000000000112222211000000000022221100000022200000",
    "000000022220000001122120000000000102222201000000000222221100000022220000",
    "000000021100000001122222000000000002212000000000000222221100000001120000",
    "000002211100000001122222200000000000222000000000002222221000000001122000",
    "000002211000000001122222220000000000222000000000022222221100000001222200",
    "000022212000000000122222222200000000111000000002222222211000000000222200",
    "000022120000000000222222222120000000110000000021222222212000000000021220",
    "000022200000000000021222222112000000000000000211222222110000000000002220",
    "000022000000000000011222222221100000000000001212222221110000000000002120",
    "000112000000000000001122222221210000000000011222222211100000000000001111",
    "000111100000011000000112222222211000000001112222222211000001100000001111",
    "000111000000011100000111222222221100000001222222221111000001110000001111",
    "000110000001112110000001122222222110000011222222211100000011211000000112",
    "000120000001122111000000112222222220000122222222111000000112211100000022",
    "000110000000112100000000111222222221000112222222110000000001110000000022",
    "000110000000011101100000011222222212101122222221110000011001110000000012",
    "000120000000011001100000001122222222101122222221100000011100100000000022",
    "000120000001100111111000001122222222101122222211100001112110011100000022",
    "000120000001110112211100000122222222101122222220000011122111011100000221",
    "000120000000000001110000000021222222101122222220000000011100000000000011",
    "000120000000000001100000000021222222202122222200000000011100000000000011",
    "001120000000011000000000000021222222000222222100000000001001110000000021",
    "000111000000011100000000000021222220000222222220000000000001110000000111",
    "000111000000011122000000000222222222000022222220000000000221110000001111",
    "000111000000011222220000000222222200000022222212000000022222110000001111",
    "000022000000012222122200000222222200000002222212000002222222120000002110",
    "000022200000022222222100000122222000000000222212000021222222120000002220",
    "000022120000022222222212000222222000000000222212000222222222120000021220",
    "000022120000022222222222200222222000000000222212022222222222220000021220",
    "000002222000002122222222220211220000000000022110022222222221100000222200",
    "000002211000001122222222222011220000000000021110222222222221100000122000",
    "000000211000001112222222222211110000010000011102222222222211100001120000",
    "000000211100000112222222222211110000110000111121222222222211000001110000",
    "000000021100000111222222222222112000222000111212222222222111000002220000",
    "000000022210000011122222222222212002222200212222222222221110000022220000",
    "000000002220000001112222222222222202212202222222222222211100000022200000",
    "000000002222000000112222222222222221111122222222222222111000002222000000",
    "000000000221100000111212222222222211111112222222222221110000001222000000",
    "000000000021100011100111122222222211111112222222221111001110001220000000",
    "000000000002120011111111112222222211111122222222211110011110021100000000",
    "000000000000222202211111111102222221111122222221111111112202212000000000",
    "000000000000222222211111111111222221111102222111111111112222222000000000",
    "000000000000222211221111111111122221111222221111111111122112222000000000",
    "000000000000002111222111111111122222111222211111111111222112200000000000",
    "000000000000000011212121111111112222111222211111111122212110000000000000",
    "000000000000000000110012111111111222212221111111112200011000000000000000",
    "000000000000000000000000021211211122222221111111120000000000000000000000",
    "000000000000000000000000022222211222222222112222200000000000000000000000",
    "000000000000000000000000000000000222222222200000000000000000000000000000",
    "000000000000000000000000000000002222111222000000000000000000000000000000",
    "000000000000000000000000000000002221111122000000000000000000000000000000",
    "000000000000000000000000000000000221111122000000000000000000000000000000",
    "000000000000000000000000000000000001121000000000000000000000000000000000",
    "000000000000000000000000000000000000120000000000000000000000000000000000",
    "000000000000000000000000000000000000110000000000000000000000000000000000"
];


// Aquí se guarda la lista cerrada de símbolos permitidos dentro del logo.
// const = crea una variable que no será reasignada.
// lihenLogoSimbolosSimples = nombre de la variable utilizada para guardar este dato o referencia.
const lihenLogoSimbolosSimples = [
    "0", "1", "3", "5", "8",
    "<", ">", "=",
    "{", "}", ";",
    "#", "%",
    "/", "//",
    "?", "&",
    "L", "X"
];


// Aquí se guardan los fragmentos binarios permitidos.
// const = crea una variable que no será reasignada.
// lihenLogoSimbolosBinarios = nombre de la variable utilizada para guardar este dato o referencia.
const lihenLogoSimbolosBinarios = [
    "01", "10", "101", "010", "001", "110", "1010"
];


// Aquí se guardan los colores de texto utilizados sobre celdas verdes.
// lihenLogoColoresTextoVerde = nombre de la variable utilizada para guardar este dato o referencia.
const lihenLogoColoresTextoVerde = [
    "#17E8C3",
    "#59F2DB",
    "#D5FFF6"
];


// Aquí se guardan los colores de texto utilizados sobre celdas púrpura.
// const = crea una variable que no será reasignada.
// lihenLogoColoresTextoPurpura = nombre de la variable utilizada para guardar este dato o referencia.
const lihenLogoColoresTextoPurpura = [
    "#D58BFF",
    "#F2B9FF",
    "#FFD8A8",
    "#D9CAE8"
];


// Aquí se obtiene el contenedor donde se construirá el logo.
// const = crea una variable que no será reasignada.
// lihenPixelCodeLogo = nombre de la variable utilizada para guardar este dato o referencia.
// querySelector = busca el primer elemento que coincide con el selector.
// "#pixel-code-logo" = selector utilizado para identificar el elemento dentro del documento.
const lihenPixelCodeLogo = document.querySelector("#pixel-code-logo");

// Aquí se obtiene el contenedor visible del logo para detectar cuándo termina su revelación.
// lihenLogoWrapper = nombre de la variable utilizada para guardar este dato o referencia.
// ".intro-logo-code-wrapper" = selector utilizado para identificar el elemento dentro del documento.
const lihenLogoWrapper = document.querySelector(".intro-logo-code-wrapper");


// Aquí se genera un número estable a partir de fila y columna.
// hash = valor reproducible utilizado para evitar random puro.
// function = crea un bloque reutilizable de instrucciones.
// crearHashLogoLihen = nombre de la función que agrupa esta parte del proceso.
// fila, columna, semilla = 0 = dato o datos que recibe la función para poder trabajar.
function crearHashLogoLihen(fila, columna, semilla = 0) {

    let valor =
        Math.imul(fila + 1, 0x9e3779b1) ^
        Math.imul(columna + 1, 0x85ebca6b) ^
        Math.imul(semilla + 1, 0xc2b2ae35);

    valor ^= valor >>> 16;
    valor = Math.imul(valor, 0x7feb352d);
    valor ^= valor >>> 15;
    valor = Math.imul(valor, 0x846ca68b);
    valor ^= valor >>> 16;

    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return valor >>> 0;

}


// Aquí se selecciona un elemento de una lista de forma reproducible.
// function = crea un bloque reutilizable de instrucciones.
// elegirElementoLogoLihen = nombre de la función que agrupa esta parte del proceso.
// lista, semilla = dato o datos que recibe la función para poder trabajar.
function elegirElementoLogoLihen(lista, semilla) {

    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return lista[semilla % lista.length];

}


// Aquí se selecciona el símbolo que tendrá cada celda visible.
// function = crea un bloque reutilizable de instrucciones.
// elegirSimboloLogoLihen = nombre de la función que agrupa esta parte del proceso.
// fila, columna = dato o datos que recibe la función para poder trabajar.
function elegirSimboloLogoLihen(fila, columna) {

    // const = crea una variable que no será reasignada.
    // semilla = nombre de la variable utilizada para guardar este dato o referencia.
    const semilla = crearHashLogoLihen(fila, columna, 11);
    // usarBinario = nombre de la variable utilizada para guardar este dato o referencia.
    const usarBinario = semilla % 100 < 18;

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (usarBinario) {

        // return = devuelve un resultado o finaliza la ejecución de la función actual.
        return elegirElementoLogoLihen(
            lihenLogoSimbolosBinarios,
            crearHashLogoLihen(fila, columna, 23)
        );

    }

    // let = crea una variable cuyo valor puede cambiar.
    // simbolo = nombre de la variable utilizada para guardar este dato o referencia.
    let simbolo = elegirElementoLogoLihen(
        lihenLogoSimbolosSimples,
        crearHashLogoLihen(fila, columna, 31)
    );

    // Aquí se reduce la repetición inmediata entre celdas vecinas.
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (columna > 0) {

        // const = crea una variable que no será reasignada.
        // simboloAnterior = nombre de la variable utilizada para guardar este dato o referencia.
        const simboloAnterior = elegirElementoLogoLihen(
            lihenLogoSimbolosSimples,
            crearHashLogoLihen(fila, columna - 1, 31)
        );

        // if = ejecuta este bloque únicamente cuando la condición se cumple.
        if (simbolo === simboloAnterior) {

            simbolo = elegirElementoLogoLihen(
                lihenLogoSimbolosSimples,
                crearHashLogoLihen(fila, columna, 47)
            );

        }

    }

    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return simbolo;

}


// Aquí se selecciona el color del carácter según el tipo de celda.
// function = crea un bloque reutilizable de instrucciones.
// elegirColorTextoLogoLihen = nombre de la función que agrupa esta parte del proceso.
// estado, fila, columna = dato o datos que recibe la función para poder trabajar.
function elegirColorTextoLogoLihen(estado, fila, columna) {

    // const = crea una variable que no será reasignada.
    // paleta = nombre de la variable utilizada para guardar este dato o referencia.
    const paleta = estado === 1
        ? lihenLogoColoresTextoVerde
        : lihenLogoColoresTextoPurpura;

    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return elegirElementoLogoLihen(
        paleta,
        crearHashLogoLihen(fila, columna, 59)
    );

}


// Aquí se construye el logo mediante elementos reales del DOM.
// function = crea un bloque reutilizable de instrucciones.
// renderizarLogoLihen = nombre de la función que agrupa esta parte del proceso.
function renderizarLogoLihen() {

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (!lihenPixelCodeLogo) {

        // return = devuelve un resultado o finaliza la ejecución de la función actual.
        return;

    }

    // style = permite modificar estilos CSS directamente desde JavaScript.
    lihenPixelCodeLogo.style.setProperty(
        "--logo-columnas",
        lihenLogoColumnas
    );

    lihenPixelCodeLogo.style.setProperty(
        "--logo-filas",
        lihenLogoFilas
    );

    // DocumentFragment = agrupa las celdas antes de agregarlas al DOM.
    // const = crea una variable que no será reasignada.
    // fragmentoLogo = nombre de la variable utilizada para guardar este dato o referencia.
    // createDocumentFragment = crea un contenedor temporal para agrupar nodos antes de insertarlos.
    // createDocumentFragment = crea un contenedor temporal para agrupar nodos antes de insertarlos.
    const fragmentoLogo = document.createDocumentFragment();

    for (let fila = 0; fila < lihenLogoFilas; fila++) {

        // datosFila = nombre de la variable utilizada para guardar este dato o referencia.
        const datosFila = lihenLogoMap[fila];

        for (let columna = 0; columna < lihenLogoColumnas; columna++) {

            // const = crea una variable que no será reasignada.
            // estado = nombre de la variable utilizada para guardar este dato o referencia.
            const estado = Number(datosFila[columna]);
            // celdaLogo = nombre de la variable utilizada para guardar este dato o referencia.
            // createElement = crea un nuevo elemento HTML desde JavaScript.
            // createElement = crea un nuevo elemento HTML desde JavaScript.
            const celdaLogo = document.createElement("span");

            // classList = permite agregar, quitar o consultar clases CSS del elemento.
            celdaLogo.classList.add("logo-slot");
            // dataset = permite leer o guardar atributos HTML que comienzan con data-.
            celdaLogo.dataset.row = String(fila);
            celdaLogo.dataset.column = String(columna);
            celdaLogo.dataset.color =
                estado === 1
                    ? "green"
                    : estado === 2
                        ? "purple"
                        : "empty";

            // if = ejecuta este bloque únicamente cuando la condición se cumple.
            if (estado === 0) {

                // classList = permite agregar, quitar o consultar clases CSS del elemento.
                celdaLogo.classList.add("is-empty");
                // appendChild = agrega un nodo como hijo de otro elemento.
                fragmentoLogo.appendChild(celdaLogo);
                continue;

            }

            // const = crea una variable que no será reasignada.
            // simboloLogo = nombre de la variable utilizada para guardar este dato o referencia.
            const simboloLogo = elegirSimboloLogoLihen(fila, columna);

            // classList = permite agregar, quitar o consultar clases CSS del elemento.
            celdaLogo.classList.add(
                "logo-cell",
                estado === 1 ? "green" : "purple"
            );

            // if = ejecuta este bloque únicamente cuando la condición se cumple.
            if (simboloLogo.length >= 3) {

                // classList = permite agregar, quitar o consultar clases CSS del elemento.
                celdaLogo.classList.add("long-symbol");

            }

            celdaLogo.textContent = simboloLogo;
            // style = permite modificar estilos CSS directamente desde JavaScript.
            celdaLogo.style.color = elegirColorTextoLogoLihen(
                estado,
                fila,
                columna
            );

            // appendChild = agrega un nodo como hijo de otro elemento.
            fragmentoLogo.appendChild(celdaLogo);

        }

    }

    lihenPixelCodeLogo.replaceChildren(fragmentoLogo);

}


// Aquí se genera una sola vez la estructura preparada para futuras animaciones.
renderizarLogoLihen();


// Aquí se recorre la cantidad total de celdas necesarias para el emblema.
// Este bloque crea la matriz 30 x 30 y aplica la silueta detallada del emblema.
for (let indiceEmblema = 0; indiceEmblema < totalCeldasEmblema; indiceEmblema++) {

    // Aquí se crea una nueva celda para la retícula interna del emblema.
    // const = crea una variable que no será reasignada.
    // celdaEmblema = nombre de la variable utilizada para guardar este dato o referencia.
    // createElement = crea un nuevo elemento HTML desde JavaScript.
    // createElement = crea un nuevo elemento HTML desde JavaScript.
    const celdaEmblema = document.createElement("div");

    // Aquí se agrega la clase general de las celdas del emblema.
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    celdaEmblema.classList.add("intro-emblema-celda");


    // Aquí se verifica si la posición actual pertenece a la silueta.
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (celdasEmblemaDetallado[indiceEmblema] === 1) {

        // Aquí se activa visualmente la celda seleccionada por el mapa.
        // classList = permite agregar, quitar o consultar clases CSS del elemento.
        celdaEmblema.classList.add("intro-emblema-celda-activa");

    }


    // Aquí se agrega la celda dentro de la retícula interna del emblema.
    // appendChild = agrega un nodo como hijo de otro elemento.
    introEmblemaReticula.appendChild(celdaEmblema);

}

// ========================================
// CONTROL DE VISIBILIDAD DE LA INTRO LXL
// ========================================

// Aquí se obtiene la capa principal de la introducción.
// introLxl = elemento que se mostrará o pausará según la visibilidad de Inicio.
// const = crea una variable que no será reasignada.
// querySelector = busca el primer elemento que coincide con el selector.
// "#intro-lxl" = selector utilizado para identificar el elemento dentro del documento.
const introLxl = document.querySelector("#intro-lxl");


// Aquí se obtiene la sección Inicio del portafolio.
// inicio = sección utilizada como referencia para saber si la portada está visible.
// "#inicio" = selector utilizado para identificar el elemento dentro del documento.
const inicio = document.querySelector("#inicio");


// Aquí se recuerda si la Intro ya terminó una vez.
// let = crea una variable cuyo valor puede cambiar.
// introFinalizada = nombre de la variable utilizada para guardar este dato o referencia.
let introFinalizada = false;


// Aquí se define cuánto de Inicio debe permanecer visible para considerar activa la introducción.
// threshold = porcentaje visible necesario para activar el cambio de estado.
// const = crea una variable que no será reasignada.
// limiteVisibilidadInicio = nombre de la variable utilizada para guardar este dato o referencia.
const limiteVisibilidadInicio = 0.35;


// Aquí se activa visualmente la introducción.
// function = crea un bloque reutilizable de instrucciones.
// activarIntro = nombre de la función que agrupa esta parte del proceso.
function activarIntro() {

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (introFinalizada) {

        // return = devuelve un resultado o finaliza la ejecución de la función actual.
        return;

    }

    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    introLxl.classList.remove("intro-pausada");
    introLxl.classList.add("intro-activa");

}


// Aquí se pausa y oculta visualmente la introducción sin eliminar su estructura.
// function = crea un bloque reutilizable de instrucciones.
// pausarIntro = nombre de la función que agrupa esta parte del proceso.
function pausarIntro() {

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (introFinalizada) {

        // return = devuelve un resultado o finaliza la ejecución de la función actual.
        return;

    }

    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    introLxl.classList.remove("intro-activa");
    introLxl.classList.add("intro-pausada");

}


// Aquí se finaliza la Intro cuando termina la revelación visible del logo LIHEN.
// if = ejecuta este bloque únicamente cuando la condición se cumple.
if (lihenLogoWrapper && introLxl) {

    // addEventListener = escucha un evento para ejecutar una acción cuando ocurra.
    lihenLogoWrapper.addEventListener("animationend", (evento) => {

        if (evento.animationName !== "intro-revelar-logo-lihen") {

            // return = devuelve un resultado o finaliza la ejecución de la función actual.
            return;

        }

        introFinalizada = true;
        // classList = permite agregar, quitar o consultar clases CSS del elemento.
        introLxl.classList.remove("intro-activa", "intro-pausada");
        introLxl.classList.add("intro-finalizada");

    });

}


// Aquí se observa si la sección Inicio entra o sale del área visible del navegador.
// IntersectionObserver = detecta cambios de visibilidad sin revisar manualmente cada movimiento del scroll.
// const = crea una variable que no será reasignada.
// observadorInicio = nombre de la variable utilizada para guardar este dato o referencia.
const observadorInicio = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        // Aquí se valida si al menos el 35 % de Inicio continúa visible.
        // if = ejecuta este bloque únicamente cuando la condición se cumple.
        if (entrada.isIntersecting && entrada.intersectionRatio >= limiteVisibilidadInicio) {

            activarIntro();

        } else {

            pausarIntro();

        }

    });

}, {

    // threshold = define los niveles de visibilidad que observa IntersectionObserver.
    // limiteVisibilidadInicio = valor asignado a esta propiedad.
    threshold: limiteVisibilidadInicio

});


// Aquí se inicia la observación de la sección Inicio.
// if = ejecuta este bloque únicamente cuando la condición se cumple.
if (introLxl && inicio) {

    // Aquí se define el estado inicial antes de que el observador responda.
    // const = crea una variable que no será reasignada.
    // rectInicio = nombre de la variable utilizada para guardar este dato o referencia.
    const rectInicio = inicio.getBoundingClientRect();
    // altoVisibleInicio = nombre de la variable utilizada para guardar este dato o referencia.
    const altoVisibleInicio = Math.max(
        0,
        Math.min(rectInicio.bottom, window.innerHeight) - Math.max(rectInicio.top, 0)
    );
    // porcentajeVisibleInicial = nombre de la variable utilizada para guardar este dato o referencia.
    const porcentajeVisibleInicial = altoVisibleInicio / Math.max(1, rectInicio.height);

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (porcentajeVisibleInicial >= limiteVisibilidadInicio) {

        activarIntro();

    } else {

        pausarIntro();

    }

    observadorInicio.observe(inicio);

}

