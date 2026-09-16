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

// Aquí se reutiliza el mismo caché global que también puede utilizar skills-cards.js.
// De esta forma, si dos componentes consultan el mismo endpoint durante una misma carga,
// se reutiliza la misma Promise y evitamos repetir llamadas innecesarias a GitHub.
if (!window.__lihenGithubCache) {
    window.__lihenGithubCache = new Map();
}

// Aquí se guarda una referencia corta al caché compartido para usarlo
// durante las consultas de Languages de cada proyecto.
const githubCache = window.__lihenGithubCache;


// ========================================
// COLORES DE LANGUAGES
// ========================================

// Aquí se relacionan algunos lenguajes frecuentes con un color visual.
// Estos colores sirven únicamente para diferenciar tecnologías detectadas
// y NO representan nivel de conocimiento, importancia ni porcentaje.
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

// Si GitHub detecta un lenguaje que todavía no está declarado arriba,
// aquí se conserva una lista de colores de respaldo para poder representarlo
// sin dejar el segmento sin identidad visual.
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

// Aquí se convierte el nombre de un lenguaje en una cadena segura
// para poder utilizarla al construir clases CSS dinámicas.
//
// El proceso hace lo siguiente:
// 1. convierte el texto a minúsculas;
// 2. separa marcas Unicode con normalize("NFD");
// 3. elimina acentos o marcas combinadas;
// 4. reemplaza símbolos y espacios por guiones;
// 5. elimina guiones sobrantes al inicio o al final.
//
// Ejemplos:
// JavaScript → javascript
// C++ → c
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

// Aquí se busca primero el color definido para el lenguaje.
// Si todavía no existe una coincidencia en el mapa principal,
// se toma uno de los colores de respaldo según la posición del lenguaje.
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

// Aquí se transforma una URL completa de GitHub en el formato owner/repository.
//
// Ejemplo:
// https://github.com/usuario/repositorio
// → usuario/repositorio
//
// También acepta una URL terminada en .git.
function getRepositoryFromUrl(repositoryUrl) {

    // Si no existe una URL configurada, no hay información suficiente para continuar.
    if (!repositoryUrl) {
        return null;
    }

    try {

        // new URL() permite interpretar de forma segura la dirección recibida.
        const url = new URL(repositoryUrl);

        // Aquí se comprueba que la dirección realmente pertenezca a GitHub.
        // Si pertenece a otro dominio, se devuelve null y no se intenta consultar la API.
        if (
            url.hostname !== "github.com"
            && url.hostname !== "www.github.com"
        ) {
            return null;
        }

        // Aquí se toma pathname, se elimina una posible terminación .git,
        // se divide la ruta por "/" y se descartan partes vacías.
        // Así obtenemos algo como ["usuario", "repositorio"].
        const parts = url.pathname
            .replace(/\.git$/i, "")
            .split("/")
            .filter(Boolean);

        // Para formar owner/repository necesitamos como mínimo dos partes.
        // Si faltan, la URL no tiene la estructura esperada.
        if (parts.length < 2) {
            return null;
        }

        // Aquí se devuelve únicamente la información que necesita la API de GitHub.
        return `${parts[0]}/${parts[1]}`;

    } catch (error) {

        // Si la URL es inválida y new URL() no puede interpretarla,
        // se devuelve null para mantener la página funcionando normalmente.
        return null;
    }
}


// ========================================
// FUNCIÓN — OBTENER REPOSITORIO DE LA CARD
// ========================================

// Aquí se obtiene el repositorio asociado a la card actual.
// La URL viene desde data-repository-url en el HTML y luego se transforma
// al formato owner/repository que utiliza la API.
function getProjectRepository(projectCard) {

    // dataset permite leer el valor configurado en data-repository-url.
    const repositoryUrl =
        projectCard.dataset.repositoryUrl;

    // Aquí se reutiliza la función anterior para validar y simplificar la URL.
    return getRepositoryFromUrl(
        repositoryUrl
    );
}


// ========================================
// FUNCIÓN — CONSULTA GITHUB CON CACHÉ
// ========================================

