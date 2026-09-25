// ========================================
// INTEGRACIÓN INICIO — LXL -> HERO
// ========================================

// Aquí se prepara la entrada breve de identidad LXL antes de mostrar el Hero.
// La secuencia actual es:
// LXL / CODE X LIHEN
// → animación inicial
// → transición breve
// → Hero final.
//
// El antiguo Pixel Code Reveal ya no forma parte del flujo activo,
// por eso aquí no se crean retículas adicionales ni animaciones de caracteres.

// Aquí se obtiene la sección Inicio porque será la referencia
// para controlar la experiencia inicial y su visibilidad.
const inicio = document.querySelector("#inicio");

// Aquí se obtiene la capa temporal que muestra la identidad LXL
// antes de dejar visible el Hero principal.
const experiencia = document.querySelector("[data-inicio-experiencia]");

// Aquí se obtiene el elemento que reproduce la animación inicial LXL.
// Su evento animationend será el punto de salida hacia el Hero.
const lxlInicial = document.querySelector("[data-inicio-lxl-inicial]");

// Aquí se consulta si la persona tiene activada la preferencia
// de reducir movimiento en su sistema.
// Si está activa, se evita reproducir la animación inicial.
const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

// Aquí se guarda si la experiencia inicial ya terminó.
// Esto evita volver a ejecutar el cierre más de una vez.
let experienciaFinalizada = false;

// Aquí se conserva si Inicio está suficientemente visible en pantalla.
// Este estado se actualiza cuando IntersectionObserver detecta
// que la persona entra o sale de la sección.
let inicioVisible = true;


// ========================================
// OCULTAR EXPERIENCIA TEMPORAL
// ========================================

// Aquí se oculta definitivamente la capa temporal LXL
// cuando termina su transición de salida.
// También se eliminan sus clases temporales para dejar limpio el estado.
function ocultarExperiencia() {

    // Si la capa no existe, se evita continuar para no generar errores.
    if (!experiencia) {
        return;
    }

    // hidden retira la experiencia temporal una vez el Hero ya debe quedar visible.
    experiencia.hidden = true;

    // Aquí se limpian las clases utilizadas durante la entrada,
    // la salida y una posible pausa de la experiencia.
    experiencia.classList.remove(
        "inicio-experiencia--inicial",
        "inicio-experiencia--finalizando",
        "inicio-experiencia--pausada"
    );
}


// ========================================
// MOSTRAR HERO FINAL
// ========================================

// Aquí se inicia la transición desde la capa LXL hacia el Hero final.
// El Hero ya existe debajo de la experiencia temporal,
// por eso no se reconstruye ni se modifica su contenido.
function mostrarHeroFinal() {

    // Si la experiencia no existe o ya finalizó,
    // se evita repetir la transición.
    if (!experiencia || experienciaFinalizada) {
        return;
    }

    // Aquí se marca que el cierre ya comenzó.
    experienciaFinalizada = true;

    // Esta clase inicia el desvanecimiento visual de la capa LXL.
    experiencia.classList.add("inicio-experiencia--finalizando");

    // Aquí se espera únicamente el final de la transición de opacity
    // perteneciente a la experiencia principal.
    const terminarTransicion = (event) => {

        // transitionend también puede producirse por otras propiedades
        // o elementos internos. En este caso solo interesa opacity
        // de la propia capa experiencia.
        if (event.target !== experiencia || event.propertyName !== "opacity") {
            return;
        }

        // Cuando termina la transición correcta, se elimina el listener
        // para no conservarlo innecesariamente.
        experiencia.removeEventListener("transitionend", terminarTransicion);

        // Después se oculta definitivamente la capa LXL
        // y el Hero queda disponible debajo.
        ocultarExperiencia();
    };

    // Aquí se escucha el final de la transición de salida.
    experiencia.addEventListener("transitionend", terminarTransicion);
}


// ========================================
// PAUSA Y REANUDACIÓN DE INICIO
// ========================================

// Aquí se marca que Inicio dejó de estar suficientemente visible
// y se agrega la clase que pausa la experiencia visual.
function pausarInicio() {

    inicioVisible = false;

    experiencia?.classList.add("inicio-experiencia--pausada");
}

// Aquí se marca que Inicio volvió a estar visible
// y se retira la pausa de la experiencia.
function reanudarInicio() {

    inicioVisible = true;

    experiencia?.classList.remove("inicio-experiencia--pausada");
}


// ========================================
// PREPARAR EXPERIENCIA
// ========================================

