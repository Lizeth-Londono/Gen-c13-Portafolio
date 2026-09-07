// import = permite utilizar código exportado desde otro archivo.
// LOGO_COLUMNS, LOGO_MAP, LOGO_ROWS = función que se importa para utilizarla en este archivo.
import { LOGO_COLUMNS, LOGO_MAP, LOGO_ROWS } from "./logo-map.js";

// const = crea una variable que no será reasignada.
// STATES = nombre de la variable utilizada para guardar este dato o referencia.
const STATES = Object.freeze({
  // IDLE = define una propiedad dentro de este objeto de configuración o datos.
  // "idle" = valor asignado a esta propiedad.
  IDLE: "idle",
  // WAITING_SIZE = define una propiedad dentro de este objeto de configuración o datos.
  // "waiting-size" = valor asignado a esta propiedad.
  WAITING_SIZE: "waiting-size",
  // BUILDING = define una propiedad dentro de este objeto de configuración o datos.
  // "building" = valor asignado a esta propiedad.
  BUILDING: "building",
  // MUTATING = define una propiedad dentro de este objeto de configuración o datos.
  // "mutating" = valor asignado a esta propiedad.
  MUTATING: "mutating",
  // LOCKING = define una propiedad dentro de este objeto de configuración o datos.
  // "locking" = valor asignado a esta propiedad.
  LOCKING: "locking",
  // FADING = define una propiedad dentro de este objeto de configuración o datos.
  // "fading" = valor asignado a esta propiedad.
  FADING: "fading",
  // COMPLETE = define una propiedad dentro de este objeto de configuración o datos.
  // "complete" = valor asignado a esta propiedad.
  COMPLETE: "complete",
  // DESTROYED = define una propiedad dentro de este objeto de configuración o datos.
  // "destroyed" = valor asignado a esta propiedad.
  DESTROYED: "destroyed"
});

// const = crea una variable que no será reasignada.
// SIMPLE_SYMBOLS = nombre de la variable utilizada para guardar este dato o referencia.
const SIMPLE_SYMBOLS = Object.freeze([
  "0", "1", "3", "5", "8",
  "<", ">", "=",
  "{", "}", ";",
  "#", "%",
  "/", "//",
  "?", "&",
  "L", "X", ")"
]);

// const = crea una variable que no será reasignada.
// BINARY_SYMBOLS = nombre de la variable utilizada para guardar este dato o referencia.
const BINARY_SYMBOLS = Object.freeze([
  "01", "10", "101", "010", "001", "110", "1010"
]);

// GREEN_TEXT_COLORS = nombre de la variable utilizada para guardar este dato o referencia.
const GREEN_TEXT_COLORS = Object.freeze(["#17E8C3", "#59F2DB", "#D5FFF6"]);
// PURPLE_TEXT_COLORS = nombre de la variable utilizada para guardar este dato o referencia.
const PURPLE_TEXT_COLORS = Object.freeze(["#D58BFF", "#F2B9FF", "#FFD8A8", "#D9CAE8"]);

// const = crea una variable que no será reasignada.
// DEFAULT_OPTIONS = nombre de la variable utilizada para guardar este dato o referencia.
const DEFAULT_OPTIONS = Object.freeze({
  // autoplay = indica si la animación inicia automáticamente.
  // true = valor asignado a esta propiedad.
  autoplay: true,
  // showReplay = indica si se muestra el control para repetir la animación.
  // true = valor asignado a esta propiedad.
  showReplay: true,
  // maxCells = define una propiedad dentro de este objeto de configuración o datos.
  // 4800 = valor asignado a esta propiedad.
  maxCells: 4800,
  // baseCellSize = define una propiedad dentro de este objeto de configuración o datos.
  // 24 = valor asignado a esta propiedad.
  baseCellSize: 24,
  // compactCellSize = define una propiedad dentro de este objeto de configuración o datos.
  // 18 = valor asignado a esta propiedad.
  compactCellSize: 18,
  // compactBreakpoint = define una propiedad dentro de este objeto de configuración o datos.
  // 700 = valor asignado a esta propiedad.
  compactBreakpoint: 700,
  // logoWidthRatio = define una propiedad dentro de este objeto de configuración o datos.
  // 0.72 = valor asignado a esta propiedad.
  logoWidthRatio: 0.72,
  // compactLogoWidthRatio = define una propiedad dentro de este objeto de configuración o datos.
  // 0.90 = valor asignado a esta propiedad.
  compactLogoWidthRatio: 0.90,
  // logoHeightRatio = define una propiedad dentro de este objeto de configuración o datos.
  // 0.86 = valor asignado a esta propiedad.
  logoHeightRatio: 0.86,
  // binaryRatio = define una propiedad dentro de este objeto de configuración o datos.
  // 0.18 = valor asignado a esta propiedad.
  binaryRatio: 0.18,
  // resizeDebounceMs = define una propiedad dentro de este objeto de configuración o datos.
  // 140 = valor asignado a esta propiedad.
  resizeDebounceMs: 140,
  // onComplete = guarda la función que se ejecuta cuando la animación termina.
  // null = valor asignado a esta propiedad.
  onComplete: null,
  // timings = define una propiedad dentro de este objeto de configuración o datos.
  // Object.freeze({ = valor asignado a esta propiedad.
  timings: Object.freeze({
    // symbolChanges = define una propiedad dentro de este objeto de configuración o datos.
    // Object.freeze([650, 1200, 1800]) = valor asignado a esta propiedad.
    symbolChanges: Object.freeze([650, 1200, 1800]),
    // lockingStart = define una propiedad dentro de este objeto de configuración o datos.
    // 2100 = valor asignado a esta propiedad.
    lockingStart: 2100,
    // lockingSpread = define una propiedad dentro de este objeto de configuración o datos.
    // 700 = valor asignado a esta propiedad.
    lockingSpread: 700,
    // fadingStart = define una propiedad dentro de este objeto de configuración o datos.
    // 2550 = valor asignado a esta propiedad.
    fadingStart: 2550,
    // fadingSpread = define una propiedad dentro de este objeto de configuración o datos.
    // 1900 = valor asignado a esta propiedad.
    fadingSpread: 1900,
    // complete = define una propiedad dentro de este objeto de configuración o datos.
    // 4700 = valor asignado a esta propiedad.
    complete: 4700
  })
});

