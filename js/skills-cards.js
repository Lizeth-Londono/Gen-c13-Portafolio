// ========================================
// CARDS DE HABILIDADES — GIRO + EVIDENCIA GITHUB
// ========================================

// Aquí se buscan todas las cards de Habilidades dentro de la sección Habilidades.
const skillCards = document.querySelectorAll(
    "#habilidades .skill-card"
);


// ========================================
// CACHÉ COMPARTIDO DE GITHUB
// ========================================

// Aquí se reutiliza el mismo caché global que utiliza project-cards.js.
//
// Esto evita repetir solicitudes a GitHub durante una misma carga
// cuando diferentes componentes necesitan consultar el mismo endpoint.
if (!window.__lihenGithubCache) {
    window.__lihenGithubCache = new Map();
}

// Aquí se guarda una referencia corta al caché compartido.
const githubCache = window.__lihenGithubCache;


// ========================================
// CONFIGURACIÓN DE EVIDENCIA POR HABILIDAD
// ========================================

// IMPORTANTE:
//
// Esta configuración NO representa nivel de dominio.
//
// type = "language"
// → GitHub sí devuelve un porcentaje real mediante /languages.
//
// type = "repository"
// → existe evidencia pública relacionada con la tecnología,
//   pero GitHub no proporciona un porcentaje equivalente.
//
// type = "repository-note"
// → existe evidencia contextual del trabajo realizado,
//   sin convertirla artificialmente en una métrica porcentual.
const SKILL_EVIDENCE = {

    java: {
        repository: "Lizeth-Londono/Gen-c13-Cowork",
        type: "language",
        language: "Java",
        description:
            "Java utilizado dentro de un proyecto backend del bootcamp."
    },

    javascript: {
        repository:
            "jorgegutierrezvallejo/ProyectoFinalJava13-Grupo6",
        type: "language",
        language: "JavaScript",
        description:
            "JavaScript utilizado en el proyecto colaborativo HuellaVet."
    },

    html: {
        repository:
            "jorgegutierrezvallejo/ProyectoFinalJava13-Grupo6",
        type: "language",
        language: "HTML",
        description:
            "HTML utilizado en las interfaces del proyecto HuellaVet."
    },

    css: {
        repository:
            "jorgegutierrezvallejo/ProyectoFinalJava13-Grupo6",
        type: "language",
        language: "CSS",
        description:
            "CSS utilizado en la presentación visual del proyecto HuellaVet."
    },

    bootstrap: {
        repository:
            "Lizeth-Londono/gen-c13-Taller-Bootstrap",
        type: "repository",
        description:
            "Repositorio de práctica donde Bootstrap está integrado mediante CDN y clases del framework."
    },

    postgresql: {
        repository:
            "Lizeth-Londono/Gen-c13-Cowork",
        type: "repository",
        description:
            "Proyecto Maven con dependencia del driver oficial de PostgreSQL."
    },

    git: {
        repository:
            "jorgegutierrezvallejo/ProyectoFinalJava13-Grupo6",
        type: "repository-note",
        description:
            "Proyecto desarrollado y versionado mediante Git dentro de un flujo colaborativo."
    },

    github: {
        repository:
            "jorgegutierrezvallejo/ProyectoFinalJava13-Grupo6",
        type: "repository-note",
        description:
            "Repositorio público colaborativo utilizado como evidencia de trabajo con GitHub."
    },

    springboot: {
        repository:
            "Lizeth-Londono/Gen-c13-Cowork",
        type: "repository",
        description:
            "Proyecto Maven con Spring Boot, Spring Web MVC y Spring Data JPA."
    },

    scrum: {
        repository:
            "jorgegutierrezvallejo/ProyectoFinalJava13-Grupo6",
        type: "repository-note",
        description:
            "HuellaVet documenta trabajo colaborativo y uso de Trello. Esta evidencia no se presenta como certificación formal de Scrum."
    }
};