// Aquí se configura la entrada LXL aprobada antes del Hero.
// También se respeta prefers-reduced-motion y se controla
// si la experiencia debe pausarse cuando Inicio deja de estar visible.
function prepararExperiencia() {

    // Si falta alguna parte esencial de la estructura,
    // se evita iniciar una experiencia incompleta.
    if (!inicio || !experiencia || !lxlInicial) {
        return;
    }

    // Si la persona prefiere reducir movimiento,
    // se omite la animación inicial y el Hero queda disponible directamente.
    if (reduceMotion?.matches) {

        ocultarExperiencia();

        return;
    }

    // Aquí se vuelve visible la capa temporal LXL
    // antes de iniciar su presentación.
    experiencia.hidden = false;

    // Esta clase activa la animación inicial definida en CSS.
    experiencia.classList.add("inicio-experiencia--inicial");

    // Aquí se espera únicamente a que termine la animación principal LXL.
    // animationName evita reaccionar a otra animación y once: true
    // impide que este listener se ejecute más de una vez.
    lxlInicial.addEventListener("animationend", (event) => {

        if (event.animationName !== "inicio-lxl-presentacion") {
            return;
        }

        // Cuando termina la presentación breve,
        // aquí comienza la transición hacia el Hero final.
        mostrarHeroFinal();

    }, { once: true });

    // Aquí IntersectionObserver detecta cuándo Inicio entra o sale
    // de una parte significativa del viewport.
    // Esto permite pausar o reanudar la experiencia sin escuchar
    // continuamente cada movimiento del scroll.
    const observer = new IntersectionObserver((entries) => {

        // Solo se observa Inicio, por eso se utiliza la primera entrada recibida.
        const [entry] = entries;

        // Inicio debe estar intersectando y alcanzar al menos 35% de visibilidad
        // para considerarse suficientemente presente en pantalla.
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (visible) {

            // Si cumple la condición, la experiencia puede continuar.
            reanudarInicio();

        } else {

            // Si la persona ya salió de Inicio,
            // aquí se pausa la experiencia visual.
            pausarInicio();
        }

    }, {

        // Estos thresholds permiten detectar la entrada,
        // el punto de 35% y la visibilidad completa de Inicio.
        threshold: [0, 0.35, 1]

    });

    // Aquí se comienza a observar la sección Inicio.
    observer.observe(inicio);
}

// Aquí se inicializa la experiencia LXL → Hero al cargar el archivo.
prepararExperiencia();



// ========================================
// NAVEGACIÓN ACTIVA — SCROLL SPY
// ========================================

