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

// Aquí se reutiliza el mismo caché global que también utiliza project-cards.js.
// De esta forma evitamos consultar GitHub varias veces por el mismo endpoint
// durante una sola carga del portafolio.
if (!window.__lihenGithubCache) {
    window.__lihenGithubCache = new Map();
}

// Aquí se guarda una referencia corta al caché compartido para utilizarlo
// durante las consultas de evidencia de las cards.
const githubCache = window.__lihenGithubCache;


// ========================================
// CONFIGURACIÓN DE EVIDENCIA POR HABILIDAD
// ========================================

// Aquí se define qué evidencia pública se utiliza para cada habilidad.
// Esta configuración NO representa nivel de dominio.
//
// type = "language"
// → GitHub permite comprobar si el lenguaje está presente mediante /languages.
//
// type = "repository"
// → se valida la existencia de un repositorio relacionado con la tecnología.
//
// type = "repository-note"
// → se conserva evidencia contextual del trabajo realizado sin convertirla
//   en una métrica o porcentaje artificial.
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
            "Bootstrap también está integrado en este portafolio mediante CDN, utilidades responsive e iconografía; este repositorio conserva evidencia adicional de práctica."
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

// Aquí se asigna un color a cada tecnología para poder reconocerla visualmente.
// El color funciona solamente como identidad gráfica y NO representa nivel de conocimiento.
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

// Aquí se consulta la API pública de GitHub sin utilizar un token privado.
// La Promise se guarda en caché para reutilizar la misma respuesta
// si otra parte del portafolio necesita exactamente el mismo endpoint.
async function fetchGitHubJson(url) {

    // Si esta consulta ya existe en el caché,
    // se reutiliza la misma Promise y así evitamos hacer
    // una solicitud duplicada a GitHub.
    if (githubCache.has(url)) {
        return githubCache.get(url);
    }


    // Aquí se crea la solicitud HTTP que traerá la información desde GitHub.
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

                // Si GitHub responde con un estado diferente a 2xx,
                // se genera un error controlado para que el flujo pueda manejarlo
                // sin romper las demás cards.
                if (!response.ok) {

                    throw new Error(
                        `GitHub respondió con estado ${response.status}`
                    );
                }


                // Aquí se convierte la respuesta de GitHub a JSON
                // para poder trabajar con sus datos desde JavaScript.
                return response.json();
            }
        )

        .catch(
            function (error) {

                // Si la consulta falla, se elimina del caché.
                // De esta forma una carga futura podrá volver a intentar
                // la solicitud en lugar de reutilizar una Promise rechazada.
                githubCache.delete(url);

                throw error;
            }
        );


    // Aquí se guarda la Promise en el caché antes de devolverla,
    // para que cualquier consulta igual pueda reutilizarla.
    githubCache.set(
        url,
        request
    );


    // Se devuelve la misma Promise para que el resto del código
    // pueda esperar normalmente la respuesta de GitHub.
    return request;
}


// ========================================
// FUNCIÓN — VERIFICAR LENGUAJE EN GITHUB
// ========================================

// Aquí solo comprobamos si GitHub detecta el lenguaje dentro del repositorio.
// Los bytes se utilizan únicamente para confirmar que existe contenido
// y no se convierten en porcentajes ni en una medida de conocimiento.
function hasLanguageEvidence(
    languageBytes,
    language
) {

    // Aquí se obtiene el número de bytes que GitHub asocia
    // específicamente con el lenguaje que estamos verificando.
    const bytes =
        languageBytes[language];


    // Si el valor existe, es numérico y es mayor que cero,
    // entonces sí existe evidencia de ese lenguaje en el repositorio.
    return (
        Number.isFinite(bytes)
        && bytes > 0
    );
}


// ========================================
// FUNCIÓN — OBTENER ELEMENTOS DEL PANEL
// ========================================