// ========================================
// COLORES VISUALES POR HABILIDAD
// ========================================

// Estos colores identifican visualmente cada tecnología.
//
// NO representan nivel de conocimiento.
const SKILL_ACCENT_COLORS = {

    java: "#e76f00",

    javascript: "#f7df1e",

    html: "#e34f26",

    css: "#1572b6",

    bootstrap: "#7952b3",

    postgresql: "#336791",

    git: "#f05032",

    github: "#24292f",

    springboot: "#6db33f",

    scrum: "#5b8def"
};


// ========================================
// FUNCIÓN — CONSULTAR GITHUB CON CACHÉ
// ========================================

// Aquí se realiza una consulta pública a GitHub.
//
// No se utiliza ningún token privado.
//
// La Promise queda guardada en caché para evitar
// solicitudes duplicadas durante la misma carga.
async function fetchGitHubJson(url) {

    // Si esta consulta ya existe,
    // se reutiliza la respuesta.
    if (githubCache.has(url)) {
        return githubCache.get(url);
    }


    // Aquí se crea la solicitud.
    const request = fetch(
        url,
        {
            headers: {
                Accept: "application/vnd.github+json"
            }
        }
    )
        .then(
            async function (response) {

                // Si GitHub devuelve un error HTTP,
                // se genera un error controlado.
                if (!response.ok) {

                    throw new Error(
                        `GitHub respondió con estado ${response.status}`
                    );
                }


                // Aquí se convierte la respuesta a JSON.
                return response.json();
            }
        )

        .catch(
            function (error) {

                // Si la consulta falla,
                // se elimina del caché.
                //
                // De esta forma una carga futura
                // podrá volver a intentarlo.
                githubCache.delete(url);

                throw error;
            }
        );


    // Aquí se almacena la solicitud.
    githubCache.set(
        url,
        request
    );


    return request;
}


// ========================================
// FUNCIÓN — CALCULAR PORCENTAJES DE LANGUAGES
// ========================================

// GitHub devuelve bytes por lenguaje:
//
// {
//     "HTML": 10000,
//     "JavaScript": 8000,
//     "CSS": 4000
// }
//
// Aquí se convierten esos bytes en porcentajes.
function calculateLanguagePercentages(languageBytes) {

    // Aquí se conservan únicamente valores válidos.
    const entries =
        Object.entries(languageBytes)
            .filter(
                function ([, bytes]) {

                    return (
                        Number.isFinite(bytes)
                        && bytes > 0
                    );
                }
            );


    // Aquí se calcula el total de bytes.
    const totalBytes =
        entries.reduce(
            function (total, [, bytes]) {

                return total + bytes;
            },
            0
        );


    // Si no existe información,
    // se devuelve un objeto vacío.
    if (totalBytes <= 0) {
        return {};
    }


    // Aquí se genera:
    //
    // {
    //     HTML: 40.2,
    //     JavaScript: 34.6
    // }
    return Object.fromEntries(

        entries.map(
            function ([language, bytes]) {

                return [
                    language,
                    (bytes / totalBytes) * 100
                ];
            }
        )
    );
}


// ========================================
// FUNCIÓN — OBTENER ELEMENTOS DEL PANEL
// ========================================

// Aquí se centraliza la búsqueda de los elementos
// utilizados por cada panel de evidencia.
function getSkillEvidenceElements(skillCard) {

    const panel =
        skillCard.querySelector(
            ".skill-card__github-panel"
        );


    const track =
        skillCard.querySelector(
            ".skill-card__github-track"
        );


    const status =
        skillCard.querySelector(
            ".skill-card__github-status"
        );


    return {
        panel,
        track,
        status
    };
}


// ========================================
// FUNCIÓN — LIMPIAR PISTA
// ========================================

// Aquí se elimina el placeholder
// antes de generar una barra dinámica.
function clearSkillTrack(track) {

    if (!track) {
        return;
    }


    track.innerHTML = "";
}


