// ========================================
// CARDS DE PROYECTOS — GIRO + GITHUB
// ========================================

// Aquí se buscan todas las cards de proyectos dentro de la sección Proyectos.
const projectCards = document.querySelectorAll(
    "#proyectos .project-flip-card"
);


// ========================================
// CACHÉ COMPARTIDO DE GITHUB
// ========================================

// Aquí se crea un caché global reutilizable.
//
// Esto permite que si diferentes componentes solicitan el mismo endpoint
// durante una misma carga del portafolio, no sea necesario consultar
// repetidamente la API de GitHub.
if (!window.__lihenGithubCache) {
    window.__lihenGithubCache = new Map();
}

// Aquí se guarda una referencia corta al caché compartido.
const githubCache = window.__lihenGithubCache;


// ========================================
// COLORES DE LANGUAGES
// ========================================

// Aquí se relacionan lenguajes frecuentes con colores visuales.
//
// Estos colores sirven solamente para representar la composición
// del repositorio.
//
// NO representan nivel de conocimiento.
const PROJECT_LANGUAGE_COLORS = {
    HTML: "#e34c26",
    CSS: "#1572b6",
    JavaScript: "#f7df1e",
    Java: "#e76f00",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    PHP: "#4F5D95",
    Shell: "#89e051",
    SCSS: "#c6538c",
    Vue: "#41b883"
};


// ========================================
// COLORES DE RESPALDO
// ========================================

// Si GitHub devuelve un lenguaje que todavía no está declarado
// en PROJECT_LANGUAGE_COLORS, se utilizará uno de estos colores.
const PROJECT_LANGUAGE_FALLBACK_COLORS = [
    "#1EFFBC",
    "#F72C25",
    "#FBD1A2",
    "#38023B",
    "#303030",
    "#151515"
];


// ========================================
// FUNCIÓN — NORMALIZAR NOMBRE PARA CSS
// ========================================

// Aquí se convierte el nombre del lenguaje en una cadena segura.
//
// Ejemplo:
//
// JavaScript
// → javascript
//
// C++
// → c
function normalizeLanguageClass(language) {

    return language
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}


// ========================================
// FUNCIÓN — OBTENER COLOR
// ========================================

// Aquí se devuelve el color correspondiente al lenguaje.
//
// Si el lenguaje no está registrado,
// se utiliza uno de los colores de respaldo.
function getLanguageColor(language, index) {

    return (
        PROJECT_LANGUAGE_COLORS[language]
        || PROJECT_LANGUAGE_FALLBACK_COLORS[
            index % PROJECT_LANGUAGE_FALLBACK_COLORS.length
        ]
    );
}


// ========================================
// FUNCIÓN — EXTRAER REPOSITORIO DESDE URL
// ========================================

// Aquí se transforma:
//
// https://github.com/usuario/repositorio
//
// en:
//
// usuario/repositorio
//
// También acepta:
//
// https://github.com/usuario/repositorio.git
function getRepositoryFromUrl(repositoryUrl) {

    // Si no existe una URL, no se puede continuar.
    if (!repositoryUrl) {
        return null;
    }

    try {

        // URL permite interpretar de forma segura la dirección.
        const url = new URL(repositoryUrl);

        // Aquí se comprueba que realmente sea una dirección de GitHub.
        if (
            url.hostname !== "github.com"
            && url.hostname !== "www.github.com"
        ) {
            return null;
        }

        // Aquí se divide la ruta:
        //
        // /usuario/repositorio
        //
        // en:
        //
        // ["usuario", "repositorio"]
        const parts = url.pathname
            .replace(/\.git$/i, "")
            .split("/")
            .filter(Boolean);

        // Se requieren por lo menos:
        //
        // usuario
        // repositorio
        if (parts.length < 2) {
            return null;
        }

        // Aquí se devuelve únicamente owner/repository.
        return `${parts[0]}/${parts[1]}`;

    } catch (error) {

        // Si la URL no puede interpretarse correctamente,
        // se devuelve null sin romper la página.
        return null;
    }
}


