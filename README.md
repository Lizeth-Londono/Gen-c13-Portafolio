# LXL — CODE x LIHEN

## Portafolio profesional de Lina Lizeth Londoño Marín

![Estado](https://img.shields.io/badge/Estado-En%20desarrollo-A855F7)
![Proyecto](https://img.shields.io/badge/Proyecto-Portafolio%20personal-22D3D3)
![Perfil](https://img.shields.io/badge/Perfil-Junior%20Full--Stack%20Java%20Developer-0D1324)

Portafolio personal desarrollado como parte de mi proceso de formación en el **Bootcamp Full Stack Java de Generation Colombia - Cohorte 13**.

El proyecto reúne identidad visual, experiencia de usuario, proyectos, habilidades técnicas, documentación y evidencia verificable desde repositorios reales.

> **Acta non verba, con propósito.**
>
> *Ideas que se convierten en soluciones digitales reales.*

---

## 📑 Tabla de contenidos

- [Objetivo](#-objetivo)
- [Identidad visual](#-identidad-visual)
- [Sistema de color LXL](#-sistema-de-color-lxl)
- [Tipografías](#-tipografías)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Bootstrap 5 en el portafolio](#-bootstrap-5-en-el-portafolio)
- [Estructura actual del portafolio](#-estructura-actual-del-portafolio)
- [Inicio](#1-inicio)
- [Sobre mí](#2-sobre-mí)
- [Proyectos](#3-proyectos)
- [Habilidades](#4-habilidades)
- [Contacto](#5-contacto)
- [JavaScript actual](#-javascript-actual)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura actual del repositorio](#-estructura-actual-del-repositorio)
- [Demo](#-demo---github-pages)
- [Figma](#-figma)
- [Estado actual](#-estado-actual)
- [Mejoras futuras](#-mejoras-futuras)
- [Autora](#-autora)
- [Contacto profesional](#-contacto-profesional)

---

# 🎯 Objetivo

Mi objetivo es desarrollar un portafolio que muestre evidencia real de mis conocimientos, proyectos y evolución como desarrolladora.

El sitio busca comunicar de forma clara:

- quién soy;
- qué estoy aprendiendo;
- qué proyectos he desarrollado;
- qué tecnologías utilizo;
- dónde puede consultarse el código;
- qué evidencia existe para las tecnologías presentadas;
- cómo conecto desarrollo, comunicación, experiencia de usuario e identidad visual.

El portafolio está dirigido principalmente a:

- reclutadores;
- empresas de tecnología;
- líderes técnicos;
- docentes;
- compañeros del bootcamp;
- posibles clientes;
- personas interesadas en conocer mi trabajo.

Por esta razón, el proyecto busca ser:

- profesional;
- responsive;
- accesible;
- visualmente coherente;
- documentado;
- fácil de navegar;
- verificable;
- susceptible de mejora continua.

---

# 🎨 Identidad visual

## Concepto LXL

**LXL** es la identidad visual principal del portafolio.

La propuesta combina mi perfil tecnológico con una estética inspirada en:

- programación;
- interfaces digitales;
- pixel art;
- bloques modulares;
- sistemas gráficos;
- retículas;
- símbolos;
- números;
- contraste entre superficies oscuras y colores tecnológicos.

## Identidad profesional

```text
LXL
CODE x LIHEN

LIZETH LONDOÑO

Junior Full-Stack Java Developer en formación
Cofundadora de LIHEN.CO
```

## Frase principal

> **Acta non verba, con propósito.**

## Mensaje complementario

> *Ideas que se convierten en soluciones digitales reales.*

---

# 🎨 Sistema de color LXL

La paleta principal se define mediante Custom Properties dentro de `styles.css`:

```css
:root {
    --color-identidad: #38023B;
    --color-estructura: #000000;
    --color-tecnologia: #1EFFBC;
    --color-calidez: #FBD1A2;
    --color-accion: #F72C25;
    --color-claro: #FFFFFF;
    --color-reticula: #303030;
    --color-celda: #151515;
}
```

Además, el sistema utiliza aliases semánticos como:

```css
--color-codigo: var(--color-estructura);
--color-superficie: var(--color-celda);
```

| Color | Significado | Uso principal |
|---|---|---|
| `#38023B` | Identidad LXL / LIHEN | Fondos identitarios y marca |
| `#000000` | Estructura / código | Paneles y base estructural |
| `#1EFFBC` | Tecnología / transformación | Bordes, iconos, numeración e indicadores |
| `#FBD1A2` | Calidez y acento | Superficies y detalles editoriales |
| `#F72C25` | Acción | CTA y estados de acción |
| `#FFFFFF` | Contraste y lectura | Textos y títulos |
| `#303030` | Retícula | Líneas y divisores |
| `#151515` | Superficies oscuras | Cards, chasis y contenedores |

Bootstrap también se adapta a esta paleta mediante variables como `--bs-primary`, `--bs-secondary`, `--bs-danger`, `--bs-dark` y otras propiedades del framework.

> **Bootstrap aporta estructura y utilidades. LXL define el lenguaje visual.**

---

# ✍️ Tipografías

El portafolio utiliza tres familias tipográficas principales.

## Barlow Condensed

Se utiliza para:

- identidad LXL;
- títulos principales;
- títulos de cards;
- manifiestos;
- etiquetas;
- elementos editoriales de alto impacto.

Los títulos de las cards de **Proyectos** y **Habilidades** utilizan esta familia para mantener continuidad visual entre las diferentes secciones.

## Inter

Se utiliza principalmente para:

- navegación;
- párrafos;
- contenido;
- descripciones;
- textos secundarios;
- lectura general.

También funciona como familia sans-serif principal dentro de la integración con Bootstrap.

## Oooh Baby

Se utiliza específicamente para el nombre personal dentro del Hero.

De esta forma la firma personal mantiene un carácter visual diferente sin reemplazar la identidad técnica del resto del portafolio.

---

# 🛠️ Tecnologías utilizadas

Actualmente el proyecto utiliza:

```text
HTML5
CSS3
JavaScript
Bootstrap 5.3.8
Bootstrap Icons 1.13.1
Git
GitHub
GitHub REST API
Google Fonts
Figma
Visual Studio Code
```

En la implementación también se utilizan:

```text
CSS Grid
Flexbox
Custom Properties
Responsive Design
Media Queries
CSS Transforms
CSS Transitions
CSS Animations
DOM
ES Modules
Fetch API
Promises
Async / Await
IntersectionObserver
ARIA
Bootstrap Utilities
```

El proyecto no utiliza frameworks JavaScript para construir sus interacciones principales.

La lógica dinámica se desarrolla con JavaScript y APIs nativas del navegador.

---

# 🅱️ Bootstrap 5 en el portafolio

El proyecto integra **Bootstrap 5.3.8** mediante CDN y utiliza **Bootstrap Icons 1.13.1**.

Bootstrap funciona como una capa de apoyo para:

- layout;
- flexbox;
- espaciado;
- responsive;
- utilidades;
- alineación;
- iconografía funcional y decorativa.

Los componentes principales del portafolio continúan siendo personalizados mediante `styles.css`.

La arquitectura de estilos sigue este orden:

```text
Bootstrap
↓
estructura + utilidades + responsive
↓
styles.css
↓
identidad visual LXL
```

`styles.css` se carga después de Bootstrap para conservar la prioridad visual del sistema LXL.

---

# 🧭 Estructura actual del portafolio

La navegación principal está organizada así:

```text
Inicio
↓
Sobre mí
↓
Proyectos
↓
Habilidades
↓
Contacto
↓
Footer
```

La navegación superior contiene:

```text
Inicio | Sobre mí | Proyectos | Habilidades | Contacto
```

`js/index.js` mantiene sincronizado el navbar con la sección que la persona está recorriendo mediante un scroll spy basado en `IntersectionObserver`.

Cuando una sección queda activa:

```text
sección visible
↓
is-active
↓
aria-current="location"
```

De esta forma el estado se comunica tanto visualmente como a tecnologías de asistencia.

---

## 1. Inicio

Inicio contiene la presentación de identidad LXL y el Hero principal.

La experiencia vigente sigue este recorrido:

```text
LXL / CODE X LIHEN
↓
animación inicial
↓
transition
↓
Hero final
```

La presentación LXL funciona como una capa temporal.

El Hero ya existe debajo, por lo que JavaScript no necesita reconstruir su contenido.

El flujo utiliza:

```text
animationend
↓
mostrarHeroFinal()
↓
transitionend de opacity
↓
ocultarExperiencia()
```

La lógica también respeta:

```text
prefers-reduced-motion
```

Si la persona tiene activada la reducción de movimiento en su sistema, la experiencia animada se omite y el Hero queda disponible directamente.

La sección Inicio también utiliza `IntersectionObserver` para pausar o reanudar la experiencia cuando la persona entra o sale de una parte significativa de la sección.

El Hero presenta:

- identidad LXL;
- nombre personal;
- perfil profesional;
- CTA hacia Proyectos;
- CTA hacia Contacto.

La identidad pixelada LXL está construida directamente con **HTML + CSS**.

Cada bloque utiliza variables inline como:

```css
--row
--column
```

para definir su posición dentro de las letras.

---

## 2. Sobre mí

La sección **Sobre mí** utiliza una composición editorial para presentar mi perfil profesional y personal.

Su arquitectura combina:

```text
Encabezado editorial
+
Fotografía
+
Historia profesional
+
Manifiesto
+
Cards visuales
+
Decoración pixelada
```

Actualmente incluye:

- fotografía personal;
- encabezado `MI HISTORIA & CÓDIGO`;
- narrativa organizada en cuatro bloques;
- habilidades transferibles hacia tecnología;
- formación actual como Junior Full-Stack Java Developer;
- relación entre LIHEN.CO, marca, comunicación y experiencia de usuario;
- enfoque en claridad, utilidad y experiencia de quien utiliza una solución;
- manifiesto `Acta non verba, con propósito.`;
- card visual de Proceso;
- card visual de Identidad;
- elementos gráficos LXL.

Las cards inferiores resumen dos recorridos:

### Proceso

```text
FORMACIÓN
>
PRÁCTICA
>
DOCUMENTACIÓN
>
SOLUCIONES
```

### Identidad

```text
DISEÑO
+
USUARIO
+
EXPERIENCIA
+
TECNOLOGÍA
```

La sección busca explicar mi perfil más allá de una lista de tecnologías.

---

## 3. Proyectos

La sección presenta actualmente dos proyectos:

```text
HUELLAVET
PLANIFICADOR DE TAREAS WEB
```

Las cards utilizan una arquitectura flip reutilizable:

```text
project-flip-card
↓
Frente
↓
Languages
↓
Reverso
↓
Ver proyecto
```

Cada card contiene un atributo:

```html
data-repository-url
```

que guarda el repositorio real asociado al proyecto.

`js/project-cards.js` utiliza este valor para:

```text
URL de GitHub
↓
owner/repository
↓
/repos/{owner}/{repo}/languages
↓
Languages detectados
```

### Frente

Cada frente contiene:

- control de giro;
- nombre del proyecto;
- descripción breve;
- módulo `Languages`;
- estado inicial de carga;
- composición gráfica pixelada.

### GitHub Languages

GitHub Languages devuelve bytes asociados a cada lenguaje detectado dentro del repositorio.

En este portafolio esos bytes se utilizan únicamente para:

- comprobar qué lenguajes están presentes;
- descartar valores inexistentes o iguales a cero;
- mantener un orden consistente de los lenguajes detectados.

Los bytes **no se utilizan para**:

- medir conocimiento;
- representar dominio;
- medir experiencia;
- generar porcentajes profesionales;
- calificar mis habilidades.

Después de detectar los lenguajes, el código conserva solamente sus nombres.

Todos los segmentos reciben el mismo peso visual mediante:

```js
segment.style.flex = "1 1 0";
```

De esta forma una tecnología no ocupa más espacio visual por tener más bytes en el repositorio.

La señal comunica:

```text
Tecnologías presentes
```

y no:

```text
Nivel profesional
```

Por ejemplo, la interfaz busca comunicar:

```text
HTML
JavaScript
CSS
```

y evita representaciones como:

```text
HTML 52%
JavaScript 37%
CSS 11%
```

Cada lenguaje utiliza un color para facilitar su identificación visual.

Si GitHub devuelve un lenguaje que todavía no tiene un color configurado, el sistema utiliza una lista de colores de respaldo.

### Leyenda dinámica

`project-cards.js` genera automáticamente:

```text
segmento
+
punto de color
+
nombre del lenguaje
```

El contenido accesible se comunica desde el conjunto completo y los elementos puramente decorativos utilizan `aria-hidden="true"`.

### Reverso

Cada reverso permite consultar:

- identidad del proyecto;
- tipo de proyecto;
- contexto;
- participación o enfoque;
- información complementaria;
- CTA `Ver proyecto`;
- repositorio real;
- control de giro.

Actualmente:

**HuellaVet** se presenta como proyecto colaborativo.

**Planificador de Tareas Web** se presenta como proyecto individual.

Los CTA utilizan:

```html
target="_blank"
rel="noopener noreferrer"
```

para abrir GitHub en otra pestaña manteniendo una navegación más segura.

### Accesibilidad del giro

Las cards comienzan con:

```text
frente visible
reverso oculto
```

Cuando la persona gira una card, JavaScript actualiza:

```text
click
↓
is-flipped
↓
aria-hidden
↓
aria-pressed
↓
tabIndex
↓
focus()
```

El botón de la cara oculta queda fuera de la navegación con teclado y el foco continúa en el control correspondiente a la cara visible.

### Ajuste visual actual

Las project cards utilizan un color estructural oscuro compartido:

```css
--project-card-dark: #151515;
```

Este valor unifica:

- chasis;
- encabezado;
- bordes;
- base;
- reverso;
- diferentes piezas oscuras del frente.

También se retiró la línea Tropical Mint del encabezado de estas cards para conservar una superficie oscura continua.

---

## 4. Habilidades

La sección utiliza diez cards individuales:

```text
JAVA
JAVASCRIPT
HTML5
CSS3
BOOTSTRAP
POSTGRESQL
GIT
GITHUB
SPRING BOOT
SCRUM
```

Cada card utiliza una arquitectura flip:

```text
skill-card
↓
Frente
↓
Reverso
↓
Evidencia GitHub
```

El frente presenta la identidad visual de cada tecnología.

El reverso contiene:

- título;
- descripción breve;
- panel `Evidencia GitHub`;
- pista visual;
- estado compacto;
- decoración pixelada.

`js/skills-cards.js` utiliza:

```js
SKILL_EVIDENCE
```

para relacionar cada habilidad con evidencia pública.

Existen tres tipos de evidencia:

### `language`

Se utiliza cuando GitHub Languages permite comprobar directamente la presencia del lenguaje.

Actualmente aplica a:

```text
Java
JavaScript
HTML
CSS
```

Los bytes obtenidos desde GitHub solo se utilizan para comprobar:

```text
bytes > 0
```

No se transforman en porcentaje.

### `repository`

Se utiliza cuando existe un repositorio público relacionado con la tecnología, aunque GitHub Languages no pueda representar directamente esa herramienta.

Actualmente se utiliza para evidencia asociada a tecnologías como:

```text
Bootstrap
PostgreSQL
Spring Boot
```

### `repository-note`

Se utiliza para evidencia contextual del trabajo realizado sin convertirla artificialmente en una métrica.

Actualmente se utiliza para:

```text
Git
GitHub
Scrum
```

En el caso de Scrum, la evidencia documenta trabajo colaborativo y uso de Trello.

**No se presenta como certificación formal de Scrum.**

### Estado visual

Cuando existe evidencia pública válida, la interfaz muestra:

```text
GitHub ✓
```

Esto significa:

```text
Existe evidencia pública asociada
```

No significa:

```text
100% de dominio
```

Todas las habilidades utilizan la misma longitud visual para su señal.

Los colores identifican tecnologías, pero tampoco representan:

- nivel;
- experiencia;
- dominio;
- importancia.

### Estados neutrales y errores

Si GitHub no detecta un lenguaje esperado, la card conserva un estado neutral.

Si ocurre un problema como:

- falta de conexión;
- rate limit;
- repositorio no disponible;
- respuesta fallida;

la card:

```text
restaura placeholder
↓
muestra estado compacto
↓
conserva detalle en title / aria-label
↓
registra información en consola
```

sin romper la interacción de la tarjeta.

---

## 5. Contacto

La sección Contacto combina identidad visual y canales profesionales.

Actualmente integra:

- encabezado editorial;
- poster visual LXL;
- video de identidad y proceso;
- fotografía personal;
- composición pixelada;
- marca `LXL / CODE X LIHEN`;
- card de GitHub;
- card de LinkedIn;
- CTA independientes;
- Bootstrap Icons;
- elementos gráficos decorativos.

El video utiliza:

```html
autoplay
muted
loop
playsinline
preload="metadata"
```

para intentar iniciar automáticamente sin audio, reproducirse en bucle, mantenerse integrado en dispositivos compatibles y cargar inicialmente solo los metadatos necesarios.

Los enlaces hacia GitHub y LinkedIn utilizan:

```html
target="_blank"
rel="noopener noreferrer"
```

para abrir el destino en una nueva pestaña con protección adicional entre ambas páginas.

Los iconos puramente decorativos utilizan `aria-hidden="true"` para evitar ruido innecesario en tecnologías de asistencia.

---

# ⚙️ JavaScript actual

Los scripts cargados por `index.html` siguen este orden:

```text
Bootstrap Bundle
↓
js/index.js
↓
js/skills-cards.js
↓
js/project-cards.js
```

Los tres scripts propios utilizan:

```html
type="module"
```

para mantener sus responsabilidades separadas.

---

## `js/index.js`

Controla la experiencia general de Inicio y la navegación activa.

Entre sus responsabilidades se encuentran:

- entrada LXL → Hero;
- `prefers-reduced-motion`;
- `animationend`;
- `transitionend`;
- visibilidad de la experiencia inicial;
- `IntersectionObserver` de Inicio;
- pausa y reanudación de la experiencia;
- navegación activa;
- scroll spy;
- lectura del hash inicial;
- clase `is-active`;
- `aria-current="location"`;
- caso especial de Inicio;
- caso especial de Contacto;
- listener de scroll con `{ passive: true }`.

### Scroll spy

El flujo principal es:

```text
enlaces del navbar
↓
href
↓
ID de sección
↓
IntersectionObserver
↓
sección visible
↓
is-active
↓
aria-current="location"
```

Solo un enlace queda activo a la vez.

Si la página abre con un hash válido, por ejemplo:

```text
#proyectos
```

esa sección puede reflejarse desde el estado inicial.

También se manejan dos situaciones especiales:

```text
window.scrollY <= 8
→ Inicio

final del documento
→ Contacto
```

---

## `js/skills-cards.js`

Controla:

- selección de skill cards;
- interacción flip;
- estado `is-flipped`;
- `aria-hidden`;
- `aria-pressed`;
- `tabIndex`;
- movimiento de foco;
- lectura de `data-skill-metric`;
- configuración `SKILL_EVIDENCE`;
- Fetch API;
- Promises;
- `async/await`;
- evidencia por lenguaje;
- evidencia por repositorio;
- evidencia contextual;
- estados neutrales;
- errores;
- estado `GitHub ✓`;
- caché compartido de GitHub.

---

## `js/project-cards.js`

Controla:

- selección de project cards;
- interacción flip;
- accesibilidad de frente y reverso;
- lectura de `data-repository-url`;
- validación de URLs de GitHub;
- extracción de `owner/repository`;
- normalización de nombres para clases CSS;
- Fetch API;
- Promises;
- GitHub Languages;
- detección de lenguajes;
- segmentos visuales;
- leyenda dinámica;
- colores por lenguaje;
- colores fallback;
- estados de carga;
- manejo de errores;
- caché compartido.

---

## Caché compartido de GitHub

`project-cards.js` y `skills-cards.js` reutilizan:

```js
window.__lihenGithubCache
```

El caché utiliza:

```js
Map
```

y guarda una relación:

```text
URL
→ Promise
```

De esta forma, si dos componentes solicitan exactamente el mismo endpoint durante una carga del portafolio, pueden reutilizar la misma solicitud.

Si una Promise falla:

```text
error
↓
githubCache.delete(url)
↓
la solicitud deja de estar almacenada
```

Así una carga posterior puede volver a intentarla.

No se utiliza un token privado en el frontend.

Tampoco existe `setInterval` para consultar GitHub repetidamente.

Las solicitudes se realizan cuando se cargan/configuran las cards y vuelven a ejecutarse al abrir o recargar nuevamente el portafolio.

---

## Accesibilidad implementada

El proyecto incorpora decisiones de accesibilidad como:

- `lang="es"`;
- enlace para saltar al contenido principal;
- navegación semántica;
- textos `alt` en fotografías y logos;
- `aria-label`;
- `aria-hidden`;
- `aria-live="polite"`;
- `aria-pressed`;
- `aria-current="location"`;
- `role="img"`;
- `tabIndex`;
- gestión de `focus()`;
- `prefers-reduced-motion`.

Las composiciones pixeladas que representan una identidad completa pueden utilizar:

```html
role="img"
aria-label="..."
```

mientras sus elementos internos decorativos utilizan:

```html
aria-hidden="true"
```

En las cards de Habilidades:

```html
aria-live="polite"
```

permite comunicar cambios en el estado de evidencia sin interrumpir de forma agresiva la navegación.

---

`index.intro-reserva.js` continúa presente dentro de la carpeta `js`, pero **no se carga desde `index.html`**.

---

# 📥 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/Lizeth-Londono/Gen-c13-Portafolio.git
```

## 2. Ingresar al proyecto

```bash
cd Gen-c13-Portafolio
```

## 3. Abrir en Visual Studio Code

```bash
code .
```

## 4. Ejecutar

Abrir `index.html` directamente o utilizar una herramienta como **Live Server**.

Las funciones que consultan GitHub requieren conexión a Internet.

---

# 🚀 Uso

El recorrido principal del portafolio es:

```text
1. Abrir el portafolio.

2. Visualizar la entrada LXL y el Hero.

3. Consultar Sobre mí.

4. Consultar Proyectos.

5. Girar las cards de Proyectos.

6. Revisar los Languages detectados desde GitHub.

7. Utilizar Ver proyecto para abrir el repositorio correspondiente.

8. Consultar Habilidades.

9. Girar las cards de Habilidades.

10. Revisar su evidencia GitHub.

11. Consultar Contacto.

12. Abrir GitHub o LinkedIn.

13. Llegar al Footer.
```

Las cards de Proyectos y Habilidades utilizan:

```text
↻
```

como control de giro entre frente y reverso.

Durante el recorrido, el navbar actualiza automáticamente la sección activa mediante el scroll spy.

---

# 📁 Estructura actual del repositorio

La estructura actual visible en `main` es:

```text
Gen-c13-Portafolio/
│
├── .gitignore
│
├── img/
│   ├── imgContactoLizeth.png
│   └── imgSobreMiLizeth.png
│
├── js/
│   ├── index.intro-reserva.js
│   ├── index.js
│   ├── project-cards.js
│   └── skills-cards.js
│
├── video/
│   └── video-portafolio.mp4
│
├── index.html
├── README.md
└── styles.css
```

---

# 🌐 Demo - GitHub Pages

[Ver portafolio publicado en GitHub Pages](https://lizeth-londono.github.io/Gen-c13-Portafolio/)

---

# 🎨 Figma

Los wireframes, exploraciones visuales y prototipos se encuentran en:

[Ver diseño del portafolio en Figma](https://www.figma.com/design/1ukITbrseKkFJCGqMj0SDz/Curso-de-Figma-desde-Cero-%7C-Clase-1--Bases-Fundamentales--2025--con-UI3---Community-?node-id=2006-14&p=f&t=3pqvDqq20oyAsVIF-0)

---

# 🎨 Coolors

[Paleta LXL en Coolors](https://coolors.co/f72c25-fbd1a2-1effbc-000000-38023b)

---

# 📊 Estado actual

El portafolio cuenta actualmente con una página vertical completa y funcional.

Entre las características vigentes se encuentran:

- identidad LXL consolidada;
- entrada LXL → Hero;
- Hero principal;
- soporte para `prefers-reduced-motion`;
- sección Sobre mí editorial;
- fotografía en Sobre mí;
- manifiesto personal;
- cards de Proceso e Identidad;
- cards flip de Proyectos;
- GitHub Languages;
- Languages sin porcentajes de dominio;
- segmentos de Languages con el mismo peso visual;
- leyenda dinámica de lenguajes;
- colores por tecnología;
- colores fallback;
- CTA `Ver proyecto`;
- chasis oscuro unificado en project cards;
- cards flip de Habilidades;
- evidencia GitHub;
- evidencia `language`;
- evidencia `repository`;
- evidencia `repository-note`;
- estado compacto `GitHub ✓`;
- caché compartido de GitHub;
- eliminación de Promises fallidas del caché;
- estados neutrales;
- manejo de errores de GitHub;
- scroll spy;
- clase `is-active`;
- `aria-current="location"`;
- gestión de foco en cards;
- soporte para navegación con teclado;
- Contacto con video;
- fotografía en Contacto;
- cards de GitHub y LinkedIn;
- Bootstrap 5.3.8;
- Bootstrap Icons 1.13.1;
- Google Fonts;
- diseño responsive;
- navegación por anclas;
- documentación pedagógica en español;
- separación de responsabilidades entre HTML, CSS y JavaScript.

---

# 🔭 Mejoras futuras

El proyecto puede continuar mejorando en:

- pruebas de accesibilidad;
- revisión de contraste;
- responsive en nuevos tamaños de pantalla;
- optimización de imágenes;
- optimización del video;
- manejo avanzado de límites de GitHub API;
- fallbacks para recursos externos;
- microinteracciones;
- pruebas con usuarios;
- incorporación de nuevos proyectos;
- actualización de contenido profesional;
- pruebas automatizadas;
- rendimiento;
- publicación de una versión estable.

La intención es que el portafolio evolucione junto con mi proceso profesional.

---

# 👩‍💻 Autora

**Lina Lizeth Londoño Marín**

- Junior Full-Stack Java Developer en formación.
- Cofundadora de LIHEN.CO.
- Estudiante del Bootcamp Full Stack Java de Generation Colombia - Cohorte 13.

---

# 📬 Contacto profesional

| Medio | Enlace |
|---|---|
| GitHub | [github.com/Lizeth-Londono](https://github.com/Lizeth-Londono) |
| LinkedIn | [linkedin.com/in/lina-londono-dev](https://www.linkedin.com/in/lina-londono-dev/) |
| Correo | [linalizethlondonomarin@gmail.com](mailto:linalizethlondonomarin@gmail.com) |
| Repositorio | [Gen-c13-Portafolio](https://github.com/Lizeth-Londono/Gen-c13-Portafolio) |
| Figma | [Prototipo y wireframes](https://www.figma.com/design/1ukITbrseKkFJCGqMj0SDz/Curso-de-Figma-desde-Cero-%7C-Clase-1--Bases-Fundamentales--2025--con-UI3---Community-?node-id=2006-14&p=f&t=3pqvDqq20oyAsVIF-0) |
| Portafolio web | [GitHub Pages](https://lizeth-londono.github.io/Gen-c13-Portafolio/) |

---

> **Tecnología con propósito. Código que transforma. Ideas que dejan huella.**