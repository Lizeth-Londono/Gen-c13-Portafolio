// ========================================
// LXL CHARACTER V12 — FIDELIDAD PROPUESTA
// IDLE CUBE ↔ SPIRAL TRANSITION ↔ ACTIVE MASCOT
// ========================================

const LXL_SECTION_IDS = ["sobre-mi", "proyectos", "habilidades", "contacto"];

function prepararLxlCharacterV12() {
    const sections = LXL_SECTION_IDS
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    if (sections.length !== LXL_SECTION_IDS.length) return;
    if (document.querySelector("[data-lxl-character]")) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tablet = window.matchMedia("(max-width: 900px)");
    const mobile = window.matchMedia("(max-width: 600px)");

    const layer = document.createElement("div");
    layer.className = "lxl-character-layer";
    layer.setAttribute("aria-hidden", "true");

    const character = document.createElement("div");
    character.className = "lxl-character";
    character.dataset.lxlCharacter = "";
    character.dataset.mode = "active";
    character.dataset.expression = "idle";

    const cubeLayout = [
        [-47,-37,20],[-24,-48,12],[-3,-51,14],[21,-47,14],[45,-35,21],
        [-54,-13,15],[-42,4,11],[-48,24,20],[51,-7,11],[53,15,16],[45,34,19],
        [-31,44,19],[-10,51,12],[13,49,14],[31,43,17],
        [-61,7,8],[61,25,8],[-17,-61,8],[34,-58,8],[-54,45,8],[56,48,8],
        [-35,-8,9],[38,6,9],[1,-41,10],[-2,59,8],[58,-29,7]
    ];

    const colors = [
        "cyan","cyan","aqua","violet","cyan",
        "magenta","violet","cyan","lavender","cyan","violet",
        "cyan","blue","violet","lavender",
        "red","cyan","lavender","cyan","magenta",
        "violet","dark","blue","violet","cyan","red"
    ];

    const particles = cubeLayout.map(([x,y,size], index) => `
        <span
            class="lxl-character__cube lxl-character__cube--${colors[index]}"
            style="--cube-x:${x}px;--cube-y:${y}px;--cube-size:${size}px;--cube-index:${index};"
        ></span>
    `).join("");

    character.innerHTML = `
        <div class="lxl-character__stage">
            <div class="lxl-character__halo"></div>

            <div class="lxl-character__spiral-ribbon" aria-hidden="true">
                <span></span><span></span><span></span>
            </div>

            <div class="lxl-character__particle-field" aria-hidden="true">
                ${particles}
            </div>

            <div class="lxl-character__idle-cube" aria-hidden="true">
                <div class="lxl-character__idle-screen">
                    <span class="lxl-character__idle-eye"></span>
                    <span class="lxl-character__idle-blush"></span>
                </div>
            </div>

            <div class="lxl-character__active">
                <div class="lxl-character__body-shell">
                    <div class="lxl-character__body-screen">
                        <svg class="lxl-character__face-svg" viewBox="0 0 100 70" aria-hidden="true">
                            <defs>
                                <filter id="lxlGlowV12" x="-70%" y="-70%" width="240%" height="240%">
                                    <feGaussianBlur stdDeviation="1.45" result="blur"/>
                                    <feMerge>
                                        <feMergeNode in="blur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>

                            <g class="lxl-face lxl-face--idle" filter="url(#lxlGlowV12)">
                                <rect x="21" y="18" width="15" height="15" rx="3.8" class="lxl-face__eye-fill"/>
                                <path d="M78 19 L64 25.5 L78 32" class="lxl-face__stroke"/>
                                <path d="M43 41 Q50 48 57 41" class="lxl-face__stroke"/>
                                <path d="M17 46 l-3 4 M23 46 l-3 4 M77 46 l3 4 M83 46 l3 4" class="lxl-face__blush"/>
                            </g>

                            <g class="lxl-face lxl-face--hello" filter="url(#lxlGlowV12)">
                                <path d="M20 27 Q28 18 36 27 M64 27 Q72 18 80 27" class="lxl-face__stroke"/>
                                <path d="M42 40 Q50 48 58 40" class="lxl-face__stroke"/>
                                <path d="M17 46 l-3 4 M23 46 l-3 4 M77 46 l3 4 M83 46 l3 4" class="lxl-face__blush"/>
                            </g>

                            <g class="lxl-face lxl-face--happy" filter="url(#lxlGlowV12)">
                                <path d="M19 27 Q28 17 37 27 M63 27 Q72 17 81 27" class="lxl-face__stroke"/>
                                <path d="M39 39 Q50 51 61 39" class="lxl-face__stroke"/>
                                <path d="M16 46 l-3 4 M22 46 l-3 4 M78 46 l3 4 M84 46 l3 4" class="lxl-face__blush"/>
                            </g>

                            <g class="lxl-face lxl-face--curious" filter="url(#lxlGlowV12)">
                                <circle cx="28" cy="25" r="6.5" class="lxl-face__stroke"/>
                                <path d="M77 20 L64 25.5 L77 31" class="lxl-face__stroke"/>
                                <path d="M45 42 Q50 45 55 42" class="lxl-face__stroke"/>
                            </g>

                            <g class="lxl-face lxl-face--analysis" filter="url(#lxlGlowV12)">
                                <rect x="21" y="19" width="14" height="14" rx="3.6" class="lxl-face__eye-fill"/>
                                <circle cx="71" cy="25" r="6.2" class="lxl-face__stroke"/>
                                <path d="M45 42 H55" class="lxl-face__stroke"/>
                            </g>

                            <g class="lxl-face lxl-face--organization" filter="url(#lxlGlowV12)">
                                <path d="M20 27 Q28 21 36 27 M64 27 Q72 21 80 27" class="lxl-face__stroke"/>
                                <path d="M45 42 H55" class="lxl-face__stroke"/>
                            </g>

                            <g class="lxl-face lxl-face--coding" filter="url(#lxlGlowV12)">
                                <rect x="21" y="18" width="15" height="15" rx="3.8" class="lxl-face__eye-fill"/>
                                <path d="M78 19 L64 25.5 L78 32" class="lxl-face__stroke"/>
                                <path d="M44 41 Q50 46 56 41" class="lxl-face__stroke"/>
                            </g>

                            <g class="lxl-face lxl-face--technology" filter="url(#lxlGlowV12)">
                                <circle cx="28" cy="25" r="6.2" class="lxl-face__stroke"/>
                                <circle cx="72" cy="25" r="6.2" class="lxl-face__stroke"/>
                                <path d="M43 41 Q50 47 57 41" class="lxl-face__stroke"/>
                            </g>

                            <g class="lxl-face lxl-face--solutions" filter="url(#lxlGlowV12)">
                                <path d="M20 27 Q28 19 36 27 M64 27 Q72 19 80 27" class="lxl-face__stroke"/>
                                <path d="M40 40 Q50 49 60 40" class="lxl-face__stroke"/>
                            </g>

                            <g class="lxl-face lxl-face--pride" filter="url(#lxlGlowV12)">
                                <path d="M20 26 Q28 21 36 26 M64 26 Q72 21 80 26" class="lxl-face__stroke"/>
                                <path d="M42 40 Q50 46 58 40" class="lxl-face__stroke"/>
                            </g>

                            <g class="lxl-face lxl-face--success" filter="url(#lxlGlowV12)">
                                <path d="M19 27 Q28 17 37 27 M63 27 Q72 17 81 27" class="lxl-face__stroke"/>
                                <path d="M39 39 Q50 51 61 39" class="lxl-face__stroke"/>
                                <path d="M16 46 l-3 4 M22 46 l-3 4 M78 46 l3 4 M84 46 l3 4" class="lxl-face__blush"/>
                            </g>
                        </svg>
                    </div>
                </div>

                <div class="lxl-character__signal" aria-hidden="true"></div>
            </div>
        </div>
    `;

    layer.appendChild(character);
    document.body.prepend(layer);

    const particleEls = [...character.querySelectorAll(".lxl-character__cube")];
    const signal = character.querySelector(".lxl-character__signal");

    const state = {
        mode: "active",
        expression: "idle",
        transitionStart: 0,
        transitionDuration: 1120,
        lastInteraction: performance.now(),
        idleDelay: 3400,
        pointerX: innerWidth / 2,
        pointerY: innerHeight / 2,
        lookX: 0,
        lookY: 0,
        targetLookX: 0,
        targetLookY: 0,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        activeSection: 0,
        rails: [],
        layoutDirty: true,
        expressionTimer: 0,
    };

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function expLerp(current, target, speed, dt) {
        const alpha = 1 - Math.exp(-speed * dt);
        return current + (target - current) * alpha;
    }

    function updateLayerHeight() {
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
        );

        layer.style.height = `${documentHeight}px`;
    }

    function getSize() {
        const rect = character.getBoundingClientRect();
        return {
            width: rect.width || (tablet.matches ? 86 : 110),
            height: rect.height || (tablet.matches ? 86 : 110),
        };
    }

    function combinedBounds(elements) {
        const rects = elements
            .filter(Boolean)
            .map((el) => el.getBoundingClientRect())
            .filter((rect) => rect.width > 1 && rect.height > 1);

        if (!rects.length) return null;

        return {
            left: Math.min(...rects.map((r) => r.left)),
            right: Math.max(...rects.map((r) => r.right)),
            top: Math.min(...rects.map((r) => r.top)),
            bottom: Math.max(...rects.map((r) => r.bottom)),
        };
    }

    function sectionBounds(section) {
        switch (section.id) {
            case "sobre-mi":
                return combinedBounds([
                    section.querySelector(".sobre-mi-fiel-contacto__imagen-poster"),
                    section.querySelector(".sobre-mi-fiel-contacto__historia"),
                    section.querySelector(".sobre-mi-fiel-contacto__historia-panel"),
                    section.querySelector(".sobre-mi-fiel-contacto__resumen"),
                ]) || section.getBoundingClientRect();

            case "proyectos":
                return combinedBounds([
                    section.querySelector(".proyectos-panel-turquesa"),
                    section.querySelector(".project-flip-grid"),
                ]) || section.getBoundingClientRect();

            case "habilidades":
                return combinedBounds([
                    section.querySelector(".habilidades-editorial-panel"),
                    section.querySelector(".skills-grid"),
                ]) || section.getBoundingClientRect();

            case "contacto":
                return combinedBounds([
                    section.querySelector(".contacto-poster"),
                    section.querySelector(".contacto-imagen-panel"),
                    section.querySelector(".contacto-canales"),
                ]) || section.getBoundingClientRect();

            default:
                return section.getBoundingClientRect();
        }
    }

    function calculateRails() {
        updateLayerHeight();

        const size = getSize();
        const viewportWidth = window.innerWidth;
        const pad = tablet.matches ? 12 : 18;
        const glowSafety = tablet.matches ? 8 : 12;

        state.rails = sections.map((section) => {
            const bounds = sectionBounds(section);
            const leftSpace = Math.max(0, bounds.left);
            const rightSpace = Math.max(0, viewportWidth - bounds.right);

            const leftCenter = leftSpace * 0.50;
            const rightCenter = bounds.right + rightSpace * 0.50;

            let leftX = leftCenter - size.width / 2;
            let rightX = rightCenter - size.width / 2;

            leftX = clamp(
                leftX,
                pad,
                Math.max(pad, bounds.left - size.width - glowSafety)
            );

            rightX = clamp(
                rightX,
                Math.min(viewportWidth - size.width - pad, bounds.right + glowSafety),
                viewportWidth - size.width - pad
            );

            return { leftX, rightX, bounds };
        });

        state.layoutDirty = false;
    }

    function activeSectionIndex() {
        const reading = window.scrollY + window.innerHeight * 0.48;
        let index = 0;

        sections.forEach((section, i) => {
            if (reading >= section.offsetTop) index = i;
        });

        return clamp(index, 0, sections.length - 1);
    }

    function updateTargets() {
        if (state.layoutDirty || !state.rails.length) calculateRails();

        const index = activeSectionIndex();
        state.activeSection = index;

        const rail = state.rails[index];
        state.targetX = index % 2 === 1 ? rail.rightX : rail.leftX;

        const section = sections[index];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const readingY = window.scrollY + window.innerHeight * 0.52;

        state.targetY = clamp(
            readingY,
            sectionTop + 110,
            Math.max(sectionTop + 110, sectionBottom - 140)
        );

        character.classList.add("is-visible");
    }

    function baseExpression() {
        return ["hello", "coding", "technology", "happy"][state.activeSection] || "idle";
    }

    function symbolFor(expression) {
        return {
            hello: "✦",
            happy: "♥",
            curious: "?",
            analysis: "⌕",
            organization: "▦",
            coding: "</>",
            technology: "⌘",
            solutions: "✦",
            pride: "✦",
            success: "✓",
        }[expression] || "";
    }

    function setExpression(expression, duration = 0) {
        clearTimeout(state.expressionTimer);
        state.expression = expression;
        character.dataset.expression = expression;
        signal.textContent = symbolFor(expression);

        if (duration > 0) {
            state.expressionTimer = setTimeout(() => {
                const base = baseExpression();
                state.expression = base;
                character.dataset.expression = base;
                signal.textContent = symbolFor(base);
            }, duration);
        }
    }

    function startTransition(direction) {
        if (reduceMotion.matches) {
            state.mode = direction === "to-active" ? "active" : "idle-cube";
            character.dataset.mode = state.mode;
            character.style.setProperty("--morph-progress", state.mode === "active" ? "1" : "0");
            return;
        }

        state.mode = direction;
        state.transitionStart = performance.now();
        character.dataset.mode = direction;
    }

    function markActivity() {
        state.lastInteraction = performance.now();

        if (state.mode === "idle-cube" || state.mode === "to-cube") {
            startTransition("to-active");
        }
    }

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function updateMorph(now) {
        if (state.mode !== "to-active" && state.mode !== "to-cube") return;

        const raw = clamp(
            (now - state.transitionStart) / state.transitionDuration,
            0,
            1
        );

        const eased = easeInOutCubic(raw);
        const progress = state.mode === "to-active" ? eased : 1 - eased;

        particleEls.forEach((el, index) => {
            const baseX = parseFloat(el.style.getPropertyValue("--cube-x")) || 0;
            const baseY = parseFloat(el.style.getPropertyValue("--cube-y")) || 0;

            const phase = (index / particleEls.length) * Math.PI * 6;
            const envelope = Math.sin(progress * Math.PI);
            const radius = envelope * (18 + index * 1.35);
            const spin = phase + progress * Math.PI * 4.4;

            const spiralX = Math.cos(spin) * radius;
            const spiralY = Math.sin(spin) * radius * 0.62;

            const x = baseX * progress + spiralX;
            const y = baseY * progress + spiralY;

            el.style.setProperty("--live-x", `${x}px`);
            el.style.setProperty("--live-y", `${y}px`);
            el.style.setProperty("--live-r", `${(1 - progress) * 170 + index * 6}deg`);
            el.style.setProperty("--live-scale", `${0.28 + progress * 0.72}`);
        });

        character.style.setProperty("--morph-progress", progress.toFixed(4));

        if (raw >= 1) {
            state.mode = progress > 0.5 ? "active" : "idle-cube";
            character.dataset.mode = state.mode;

            particleEls.forEach((el) => {
                el.style.removeProperty("--live-x");
                el.style.removeProperty("--live-y");
                el.style.removeProperty("--live-r");
                el.style.removeProperty("--live-scale");
            });
        }
    }

    function updateLook(dt) {
        const rect = character.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = state.pointerX - centerX;
        const dy = state.pointerY - centerY;
        const length = Math.hypot(dx, dy) || 1;

        if (state.mode === "active" || state.mode === "to-active") {
            state.targetLookX = clamp(dx / length, -1, 1);
            state.targetLookY = clamp(dy / length, -1, 1);
        } else {
            state.targetLookX = 0;
            state.targetLookY = 0;
        }

        state.lookX = expLerp(state.lookX, state.targetLookX, 12.5, dt);
        state.lookY = expLerp(state.lookY, state.targetLookY, 12.5, dt);

        character.style.setProperty("--look-x", state.lookX.toFixed(4));
        character.style.setProperty("--look-y", state.lookY.toFixed(4));
    }

    let lastFrame = performance.now();

    function frame(now) {
        const dt = Math.min(0.05, Math.max(0.001, (now - lastFrame) / 1000));
        lastFrame = now;

        updateTargets();

        state.currentX = expLerp(state.currentX, state.targetX, 8.8, dt);
        state.currentY = expLerp(state.currentY, state.targetY, 8.8, dt);

        character.style.setProperty("--lxl-character-x", `${state.currentX}px`);
        character.style.setProperty("--lxl-character-y", `${state.currentY}px`);

        updateLook(dt);
        updateMorph(now);

        if (
            state.mode === "active"
            && now - state.lastInteraction > state.idleDelay
        ) {
            startTransition("to-cube");
        }

        requestAnimationFrame(frame);
    }

    function bindReaction(selector, expression) {
        document.querySelectorAll(selector).forEach((element) => {
            element.addEventListener("mouseenter", () => {
                markActivity();
                setExpression(expression);
            });

            element.addEventListener("mouseleave", () => {
                setExpression(baseExpression(), 120);
            });

            element.addEventListener("focusin", () => {
                markActivity();
                setExpression(expression);
            });

            element.addEventListener("focusout", () => {
                setExpression(baseExpression(), 120);
            });
        });
    }

    bindReaction("#sobre-mi .sobre-mi-fiel-contacto__foto", "hello");
    bindReaction("#sobre-mi .sobre-mi-canal-visual__icono", "analysis");
    bindReaction("#proyectos .project-flip-card", "coding");
    bindReaction("#proyectos .project-reference-front__preview", "analysis");
    bindReaction("#habilidades .skill-card", "technology");
    bindReaction("#contacto a", "success");
    bindReaction("#contacto .contacto-imagen-foto", "happy");

    window.addEventListener("pointermove", (event) => {
        state.pointerX = event.clientX;
        state.pointerY = event.clientY;
        markActivity();
    }, { passive: true });

    window.addEventListener("scroll", () => {
        markActivity();
        state.layoutDirty = true;
    }, { passive: true });

    window.addEventListener("resize", () => {
        updateLayerHeight();
        state.layoutDirty = true;
        markActivity();
    }, { passive: true });

    window.addEventListener("keydown", markActivity, { passive: true });
    window.addEventListener("load", () => {
        updateLayerHeight();
        state.layoutDirty = true;
    }, { once: true });

    tablet.addEventListener?.("change", () => {
        state.layoutDirty = true;
    });

    mobile.addEventListener?.("change", () => {
        state.layoutDirty = true;
    });

    reduceMotion.addEventListener?.("change", markActivity);

    updateLayerHeight();
    calculateRails();
    updateTargets();

    state.currentX = state.targetX;
    state.currentY = state.targetY;

    character.style.setProperty("--lxl-character-x", `${state.currentX}px`);
    character.style.setProperty("--lxl-character-y", `${state.currentY}px`);
    character.style.setProperty("--morph-progress", "1");

    setExpression("hello", 900);
    requestAnimationFrame(frame);
}

prepararLxlCharacterV12();