// ========================================
// FUNCIÓN — OBTENER REPOSITORIO DE LA CARD
// ========================================

// Aquí se obtiene el repositorio correspondiente a cada proyecto.
//
// La fuente principal será:
//
// data-repository-url
//
// colocado en el article de la card.
function getProjectRepository(projectCard) {

    // Aquí se obtiene la URL configurada en el HTML.
    const repositoryUrl =
        projectCard.dataset.repositoryUrl;

    // Aquí se convierte la URL en owner/repository.
    return getRepositoryFromUrl(
        repositoryUrl
    );
}


// ========================================
// FUNCIÓN — CONSULTA GITHUB CON CACHÉ
// ========================================

// Aquí se realiza una consulta pública a GitHub.
//
// No se utiliza token privado.
//
// La respuesta se almacena en memoria para evitar
// solicitudes duplicadas durante la misma carga.
async function fetchGitHubJson(url) {

    // Si ya existe esta solicitud en caché,
    // se reutiliza inmediatamente.
    if (githubCache.has(url)) {
        return githubCache.get(url);
    }

    // Aquí se crea la solicitud como Promise.
    const request = fetch(
        url,
        {
            headers: {
                Accept: "application/vnd.github+json"
            }
        }
    )
        .then(async function (response) {

            // Si GitHub responde con un error HTTP,
            // se genera un error controlado.
            if (!response.ok) {

                throw new Error(
                    `GitHub respondió con estado ${response.status}`
                );
            }

            // Aquí se convierte la respuesta a JSON.
            return response.json();
        })

        .catch(function (error) {

            // Si la consulta falla,
            // se elimina del caché para permitir otro intento
            // en una futura carga de página.
            githubCache.delete(url);

            throw error;
        });

    // Aquí se guarda la solicitud en caché.
    githubCache.set(
        url,
        request
    );

    return request;
}


// ========================================
// FUNCIÓN — CONVERTIR BYTES A PORCENTAJES
// ========================================

// GitHub Languages devuelve una estructura similar a:
//
// {
//     "HTML": 12000,
//     "JavaScript": 9000,
//     "CSS": 3000
// }
//
// Los números representan bytes.
//
// Aquí se convierten esos bytes en porcentajes.
function calculateLanguagePercentages(languageBytes) {

    // Aquí se convierten las propiedades del objeto en pares:
    //
    // [lenguaje, bytes]
    const entries =
        Object.entries(languageBytes)

            // Se conservan solamente valores válidos.
            .filter(function ([, bytes]) {

                return (
                    Number.isFinite(bytes)
                    && bytes > 0
                );
            })

            // Se ordenan de mayor a menor cantidad.
            .sort(function (a, b) {

                return b[1] - a[1];
            });


    // Aquí se calcula el total de bytes.
    const totalBytes =
        entries.reduce(
            function (total, [, bytes]) {

                return total + bytes;
            },
            0
        );


    // Si GitHub no detecta contenido,
    // se devuelve una lista vacía.
    if (totalBytes <= 0) {
        return [];
    }


    // Aquí cada lenguaje se transforma en:
    //
    // {
    //     language: "HTML",
    //     percentage: 40.2
    // }
    return entries.map(
        function ([language, bytes]) {

            return {

                language: language,

                percentage:
                    (bytes / totalBytes) * 100
            };
        }
    );
}


// ========================================
// FUNCIÓN — CREAR DESCRIPCIÓN ACCESIBLE
// ========================================

// Aquí se genera una descripción como:
//
// HTML 40.2%, JavaScript 34.6%, CSS 25.2%
//
// para utilizarla mediante aria-label.
function createLanguagesAriaLabel(languages) {

    return languages
        .map(
            function (item) {

                return (
                    `${item.language} `
                    + `${item.percentage.toFixed(1)}%`
                );
            }
        )
        .join(", ");
}


// ========================================
// FUNCIÓN — RENDERIZAR LANGUAGES
// ========================================