// Aquí se consulta la API pública de GitHub sin utilizar un token privado.
// La Promise se guarda en memoria para reutilizarla si otro componente
// solicita exactamente el mismo endpoint durante esta carga del portafolio.
async function fetchGitHubJson(url) {

    // Si la URL ya tiene una Promise en caché, se reutiliza inmediatamente.
    if (githubCache.has(url)) {
        return githubCache.get(url);
    }

    // Aquí se crea la solicitud HTTP y se conserva como Promise.
    const request = fetch(
        url,
        {
            headers: {
                Accept: "application/vnd.github+json"
            }
        }
    )
        .then(async function (response) {

            // Si GitHub responde con un estado diferente a 2xx,
            // se genera un error controlado para que el flujo pueda manejarlo
            // sin romper las demás cards.
            if (!response.ok) {

                throw new Error(
                    `GitHub respondió con estado ${response.status}`
                );
            }

            // Aquí se convierte la respuesta a JSON para trabajar con sus datos.
            return response.json();
        })

        .catch(function (error) {

            // Si la Promise falla, se elimina del caché.
            // De esta forma una carga futura podrá volver a intentar la consulta
            // en lugar de quedarse reutilizando una Promise rechazada.
            githubCache.delete(url);

            throw error;
        });

    // Aquí se guarda la relación URL → Promise dentro del Map compartido.
    githubCache.set(
        url,
        request
    );

    // Se devuelve la misma Promise para que el resto del código
    // pueda esperar la respuesta de GitHub normalmente.
    return request;
}


// ========================================
// FUNCIÓN — OBTENER LENGUAJES DETECTADOS
// ========================================

// GitHub Languages devuelve bytes por lenguaje.
// Aquí esos bytes se utilizan solamente para comprobar qué lenguajes existen
// y para mantener un orden consistente según su presencia en el repositorio.
//
// NO se convierten en porcentajes visibles.
// NO representan dominio, experiencia ni una calificación personal.
function getDetectedLanguages(languageBytes) {

    return Object.entries(languageBytes)

        // Aquí se conservan únicamente lenguajes con un valor numérico válido
        // y mayor que cero.
        .filter(function ([, bytes]) {

            return (
                Number.isFinite(bytes)
                && bytes > 0
            );
        })

        // GitHub sigue determinando el orden de presencia mediante los bytes.
        // Este orden se utiliza solo para mantener una salida consistente;
        // visualmente todos los lenguajes recibirán el mismo peso.
        .sort(function (a, b) {

            return b[1] - a[1];
        })

        // Aquí se descartan los bytes y se conserva únicamente
        // el nombre del lenguaje que realmente fue detectado.
        .map(function ([language]) {

            return {
                language: language
            };
        });
}


// ========================================
// FUNCIÓN — CREAR DESCRIPCIÓN ACCESIBLE
// ========================================

// Aquí se genera una descripción accesible con los nombres
// de todos los lenguajes detectados, por ejemplo:
// HTML, JavaScript, CSS.
//
// No se incluyen porcentajes porque el panel comunica tecnologías presentes
// en el repositorio y no una calificación personal.
function createLanguagesAriaLabel(languages) {

    return languages
        .map(
            function (item) {

                return item.language;
            }
        )
        .join(", ");
}


// ========================================
// FUNCIÓN — RENDERIZAR LANGUAGES
// ========================================