// ========================================
// FUNCIÓN — CREAR SEGMENTO VISUAL
// ========================================

// Aquí se genera la barra visual.
//
// En las habilidades tipo language,
// su ancho corresponde al porcentaje real
// detectado por GitHub.
//
// En otras tecnologías,
// la barra únicamente representa
// que existe evidencia asociada.
//
// Nunca representa nivel de dominio.
function createEvidenceSegment(
    metric,
    width = 100
) {

    const segment =
        document.createElement("span");


    segment.className =
        "skill-card__github-track-segment";


    // Aquí se garantiza que el segmento
    // permanezca entre 2% y 100%.
    const safeWidth =
        Math.min(
            100,
            Math.max(
                2,
                width
            )
        );


    segment.style.width =
        `${safeWidth}%`;


    // Aquí se utiliza el color propio
    // de la habilidad.
    segment.style.backgroundColor =
        SKILL_ACCENT_COLORS[metric]
        || "#1EFFBC";


    // La información se comunica mediante
    // la pista y el estado, no desde el segmento.
    segment.setAttribute(
        "aria-hidden",
        "true"
    );


    return segment;
}


// ========================================
// FUNCIÓN — MOSTRAR PORCENTAJE COMPACTO
// ========================================

// Aquí se presenta únicamente:
//
// 40.2%
//
// 34.6%
//
// 100.0%
//
// sin párrafos adicionales dentro de la card.
function renderCompactPercentage(
    status,
    percentage,
    language,
    evidence
) {

    if (!status) {
        return;
    }


    // Aquí se muestra únicamente el porcentaje.
    status.textContent =
        `${percentage.toFixed(1)}%`;


    // El repositorio completo queda disponible
    // al pasar el cursor sobre el dato.
    status.title =
        `Fuente: GitHub · ${evidence.repository}`;


    // Aquí se conserva la explicación completa
    // para tecnologías de asistencia
    // sin ocupar espacio visual.
    status.setAttribute(
        "aria-label",
        `${language}: `
        + `${percentage.toFixed(1)}% del contenido `
        + `detectado por GitHub en ${evidence.repository}. `
        + "El porcentaje representa composición del repositorio, "
        + "no nivel de dominio."
    );


    // Aquí se elimina cualquier estado
    // visual de error anterior.
    status.classList.remove(
        "is-error"
    );
}


// ========================================
// FUNCIÓN — MOSTRAR EVIDENCIA COMPACTA
// ========================================

// Aquí se utilizan tecnologías que GitHub
// no representa mediante Languages.
//
// En lugar de inventar porcentajes,
// se muestra:
//
// GitHub ✓
function renderCompactRepositoryEvidence(
    status,
    evidence
) {

    if (!status) {
        return;
    }


    // Aquí se muestra únicamente
    // una confirmación breve.
    status.textContent =
        "GitHub ✓";


    // La evidencia detallada queda disponible
    // mediante el tooltip del navegador.
    status.title =
        `${evidence.description} `
        + `Fuente: GitHub · ${evidence.repository}`;


    // Aquí se conserva una descripción
    // accesible más completa.
    status.setAttribute(
        "aria-label",
        `${evidence.description} `
        + `Fuente GitHub: ${evidence.repository}. `
        + "La barra representa existencia de evidencia, "
        + "no nivel de dominio."
    );


    // Aquí se elimina un posible estado
    // de error anterior.
    status.classList.remove(
        "is-error"
    );
}


// ========================================
// FUNCIÓN — LANGUAGE NO DETECTADO
// ========================================

