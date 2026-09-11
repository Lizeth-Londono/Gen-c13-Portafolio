// ========================================
// INTEGRACIÓN INICIO — LXL -> HERO
// ========================================

/*
    Esta lógica conserva únicamente la entrada breve de identidad LXL
    antes de mostrar el Hero principal.

    El componente LIHEN Pixel Code Reveal fue retirado del flujo activo.
    Por tanto, la secuencia actual es:

    LXL / CODE X LIHEN
    -> transición breve
    -> Hero final

    No se crean retículas adicionales ni animaciones de caracteres.
*/

const inicio = document.querySelector("#inicio");
const experiencia = document.querySelector("[data-inicio-experiencia]");
const lxlInicial = document.querySelector("[data-inicio-lxl-inicial]");

const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

let experienciaFinalizada = false;
let inicioVisible = true;

// ========================================
// OCULTAR EXPERIENCIA TEMPORAL
// ========================================

/*
    Esta función retira la capa temporal de identidad una vez
    finaliza la transición hacia el Hero.
*/
function ocultarExperiencia() {
    if (!experiencia) {
        return;
    }

    experiencia.hidden = true;
    experiencia.classList.remove(
        "inicio-experiencia--inicial",
        "inicio-experiencia--finalizando",
        "inicio-experiencia--pausada"
    );
}

// ========================================
// MOSTRAR HERO FINAL
// ========================================

/*
    Esta función inicia el desvanecimiento de la capa LXL.
    El Hero ya existe debajo de la experiencia temporal,
    por lo que no necesita reconstruirse ni modificarse.
*/
function mostrarHeroFinal() {
    if (!experiencia || experienciaFinalizada) {
        return;
    }

    experienciaFinalizada = true;
    experiencia.classList.add("inicio-experiencia--finalizando");

    const terminarTransicion = (event) => {
        if (event.target !== experiencia || event.propertyName !== "opacity") {
            return;
        }

        experiencia.removeEventListener("transitionend", terminarTransicion);
        ocultarExperiencia();
    };

    experiencia.addEventListener("transitionend", terminarTransicion);
}

// ========================================
// PAUSA Y REANUDACIÓN DE INICIO
// ========================================

function pausarInicio() {
    inicioVisible = false;
    experiencia?.classList.add("inicio-experiencia--pausada");
}

function reanudarInicio() {
    inicioVisible = true;
    experiencia?.classList.remove("inicio-experiencia--pausada");
}

// ========================================
// PREPARAR EXPERIENCIA
// ========================================

/*
    Esta función conserva la entrada LXL aprobada y elimina
    cualquier dependencia del antiguo Pixel Code Reveal.
*/
function prepararExperiencia() {
    if (!inicio || !experiencia || !lxlInicial) {
        return;
    }

    if (reduceMotion?.matches) {
        ocultarExperiencia();
        return;
    }

    experiencia.hidden = false;
    experiencia.classList.add("inicio-experiencia--inicial");

    /*
        Cuando termina la presentación breve de LXL,
        se pasa directamente al Hero final.
    */
    lxlInicial.addEventListener("animationend", (event) => {
        if (event.animationName !== "inicio-lxl-presentacion") {
            return;
        }
        mostrarHeroFinal();
    }, { once: true });

    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (visible) {
            reanudarInicio();
        } else {
            pausarInicio();
        }
    }, {
        threshold: [0, 0.35, 1]
    });

    observer.observe(inicio);
}

prepararExperiencia();