// Aquí se buscan y agrupan los elementos principales del panel de evidencia.
// De esta forma las demás funciones pueden reutilizar las mismas referencias
// sin repetir querySelector varias veces.
function getSkillEvidenceElements(skillCard) {

    // Aquí se obtiene el panel completo que contiene la evidencia de GitHub.
    const panel =
        skillCard.querySelector(
            ".skill-card__github-panel"
        );


    // Aquí se obtiene la pista visual donde aparece la señal tecnológica.
    const track =
        skillCard.querySelector(
            ".skill-card__github-track"
        );


    // Aquí se obtiene el elemento donde mostramos el estado compacto,
    // por ejemplo “GitHub ✓” o “GitHub !”.
    const status =
        skillCard.querySelector(
            ".skill-card__github-status"
        );


    // Se devuelven juntos para poder reutilizarlos
    // en las demás funciones sin volver a buscarlos.
    return {
        panel,
        track,
        status
    };
}


// ========================================
// FUNCIÓN — LIMPIAR PISTA
// ========================================

// Aquí se limpia la pista antes de dibujar un nuevo estado visual.
// Si la pista no existe, se detiene la función para evitar errores.
function clearSkillTrack(track) {

    if (!track) {
        return;
    }


    // Aquí se elimina cualquier contenido anterior de la pista.
    track.innerHTML = "";
}


// ========================================
// FUNCIÓN — CREAR SEGMENTO VISUAL
// ========================================

// Aquí se crea el segmento visual que acompaña la evidencia de la habilidad.
// Todas las señales utilizan la misma longitud para evitar que se interpreten
// como una comparación de nivel o porcentaje.
function createEvidenceSegment(
    metric
) {

    // Aquí se crea el elemento que funcionará como señal visual.
    const segment =
        document.createElement("span");


    // Aquí se aplica la clase que conecta el segmento
    // con los estilos definidos en styles.css.
    segment.className =
        "skill-card__github-track-segment";


    // Todas las habilidades utilizan exactamente la misma longitud visual.
    // Con esto la pista comunica evidencia y actividad,
    // pero nunca nivel de dominio.
    segment.style.width =
        "100%";


    // Aquí se utiliza el color propio de cada habilidad
    // para identificar visualmente la tecnología
    // sin convertir el color en una calificación.
    segment.style.backgroundColor =
        SKILL_ACCENT_COLORS[metric]
        || "#1EFFBC";


    // El segmento es decorativo.
    // La información accesible se comunica desde la pista y el estado
    // para no duplicar contenido.
    segment.setAttribute(
        "aria-hidden",
        "true"
    );


    return segment;
}


// ========================================
// FUNCIÓN — MOSTRAR EVIDENCIA DE LENGUAJE
// ========================================

// Aquí se muestra el estado cuando GitHub sí detecta el lenguaje.
// La evidencia se presenta como confirmación pública
// y no como una medida de nivel.
function renderLanguageEvidenceStatus(
    status,
    language,
    evidence
) {

    // Si no existe el elemento donde debe mostrarse el estado,
    // se evita continuar para no generar errores.
    if (!status) {
        return;
    }


    // En lugar de mostrar una cifra de GitHub Languages,
    // se utiliza “GitHub ✓”.
    // Así se confirma evidencia real sin convertirla en autocalificación.
    status.textContent =
        "GitHub ✓";


    // Aquí se conserva la explicación completa dentro de title.
    // De esta forma sigue disponible al pasar el mouse
    // sin ocupar espacio permanente en la card.
    status.title =
        `${evidence.description} Fuente: GitHub · ${evidence.repository}`;


    // Aquí se agrega contexto accesible mediante aria-label.
    // Con esto también se deja claro que la señal no representa dominio.
    status.setAttribute(
        "aria-label",
        `${language} fue detectado en GitHub dentro de ${evidence.repository}. `
        + "La señal visual confirma evidencia y no representa nivel de dominio."
    );


    // Si anteriormente se había mostrado un error,
    // aquí se elimina ese estado porque la evidencia cargó correctamente.
    status.classList.remove(
        "is-error"
    );
}


// ========================================
// FUNCIÓN — MOSTRAR EVIDENCIA COMPACTA
// ========================================