// Si GitHub no devuelve actualmente
// el lenguaje asociado a una card:
//
// NO se muestra 100%.
//
// NO se inventa un porcentaje.
//
// Se conserva simplemente un estado neutral.
function renderLanguageNotDetected(
    track,
    status,
    evidence
) {

    if (track) {

        // Aquí se elimina cualquier barra anterior.
        track.innerHTML = "";


        // Se recupera el placeholder neutral.
        const placeholder =
            document.createElement("span");


        placeholder.className =
            "skill-card__github-track-placeholder";


        track.appendChild(
            placeholder
        );


        track.setAttribute(
            "aria-label",
            `${evidence.language} no fue detectado actualmente `
            + `por GitHub en ${evidence.repository}`
        );
    }


    if (status) {

        // Se mantiene un dato visual mínimo.
        status.textContent =
            "—";


        // La explicación completa queda
        // disponible al pasar el cursor.
        status.title =
            `${evidence.language} no fue detectado actualmente `
            + `por GitHub en ${evidence.repository}.`;


        status.setAttribute(
            "aria-label",
            `${evidence.language} no fue detectado actualmente `
            + `por GitHub en el repositorio ${evidence.repository}`
        );


        status.classList.remove(
            "is-error"
        );
    }
}


// ========================================
// FUNCIÓN — EVIDENCIA BASADA EN LANGUAGE
// ========================================

// Esta función se utiliza para:
//
// Java
// JavaScript
// HTML
// CSS
//
// GitHub devuelve datos reales mediante:
//
// /repos/{owner}/{repo}/languages
async function renderLanguageEvidence(
    skillCard,
    metric,
    evidence
) {

    const {
        track,
        status
    } = getSkillEvidenceElements(
        skillCard
    );


    if (!track || !status) {
        return;
    }


    // ========================================
    // ENDPOINT LANGUAGES
    // ========================================

    const languagesUrl =
        `https://api.github.com/repos/`
        + `${evidence.repository}/languages`;


    // Aquí se consulta GitHub.
    const languageBytes =
        await fetchGitHubJson(
            languagesUrl
        );


    // Aquí se convierten los bytes
    // a porcentajes.
    const percentages =
        calculateLanguagePercentages(
            languageBytes
        );


    // Aquí se obtiene únicamente
    // el lenguaje correspondiente
    // a esta habilidad.
    const percentage =
        percentages[
            evidence.language
        ];


    // ========================================
    // LANGUAGE DETECTADO
    // ========================================

    if (
        typeof percentage === "number"
    ) {

        // Aquí se elimina el placeholder.
        clearSkillTrack(
            track
        );


        // Aquí se crea la barra
        // con el porcentaje real.
        const segment =
            createEvidenceSegment(
                metric,
                percentage
            );


        segment.title =
            `${evidence.language}: `
            + `${percentage.toFixed(1)}%`;


        track.appendChild(
            segment
        );


        // Aquí se comunica de forma accesible
        // el significado de la barra.
        track.setAttribute(
            "aria-label",
            `${evidence.language}: `
            + `${percentage.toFixed(1)}% `
            + "del contenido detectado por GitHub."
        );


        // Aquí se muestra únicamente
        // el porcentaje dentro de la card.
        renderCompactPercentage(
            status,
            percentage,
            evidence.language,
            evidence
        );


        return;
    }


    // ========================================
    // LANGUAGE NO DETECTADO
    // ========================================

    // Si GitHub no lo detecta,
    // se evita presentar cualquier porcentaje falso.
    renderLanguageNotDetected(
        track,
        status,
        evidence
    );
}


// ========================================
// FUNCIÓN — EVIDENCIA BASADA EN REPOSITORIO
// ========================================