// Aquí se construye dinámicamente el panel de Languages de cada proyecto.
// Se crean la señal tecnológica, sus segmentos, la leyenda y la fuente GitHub.
//
// Todos los lenguajes reciben el mismo peso visual para evitar que la señal
// pueda interpretarse como porcentaje, dominio o nivel profesional.
function renderProjectLanguages(
    projectCard,
    repository,
    languages
) {

    // Aquí se busca el panel Languages dentro de la card actual.
    const panel =
        projectCard.querySelector(
            ".project-reference-front__languages"
        );

    // Si esta card no contiene el panel esperado, no se intenta modificarla.
    if (!panel) {
        return;
    }


    // Aquí se obtiene la pista donde se dibujarán los segmentos
    // correspondientes a los lenguajes detectados.
    const bar =
        panel.querySelector(
            ".project-languages__bar"
        );


    // Aquí se obtiene el espacio donde se muestra el estado o la fuente.
    const status =
        panel.querySelector(
            ".project-languages__status"
        );


    // Si falta una parte esencial del panel, se detiene el render
    // para evitar trabajar sobre una estructura incompleta.
    if (!bar || !status) {
        return;
    }


    // ========================================
    // LIMPIAR CONTENIDO ANTERIOR
    // ========================================

    // Aquí se elimina el placeholder o cualquier señal anterior
    // antes de construir la información actualizada.
    bar.innerHTML = "";


    // Si ya existía una leyenda de una carga anterior,
    // se elimina para poder reconstruirla sin duplicados.
    const previousLegend =
        panel.querySelector(
            ".project-languages__legend"
        );

    if (previousLegend) {
        previousLegend.remove();
    }


    // ========================================
    // CREAR SEGMENTOS DE LA SEÑAL
    // ========================================

    languages.forEach(
        function (item, index) {

            // Aquí se crea un segmento visual por cada lenguaje detectado.
            const segment =
                document.createElement("span");


            // Aquí se obtiene una versión segura del nombre
            // para construir la clase CSS dinámica del segmento.
            const languageClass =
                normalizeLanguageClass(
                    item.language
                );


            // Aquí se agregan la clase base y la clase específica del lenguaje.
            segment.classList.add(
                "project-languages__segment",
                `project-languages__segment--${languageClass}`
            );


            // Todos los lenguajes reciben exactamente el mismo espacio visual.
            // "1 1 0" permite que los segmentos compartan la pista de forma equitativa,
            // sin utilizar los bytes de GitHub para definir su ancho.
            // Por eso la señal deja de funcionar como medidor y solo comunica presencia.
            segment.style.flex =
                "1 1 0";


            // Aquí se utiliza el color asociado al lenguaje para reconocerlo visualmente.
            // El color identifica la tecnología y no representa nivel de conocimiento.
            segment.style.backgroundColor =
                getLanguageColor(
                    item.language,
                    index
                );


            // Aquí se identifica el lenguaje al pasar el mouse
            // sin mostrar ninguna cifra o porcentaje.
            segment.title =
                `${item.language} detectado en GitHub`;


            // El segmento individual es decorativo porque la información completa
            // ya se comunica desde la barra mediante aria-label.
            segment.setAttribute(
                "aria-hidden",
                "true"
            );


            // Aquí se incorpora el segmento a la señal tecnológica.
            bar.appendChild(
                segment
            );
        }
    );


    // ========================================
    // ACCESIBILIDAD DE LA BARRA
    // ========================================

    // Aquí aria-label comunica los nombres de los lenguajes detectados
    // sin depender únicamente de colores o elementos decorativos.
    bar.setAttribute(
        "aria-label",
        `Lenguajes detectados en GitHub: ${
            createLanguagesAriaLabel(
                languages
            )
        }`
    );


    // ========================================
    // CREAR LEYENDA
    // ========================================

    // Aquí se crea el contenedor que agrupará
    // todos los lenguajes detectados por GitHub.
    const legend =
        document.createElement("div");

    legend.className =
        "project-languages__legend";


    // Aquí se crea un elemento de leyenda por cada lenguaje.
    languages.forEach(
        function (item, index) {

            const languageClass =
                normalizeLanguageClass(
                    item.language
                );


            // Aquí se crea el contenedor individual del lenguaje.
            const legendItem =
                document.createElement("span");

            legendItem.className =
                "project-languages__item";


            // ========================================
            // PUNTO DE COLOR
            // ========================================

            // Aquí se crea el punto que conecta visualmente
            // el nombre del lenguaje con su color dentro de la señal.
            const dot =
                document.createElement("span");

            dot.classList.add(
                "project-languages__dot",
                `project-languages__dot--${languageClass}`
            );


            // Aquí se reutiliza exactamente el mismo color
            // empleado para el segmento correspondiente.
            dot.style.backgroundColor =
                getLanguageColor(
                    item.language,
                    index
                );


            // El punto es decorativo porque el nombre del lenguaje
            // ya aparece como texto dentro de la leyenda.
            dot.setAttribute(
                "aria-hidden",
                "true"
            );


            // ========================================
            // NOMBRE DEL LENGUAJE
            // ========================================

            // Aquí se crea el texto visible del lenguaje.
            const label =
                document.createElement("span");


            // Antes este espacio podía mostrar algo como "JavaScript 37.2%".
            // Ahora se muestra únicamente el nombre porque GitHub aporta evidencia técnica,
            // no una calificación personal de conocimiento.
            label.textContent =
                item.language;


            // Aquí se construye el elemento completo de la leyenda:
            // punto de color + nombre del lenguaje.
            legendItem.appendChild(
                dot
            );

            legendItem.appendChild(
                label
            );


            // Aquí se agrega el lenguaje terminado al contenedor de la leyenda.
            legend.appendChild(
                legendItem
            );
        }
    );


    // La leyenda se coloca inmediatamente después de la señal
    // para mantener juntas ambas formas de lectura.
    bar.insertAdjacentElement(
        "afterend",
        legend
    );


    // ========================================
    // ESTADO CORRECTO — GITHUB
    // ========================================

    // Aquí se muestra una referencia breve indicando la fuente de los datos.
    status.textContent =
        "Fuente: GitHub";


    // El repositorio completo se conserva en title para poder consultarlo
    // al pasar el cursor sin ocupar más espacio dentro del panel.
    status.title =
        repository;


    // Aquí se agrega la misma fuente mediante aria-label
    // para mantener disponible el contexto de forma accesible.
    status.setAttribute(
        "aria-label",
        `Fuente GitHub: ${repository}`
    );


    // Si anteriormente existió un error, aquí se elimina ese estado visual
    // porque la información se cargó correctamente.
    status.classList.remove(
        "is-error"
    );
}


