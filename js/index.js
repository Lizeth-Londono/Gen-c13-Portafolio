// import = permite utilizar código exportado desde otro archivo.
// createLihenReveal = función que se importa para utilizarla en este archivo.
import { createLihenReveal } from "./lihen-reveal.js";

// ========================================
// INTEGRACIÓN INICIO - LXL -> REVEAL -> HERO
// ========================================

// Aquí se obtienen los elementos que participan en la experiencia de Inicio.
// const = crea una variable que no será reasignada.
// inicio = nombre de la variable utilizada para guardar este dato o referencia.
// querySelector = busca el primer elemento que coincide con el selector.
// "#inicio" = selector utilizado para identificar el elemento dentro del documento.
const inicio = document.querySelector("#inicio");
// experiencia = nombre de la variable utilizada para guardar este dato o referencia.
// "[data-inicio-experiencia]" = selector utilizado para identificar el elemento dentro del documento.
const experiencia = document.querySelector("[data-inicio-experiencia]");
// lxlInicial = nombre de la variable utilizada para guardar este dato o referencia.
// "[data-inicio-lxl-inicial]" = selector utilizado para identificar el elemento dentro del documento.
const lxlInicial = document.querySelector("[data-inicio-lxl-inicial]");
// const = crea una variable que no será reasignada.
// revealRoot = nombre de la variable utilizada para guardar este dato o referencia.
// querySelector = busca el primer elemento que coincide con el selector.
// "[data-lihen-reveal]" = selector utilizado para identificar el elemento dentro del documento.
const revealRoot = document.querySelector("[data-lihen-reveal]");

// Aquí se consulta si el usuario prefiere reducir las animaciones.
// reduceMotion = nombre de la variable utilizada para guardar este dato o referencia.
// matchMedia = consulta si el navegador cumple una condición de medios CSS.
const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

// let = crea una variable cuyo valor puede cambiar.
// reveal = nombre de la variable utilizada para guardar este dato o referencia.
let reveal = null;
// revealIniciado = nombre de la variable utilizada para guardar este dato o referencia.
let revealIniciado = false;
// experienciaFinalizada = nombre de la variable utilizada para guardar este dato o referencia.
let experienciaFinalizada = false;
// inicioVisible = nombre de la variable utilizada para guardar este dato o referencia.
let inicioVisible = true;

// function = crea un bloque reutilizable de instrucciones.
// ocultarExperiencia = nombre de la función que agrupa esta parte del proceso.
function ocultarExperiencia() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (!experiencia) {

        return;
    }

    // hidden = indica si el elemento debe permanecer oculto en la interfaz.
    experiencia.hidden = true;
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    experiencia.classList.remove(
        "inicio-experiencia--inicial",
        "inicio-experiencia--reveal",
        "inicio-experiencia--finalizando",
        "inicio-experiencia--pausada"
    );
}

// function = crea un bloque reutilizable de instrucciones.
// mostrarHeroFinal = nombre de la función que agrupa esta parte del proceso.
function mostrarHeroFinal() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (!experiencia || experienciaFinalizada) {

        return;
    }

    experienciaFinalizada = true;
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    experiencia.classList.add("inicio-experiencia--finalizando");

    // const = crea una variable que no será reasignada.
    // terminarTransicion = nombre de la variable utilizada para guardar este dato o referencia.
    const terminarTransicion = (event) => {
        // if = ejecuta este bloque únicamente cuando la condición se cumple.
        if (event.target !== experiencia || event.propertyName !== "opacity") {

            return;
        }

        experiencia.removeEventListener("transitionend", terminarTransicion);
        ocultarExperiencia();
    };

    // addEventListener = escucha un evento para ejecutar una acción cuando ocurra.
    experiencia.addEventListener("transitionend", terminarTransicion);
}

// function = crea un bloque reutilizable de instrucciones.
// iniciarReveal = nombre de la función que agrupa esta parte del proceso.
function iniciarReveal() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (!revealRoot || revealIniciado || experienciaFinalizada) {

        return;
    }

    revealIniciado = true;
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    experiencia.classList.remove("inicio-experiencia--inicial");
    experiencia.classList.add("inicio-experiencia--reveal");

    reveal = createLihenReveal(revealRoot, {
        // autoplay = indica si la animación inicia automáticamente.
        // false = valor asignado a esta propiedad.
        autoplay: false,
        // showReplay = indica si se muestra el control para repetir la animación.
        // false = valor asignado a esta propiedad.
        showReplay: false,
        // onComplete = guarda la función que se ejecuta cuando la animación termina.
        // mostrarHeroFinal = valor asignado a esta propiedad.
        onComplete: mostrarHeroFinal
    });

    reveal.init();
    reveal.play();

    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (!inicioVisible) {

        reveal.pause();
    }
}

// function = crea un bloque reutilizable de instrucciones.
// pausarInicio = nombre de la función que agrupa esta parte del proceso.
function pausarInicio() {
    inicioVisible = false;

    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    experiencia?.classList.add("inicio-experiencia--pausada");
    reveal?.pause();
}

// function = crea un bloque reutilizable de instrucciones.
// reanudarInicio = nombre de la función que agrupa esta parte del proceso.
function reanudarInicio() {
    inicioVisible = true;

    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    experiencia?.classList.remove("inicio-experiencia--pausada");
    reveal?.resume();
}

// function = crea un bloque reutilizable de instrucciones.
// prepararExperiencia = nombre de la función que agrupa esta parte del proceso.
function prepararExperiencia() {
    // if = ejecuta este bloque únicamente cuando la condición se cumple.
    if (!inicio || !experiencia || !lxlInicial || !revealRoot) {

        return;
    }

    // Con movimiento reducido se conserva directamente el Hero final.
    if (reduceMotion?.matches) {
        ocultarExperiencia();
        // return = devuelve un resultado o finaliza la ejecución de la función actual.
        return;
    }

    // hidden = indica si el elemento debe permanecer oculto en la interfaz.
    experiencia.hidden = false;
    // classList = permite agregar, quitar o consultar clases CSS del elemento.
    experiencia.classList.add("inicio-experiencia--inicial");

    // Aquí el final de la animación LXL inicia el componente LIHEN Reveal.
    // addEventListener = escucha un evento para ejecutar una acción cuando ocurra.
    lxlInicial.addEventListener("animationend", (event) => {
        // if = ejecuta este bloque únicamente cuando la condición se cumple.
        if (event.animationName !== "inicio-lxl-presentacion") {

            return;
        }
        iniciarReveal();
    }, { once: true });

    // Aquí se controla si Inicio entra o sale de la pantalla.
    // const = crea una variable que no será reasignada.
    // observer = nombre de la variable utilizada para guardar este dato o referencia.
    // IntersectionObserver = observa cuándo un elemento entra o sale del área visible.
    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        // visible = nombre de la variable utilizada para guardar este dato o referencia.
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        // if = ejecuta este bloque únicamente cuando la condición se cumple.
        if (visible) {

            reanudarInicio();
        }
        // else = ejecuta una alternativa cuando la condición anterior no se cumple.
        else pausarInicio();
    }, {
        // threshold = define los niveles de visibilidad que observa IntersectionObserver.
        // [0, 0.35, 1] = valor asignado a esta propiedad.
        threshold: [0, 0.35, 1]
    });

    observer.observe(inicio);
}

prepararExperiencia();