// Aquí se dibuja dinámicamente:
//
// barra
// segmentos
// leyenda
// porcentajes
// fuente
function renderProjectLanguages(
    projectCard,
    repository,
    languages
) {

    // Aquí se busca el panel Languages de la card.
    const panel =
        projectCard.querySelector(
            ".project-reference-front__languages"
        );

    if (!panel) {
        return;
    }


    // Aquí se busca la pista donde se dibujará la barra.
    const bar =
        panel.querySelector(
            ".project-languages__bar"
        );


    // Aquí se busca el texto de estado.
    const status =
        panel.querySelector(
            ".project-languages__status"
        );


    // Si falta una parte esencial,
    // se evita continuar.
    if (!bar || !status) {
        return;
    }


    // ========================================
    // LIMPIAR CONTENIDO ANTERIOR
    // ========================================

    // Aquí se elimina el placeholder.
    bar.innerHTML = "";


    // Si ya existía una leyenda,
    // se elimina antes de reconstruirla.
    const previousLegend =
        panel.querySelector(
            ".project-languages__legend"
        );

    if (previousLegend) {
        previousLegend.remove();
    }


    // ========================================
    // CREAR SEGMENTOS DE LA BARRA
    // ========================================

    languages.forEach(
        function (item, index) {

            // Aquí se crea un segmento por lenguaje.
            const segment =
                document.createElement("span");


            // Aquí se obtiene una clase segura.
            const languageClass =
                normalizeLanguageClass(
                    item.language
                );


            // Aquí se agregan las clases correspondientes.
            segment.classList.add(
                "project-languages__segment",
                `project-languages__segment--${languageClass}`
            );


            // El ancho representa la proporción real
            // calculada a partir de los bytes de GitHub.
            segment.style.width =
                `${item.percentage}%`;


            // Aquí se garantiza un color incluso
            // para lenguajes nuevos.
            segment.style.backgroundColor =
                getLanguageColor(
                    item.language,
                    index
                );


            // Aquí se agrega información al pasar el cursor.
            segment.title =
                `${item.language}: `
                + `${item.percentage.toFixed(1)}%`;


            // El segmento es decorativo.
            segment.setAttribute(
                "aria-hidden",
                "true"
            );


            // Aquí se incorpora a la barra.
            bar.appendChild(
                segment
            );
        }
    );


    // ========================================
    // ACCESIBILIDAD DE LA BARRA
    // ========================================

    // Aquí se comunica mediante aria-label
    // la información completa de Languages.
    bar.setAttribute(
        "aria-label",
        createLanguagesAriaLabel(
            languages
        )
    );


    // ========================================
    // CREAR LEYENDA
    // ========================================

    // Aquí se crea el contenedor de la leyenda.
    const legend =
        document.createElement("div");

    legend.className =
        "project-languages__legend";


    // Aquí se crea un elemento por lenguaje.
    languages.forEach(
        function (item, index) {

            const languageClass =
                normalizeLanguageClass(
                    item.language
                );


            // Aquí se crea el elemento de leyenda.
            const legendItem =
                document.createElement("span");

            legendItem.className =
                "project-languages__item";


            // Aquí se crea el punto de color.
            const dot =
                document.createElement("span");


            dot.classList.add(
                "project-languages__dot",
                `project-languages__dot--${languageClass}`
            );


            dot.style.backgroundColor =
                getLanguageColor(
                    item.language,
                    index
                );


            dot.setAttribute(
                "aria-hidden",
                "true"
            );


            // Aquí se crea el texto.
            const label =
                document.createElement("span");


            label.textContent =
                `${item.language} `
                + `${item.percentage.toFixed(1)}%`;


            // Aquí se construye el elemento completo.
            legendItem.appendChild(
                dot
            );

            legendItem.appendChild(
                label
            );


            // Aquí se incorpora a la leyenda.
            legend.appendChild(
                legendItem
            );
        }
    );


    // La leyenda se coloca inmediatamente
    // después de la barra.
    bar.insertAdjacentElement(
        "afterend",
        legend
    );


    // ========================================
    // ESTADO CORRECTO — COMPACTO
    // ========================================

    // Aquí se muestra solamente una fuente corta
    // para evitar que owner/repository se salga
    // del recuadro blanco.
    status.textContent =
        "Fuente: GitHub";


    // El repositorio completo se conserva
    // como información adicional al pasar el cursor.
    status.title =
        repository;


    // También se agrega una descripción accesible
    // sin ocupar espacio visual.
    status.setAttribute(
        "aria-label",
        `Fuente GitHub: ${repository}`
    );


    // Si anteriormente hubo un error,
    // se elimina el estado visual.
    status.classList.remove(
        "is-error"
    );
}