// ========================================
// FUNCIÓN — ERROR DE GITHUB
// ========================================

// Aquí se controla cualquier problema al consultar GitHub sin romper la card.
// Esto cubre casos como falta de conexión, rate limit,
// repositorio inexistente o una respuesta temporalmente fallida.
function renderProjectLanguagesError(
    projectCard,
    message
) {

    // Aquí se localiza el panel Languages correspondiente a la card actual.
    const panel =
        projectCard.querySelector(
            ".project-reference-front__languages"
        );


    // Si la card no contiene este panel, no se intenta modificar nada.
    if (!panel) {
        return;
    }


    // Aquí se obtiene la pista donde normalmente aparece la señal tecnológica.
    const bar =
        panel.querySelector(
            ".project-languages__bar"
        );


    // Aquí se obtiene el espacio donde se mostrará el mensaje de estado.
    const status =
        panel.querySelector(
            ".project-languages__status"
        );


    // ========================================
    // RESTAURAR PLACEHOLDER NEUTRO
    // ========================================

    if (bar) {

        // Aquí se elimina cualquier contenido anterior de la pista.
        bar.innerHTML = "";


        // Aquí se crea un placeholder neutral para conservar la estructura visual.
        // Este elemento NO representa porcentaje, nivel ni experiencia.
        const placeholder =
            document.createElement("span");

        placeholder.className =
            "project-languages__placeholder";


        // El placeholder se incorpora nuevamente a la pista.
        bar.appendChild(
            placeholder
        );


        // Aquí se comunica el mismo mensaje mediante aria-label
        // para que el estado de error también sea accesible.
        bar.setAttribute(
            "aria-label",
            message
        );
    }


    // ========================================
    // ELIMINAR LEYENDA ANTERIOR
    // ========================================

    // Si existía una leyenda de una carga correcta anterior,
    // se elimina para no dejar información desactualizada junto al error.
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

        // Aquí se muestra el mensaje controlado dentro del panel.
        status.textContent =
            message;


        // Se elimina cualquier title anterior correspondiente
        // a un repositorio que había cargado correctamente.
        status.removeAttribute(
            "title"
        );


        // El mensaje también se comunica mediante aria-label
        // sin necesitar contenido visual adicional.
        status.setAttribute(
            "aria-label",
            message
        );


        // Esta clase permite que CSS represente visualmente el estado de error.
        status.classList.add(
            "is-error"
        );
    }
}


// ========================================
// FUNCIÓN — CARGAR LANGUAGES DE UN PROYECTO
// ========================================

// Aquí se conecta cada card con la API pública de GitHub.
// El endpoint Languages se utiliza para comprobar qué tecnologías
// están realmente presentes en el repositorio, sin calcular porcentajes visibles.
async function loadProjectLanguages(projectCard) {

    // Aquí se obtiene y valida el repositorio configurado
    // mediante data-repository-url en la card.
    const repository =
        getProjectRepository(
            projectCard
        );


    // Si la card no tiene un repositorio válido, se muestra un estado controlado
    // y no se intenta construir una URL de API incorrecta.
    if (!repository) {

        renderProjectLanguagesError(
            projectCard,
            "Repositorio no configurado."
        );

        return;
    }


    // Aquí se localiza el elemento de estado que mostrará
    // la carga, la fuente correcta o un posible error.
    const status =
        projectCard.querySelector(
            ".project-languages__status"
        );


    // Mientras GitHub responde, se muestra un mensaje temporal corto.
    if (status) {

        status.textContent =
            "Cargando GitHub…";


        // Aquí se elimina un title anterior para no conservar
        // información vieja durante una nueva consulta.
        status.removeAttribute(
            "title"
        );


        // El estado de carga también se comunica de forma accesible.
        status.setAttribute(
            "aria-label",
            `Cargando datos desde GitHub para ${repository}`
        );


        // Si existía un error anterior, se limpia mientras comienza el nuevo intento.
        status.classList.remove(
            "is-error"
        );
    }


    // ========================================
    // ENDPOINT OFICIAL DE LANGUAGES
    // ========================================

    // Este endpoint devuelve bytes de código por lenguaje.
    // Aquí esos bytes se utilizan únicamente para saber qué lenguajes existen
    // y conservar un orden consistente; no se convierten en porcentajes visibles.
    const languagesUrl =
        `https://api.github.com/repos/${repository}/languages`;


    try {

        // Aquí se consulta GitHub y se espera la respuesta antes de continuar.
        const languageBytes =
            await fetchGitHubJson(
                languagesUrl
            );


        // Aquí se transforma la respuesta en una lista de lenguajes detectados.
        // Los bytes dejan de formar parte del resultado que se renderiza en pantalla.
        const languages =
            getDetectedLanguages(
                languageBytes
            );


        // ========================================
        // SIN LANGUAGES
        // ========================================

        // Si GitHub no devuelve ningún lenguaje válido,
        // se conserva un estado neutral en lugar de inventar información.
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

        // Si existen lenguajes válidos, aquí se construye
        // la señal y la leyenda correspondientes a la card.
        renderProjectLanguages(
            projectCard,
            repository,
            languages
        );

    } catch (error) {

        // Si ocurre cualquier excepción, se conserva el detalle en consola
        // para depuración sin romper la funcionalidad de la card.
        console.error(
            `No fue posible cargar Languages de ${repository}:`,
            error
        );


        // Visualmente se presenta un mensaje controlado
        // y se recupera el placeholder neutral.
        renderProjectLanguagesError(
            projectCard,
            "No fue posible actualizar GitHub."
        );
    }
}