// Aquí se manejan tecnologías que GitHub no representa directamente
// dentro del endpoint Languages.
// En estos casos se confirma la existencia de evidencia pública
// con “GitHub ✓” sin inventar porcentajes.
function renderCompactRepositoryEvidence(
    status,
    evidence
) {

    // Si no existe el espacio destinado al estado,
    // no se intenta modificar la card.
    if (!status) {
        return;
    }


    // Aquí se muestra una confirmación breve
    // para no recargar visualmente la card.
    status.textContent =
        "GitHub ✓";


    // La evidencia detallada queda disponible mediante title,
    // por eso no ocupa espacio adicional dentro de la card.
    status.title =
        `${evidence.description} `
        + `Fuente: GitHub · ${evidence.repository}`;


    // Aquí se agrega una descripción accesible más completa mediante aria-label,
    // para que el significado de la evidencia no dependa solo de lo visual.
    status.setAttribute(
        "aria-label",
        `${evidence.description} `
        + `Fuente GitHub: ${evidence.repository}. `
        + "La barra representa existencia de evidencia, "
        + "no nivel de dominio."
    );


    // Aquí se elimina un posible estado de error anterior
    // porque la evidencia ya fue cargada correctamente.
    status.classList.remove(
        "is-error"
    );
}


// ========================================
// FUNCIÓN — LANGUAGE NO DETECTADO
// ========================================

// Si GitHub no detecta actualmente el lenguaje asociado a la card,
// se mantiene un estado neutral.
// No se muestra 100% ni se inventa ningún porcentaje
// para completar visualmente la información.
function renderLanguageNotDetected(
    track,
    status,
    evidence
) {

    if (track) {

        // Aquí se elimina cualquier señal anterior
        // antes de recuperar el placeholder neutral de la card.
        track.innerHTML = "";


        // Aquí se crea nuevamente el placeholder neutral
        // para mostrar que no hay evidencia de lenguaje disponible
        // en ese momento.
        const placeholder =
            document.createElement("span");


        // Aquí se aplica la clase visual correspondiente al placeholder.
        placeholder.className =
            "skill-card__github-track-placeholder";


        // El placeholder se incorpora nuevamente dentro de la pista.
        track.appendChild(
            placeholder
        );


        // Aquí se explica mediante aria-label
        // por qué no aparece una señal activa.
        track.setAttribute(
            "aria-label",
            `${evidence.language} no fue detectado actualmente `
            + `por GitHub en ${evidence.repository}`
        );
    }


    if (status) {

        // Aquí se mantiene un dato visual mínimo
        // para no presentar información falsa.
        status.textContent =
            "—";


        // La explicación completa queda disponible en title
        // al pasar el cursor, sin ocupar espacio permanente.
        status.title =
            `${evidence.language} no fue detectado actualmente `
            + `por GitHub en ${evidence.repository}.`;


        // Aquí se conserva la misma explicación
        // para tecnologías de asistencia.
        status.setAttribute(
            "aria-label",
            `${evidence.language} no fue detectado actualmente `
            + `por GitHub en el repositorio ${evidence.repository}`
        );


        // Este estado no se considera un error técnico,
        // por eso se elimina la clase is-error si existía.
        status.classList.remove(
            "is-error"
        );
    }
}


// ========================================
// FUNCIÓN — EVIDENCIA BASADA EN LANGUAGE
// ========================================