// function = crea un bloque reutilizable de instrucciones.
// validateLogoMap = nombre de la función que agrupa esta parte del proceso.
function validateLogoMap() {
  // return = devuelve un resultado o finaliza la ejecución de la función actual.
  return LOGO_MAP.length === LOGO_ROWS &&
    LOGO_MAP.every((row) => row.length === LOGO_COLUMNS && /^[012]+$/.test(row));
}

// hash32 = nombre de la función que agrupa esta parte del proceso.
// row, column, salt = 0 = dato o datos que recibe la función para poder trabajar.
function hash32(row, column, salt = 0) {
  let x =
    Math.imul(row + 1, 0x9e3779b1) ^
    Math.imul(column + 1, 0x85ebca6b) ^
    Math.imul(salt + 1, 0xc2b2ae35);

  x ^= x >>> 16;
  x = Math.imul(x, 0x7feb352d);
  x ^= x >>> 15;
  x = Math.imul(x, 0x846ca68b);
  x ^= x >>> 16;
  // return = devuelve un resultado o finaliza la ejecución de la función actual.
  return x >>> 0;
}

// function = crea un bloque reutilizable de instrucciones.
// pick = nombre de la función que agrupa esta parte del proceso.
// array, seed = dato o datos que recibe la función para poder trabajar.
function pick(array, seed) {
  return array[seed % array.length];
}

// chooseSymbol = nombre de la función que agrupa esta parte del proceso.
// row, column, salt, binaryRatio = dato o datos que recibe la función para poder trabajar.
function chooseSymbol(row, column, salt, binaryRatio) {
  // const = crea una variable que no será reasignada.
  const seed = hash32(row, column, 11 + salt);
  // useBinary = nombre de la variable utilizada para guardar este dato o referencia.
  const useBinary = (seed % 10000) / 10000 < binaryRatio;
  // return = devuelve un resultado o finaliza la ejecución de la función actual.
  return useBinary
    ? pick(BINARY_SYMBOLS, hash32(row, column, 23 + salt))
    : pick(SIMPLE_SYMBOLS, hash32(row, column, 31 + salt));
}

// function = crea un bloque reutilizable de instrucciones.
// chooseTextColor = nombre de la función que agrupa esta parte del proceso.
// state, row, column = dato o datos que recibe la función para poder trabajar.
function chooseTextColor(state, row, column) {
  // const = crea una variable que no será reasignada.
  // palette = nombre de la variable utilizada para guardar este dato o referencia.
  const palette = state === 1 ? GREEN_TEXT_COLORS : PURPLE_TEXT_COLORS;
  // return = devuelve un resultado o finaliza la ejecución de la función actual.
  return pick(palette, hash32(row, column, 59));
}

// function = crea un bloque reutilizable de instrucciones.
// mergeOptions = nombre de la función que agrupa esta parte del proceso.
// options = {} = dato o datos que recibe la función para poder trabajar.
function mergeOptions(options = {}) {
  // const = crea una variable que no será reasignada.
  // timings = nombre de la variable utilizada para guardar este dato o referencia.
  const timings = { ...DEFAULT_OPTIONS.timings, ...(options.timings || {}) };
  // return = devuelve un resultado o finaliza la ejecución de la función actual.
  return { ...DEFAULT_OPTIONS, ...options, timings };
}

// function = crea un bloque reutilizable de instrucciones.
// assertOptions = nombre de la función que agrupa esta parte del proceso.
// options = dato o datos que recibe la función para poder trabajar.
function assertOptions(options) {
  // if = ejecuta este bloque únicamente cuando la condición se cumple.
  if (!Number.isFinite(options.maxCells) || options.maxCells < 400) {
    throw new RangeError("LIHEN Reveal: maxCells debe ser un número >= 400.");
  }
  if (!Number.isFinite(options.binaryRatio) || options.binaryRatio < 0 || options.binaryRatio > 1) {
    throw new RangeError("LIHEN Reveal: binaryRatio debe estar entre 0 y 1.");
  }
  if (options.timings.complete <= options.timings.fadingStart) {
    throw new RangeError("LIHEN Reveal: complete debe ocurrir después de fadingStart.");
  }
  // if = ejecuta este bloque únicamente cuando la condición se cumple.
  if (options.onComplete !== null && typeof options.onComplete !== "function") {
    throw new TypeError("LIHEN Reveal: onComplete debe ser una función o null.");
  }
}

// function = crea un bloque reutilizable de instrucciones.
// isElement = nombre de la función que agrupa esta parte del proceso.
// value = dato o datos que recibe la función para poder trabajar.
function isElement(value) {
  // return = devuelve un resultado o finaliza la ejecución de la función actual.
  return typeof Element !== "undefined" && value instanceof Element;
}

