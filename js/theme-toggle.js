/**
 * LXL — FUTURE THEME TEASER
 * Estado actual:
 *   Creative Tech LXL     = activo
 *   Elegant Editorial LXL = pausado / próxima experiencia
 *
 * DECISIÓN TEMPORAL
 * ------------------------------------------------------------------
 * Este módulo NO alterna dark/light y NO escribe una preferencia nueva
 * en localStorage. Una preferencia histórica "light" puede seguir allí,
 * pero se ignora mientras el modo Elegant Editorial no esté aprobado.
 *
 * El botón no usa el atributo HTML `disabled` porque debe conservar foco,
 * clic y activación por teclado para presentar el mensaje informativo.
 *
 * REACTIVACIÓN FUTURA
 * ------------------------------------------------------------------
 * Cuando el modo Elegant Editorial sea aprobado:
 * 1. restaurar la resolución dark/light en el script anti-flash del <head>;
 * 2. restaurar lectura/escritura de localStorage["lxl-theme"];
 * 3. restaurar el cambio de estado del toggle;
 * 4. validar nuevamente todo html[data-theme="light"] en navegador.
 *
 * Este módulo no modifica Hero, cards, mascota ni navegación.
 */

const ACTIVE_THEME = "dark";

const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const label = document.querySelector("[data-theme-label]");

let dialogOverlay = null;
let previouslyFocusedElement = null;
let previousBodyOverflow = "";

/**
 * Mantiene Creative Tech como única experiencia habilitada.
 * Se ejecuta también desde este módulo como segunda barrera de seguridad,
 * además del script previo al pintado que vive en index.html.
 */
function enforceCreativeTheme() {
    root.dataset.theme = ACTIVE_THEME;
    root.style.colorScheme = ACTIVE_THEME;

    if (toggle) {
        toggle.setAttribute("aria-pressed", "false");
        toggle.setAttribute("aria-label", "Modo light próximamente");
        toggle.setAttribute("aria-haspopup", "dialog");
        toggle.setAttribute("title", "Modo light próximamente");
    }

    if (label) {
        label.textContent = "Próximamente";
    }

    window.dispatchEvent(
        new CustomEvent("lxl:themechange", {
            detail: {
                theme: ACTIVE_THEME,
                availability: "creative-only"
            }
        })
    );
}

/**
 * Devuelve los controles que pueden recibir foco dentro del diálogo.
 */
function getFocusableElements(dialog) {
    return Array.from(
        dialog.querySelectorAll(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
    );
}

/**
 * Cierra el mensaje y devuelve el foco al control que lo abrió.
 */
function closeComingSoonDialog() {
    if (!dialogOverlay) {
        return;
    }

    dialogOverlay.removeEventListener("keydown", handleDialogKeydown);
    dialogOverlay.remove();
    dialogOverlay = null;

    document.body.style.overflow = previousBodyOverflow;

    if (
        previouslyFocusedElement &&
        typeof previouslyFocusedElement.focus === "function"
    ) {
        previouslyFocusedElement.focus();
    }

    previouslyFocusedElement = null;
}

/**
 * Mantiene el foco dentro del diálogo y permite cerrarlo con Escape.
 */
function handleDialogKeydown(event) {
    if (!dialogOverlay) {
        return;
    }

    if (event.key === "Escape") {
        event.preventDefault();
        closeComingSoonDialog();
        return;
    }

    if (event.key !== "Tab") {
        return;
    }

    const dialog = dialogOverlay.querySelector(".theme-coming-soon__dialog");

    if (!dialog) {
        return;
    }

    const focusable = getFocusableElements(dialog);

    if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

/**
 * Crea el mensaje AIDA únicamente cuando la persona lo solicita.
 * No se agrega markup permanente a index.html.
 */
function openComingSoonDialog() {
    if (dialogOverlay) {
        return;
    }

    previouslyFocusedElement = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;

    const overlay = document.createElement("div");
    overlay.className = "theme-coming-soon";
    overlay.dataset.themeComingSoon = "";

    overlay.innerHTML = `
        <section
            class="theme-coming-soon__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-coming-soon-title"
            aria-describedby="theme-coming-soon-description"
            tabindex="-1">

            <button
                class="theme-coming-soon__close"
                type="button"
                aria-label="Cerrar aviso del modo light">
                <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>

            <span class="theme-coming-soon__eyebrow">
                LXL / PRÓXIMA EXPERIENCIA
            </span>

            <h2
                class="theme-coming-soon__title"
                id="theme-coming-soon-title">
                Modo light, muy pronto.
            </h2>

            <div
                class="theme-coming-soon__content"
                id="theme-coming-soon-description">

                <p>
                    <strong>Una nueva forma de explorar LXL está en camino.</strong>
                </p>

                <p>
                    Estoy preparando una experiencia light Editorial que
                    complementará la identidad del portafolio desde otra perspectiva.
                </p>

                <p>
                    Por ahora, <strong>Creative Tech es la expresión principal de LXL</strong>:
                    código, tecnología, contraste y transformación.
                </p>

                <p>
                    Continúa explorando Creative Tech. Muy pronto podrás descubrir
                    una nueva lectura visual de LXL.
                </p>
            </div>

            <button
                class="theme-coming-soon__action"
                type="button">
                Seguir explorando Creative Tech
            </button>
        </section>
    `;

    const closeButton = overlay.querySelector(".theme-coming-soon__close");
    const actionButton = overlay.querySelector(".theme-coming-soon__action");
    const dialog = overlay.querySelector(".theme-coming-soon__dialog");

    closeButton?.addEventListener("click", closeComingSoonDialog);
    actionButton?.addEventListener("click", closeComingSoonDialog);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeComingSoonDialog();
        }
    });

    overlay.addEventListener("keydown", handleDialogKeydown);

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    dialogOverlay = overlay;

    closeButton?.focus();
}

enforceCreativeTheme();

toggle?.addEventListener("click", () => {
    /*
     * El control permanece interactivo a propósito:
     * no cambia de tema; presenta la funcionalidad futura.
     */
    enforceCreativeTheme();
    openComingSoonDialog();
});