// ========================================
// FUNCIÓN — ERROR DE GITHUB
// ========================================

// Aquí se maneja cualquier problema sin romper la card.
//
// Ejemplos:
//
// GitHub no responde.
// Rate limit.
// Repositorio inexistente.
// Sin conexión.
function renderProjectLanguagesError(
    projectCard,
    message
) {

    // Aquí se localiza el panel correspondiente.
    const panel =
        projectCard.querySelector(
            ".project-reference-front__languages"
        );


    if (!panel) {
        return;
    }


    const bar =
        panel.querySelector(
            ".project-languages__bar"
        );


    const status =
        panel.querySelector(
            ".project-languages__status"
        );


    // ========================================
    // RESTAURAR PLACEHOLDER NEUTRO
    // ========================================

    if (bar) {

        // Aquí se elimina cualquier contenido anterior.
        bar.innerHTML = "";


        // Aquí se crea un placeholder que NO representa
        // ningún porcentaje.
        const placeholder =
            document.createElement("span");


        placeholder.className =
            "project-languages__placeholder";


        bar.appendChild(
            placeholder
        );


        // Aquí se actualiza la accesibilidad.
        bar.setAttribute(
            "aria-label",
            message
        );
    }


    // ========================================
    // ELIMINAR LEYENDA ANTERIOR
    // ========================================

    const previousLegend =
        panel.querySelector(
            ".project-languages__legend"
        );


    if (previousLegend) {
        previousLegend.remove();
    }


    // ========================================
    // MOSTRAR MENSAJE
    // ========================================

    if (status) {

        status.textContent =
            message;


        // Se elimina cualquier title anterior
        // que correspondiera a un repositorio cargado correctamente.
        status.removeAttribute(
            "title"
        );


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
// FUNCIÓN — CARGAR LANGUAGES DE UN PROYECTO
// ========================================

// Aquí se conecta cada card con la API pública de GitHub.
async function loadProjectLanguages(projectCard) {

    // Aquí se obtiene el repositorio configurado
    // en data-repository-url.
    const repository =
        getProjectRepository(
            projectCard
        );


    // Si no existe repositorio,
    // se muestra un mensaje claro.
    if (!repository) {

        renderProjectLanguagesError(
            projectCard,
            "Repositorio no configurado."
        );

        return;
    }


    // Aquí se localiza el estado visual.
    const status =
        projectCard.querySelector(
            ".project-languages__status"
        );


    // Mientras GitHub responde,
    // se muestra un mensaje temporal corto.
    if (status) {

        status.textContent =
            "Cargando GitHub…";


        status.removeAttribute(
            "title"
        );


        status.setAttribute(
            "aria-label",
            `Cargando datos desde GitHub para ${repository}`
        );


        status.classList.remove(
            "is-error"
        );
    }


    // ========================================
    // ENDPOINT OFICIAL DE LANGUAGES
    // ========================================

    const languagesUrl =
        `https://api.github.com/repos/${repository}/languages`;


    try {

        // Aquí se consulta GitHub.
        const languageBytes =
            await fetchGitHubJson(
                languagesUrl
            );


        // Aquí se convierten bytes a porcentajes.
        const languages =
            calculateLanguagePercentages(
                languageBytes
            );


        // ========================================
        // SIN LANGUAGES
        // ========================================

        if (languages.length === 0) {

            renderProjectLanguagesError(
                projectCard,
                "GitHub no detectó lenguajes."
            );

            return;
        }


        // ========================================
        // RENDER CORRECTO
        // ========================================

        renderProjectLanguages(
            projectCard,
            repository,
            languages
        );

    } catch (error) {

        // Si ocurre cualquier problema,
        // se conserva la funcionalidad completa de la card.
        console.error(
            `No fue posible cargar Languages de ${repository}:`,
            error
        );


        renderProjectLanguagesError(
            projectCard,
            "No fue posible actualizar GitHub."
        );
    }
}


// ========================================
// CONFIGURAR CADA CARD
// ========================================

// Aquí se recorre cada proyecto de forma independiente.
projectCards.forEach(
    function (projectCard) {

        // Aquí se buscan los dos botones de giro
        // que pertenecen únicamente a la card actual.
        const turnButtons =
            projectCard.querySelectorAll(
                ".project-flip-card__turn"
            );


        // Aquí se guarda la cara frontal.
        const frontFace =
            projectCard.querySelector(
                ".project-flip-card__front"
            );


        // Aquí se guarda la cara posterior.
        const backFace =
            projectCard.querySelector(
                ".project-flip-card__back"
            );


        // ========================================
        // VALIDACIÓN DE ESTRUCTURA
        // ========================================

        // Si falta alguno de los elementos esenciales,
        // se evita configurar esa card.
        if (
            turnButtons.length < 2
            || !frontFace
            || !backFace
        ) {
            return;
        }


        // ========================================
        // FUNCIÓN — ESTADO DE LA CARD
        // ========================================

        // Aquí se centraliza el cambio
        // entre frente y reverso.
        function setProjectCardState(
            isFlipped,
            moveFocus = true
        ) {

            // is-flipped controla visualmente
            // la rotación de la tarjeta.
            projectCard.classList.toggle(
                "is-flipped",
                isFlipped
            );


            // ========================================
            // ACCESIBILIDAD — CARAS
            // ========================================

            // Cuando la card está girada,
            // el frente queda oculto.
            frontFace.setAttribute(
                "aria-hidden",
                String(isFlipped)
            );


            // Cuando la card está girada,
            // el reverso queda visible.
            backFace.setAttribute(
                "aria-hidden",
                String(!isFlipped)
            );


            // ========================================
            // ACCESIBILIDAD — BOTONES
            // ========================================

            turnButtons[0].setAttribute(
                "aria-pressed",
                String(isFlipped)
            );


            turnButtons[1].setAttribute(
                "aria-pressed",
                String(isFlipped)
            );


            // ========================================
            // CONTROL DEL FOCO
            // ========================================

            // El botón de la cara oculta
            // queda fuera de la navegación con Tab.
            turnButtons[0].tabIndex =
                isFlipped
                    ? -1
                    : 0;


            turnButtons[1].tabIndex =
                isFlipped
                    ? 0
                    : -1;


            // ========================================
            // MOVER FOCO
            // ========================================

            // El foco solamente se mueve
            // cuando el giro proviene de interacción.
            if (moveFocus) {

                const visibleButton =
                    isFlipped
                        ? turnButtons[1]
                        : turnButtons[0];


                visibleButton.focus();
            }
        }


        // ========================================
        // EVENTOS — GIRO
        // ========================================

        // Aquí ambas flechas utilizan
        // exactamente la misma lógica.
        turnButtons.forEach(
            function (turnButton) {

                turnButton.addEventListener(
                    "click",
                    function () {

                        // Aquí se identifica
                        // el estado actual.
                        const isCurrentlyFlipped =
                            projectCard.classList.contains(
                                "is-flipped"
                            );


                        // Aquí se cambia
                        // al estado contrario.
                        setProjectCardState(
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
        // mostrando la cara frontal.
        setProjectCardState(
            false,
            false
        );


        // ========================================
        // CARGAR DATOS REALES DE GITHUB
        // ========================================

        // Aquí se inicia una única consulta
        // al cargar/configurar la card.
        //
        // NO existe setInterval.
        //
        // Cuando la persona vuelva a abrir
        // o recargar el portafolio,
        // GitHub volverá a consultarse.
        loadProjectLanguages(
            projectCard
        );
    }
);