// Algunas tecnologías no aparecen
// dentro de GitHub Languages:
//
// Bootstrap
// PostgreSQL
// Git
// GitHub
// Spring Boot
// Scrum
//
// Por eso aquí NO se calcula ningún porcentaje.
async function renderRepositoryEvidence(
    skillCard,
    metric,
    evidence
) {

    const {
        track,
        status
    } = getSkillEvidenceElements(
        skillCard
    );


    if (!track || !status) {
        return;
    }


    // ========================================
    // VALIDAR REPOSITORIO
    // ========================================

    const repositoryUrl =
        `https://api.github.com/repos/`
        + `${evidence.repository}`;


    // Aquí se comprueba que el repositorio
    // continúe existiendo públicamente.
    await fetchGitHubJson(
        repositoryUrl
    );


    // ========================================
    // CREAR BARRA DE EVIDENCIA
    // ========================================

    clearSkillTrack(
        track
    );


    // La barra completa comunica solamente
    // que existe evidencia asociada.
//
// NO significa 100% de conocimiento.
    const segment =
        createEvidenceSegment(
            metric,
            100
        );


    segment.title =
        "Existe evidencia pública asociada";


    track.appendChild(
        segment
    );


    track.setAttribute(
        "aria-label",
        "Existe evidencia pública asociada a esta habilidad. "
        + "La barra no representa nivel de dominio."
    );


    // ========================================
    // ESTADO COMPACTO
    // ========================================

    // Aquí ya NO se inserta:
    //
    // descripción
    // owner/repository
    // explicación
    //
    // dentro de la card.
    renderCompactRepositoryEvidence(
        status,
        evidence
    );
}


// ========================================
// FUNCIÓN — ERROR DE EVIDENCIA
// ========================================

// Aquí se controla cualquier error
// sin romper la tarjeta.
//
// Ejemplos:
//
// sin conexión;
// GitHub temporalmente no disponible;
// rate limit;
// repositorio no disponible.
function renderSkillEvidenceError(
    skillCard,
    message
) {

    const {
        track,
        status
    } = getSkillEvidenceElements(
        skillCard
    );


    // ========================================
    // RESTAURAR PLACEHOLDER
    // ========================================

    if (track) {

        track.innerHTML = "";


        const placeholder =
            document.createElement(
                "span"
            );


        placeholder.className =
            "skill-card__github-track-placeholder";


        track.appendChild(
            placeholder
        );


        track.setAttribute(
            "aria-label",
            message
        );
    }


    // ========================================
    // ESTADO DE ERROR COMPACTO
    // ========================================

    if (status) {

        // Se utiliza un texto corto
        // para no deformar la card.
        status.textContent =
            "GitHub !";


        // El mensaje completo permanece
        // disponible como información adicional.
        status.title =
            message;


        status.setAttribute(
            "aria-label",
            message
        );


        status.classList.add(
            "is-error"
        );
    }
}


// ========================================
// FUNCIÓN — CARGAR EVIDENCIA
// ========================================

// Aquí se identifica la habilidad
// mediante data-skill-metric.
async function loadSkillEvidence(
    skillCard
) {

    // Aquí se busca el cuerpo posterior.
    const backBody =
        skillCard.querySelector(
            ".skill-card__back-body"
        );


    if (!backBody) {
        return;
    }


    // Aquí se obtiene:
//
// java
// javascript
// html
// css
// bootstrap
// postgresql
// git
// github
// springboot
// scrum
    const metric =
        backBody.dataset.skillMetric;


    // Aquí se busca la configuración
    // asociada a la habilidad.
    const evidence =
        SKILL_EVIDENCE[
            metric
        ];


    // Si la habilidad no tiene configuración,
    // se presenta un estado controlado.
    if (
        !metric
        || !evidence
    ) {

        renderSkillEvidenceError(
            skillCard,
            "No hay evidencia configurada para esta habilidad."
        );


        return;
    }


    // ========================================
    // ESTADO DE CARGA COMPACTO
    // ========================================

    const {
        status
    } = getSkillEvidenceElements(
        skillCard
    );


    if (status) {

        // Aquí se utiliza únicamente
        // un marcador breve mientras GitHub responde.
        status.textContent =
            "—";


        status.removeAttribute(
            "title"
        );


        status.setAttribute(
            "aria-label",
            "Cargando evidencia desde GitHub"
        );


        status.classList.remove(
            "is-error"
        );
    }


    try {

        // ========================================
        // EVIDENCIA POR LANGUAGE
        // ========================================

        if (
            evidence.type === "language"
        ) {

            await renderLanguageEvidence(
                skillCard,
                metric,
                evidence
            );


            return;
        }


        // ========================================
        // EVIDENCIA POR REPOSITORIO
        // ========================================

        await renderRepositoryEvidence(
            skillCard,
            metric,
            evidence
        );

    } catch (error) {

        // Aquí el error permanece disponible
        // en consola para depuración.
        console.error(
            `No fue posible cargar evidencia de ${metric}:`,
            error
        );


        // Visualmente se mantiene
        // un estado muy corto.
        renderSkillEvidenceError(
            skillCard,
            "No fue posible actualizar la evidencia desde GitHub."
        );
    }
}