// ========================================
// CONFIGURAR CADA CARD
// ========================================

// Aquí se recorre cada proyecto de forma independiente
// para configurar su giro, accesibilidad y carga de Languages.
projectCards.forEach(
    function (projectCard) {

        // Aquí se buscan los dos botones de giro que pertenecen únicamente
        // a la card que estamos configurando.
        const turnButtons =
            projectCard.querySelectorAll(
                ".project-flip-card__turn"
            );


        // Aquí se guarda la referencia de la cara frontal
        // para controlar su estado durante el giro.
        const frontFace =
            projectCard.querySelector(
                ".project-flip-card__front"
            );


        // Aquí se guarda la referencia de la cara posterior
        // para controlar su estado durante el giro.
        const backFace =
            projectCard.querySelector(
                ".project-flip-card__back"
            );


        // ========================================
        // VALIDACIÓN DE ESTRUCTURA
        // ========================================

        // Si falta algún botón o alguna de las dos caras,
        // se detiene la configuración de esa card para evitar errores.
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

        // Aquí se centraliza todo lo que debe cambiar
        // cuando la card pasa del frente al reverso o regresa al frente.
        function setProjectCardState(
            isFlipped,
            moveFocus = true
        ) {

            // is-flipped controla visualmente la rotación de la tarjeta.
            projectCard.classList.toggle(
                "is-flipped",
                isFlipped
            );


            // ========================================
            // ACCESIBILIDAD — CARAS
            // ========================================

            // aria-hidden comunica a tecnologías de asistencia cuál cara está visible.
            // Cuando la card está girada, el frente queda marcado como oculto.
            frontFace.setAttribute(
                "aria-hidden",
                String(isFlipped)
            );


            // Aquí se aplica el estado contrario al reverso:
            // cuando la card está girada, esta cara queda visible.
            backFace.setAttribute(
                "aria-hidden",
                String(!isFlipped)
            );


            // ========================================
            // ACCESIBILIDAD — BOTONES
            // ========================================

            // aria-pressed comunica el estado actual del control de giro
            // sin depender únicamente de la animación visual.
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

            // tabIndex evita que la navegación con Tab llegue
            // al botón perteneciente a una cara que está oculta.
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

            // El foco solo se mueve cuando el giro viene de una interacción.
            // De esta forma, después de girar, el teclado continúa
            // en el botón que pertenece a la cara visible.
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

        // Aquí los dos botones utilizan la misma lógica de giro.
        turnButtons.forEach(
            function (turnButton) {

                turnButton.addEventListener(
                    "click",
                    function () {

                        // Aquí se comprueba si la card se encuentra actualmente girada.
                        const isCurrentlyFlipped =
                            projectCard.classList.contains(
                                "is-flipped"
                            );


                        // Aquí se invierte el estado actual para mostrar
                        // la cara contraria de la card.
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

        // Todas las cards comienzan mostrando la cara frontal.
        // moveFocus se envía como false para no mover el foco durante la carga inicial.
        setProjectCardState(
            false,
            false
        );


        // ========================================
        // CARGAR DATOS REALES DE GITHUB
        // ========================================

        // Aquí se consulta Languages una sola vez al cargar/configurar la card.
        // NO existe setInterval.
        // Cuando la persona vuelva a abrir o recargar el portafolio,
        // GitHub volverá a consultarse.
        loadProjectLanguages(
            projectCard
        );
    }
);