// Aquí se valida la evidencia de Java, JavaScript, HTML y CSS.
// Para estas habilidades GitHub permite consultar datos reales mediante:
//
// /repos/{owner}/{repo}/languages
//
// Los bytes solo se utilizan para comprobar presencia
// y nunca para medir dominio.
async function renderLanguageEvidence(
    skillCard,
    metric,
    evidence
) {

    // Aquí se recuperan la pista y el estado
    // correspondientes a la card que estamos procesando.
    const {
        track,
        status
    } = getSkillEvidenceElements(
        skillCard
    );


    // Si la estructura necesaria no existe,
    // se detiene el flujo para evitar errores.
    if (!track || !status) {
        return;
    }


    // ========================================
    // ENDPOINT LANGUAGES
    // ========================================

    // Aquí se construye el endpoint público de GitHub
    // correspondiente a los lenguajes del repositorio.
    const languagesUrl =
        `https://api.github.com/repos/`
        + `${evidence.repository}/languages`;


    // Aquí se consulta GitHub y se espera la respuesta
    // antes de continuar con la validación de la habilidad.
    const languageBytes =
        await fetchGitHubJson(
            languagesUrl
        );


    // Aquí se comprueba únicamente si GitHub detecta el lenguaje
    // asociado a esta habilidad dentro del repositorio configurado.
    const languageDetected =
        hasLanguageEvidence(
            languageBytes,
            evidence.language
        );


    // ========================================
    // LANGUAGE DETECTADO
    // ========================================

    if (languageDetected) {

        // Aquí se elimina el placeholder
        // porque ya existe evidencia válida para mostrar en la pista.
        clearSkillTrack(
            track
        );


        // Aquí se crea una señal visual de longitud uniforme.
        // GitHub confirma la presencia del lenguaje,
        // pero esa evidencia no se cuantifica visualmente.
        const segment =
            createEvidenceSegment(
                metric
            );


        // Aquí se agrega una descripción corta
        // para identificar el lenguaje al pasar el mouse.
        segment.title =
            `${evidence.language} detectado en GitHub`;


        // El segmento se agrega a la pista visual de la card.
        track.appendChild(
            segment
        );


        // Aquí se explica mediante aria-label qué significa la señal,
        // para que tecnologías de asistencia también reciban el contexto completo.
        track.setAttribute(
            "aria-label",
            `${evidence.language} detectado en GitHub. `
            + "La señal visual representa evidencia, no nivel de dominio."
        );


        // Aquí se muestra una confirmación breve de evidencia
        // sin utilizar porcentajes.
        renderLanguageEvidenceStatus(
            status,
            evidence.language,
            evidence
        );


        return;
    }


    // ========================================
    // LANGUAGE NO DETECTADO
    // ========================================

    // Si GitHub no detecta el lenguaje,
    // se muestra el estado neutral y se evita presentar
    // cualquier porcentaje o nivel inventado.
    renderLanguageNotDetected(
        track,
        status,
        evidence
    );
}


// ========================================
// FUNCIÓN — EVIDENCIA BASADA EN REPOSITORIO
// ========================================

// Bootstrap, PostgreSQL, Git, GitHub, Spring Boot y Scrum
// no se validan mediante GitHub Languages en este flujo.
//
// Por eso aquí se comprueba únicamente la existencia pública
// del repositorio relacionado como evidencia,
// sin generar una métrica de nivel.
async function renderRepositoryEvidence(
    skillCard,
    metric,
    evidence
) {

    // Aquí se recuperan los elementos del panel
    // correspondiente a la card actual.
    const {
        track,
        status
    } = getSkillEvidenceElements(
        skillCard
    );


    // Si falta la pista o el estado,
    // se evita continuar con una estructura incompleta.
    if (!track || !status) {
        return;
    }


    // ========================================
    // VALIDAR REPOSITORIO
    // ========================================

    // Aquí se construye la URL pública del repositorio
    // que funciona como evidencia de esta habilidad.
    const repositoryUrl =
        `https://api.github.com/repos/`
        + `${evidence.repository}`;


    // Aquí se comprueba que el repositorio relacionado
    // continúe existiendo públicamente
    // antes de mostrar la señal de evidencia.
    await fetchGitHubJson(
        repositoryUrl
    );


    // ========================================
    // CREAR BARRA DE EVIDENCIA
    // ========================================

    // Aquí se elimina cualquier placeholder o señal anterior.
    clearSkillTrack(
        track
    );


    // Aquí se crea la misma señal visual
    // utilizada por las demás habilidades.
    // La pista completa confirma evidencia asociada
    // y NO significa 100% de conocimiento.
    const segment =
        createEvidenceSegment(
            metric
        );


    // Aquí se agrega una explicación corta
    // disponible al pasar el cursor.
    segment.title =
        "Existe evidencia pública asociada";


    // El segmento se incorpora a la pista visual.
    track.appendChild(
        segment
    );


    // Aquí se deja claro mediante aria-label
    // que la pista representa evidencia y no nivel.
    track.setAttribute(
        "aria-label",
        "Existe evidencia pública asociada a esta habilidad. "
        + "La barra no representa nivel de dominio."
    );


    // ========================================
    // ESTADO COMPACTO
    // ========================================

    // Aquí se mantiene el estado compacto dentro de la card.
    // La descripción y el repositorio siguen disponibles
    // como información adicional, pero no se insertan
    // como texto permanente para evitar saturar el diseño.
    renderCompactRepositoryEvidence(
        status,
        evidence
    );
}