// createLihenReveal = nombre de la función que agrupa esta parte del proceso.
// root, userOptions = {} = dato o datos que recibe la función para poder trabajar.
export function createLihenReveal(root, userOptions = {}) {
  // if = ejecuta este bloque únicamente cuando la condición se cumple.
  if (!isElement(root)) {
    throw new TypeError("LIHEN Reveal: root debe ser un elemento DOM válido.");
  }
  if (!validateLogoMap()) {
    throw new Error("LIHEN Reveal: logoMap inválido.");
  }

  // const = crea una variable que no será reasignada.
  // options = nombre de la variable utilizada para guardar este dato o referencia.
  const options = mergeOptions(userOptions);
  assertOptions(options);

  // let = crea una variable cuyo valor puede cambiar.
  // state = nombre de la variable utilizada para guardar este dato o referencia.
  let state = STATES.IDLE;
  // initialized = nombre de la variable utilizada para guardar este dato o referencia.
  let initialized = false;
  // destroyed = nombre de la variable utilizada para guardar este dato o referencia.
  let destroyed = false;
  // viewport = nombre de la variable utilizada para guardar este dato o referencia.
  let viewport = null;
  // let = crea una variable cuyo valor puede cambiar.
  // grid = nombre de la variable utilizada para guardar este dato o referencia.
  let grid = null;
  // replayButton = nombre de la variable utilizada para guardar este dato o referencia.
  let replayButton = null;
  // cells = nombre de la variable utilizada para guardar este dato o referencia.
  let cells = [];
  // logoCells = nombre de la variable utilizada para guardar este dato o referencia.
  let logoCells = [];
  // let = crea una variable cuyo valor puede cambiar.
  // backgroundCells = nombre de la variable utilizada para guardar este dato o referencia.
  let backgroundCells = [];
  // animationFrameId = nombre de la variable utilizada para guardar este dato o referencia.
  let animationFrameId = 0;
  // resizeFrameId = nombre de la variable utilizada para guardar este dato o referencia.
  let resizeFrameId = 0;
  // resizeTimerId = nombre de la variable utilizada para guardar este dato o referencia.
  let resizeTimerId = 0;
  // let = crea una variable cuyo valor puede cambiar.
  // startTime = nombre de la variable utilizada para guardar este dato o referencia.
  let startTime = 0;
  // pausedAt = nombre de la variable utilizada para guardar este dato o referencia.
  let pausedAt = 0;
  // runToken = nombre de la variable utilizada para guardar este dato o referencia.
  let runToken = 0;
  // completionNotifiedRun = nombre de la variable utilizada para guardar este dato o referencia.
  let completionNotifiedRun = -1;
  // const = crea una variable que no será reasignada.
  // pauseReasons = nombre de la variable utilizada para guardar este dato o referencia.
  const pauseReasons = new Set();
  // let = crea una variable cuyo valor puede cambiar.
  // symbolStage = nombre de la variable utilizada para guardar este dato o referencia.
  let symbolStage = -1;
  // lockingApplied = nombre de la variable utilizada para guardar este dato o referencia.
  let lockingApplied = false;
  // fadingApplied = nombre de la variable utilizada para guardar este dato o referencia.
  let fadingApplied = false;
  // resizeObserver = nombre de la variable utilizada para guardar este dato o referencia.
  let resizeObserver = null;
  // let = crea una variable cuyo valor puede cambiar.
  // reducedMotionQuery = nombre de la variable utilizada para guardar este dato o referencia.
  let reducedMotionQuery = null;
  // lastSize = nombre de la variable utilizada para guardar este dato o referencia.
  let lastSize = { width: 0, height: 0 };
  // metrics = nombre de la variable utilizada para guardar este dato o referencia.
  let metrics = {
    // rows = define una propiedad dentro de este objeto de configuración o datos.
    // 0 = valor asignado a esta propiedad.
    rows: 0,
    // columns = define una propiedad dentro de este objeto de configuración o datos.
    // 0 = valor asignado a esta propiedad.
    columns: 0,
    // totalCells = define una propiedad dentro de este objeto de configuración o datos.
    // 0 = valor asignado a esta propiedad.
    totalCells: 0,
    // logoCells = define una propiedad dentro de este objeto de configuración o datos.
    // 0 = valor asignado a esta propiedad.
    logoCells: 0,
    // backgroundCells = define una propiedad dentro de este objeto de configuración o datos.
    // 0 = valor asignado a esta propiedad.
    backgroundCells: 0,
    // cellSize = define una propiedad dentro de este objeto de configuración o datos.
    // 0 = valor asignado a esta propiedad.
    cellSize: 0,
    // buildMs = define una propiedad dentro de este objeto de configuración o datos.
    // 0 = valor asignado a esta propiedad.
    buildMs: 0,
    // rafActive = define una propiedad dentro de este objeto de configuración o datos.
    // 0 = valor asignado a esta propiedad.
    rafActive: 0,
    // schedulerCount = define una propiedad dentro de este objeto de configuración o datos.
    // 0 = valor asignado a esta propiedad.
    schedulerCount: 0
  };

  // const = crea una variable que no será reasignada.
  // onReplayClick = nombre de la variable utilizada para guardar este dato o referencia.
  const onReplayClick = () => replay();
  // onVisibilityChange = nombre de la variable utilizada para guardar este dato o referencia.
  const onVisibilityChange = () => {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (!initialized || destroyed || state === STATES.COMPLETE) {

        return;
    }
    if (document.visibilityState === "hidden") {

        pause("document");
    }
    // else = ejecuta una alternativa cuando la condición anterior no se cumple.
    else resume("document");
  };
  // const = crea una variable que no será reasignada.
  // onReducedMotionChange = nombre de la variable utilizada para guardar este dato o referencia.
  const onReducedMotionChange = (event) => {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (event.matches && initialized && !destroyed) {

        complete();
    }
  };
  // onWindowResizeFallback = nombre de la variable utilizada para guardar este dato o referencia.
  const onWindowResizeFallback = () => scheduleResize();

  // function = crea un bloque reutilizable de instrucciones.
  // setState = nombre de la función que agrupa esta parte del proceso.
  // nextState = dato o datos que recibe la función para poder trabajar.
  function setState(nextState) {
    state = nextState;
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    // dataset = permite leer o guardar atributos HTML que comienzan con data-.
    if (viewport) viewport.dataset.state = nextState;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // measure = nombre de la función que agrupa esta parte del proceso.
  function measure() {
    // const = crea una variable que no será reasignada.
    // rect = nombre de la variable utilizada para guardar este dato o referencia.
    const rect = root.getBoundingClientRect();
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return {
      // width = define una propiedad dentro de este objeto de configuración o datos.
      // Math.max(0, Math.floor(rect.width || root.clientWidth || 0)) = valor asignado a esta propiedad.
      width: Math.max(0, Math.floor(rect.width || root.clientWidth || 0)),
      // height = define una propiedad dentro de este objeto de configuración o datos.
      // Math.max(0, Math.floor(rect.height || root.clientHeight || 0)) = valor asignado a esta propiedad.
      height: Math.max(0, Math.floor(rect.height || root.clientHeight || 0))
    };
  }

  // function = crea un bloque reutilizable de instrucciones.
  // calculateGrid = nombre de la función que agrupa esta parte del proceso.
  // width, height = dato o datos que recibe la función para poder trabajar.
  function calculateGrid(width, height) {
    // const = crea una variable que no será reasignada.
    // compact = nombre de la variable utilizada para guardar este dato o referencia.
    const compact = width <= options.compactBreakpoint;
    // preferred = nombre de la variable utilizada para guardar este dato o referencia.
    const preferred = compact ? options.compactCellSize : options.baseCellSize;
    // areaDrivenMinimum = nombre de la variable utilizada para guardar este dato o referencia.
    const areaDrivenMinimum = Math.sqrt((width * height) / options.maxCells);
    // let = crea una variable cuyo valor puede cambiar.
    // cellSize = nombre de la variable utilizada para guardar este dato o referencia.
    let cellSize = Math.max(preferred, areaDrivenMinimum);
    // columns = nombre de la variable utilizada para guardar este dato o referencia.
    let columns = Math.max(1, Math.ceil(width / cellSize));
    // rows = nombre de la variable utilizada para guardar este dato o referencia.
    let rows = Math.max(1, Math.ceil(height / cellSize));

    // El redondeo de ceil() puede superar levemente el budget teórico.
    // Aumentamos la celda solo lo necesario hasta cumplir el límite real.
    while (rows * columns > options.maxCells) {
      cellSize *= 1.01;
      columns = Math.max(1, Math.ceil(width / cellSize));
      rows = Math.max(1, Math.ceil(height / cellSize));
    }

    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return { rows, columns, cellSize, compact };
  }

  // function = crea un bloque reutilizable de instrucciones.
  // createCell = nombre de la función que agrupa esta parte del proceso.
  // row, column = dato o datos que recibe la función para poder trabajar.
  function createCell(row, column) {
    // const = crea una variable que no será reasignada.
    // cell = nombre de la variable utilizada para guardar este dato o referencia.
    // createElement = crea un nuevo elemento HTML desde JavaScript.
    // createElement = crea un nuevo elemento HTML desde JavaScript.
    const cell = document.createElement("span");
    // initialState = nombre de la variable utilizada para guardar este dato o referencia.
    const initialState = hash32(row, column, 7) % 100 < 64 ? 1 : 2;
    // symbol = nombre de la variable utilizada para guardar este dato o referencia.
    const symbol = chooseSymbol(row, column, 0, options.binaryRatio);

    cell.className = `lihen-reveal__cell ${initialState === 1 ? "is-green" : "is-purple"}`;
    cell.textContent = symbol;
    // dataset = permite leer o guardar atributos HTML que comienzan con data-.
    cell.dataset.row = String(row);
    cell.dataset.column = String(column);
    cell.dataset.logoState = "0";
    // style = permite modificar estilos CSS directamente desde JavaScript.
    cell.style.color = chooseTextColor(initialState, row, column);
    cell.style.setProperty("--lihen-blink-delay", `${hash32(row, column, 91) % 700}ms`);
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    cell.classList.toggle("is-long-symbol", symbol.length >= 3);
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return cell;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // mapLogo = nombre de la función que agrupa esta parte del proceso.
  // rows, columns, compact = dato o datos que recibe la función para poder trabajar.
  function mapLogo(rows, columns, compact) {
    logoCells = [];
    backgroundCells = [];

    // const = crea una variable que no será reasignada.
    // widthRatio = nombre de la variable utilizada para guardar este dato o referencia.
    const widthRatio = compact ? options.compactLogoWidthRatio : options.logoWidthRatio;
    // logoScale = nombre de la variable utilizada para guardar este dato o referencia.
    const logoScale = Math.min(
      (columns * widthRatio) / LOGO_COLUMNS,
      (rows * options.logoHeightRatio) / LOGO_ROWS
    );
    // safeScale = nombre de la variable utilizada para guardar este dato o referencia.
    const safeScale = Math.max(logoScale, Number.EPSILON);
    // const = crea una variable que no será reasignada.
    // mappedWidth = nombre de la variable utilizada para guardar este dato o referencia.
    const mappedWidth = LOGO_COLUMNS * safeScale;
    // mappedHeight = nombre de la variable utilizada para guardar este dato o referencia.
    const mappedHeight = LOGO_ROWS * safeScale;
    // offsetColumn = nombre de la variable utilizada para guardar este dato o referencia.
    const offsetColumn = (columns - mappedWidth) / 2;
    // offsetRow = nombre de la variable utilizada para guardar este dato o referencia.
    const offsetRow = (rows - mappedHeight) / 2;

    for (const cell of cells) {
      // const = crea una variable que no será reasignada.
      // row = nombre de la variable utilizada para guardar este dato o referencia.
      // dataset = permite leer o guardar atributos HTML que comienzan con data-.
      const row = Number(cell.dataset.row);
      // column = nombre de la variable utilizada para guardar este dato o referencia.
      const column = Number(cell.dataset.column);
      // logoColumn = nombre de la variable utilizada para guardar este dato o referencia.
      const logoColumn = Math.floor((column - offsetColumn) / safeScale);
      // logoRow = nombre de la variable utilizada para guardar este dato o referencia.
      const logoRow = Math.floor((row - offsetRow) / safeScale);
      // let = crea una variable cuyo valor puede cambiar.
      // logoState = nombre de la variable utilizada para guardar este dato o referencia.
      let logoState = 0;

      // if = ejecuta este bloque únicamente cuando la condición se cumple.
      if (
        logoRow >= 0 && logoRow < LOGO_ROWS &&
        logoColumn >= 0 && logoColumn < LOGO_COLUMNS
      ) {
        logoState = Number(LOGO_MAP[logoRow][logoColumn]);
      }

      // dataset = permite leer o guardar atributos HTML que comienzan con data-.
      cell.dataset.logoState = String(logoState);
      // if = ejecuta este bloque únicamente cuando la condición se cumple.
      if (logoState > 0) {
        // classList = permite agregar, quitar o consultar clases CSS del elemento.
        cell.classList.add("is-logo");
        cell.classList.toggle("is-green", logoState === 1);
        cell.classList.toggle("is-purple", logoState === 2);
        // style = permite modificar estilos CSS directamente desde JavaScript.
        cell.style.color = chooseTextColor(logoState, logoRow, logoColumn);
        cell.style.setProperty(
          "--lihen-lock-delay",
          `${hash32(row, column, 117) % options.timings.lockingSpread}ms`
        );
        logoCells.push(cell);
      } else {
        // const = crea una variable que no será reasignada.
        // fadeDelay = nombre de la variable utilizada para guardar este dato o referencia.
        const fadeDelay = hash32(row, column, 123) % options.timings.fadingSpread;
        // style = permite modificar estilos CSS directamente desde JavaScript.
        cell.style.setProperty("--lihen-fade-delay", `${fadeDelay}ms`);
        backgroundCells.push(cell);
      }
    }
  }

  // function = crea un bloque reutilizable de instrucciones.
  // buildGrid = nombre de la función que agrupa esta parte del proceso.
  // { preserveFinalState = false } = {} = dato o datos que recibe la función para poder trabajar.
  function buildGrid({ preserveFinalState = false } = {}) {
    // const = crea una variable que no será reasignada.
    // size = nombre de la variable utilizada para guardar este dato o referencia.
    const size = measure();
    lastSize = size;
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (!size.width || !size.height) {
      setState(STATES.WAITING_SIZE);
      // return = devuelve un resultado o finaliza la ejecución de la función actual.
      return false;
    }

    // const = crea una variable que no será reasignada.
    // started = nombre de la variable utilizada para guardar este dato o referencia.
    // for = repite un bloque de instrucciones mientras se cumpla una condición.
    const started = performance.now();
    setState(STATES.BUILDING);
    const { rows, columns, cellSize, compact } = calculateGrid(size.width, size.height);
    // fragment = nombre de la variable utilizada para guardar este dato o referencia.
    // createDocumentFragment = crea un contenedor temporal para agrupar nodos antes de insertarlos.
    // createDocumentFragment = crea un contenedor temporal para agrupar nodos antes de insertarlos.
    const fragment = document.createDocumentFragment();
    // const = crea una variable que no será reasignada.
    // nextCells = nombre de la variable utilizada para guardar este dato o referencia.
    const nextCells = [];

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        // cell = nombre de la variable utilizada para guardar este dato o referencia.
        const cell = createCell(row, column);
        // appendChild = agrega un nodo como hijo de otro elemento.
        fragment.appendChild(cell);
        nextCells.push(cell);
      }
    }

    // style = permite modificar estilos CSS directamente desde JavaScript.
    grid.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    grid.style.gridTemplateRows = `repeat(${rows}, minmax(0, 1fr))`;
    grid.style.setProperty("--lihen-cell-font-size", `${Math.max(6, Math.min(13, cellSize * 0.48))}px`);
    grid.replaceChildren(fragment);
    cells = nextCells;
    mapLogo(rows, columns, compact);

    metrics = {
      ...metrics,
      rows,
      columns,
      // totalCells = define una propiedad dentro de este objeto de configuración o datos.
      // cells.length = valor asignado a esta propiedad.
      totalCells: cells.length,
      // logoCells = define una propiedad dentro de este objeto de configuración o datos.
      // logoCells.length = valor asignado a esta propiedad.
      logoCells: logoCells.length,
      // backgroundCells = define una propiedad dentro de este objeto de configuración o datos.
      // backgroundCells.length = valor asignado a esta propiedad.
      backgroundCells: backgroundCells.length,
      // cellSize = define una propiedad dentro de este objeto de configuración o datos.
      // Number(cellSize.toFixed(2)) = valor asignado a esta propiedad.
      cellSize: Number(cellSize.toFixed(2)),
      // buildMs = define una propiedad dentro de este objeto de configuración o datos.
      // Number((performance.now() - started).toFixed(2)) = valor asignado a esta propiedad.
      buildMs: Number((performance.now() - started).toFixed(2))
    };

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (preserveFinalState) {

        applyFinalState();
    }
    // else = ejecuta una alternativa cuando la condición anterior no se cumple.
    else resetVisualState();
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return true;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // randomizeSymbols = nombre de la función que agrupa esta parte del proceso.
  // salt = dato o datos que recibe la función para poder trabajar.
  function randomizeSymbols(salt) {
    for (const cell of cells) {
      // const = crea una variable que no será reasignada.
      // row = nombre de la variable utilizada para guardar este dato o referencia.
      // dataset = permite leer o guardar atributos HTML que comienzan con data-.
      const row = Number(cell.dataset.row);
      // column = nombre de la variable utilizada para guardar este dato o referencia.
      const column = Number(cell.dataset.column);
      // symbol = nombre de la variable utilizada para guardar este dato o referencia.
      const symbol = chooseSymbol(row, column, salt, options.binaryRatio);
      cell.textContent = symbol;
      // classList = permite agregar, quitar o consultar clases CSS del elemento.
      cell.classList.toggle("is-long-symbol", symbol.length >= 3);
    }
  }

  // function = crea un bloque reutilizable de instrucciones.
  // resetVisualState = nombre de la función que agrupa esta parte del proceso.
  function resetVisualState() {
    for (const cell of cells) {
      // classList = permite agregar, quitar o consultar clases CSS del elemento.
      cell.classList.remove("is-blinking", "is-locking", "is-background-fading", "is-background-hidden");
    }
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (replayButton) {
      // hidden = indica si el elemento debe permanecer oculto en la interfaz.
      replayButton.hidden = true;
      replayButton.disabled = true;
    }
    symbolStage = -1;
    lockingApplied = false;
    fadingApplied = false;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // applyLocking = nombre de la función que agrupa esta parte del proceso.
  function applyLocking() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (lockingApplied) {

        return;
    }
    lockingApplied = true;
    setState(STATES.LOCKING);
    for (const cell of logoCells) {
      // classList = permite agregar, quitar o consultar clases CSS del elemento.
      cell.classList.remove("is-blinking");
      cell.classList.add("is-locking");
    }
  }

  // function = crea un bloque reutilizable de instrucciones.
  // applyFading = nombre de la función que agrupa esta parte del proceso.
  function applyFading() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (fadingApplied) {

        return;
    }
    fadingApplied = true;
    setState(STATES.FADING);
    for (const cell of backgroundCells) {
      // classList = permite agregar, quitar o consultar clases CSS del elemento.
      cell.classList.remove("is-blinking");
      cell.classList.add("is-background-fading");
    }
  }

  // function = crea un bloque reutilizable de instrucciones.
  // applyFinalState = nombre de la función que agrupa esta parte del proceso.
  function applyFinalState() {
    for (const cell of logoCells) {
      // classList = permite agregar, quitar o consultar clases CSS del elemento.
      cell.classList.remove("is-blinking", "is-locking");
    }
    for (const cell of backgroundCells) {
      cell.classList.remove("is-blinking", "is-background-fading");
      cell.classList.add("is-background-hidden");
    }
    setState(STATES.COMPLETE);
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (replayButton && options.showReplay) {
      // hidden = indica si el elemento debe permanecer oculto en la interfaz.
      replayButton.hidden = false;
      replayButton.disabled = false;
    }
  }

  // function = crea un bloque reutilizable de instrucciones.
  // requestTick = nombre de la función que agrupa esta parte del proceso.
  function requestTick() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (animationFrameId || destroyed || state === STATES.COMPLETE || pauseReasons.size > 0) {

        return;
    }
    // requestAnimationFrame = solicita al navegador ejecutar una actualización antes del siguiente repintado.
    animationFrameId = requestAnimationFrame(tick);
    metrics.rafActive = 1;
    metrics.schedulerCount = 1;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // tick = nombre de la función que agrupa esta parte del proceso.
  // timestamp = dato o datos que recibe la función para poder trabajar.
  function tick(timestamp) {
    animationFrameId = 0;
    metrics.rafActive = 0;
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (destroyed || !startTime || document.visibilityState === "hidden" || pauseReasons.size > 0) {

        return;
    }

    // const = crea una variable que no será reasignada.
    // elapsed = nombre de la variable utilizada para guardar este dato o referencia.
    const elapsed = timestamp - startTime;
    // changes = nombre de la variable utilizada para guardar este dato o referencia.
    const changes = options.timings.symbolChanges;

    for (let index = symbolStage + 1; index < changes.length; index += 1) {
      // if = ejecuta este bloque únicamente cuando la condición se cumple.
      if (elapsed >= changes[index]) {
        randomizeSymbols(index + 1);
        symbolStage = index;
      } else {
        break;
      }
    }

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (elapsed >= options.timings.lockingStart) {

        applyLocking();
    }
    // else = ejecuta una alternativa cuando la condición anterior no se cumple.
    else setState(STATES.MUTATING);

    if (elapsed >= options.timings.fadingStart) {

        applyFading();
    }

    if (elapsed >= options.timings.complete) {
      complete();
      // return = devuelve un resultado o finaliza la ejecución de la función actual.
      return;
    }

    requestTick();
  }

  // function = crea un bloque reutilizable de instrucciones.
  // isReducedMotion = nombre de la función que agrupa esta parte del proceso.
  function isReducedMotion() {
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return Boolean(reducedMotionQuery?.matches);
  }

  // play = nombre de la función que agrupa esta parte del proceso.
  function play() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (destroyed) {

        return false;
    }
    if (!initialized) {

        init();
    }
    if (destroyed || !grid) {

        return false;
    }

    // cancelAnimationFrame = cancela una actualización pendiente solicitada con requestAnimationFrame.
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
    metrics.rafActive = 0;
    runToken += 1;
    completionNotifiedRun = -1;
    resetVisualState();

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (!cells.length && !buildGrid()) {

        return false;
    }
    if (isReducedMotion()) {
      complete();
      // return = devuelve un resultado o finaliza la ejecución de la función actual.
      return true;
    }

    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    for (const cell of cells) cell.classList.add("is-blinking");
    startTime = performance.now();
    pausedAt = pauseReasons.size > 0 ? performance.now() : 0;
    setState(STATES.MUTATING);
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (pauseReasons.size > 0) {

        root.classList.add("lihen-reveal--paused");
    }
    // else = ejecuta una alternativa cuando la condición anterior no se cumple.
    else requestTick();
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return true;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // replay = nombre de la función que agrupa esta parte del proceso.
  function replay() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (destroyed) {

        return false;
    }
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return play();
  }

  // function = crea un bloque reutilizable de instrucciones.
  // pause = nombre de la función que agrupa esta parte del proceso.
  // reason = "host" = dato o datos que recibe la función para poder trabajar.
  function pause(reason = "host") {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (destroyed || state === STATES.COMPLETE) {

        return false;
    }
    pauseReasons.add(reason);

    if (startTime && !pausedAt) pausedAt = performance.now();
    // cancelAnimationFrame = cancela una actualización pendiente solicitada con requestAnimationFrame.
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
    metrics.rafActive = 0;
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    root.classList.add("lihen-reveal--paused");

    for (const animation of root.getAnimations?.({ subtree: true }) || []) {
      animation.pause();
    }

    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return true;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // resume = nombre de la función que agrupa esta parte del proceso.
  // reason = "host" = dato o datos que recibe la función para poder trabajar.
  function resume(reason = "host") {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (destroyed || state === STATES.COMPLETE) {

        return false;
    }
    pauseReasons.delete(reason);
    if (pauseReasons.size > 0) {

        return true;
    }

    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    root.classList.remove("lihen-reveal--paused");
    for (const animation of root.getAnimations?.({ subtree: true }) || []) {
      animation.play();
    }

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (startTime && pausedAt) {
      startTime += performance.now() - pausedAt;
      pausedAt = 0;
      requestTick();
    }

    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return true;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // notifyComplete = nombre de la función que agrupa esta parte del proceso.
  function notifyComplete() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (completionNotifiedRun === runToken) {

        return;
    }
    completionNotifiedRun = runToken;
    options.onComplete?.({
      // state = define una propiedad dentro de este objeto de configuración o datos.
      // STATES.COMPLETE = valor asignado a esta propiedad.
      state: STATES.COMPLETE,
      // metrics = define una propiedad dentro de este objeto de configuración o datos.
      // getMetrics() = valor asignado a esta propiedad.
      metrics: getMetrics()
    });
  }

  // function = crea un bloque reutilizable de instrucciones.
  // complete = nombre de la función que agrupa esta parte del proceso.
  function complete() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (destroyed) {

        return false;
    }
    // cancelAnimationFrame = cancela una actualización pendiente solicitada con requestAnimationFrame.
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
    metrics.rafActive = 0;
    startTime = 0;
    pausedAt = 0;
    applyFinalState();
    notifyComplete();
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return true;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // scheduleResize = nombre de la función que agrupa esta parte del proceso.
  function scheduleResize() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (destroyed || !initialized) {

        return;
    }
    // clearTimeout = cancela un temporizador creado con setTimeout.
    clearTimeout(resizeTimerId);
    // setTimeout = programa una función para ejecutarse después de un tiempo.
    resizeTimerId = window.setTimeout(() => {
      resizeTimerId = 0;
      // cancelAnimationFrame = cancela una actualización pendiente solicitada con requestAnimationFrame.
      cancelAnimationFrame(resizeFrameId);
      // requestAnimationFrame = solicita al navegador ejecutar una actualización antes del siguiente repintado.
      resizeFrameId = requestAnimationFrame(() => {
        resizeFrameId = 0;
        // const = crea una variable que no será reasignada.
        // size = nombre de la variable utilizada para guardar este dato o referencia.
        const size = measure();
        // if = ejecuta este bloque únicamente cuando la condición se cumple.
        if (Math.abs(size.width - lastSize.width) < 2 && Math.abs(size.height - lastSize.height) < 2) {

            return;
        }
        // wasComplete = nombre de la variable utilizada para guardar este dato o referencia.
        const wasComplete = state === STATES.COMPLETE;
        // wasWaiting = nombre de la variable utilizada para guardar este dato o referencia.
        const wasWaiting = state === STATES.WAITING_SIZE;
        // const = crea una variable que no será reasignada.
        // wasRunning = nombre de la variable utilizada para guardar este dato o referencia.
        // let = crea una variable cuyo valor puede cambiar.
        const wasRunning = !wasComplete && state !== STATES.IDLE && !wasWaiting;
        // cancelAnimationFrame = cancela una actualización pendiente solicitada con requestAnimationFrame.
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
        startTime = 0;
        // if = ejecuta este bloque únicamente cuando la condición se cumple.
        if (buildGrid({ preserveFinalState: wasComplete })) {
          if (wasRunning || (wasWaiting && options.autoplay)) {

              play();
          }
          // else = ejecuta una alternativa cuando la condición anterior no se cumple.
          else if (!wasComplete) setState(STATES.IDLE);
        }
      });
    }, options.resizeDebounceMs);
  }

  // function = crea un bloque reutilizable de instrucciones.
  // installObservers = nombre de la función que agrupa esta parte del proceso.
  function installObservers() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (typeof ResizeObserver === "function") {
      resizeObserver = new ResizeObserver(scheduleResize);
      resizeObserver.observe(root);
    } else {
      // addEventListener = escucha un evento para ejecutar una acción cuando ocurra.
      window.addEventListener("resize", onWindowResizeFallback, { passive: true });
    }

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (typeof window.matchMedia === "function") {
      reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      reducedMotionQuery.addEventListener?.("change", onReducedMotionChange);
    }

    // addEventListener = escucha un evento para ejecutar una acción cuando ocurra.
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  // function = crea un bloque reutilizable de instrucciones.
  // init = nombre de la función que agrupa esta parte del proceso.
  function init() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (destroyed || initialized) {

        return api;
    }
    initialized = true;
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    root.classList.add("lihen-reveal");

    // createElement = crea un nuevo elemento HTML desde JavaScript.
    viewport = document.createElement("div");
    viewport.className = "lihen-reveal__viewport";
    // dataset = permite leer o guardar atributos HTML que comienzan con data-.
    viewport.dataset.state = STATES.IDLE;

    grid = document.createElement("div");
    grid.className = "lihen-reveal__grid";
    // setAttribute = crea o actualiza un atributo HTML.
    grid.setAttribute("aria-hidden", "true");
    // appendChild = agrega un nodo como hijo de otro elemento.
    viewport.appendChild(grid);

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (options.showReplay) {
      // createElement = crea un nuevo elemento HTML desde JavaScript.
      replayButton = document.createElement("button");
      replayButton.className = "lihen-reveal__replay";
      replayButton.type = "button";
      replayButton.textContent = "Repetir animación";
      // hidden = indica si el elemento debe permanecer oculto en la interfaz.
      replayButton.hidden = true;
      replayButton.disabled = true;
      // addEventListener = escucha un evento para ejecutar una acción cuando ocurra.
      replayButton.addEventListener("click", onReplayClick);
      // appendChild = agrega un nodo como hijo de otro elemento.
      viewport.appendChild(replayButton);
    }

    root.appendChild(viewport);
    installObservers();
    // const = crea una variable que no será reasignada.
    // built = nombre de la variable utilizada para guardar este dato o referencia.
    const built = buildGrid();
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (options.autoplay) {

        play();
    }
    // else = ejecuta una alternativa cuando la condición anterior no se cumple.
    else if (built) setState(STATES.IDLE);
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return api;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // destroy = nombre de la función que agrupa esta parte del proceso.
  function destroy() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (destroyed) {

        return true;
    }
    destroyed = true;
    runToken += 1;
    // cancelAnimationFrame = cancela una actualización pendiente solicitada con requestAnimationFrame.
    cancelAnimationFrame(animationFrameId);
    cancelAnimationFrame(resizeFrameId);
    // clearTimeout = cancela un temporizador creado con setTimeout.
    clearTimeout(resizeTimerId);
    animationFrameId = 0;
    resizeFrameId = 0;
    resizeTimerId = 0;
    resizeObserver?.disconnect();
    resizeObserver = null;
    reducedMotionQuery?.removeEventListener?.("change", onReducedMotionChange);
    reducedMotionQuery = null;
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("resize", onWindowResizeFallback);
    replayButton?.removeEventListener("click", onReplayClick);
    viewport?.remove();
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    root.classList.remove("lihen-reveal", "lihen-reveal--paused");
    cells = [];
    logoCells = [];
    backgroundCells = [];
    viewport = null;
    grid = null;
    replayButton = null;
    setState(STATES.DESTROYED);
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return true;
  }

  // function = crea un bloque reutilizable de instrucciones.
  // getState = nombre de la función que agrupa esta parte del proceso.
  function getState() {
    return state;
  }

  // getMetrics = nombre de la función que agrupa esta parte del proceso.
  function getMetrics() {
    // return = devuelve un resultado o finaliza la ejecución de la función actual.
    return { ...metrics, state, initialized, destroyed, runToken };
  }

  // const = crea una variable que no será reasignada.
  // api = nombre de la variable utilizada para guardar este dato o referencia.
  // let = crea una variable cuyo valor puede cambiar.
  const api = Object.freeze({ init, play, replay, pause, resume, complete, destroy, getState, getMetrics });
  return api;
}

export { STATES, validateLogoMap };
