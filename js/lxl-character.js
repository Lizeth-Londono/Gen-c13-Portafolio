// ========================================
// PERSONAJE LXL — ACOMPAÑANTE INTERACTIVO
// ========================================
//
// Este módulo administra únicamente el personaje decorativo LXL.
// No modifica index.js, project-cards.js ni skills-cards.js.
// El personaje no captura clics: acompaña visualmente el recorrido.

const SECTION_IDS = ["sobre-mi", "proyectos", "habilidades", "contacto"];

function prepararPersonajeLXL() {
    const secciones = SECTION_IDS
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    if (secciones.length !== SECTION_IDS.length) {
        return;
    }

    if (document.querySelector("[data-lxl-character]")) {
        return;
    }

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia?.("(max-width: 600px)");
    const tablet = window.matchMedia?.("(max-width: 900px)");

    const layer = document.createElement("div");
    layer.className = "lxl-character-layer";
    layer.setAttribute("aria-hidden", "true");

    const personaje = document.createElement("div");
    personaje.className = "lxl-character";
    personaje.dataset.lxlCharacter = "";
    personaje.dataset.state = "idle";

    personaje.innerHTML = `
        <div class="lxl-character__float">
            <span class="lxl-character__signal"></span>
            <span class="lxl-character__pixel lxl-character__pixel--a"></span>
            <span class="lxl-character__pixel lxl-character__pixel--b"></span>
            <span class="lxl-character__pixel lxl-character__pixel--c"></span>

            <div class="lxl-character__core">
                <span class="lxl-character__eye lxl-character__eye--left"></span>
                <span class="lxl-character__eye lxl-character__eye--right"></span>
                <span class="lxl-character__mouth"></span>
            </div>
        </div>
    `;

    layer.appendChild(personaje);
    document.body.prepend(layer);

    let ticking = false;
    let stateTimer = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTrailAt = 0;

    function actualizarAlturaLayer() {
        const alturaDocumento = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );

        layer.style.setProperty(
            "--lxl-character-document-height",
            `${alturaDocumento}px`
        );
    }

    function cambiarEstado(estado, duracion = 0) {
        window.clearTimeout(stateTimer);
        personaje.dataset.state = estado;

        if (duracion > 0) {
            stateTimer = window.setTimeout(() => {
                personaje.dataset.state = "idle";
            }, duracion);
        }
    }

    function obtenerAnclas() {
        const ancho = personaje.getBoundingClientRect().width || 82;

        return secciones.map((seccion, index) => {
            const rect = seccion.getBoundingClientRect();
            const topDocumento = rect.top + window.scrollY;
            const ladoDerecho = index % 2 === 1;

            const xIzquierda = Math.max(
                18,
                rect.left + Math.min(34, rect.width * 0.035)
            );

            const xDerecha = Math.min(
                window.innerWidth - ancho - 18,
                rect.right - ancho - Math.min(34, rect.width * 0.035)
            );

            const y = topDocumento + Math.min(
                Math.max(rect.height * 0.34, 150),
                Math.max(150, rect.height - 130)
            );

            return {
                x: ladoDerecho ? xDerecha : xIzquierda,
                y
            };
        });
    }

    function crearEstela(x, y, velocidad) {
        if (
            reduceMotion?.matches
            || mobile?.matches
            || velocidad < 7
        ) {
            return;
        }

        const ahora = performance.now();
        const intervalo = tablet?.matches ? 260 : 190;

        if (ahora - lastTrailAt < intervalo) {
            return;
        }

        lastTrailAt = ahora;

        const pixel = document.createElement("span");
        pixel.className = "lxl-character-trail";

        const colores = [
            "var(--color-tecnologia)",
            "#AC9CCF",
            "var(--color-accion)"
        ];

        const indiceColor = Math.floor(Math.random() * colores.length);
        const size = 4 + Math.floor(Math.random() * 4);

        pixel.style.setProperty("--lxl-trail-size", `${size}px`);
        pixel.style.setProperty("--lxl-trail-color", colores[indiceColor]);
        pixel.style.left = `${x + 38 + (Math.random() - 0.5) * 12}px`;
        pixel.style.top = `${y + 38 + (Math.random() - 0.5) * 12}px`;

        layer.appendChild(pixel);

        pixel.addEventListener(
            "animationend",
            () => pixel.remove(),
            { once: true }
        );
    }

    function actualizarPersonaje() {
        ticking = false;
        actualizarAlturaLayer();

        const anclas = obtenerAnclas();
        const centroLectura = window.scrollY + window.innerHeight * 0.5;

        const inicioRecorrido = secciones[0].offsetTop;
        const finalRecorrido =
            secciones[secciones.length - 1].offsetTop
            + secciones[secciones.length - 1].offsetHeight;

        if (
            centroLectura < inicioRecorrido - window.innerHeight * 0.15
            || centroLectura > finalRecorrido + window.innerHeight * 0.2
        ) {
            personaje.classList.remove("is-visible");
            return;
        }

        personaje.classList.add("is-visible");

        let segmento = 0;

        for (let index = 0; index < secciones.length - 1; index += 1) {
            if (centroLectura >= secciones[index + 1].offsetTop) {
                segmento = index + 1;
            }
        }

        const siguiente = Math.min(segmento + 1, anclas.length - 1);
        const inicioSegmento = secciones[segmento].offsetTop;
        const finalSegmento =
            siguiente === segmento
                ? inicioSegmento + 1
                : secciones[siguiente].offsetTop;

        const progreso = Math.max(
            0,
            Math.min(
                1,
                (centroLectura - inicioSegmento)
                / (finalSegmento - inicioSegmento)
            )
        );

        const suavizado = progreso * progreso * (3 - 2 * progreso);
        const arco = Math.sin(progreso * Math.PI)
            * (segmento % 2 === 0 ? 22 : -22);

        const x =
            anclas[segmento].x
            + (anclas[siguiente].x - anclas[segmento].x) * suavizado
            + arco;

        const y =
            anclas[segmento].y
            + (anclas[siguiente].y - anclas[segmento].y) * suavizado;

        const velocidad = Math.hypot(x - lastX, y - lastY);

        personaje.style.setProperty("--lxl-character-x", `${x}px`);
        personaje.style.setProperty("--lxl-character-y", `${y}px`);
        personaje.style.setProperty(
            "--lxl-character-rotation",
            `${(progreso - 0.5) * 3}deg`
        );

        if (lastX || lastY) {
            crearEstela(lastX, lastY, velocidad);
        }

        lastX = x;
        lastY = y;

        if (personaje.dataset.state === "idle") {
            const estadosBase = ["hello", "coding", "focus", "success"];
            personaje.dataset.state = estadosBase[segmento] || "idle";
        }
    }

    function solicitarActualizacion() {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(actualizarPersonaje);
    }

    function vincularReaccion(selector, estado) {
        document.querySelectorAll(selector).forEach((elemento) => {
            elemento.addEventListener("mouseenter", () => {
                cambiarEstado(estado);
            });

            elemento.addEventListener("mouseleave", () => {
                cambiarEstado("idle", 80);
            });

            elemento.addEventListener("focusin", () => {
                cambiarEstado(estado);
            });

            elemento.addEventListener("focusout", () => {
                cambiarEstado("idle", 80);
            });
        });
    }

    vincularReaccion("#proyectos .project-flip-card", "coding");
    vincularReaccion("#habilidades .skill-card", "curious");
    vincularReaccion("#contacto a", "success");
    vincularReaccion(
        "#sobre-mi .sobre-mi-canal-visual__icono",
        "idea"
    );

    document
        .querySelectorAll("#sobre-mi .sobre-mi-fiel-contacto__foto")
        .forEach((foto) => {
            foto.addEventListener("mouseenter", () => {
                cambiarEstado("hello");
                personaje.style.setProperty("--lxl-character-scale", "1.06");
            });

            foto.addEventListener("mouseleave", () => {
                personaje.style.setProperty("--lxl-character-scale", "1");
                cambiarEstado("idle", 100);
            });
        });

    window.addEventListener(
        "scroll",
        solicitarActualizacion,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        solicitarActualizacion,
        { passive: true }
    );

    if (mobile?.matches && "IntersectionObserver" in window) {
        const estadosMobile = ["hello", "coding", "focus", "success"];

        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (!entrada.isIntersecting) {
                        return;
                    }

                    const indice = secciones.indexOf(entrada.target);
                    cambiarEstado(estadosMobile[indice] || "idle", 900);
                    solicitarActualizacion();
                });
            },
            { threshold: 0.25 }
        );

        secciones.forEach((seccion) => observador.observe(seccion));
    }

    solicitarActualizacion();
}

prepararPersonajeLXL();