// ========================================
// FUNCIÓN — ERROR DE EVIDENCIA
// ========================================

// Aquí se controla cualquier problema al consultar GitHub
// sin romper la card.
//
// Esto cubre casos como:
// - falta de conexión;
// - rate limit;
// - repositorio no disponible;
// - una respuesta temporalmente fallida.
function renderSkillEvidenceError(
    skillCard,
    message
) {

    // Aquí se recuperan los elementos visuales
    // que deben actualizarse si ocurre el error.
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

        // Aquí se limpia cualquier señal que hubiera quedado anteriormente.
        track.innerHTML = "";


        // Aquí se crea nuevamente el placeholder neutral
        // para que la card no quede visualmente vacía.
        const placeholder =
            document.createElement(
                "span"
            );


        // Aquí se aplica la clase visual del placeholder.
        placeholder.className =
            "skill-card__github-track-placeholder";


        // El placeholder se agrega nuevamente a la pista.
        track.appendChild(
            placeholder
        );


        // Aquí se conserva el mensaje del error
        // como información accesible.
        track.setAttribute(
            "aria-label",
            message
        );
    }


    // ========================================
    // ESTADO DE ERROR COMPACTO
    // ========================================

    if (status) {

        // Aquí se utiliza un texto corto
        // para indicar el error sin deformar la card.
        status.textContent =
            "GitHub !";


        // El mensaje completo permanece disponible en title
        // para conservar el detalle sin recargar visualmente la interfaz.
        status.title =
            message;


        // Aquí se ofrece el mismo contexto
        // a tecnologías de asistencia.
        status.setAttribute(
            "aria-label",
            message
        );


        // Esta clase permite que CSS represente visualmente
        // el estado de error.
        status.classList.add(
            "is-error"
        );
    }
}


// ========================================
// FUNCIÓN — CARGAR EVIDENCIA
// ========================================

// Aquí se identifica qué habilidad pertenece a la card
// mediante data-skill-metric.
//
// Ese valor permite buscar su configuración
// dentro de SKILL_EVIDENCE.
async function loadSkillEvidence(
    skillCard
) {

    // Aquí se busca el cuerpo posterior de la card
    // porque allí está guardado data-skill-metric,
    // que identifica la habilidad.
    const backBody =
        skillCard.querySelector(
            ".skill-card__back-body"
        );


    // Si no existe el cuerpo posterior,
    // no hay una métrica segura que podamos consultar.
    if (!backBody) {
        return;
    }


    // Aquí se obtiene desde dataset la clave de la habilidad.
    //
    // El valor puede ser:
    // java, javascript, html, css, bootstrap,
    // postgresql, git, github, springboot o scrum.
    const metric =
        backBody.dataset.skillMetric;


    // Aquí se busca dentro de SKILL_EVIDENCE
    // la configuración asociada a la clave obtenida desde la card.
    const evidence =
        SKILL_EVIDENCE[
            metric
        ];


    // Si la card no tiene una métrica válida
    // o no existe configuración para ella,
    // se muestra un error controlado
    // en lugar de continuar con datos incompletos.
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

    // Aquí se obtiene el estado visual
    // que se mostrará mientras GitHub responde.
    const {
        status
    } = getSkillEvidenceElements(
        skillCard
    );


    if (status) {

        // Mientras GitHub responde,
        // aquí se utiliza un marcador breve
        // para indicar que la evidencia todavía está cargando.
        status.textContent =
            "—";


        // Aquí se elimina cualquier title anterior
        // para no conservar información vieja durante la nueva consulta.
        status.removeAttribute(
            "title"
        );


        // Aquí se comunica también de forma accesible
        // que la evidencia está cargando.
        status.setAttribute(
            "aria-label",
            "Cargando evidencia desde GitHub"
        );


        // Si existía un estado de error anterior,
        // se elimina mientras comienza el nuevo intento.
        status.classList.remove(
            "is-error"
        );
    }


    try {

        // ========================================
        // EVIDENCIA POR LANGUAGE
        // ========================================

        // Si la evidencia está configurada como language,
        // se utiliza el endpoint /languages.
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

        // Para los demás tipos se valida
        // la existencia pública del repositorio asociado.
        await renderRepositoryEvidence(
            skillCard,
            metric,
            evidence
        );

    } catch (error) {

        // Si ocurre un error, aquí se conserva en consola
        // para poder depurarlo sin mostrar información técnica
        // innecesaria dentro de la interfaz.
        console.error(
            `No fue posible cargar evidencia de ${metric}:`,
            error
        );


        // Visualmente se mantiene un estado corto
        // para no deformar la card.
        renderSkillEvidenceError(
            skillCard,
            "No fue posible actualizar la evidencia desde GitHub."
        );
    }
}