// Aquí se mantiene resaltado en el navbar el enlace
// correspondiente a la sección que la persona está recorriendo.
// IntersectionObserver permite detectar el paso de cada sección
// por una franja útil del viewport sin hacer cálculos pesados
// en cada movimiento normal del scroll.
function prepararNavegacionActiva() {

    // Aquí se buscan únicamente los enlaces internos del navbar.
    // Array.from permite trabajar con el resultado como un arreglo normal.
    const enlacesNavegacion = Array.from(
        document.querySelectorAll('.navegacion-lista a[href^="#"]')
    );

    // Si no existen enlaces internos, no hay scroll spy que configurar.
    if (enlacesNavegacion.length === 0) {
        return;
    }

    // Aquí cada href se convierte en un ID de sección.
    // Después getElementById busca la sección real y filter(Boolean)
    // elimina cualquier referencia que no exista en el documento.
    const seccionesNavegacion = enlacesNavegacion
        .map((enlace) => {

            const idSeccion = enlace.getAttribute("href")?.slice(1);

            return idSeccion ? document.getElementById(idSeccion) : null;
        })
        .filter(Boolean);

    // Si ningún enlace pudo relacionarse con una sección real,
    // se evita continuar.
    if (seccionesNavegacion.length === 0) {
        return;
    }

    // Aquí se guarda el ID de la sección activa actualmente.
    // Esto evita repetir cambios si el observer vuelve a detectar la misma sección.
    let seccionActiva = "";

    // Aquí se centraliza el estado activo del navbar.
    // Solo un enlace conserva is-active y aria-current="location".
    function activarSeccion(idSeccion) {

        // Si no existe un ID válido o ya está activo,
        // no es necesario volver a recorrer el navbar.
        if (!idSeccion || idSeccion === seccionActiva) {
            return;
        }

        enlacesNavegacion.forEach((enlace) => {

            // Aquí se comprueba si el href del enlace
            // corresponde exactamente con la sección solicitada.
            const esEnlaceActivo =
                enlace.getAttribute("href") === `#${idSeccion}`;

            // CSS utiliza is-active para mantener el texto Tropical Mint
            // y el underline permanente mientras esta sección está activa.
            enlace.classList.toggle("is-active", esEnlaceActivo);

            if (esEnlaceActivo) {

                // aria-current="location" comunica a tecnologías de asistencia
                // cuál enlace representa la ubicación actual.
                enlace.setAttribute("aria-current", "location");

            } else {

                // Los demás enlaces pierden aria-current
                // para que solo exista una ubicación activa.
                enlace.removeAttribute("aria-current");
            }
        });

        // Aquí se guarda la nueva sección activa
        // después de actualizar todos los enlaces.
        seccionActiva = idSeccion;
    }

    // Aquí se obtiene el hash inicial sin el símbolo #.
    // Esto permite comprobar si la página abrió directamente
    // apuntando a una sección como #proyectos.
    const idInicial = window.location.hash.slice(1);

    // some() comprueba si ese ID realmente pertenece
    // a una de las secciones configuradas en la navegación.
    const seccionInicialExiste = seccionesNavegacion.some(
        (seccion) => seccion.id === idInicial
    );

    // Si el hash es válido, esa sección queda activa desde el inicio.
    // Si no existe o está vacío, se utiliza la primera sección: Inicio.
    activarSeccion(
        seccionInicialExiste
            ? idInicial
            : seccionesNavegacion[0].id
    );

    // Aquí cada click actualiza inmediatamente el estado visual del navbar.
    // No se utiliza preventDefault, por eso el anchor conserva su comportamiento
    // normal y el navegador sigue desplazándose hacia la sección correspondiente.
    enlacesNavegacion.forEach((enlace) => {

        enlace.addEventListener("click", () => {

            const idSeccion = enlace.getAttribute("href")?.slice(1);

            activarSeccion(
                idSeccion
            );
        });
    });

    // Aquí se observa una franja útil del viewport.
    // Así una sección no queda activa solo porque aparecen
    // unos pocos píxeles en la parte superior o inferior.
    const observadorSecciones = new IntersectionObserver(
        (entradas) => {

            // Aquí se conservan únicamente las secciones
            // que actualmente están intersectando la zona observada.
            const visibles = entradas
                .filter((entrada) => entrada.isIntersecting)

                // Si más de una sección entra en la zona al mismo tiempo,
                // se ordenan según su distancia al punto vertical de referencia.
                .sort((a, b) => {

                    // Este punto corresponde al 35% de la altura del viewport
                    // y funciona como referencia para decidir cuál sección
                    // está más cerca de la posición principal de lectura.
                    const centroViewport =
                        window.innerHeight * 0.35;

                    // Math.abs permite comparar únicamente la distancia,
                    // sin importar si la sección está por encima o por debajo.
                    const distanciaA =
                        Math.abs(
                            a.boundingClientRect.top
                            - centroViewport
                        );

                    const distanciaB =
                        Math.abs(
                            b.boundingClientRect.top
                            - centroViewport
                        );

                    return distanciaA - distanciaB;
                });

            // Si existe por lo menos una sección visible,
            // se activa la que quedó más cerca del punto de referencia.
            if (visibles.length > 0) {

                activarSeccion(
                    visibles[0].target.id
                );
            }
        },
        {
            // root: null indica que el viewport del navegador
            // funciona como área de referencia del observer.
            root: null,

            // rootMargin concentra la zona útil en una franja interna del viewport.
            // De esta forma una nueva sección no se marca activa
            // apenas aparecen unos pocos píxeles en un borde de la pantalla.
            rootMargin: "-24% 0px -56% 0px",

            // threshold: 0 funciona junto con rootMargin.
            // La entrada comienza a considerarse cuando toca
            // la franja útil definida por esos márgenes.
            threshold: 0
        }
    );

    // Aquí se empiezan a observar todas las secciones
    // relacionadas con los enlaces del navbar.
    seccionesNavegacion.forEach((seccion) => {

        observadorSecciones.observe(
            seccion
        );
    });


    // ========================================
    // CONTROL DEL INICIO Y FINAL DE LA PÁGINA
    // ========================================

    // Aquí se resuelven dos casos especiales del scroll spy:
    // 1. cuando la persona está prácticamente arriba, Inicio debe quedar activo;
    // 2. cuando llega prácticamente al final, Contacto debe quedar activo
    //    aunque su sección no alcance a cruzar completamente la franja central.
    function actualizarExtremosNavegacion() {

        // scrollY <= 8 considera que estamos prácticamente
        // en la parte superior del documento.
        const cercaDelInicio =
            window.scrollY <= 8;

        // Aquí se compara la parte inferior visible del viewport
        // con la altura total del documento.
        // El margen de 8 px permite reconocer el final sin exigir
        // una coincidencia matemática exacta.
        const cercaDelFinal =
            window.innerHeight + window.scrollY
            >= document.documentElement.scrollHeight - 8;

        if (cercaDelInicio) {

            // Si estamos arriba, Inicio tiene prioridad.
            activarSeccion(
                seccionesNavegacion[0].id
            );

            return;
        }

        if (cercaDelFinal) {

            // Si llegamos al final, se activa la última sección,
            // que corresponde a Contacto.
            activarSeccion(
                seccionesNavegacion[
                    seccionesNavegacion.length - 1
                ].id
            );
        }
    }

    // Este listener de scroll únicamente comprueba los extremos del documento.
    // La detección normal entre secciones continúa a cargo de IntersectionObserver.
    window.addEventListener(
        "scroll",
        actualizarExtremosNavegacion,
        {
            // passive: true indica que este listener solo observa el scroll
            // y no necesita cancelar su comportamiento.
            // Así el navegador puede gestionar el desplazamiento normalmente.
            passive: true
        }
    );

    // Aquí se valida también el estado inicial.
    // Esto cubre casos donde la página ya abre desplazada
    // o directamente posicionada mediante un hash.
    actualizarExtremosNavegacion();
}

// Aquí se inicializa el scroll spy del navbar.
prepararNavegacionActiva();

// Personaje LXL interactivo — módulo independiente.
import("./lxl-character.js");