// ========================================
// CONFIGURAR CADA CARD
// ========================================

// Aquí se recorre cada card
// de forma independiente.
skillCards.forEach(
    function (skillCard) {

        // Aquí se buscan los dos botones
        // de giro de la card actual.
        const flipButtons =
            skillCard.querySelectorAll(
                ".skill-card__flip-button"
            );


        // Aquí se guarda el frente.
        const frontFace =
            skillCard.querySelector(
                ".skill-card__front"
            );


        // Aquí se guarda el reverso.
        const backFace =
            skillCard.querySelector(
                ".skill-card__back"
            );


        // ========================================
        // VALIDACIÓN DE ESTRUCTURA
        // ========================================

        // Si falta cualquiera de los elementos
        // esenciales, se evita continuar.
        if (
            flipButtons.length < 2
            || !frontFace
            || !backFace
        ) {
            return;
        }


        // ========================================
        // FUNCIÓN — ESTADO DE LA CARD
        // ========================================

        function setSkillCardState(
            isFlipped,
            moveFocus = true
        ) {

            // Aquí se activa o elimina
            // la rotación visual.
            skillCard.classList.toggle(
                "is-flipped",
                isFlipped
            );


            // ========================================
            // ACCESIBILIDAD — CARAS
            // ========================================

            frontFace.setAttribute(
                "aria-hidden",
                String(isFlipped)
            );


            backFace.setAttribute(
                "aria-hidden",
                String(!isFlipped)
            );


            // ========================================
            // ACCESIBILIDAD — BOTONES
            // ========================================

            flipButtons[0].setAttribute(
                "aria-pressed",
                String(isFlipped)
            );


            flipButtons[1].setAttribute(
                "aria-pressed",
                String(isFlipped)
            );


            // ========================================
            // CONTROL DEL FOCO
            // ========================================

            flipButtons[0].tabIndex =
                isFlipped
                    ? -1
                    : 0;


            flipButtons[1].tabIndex =
                isFlipped
                    ? 0
                    : -1;


            // ========================================
            // MOVER FOCO
            // ========================================

            // Solo se mueve el foco
            // cuando el giro viene de una interacción.
            if (moveFocus) {

                const visibleButton =
                    isFlipped
                        ? flipButtons[1]
                        : flipButtons[0];


                visibleButton.focus();
            }
        }


        // ========================================
        // EVENTOS — GIRO
        // ========================================

        flipButtons.forEach(
            function (flipButton) {

                flipButton.addEventListener(
                    "click",
                    function () {

                        const isCurrentlyFlipped =
                            skillCard.classList.contains(
                                "is-flipped"
                            );


                        setSkillCardState(
                            !isCurrentlyFlipped
                        );
                    }
                );
            }
        );


        // ========================================
        // ESTADO INICIAL
        // ========================================

        // Todas las cards comienzan
        // mostrando el frente.
        setSkillCardState(
            false,
            false
        );


        // ========================================
        // CARGAR EVIDENCIA REAL
        // ========================================

        // Aquí se realiza la consulta
        // una sola vez al configurar la card.
        //
        // NO existe setInterval.
        //
        // Cuando el portafolio se vuelva
        // a abrir o recargar,
        // GitHub será consultado nuevamente.
        loadSkillEvidence(
            skillCard
        );
    }
);