// ========================================
// CONFIGURAR CADA CARD
// ========================================

// Aquí se recorre cada card de habilidades de forma independiente
// para configurar su giro, accesibilidad y carga de evidencia.
skillCards.forEach(
    function (skillCard) {

        // Aquí se buscan los dos botones de giro de la card actual,
        // uno para cada cara.
        const flipButtons =
            skillCard.querySelectorAll(
                ".skill-card__flip-button"
            );


        // Aquí se guarda la referencia de la cara frontal
        // para controlar su visibilidad y accesibilidad durante el giro.
        const frontFace =
            skillCard.querySelector(
                ".skill-card__front"
            );


        // Aquí se guarda la referencia de la cara posterior
        // para controlar su visibilidad y accesibilidad durante el giro.
        const backFace =
            skillCard.querySelector(
                ".skill-card__back"
            );


        // ========================================
        // VALIDACIÓN DE ESTRUCTURA
        // ========================================

        // Si falta algún elemento esencial de la estructura,
        // se detiene la configuración de esa card
        // para evitar errores.
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

        // Aquí se centraliza todo lo que cambia
        // cuando una card pasa del frente al reverso
        // o regresa nuevamente al frente.
        function setSkillCardState(
            isFlipped,
            moveFocus = true
        ) {

            // Aquí se activa o elimina la clase is-flipped,
            // que controla visualmente qué cara de la card se muestra.
            skillCard.classList.toggle(
                "is-flipped",
                isFlipped
            );


            // ========================================
            // ACCESIBILIDAD — CARAS
            // ========================================

            // aria-hidden comunica a tecnologías de asistencia
            // cuál cara está visible.
            // Cuando una cara se oculta visualmente,
            // también se marca como oculta aquí.
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

            // aria-pressed comunica el estado actual del botón de giro
            // sin cambiar el comportamiento visual de la card.
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

            // tabIndex evita que el teclado entre en el botón
            // de una cara que actualmente está oculta.
            // Solo el botón perteneciente a la cara visible
            // queda disponible mediante Tab.
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

            // El foco solo se mueve cuando el giro
            // viene de una interacción.
            // De esta forma el teclado continúa
            // en el botón de la cara que quedó visible.
            if (moveFocus) {

                // Aquí se identifica cuál botón pertenece
                // a la cara que terminó visible.
                const visibleButton =
                    isFlipped
                        ? flipButtons[1]
                        : flipButtons[0];


                // Aquí se mueve el foco hacia ese botón
                // para mantener una navegación coherente por teclado.
                visibleButton.focus();
            }
        }


        // ========================================
        // EVENTOS — GIRO
        // ========================================

        // Aquí se configura el mismo evento click
        // para los dos botones de giro de la card.
        flipButtons.forEach(
            function (flipButton) {

                flipButton.addEventListener(
                    "click",
                    function () {

                        // Aquí se consulta si la card
                        // ya se encuentra girada.
                        const isCurrentlyFlipped =
                            skillCard.classList.contains(
                                "is-flipped"
                            );


                        // Entonces se envía el estado contrario:
                        // si estaba girada vuelve al frente,
                        // y si estaba al frente muestra el reverso.
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

        // Todas las cards comienzan mostrando la cara frontal.
        // Por eso el estado inicial se configura
        // sin mover el foco.
        setSkillCardState(
            false,
            false
        );


        // ========================================
        // CARGAR EVIDENCIA REAL
        // ========================================

        // Aquí se carga la evidencia una sola vez
        // al configurar cada card.
        //
        // NO existe setInterval.
        //
        // GitHub vuelve a consultarse cuando el portafolio
        // se abre nuevamente o se recarga.
        loadSkillEvidence(
            skillCard
        );
    }
);