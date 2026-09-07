# LXL — CODE x LIHEN

## Portafolio profesional de Lina Lizeth Londoño Marín

![Estado](https://img.shields.io/badge/Estado-En%20desarrollo-A855F7)

![Proyecto](https://img.shields.io/badge/Proyecto-Portafolio%20personal-22D3D3)

![Perfil](https://img.shields.io/badge/Perfil-Junior%20Full--Stack%20Java%20Developer-0D1324)

Portafolio personal desarrollado como parte de mi proceso de formación en el **Bootcamp Full Stack Java de Generation Colombia - Cohorte 13**.

Este proyecto reúne progresivamente mi identidad, aprendizaje, proyectos, habilidades y evolución durante el bootcamp.

La intención es aplicar de forma práctica conceptos relacionados con:

- HTML;
- CSS;
- JavaScript;
- diseño responsive;
- accesibilidad;
- UX/UI;
- Git;
- GitHub;
- documentación;
- pruebas;
- desarrollo incremental;
- integración de información verificable desde repositorios reales.

> **Acta non verba, con propósito.**
>
> Ideas que se convierten en soluciones digitales reales.

---

## 📑 Tabla de contenidos

- [Objetivo](#-objetivo)
- [Identidad visual](#-identidad-visual)
- [Paleta visual](#-paleta-visual)
- [Tipografías](#-tipografías)
- [Diseño del Hero](#-diseño-del-hero)
- [Estructura del portafolio](#-estructura-del-portafolio)
- [Intro LXL](#-intro-lxl)
- [Arquitectura actual de Inicio](#-arquitectura-actual-de-inicio)
- [LIHEN Pixel Code Reveal](#-lihen-pixel-code-reveal)
- [Historia de la Intro](#-historia-de-la-intro)
- [Acompañamiento y recomendaciones de la profe Nath](#-acompañamiento-y-recomendaciones-de-la-profe-nath)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Uso de herramientas de apoyo](#-uso-de-herramientas-de-apoyo)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura actual del repositorio](#-estructura-actual-del-repositorio)
- [Figma](#-figma)
- [Estado actual](#-estado-actual)
- [Referente visual](#-referente-visual)
- [Mejoras futuras](#-mejoras-futuras)
- [Autora](#-autora)
- [Contacto](#-contacto)

---

# 🎯 Objetivo

Mi objetivo es desarrollar un portafolio que muestre evidencia real de mis conocimientos y de mi evolución como desarrolladora.

No quiero presentar únicamente una lista de tecnologías.

En cada proyecto quiero poder explicar:

- qué problema se buscó resolver;
- cuál fue mi participación;
- qué decisiones se tomaron;
- qué tecnologías se utilizaron;
- qué dificultades aparecieron;
- cómo se abordaron;
- qué aprendí durante el proceso;
- dónde se puede consultar el código;
- dónde se puede ver el proyecto funcionando, cuando exista una demostración.

El portafolio está dirigido principalmente a:

- reclutadores;
- empresas de tecnología;
- líderes técnicos;
- posibles clientes;
- docentes;
- compañeros del bootcamp;
- personas interesadas en conocer mi trabajo.

Por esta razón, el sitio busca ser:

- fácil de navegar;
- profesional;
- responsive;
- visualmente coherente;
- accesible;
- directo;
- actualizado;
- comprensible incluso para personas no técnicas;
- susceptible de mejora continua.

---

# 🎨 Identidad visual

## Concepto LXL

**LXL** es una identidad visual formada mediante letras modulares y bloques inspirados en:

- programación;
- interfaces digitales;
- sistemas gráficos;
- operadores;
- símbolos;
- números;
- fragmentos de código.

La intención es representar cómo diferentes conocimientos, experiencias e ideas pueden organizarse hasta formar una solución digital completa.

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

> Ideas que se convierten en soluciones digitales reales.

---

# 🎨 Paleta visual

Actualmente se trabaja con la siguiente paleta oficial:

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

Interpretación aproximada:

```text
#38023B
→ identidad LXL / LIHEN

#000000
→ estructura / código

#1EFFBC
→ tecnología / transformación

#FBD1A2
→ calidez y acento

#F72C25
→ acción

#FFFFFF
→ contraste y lectura

#303030
→ retícula

#151515
→ superficies oscuras
```

---

# ✍️ Tipografías

Actualmente se utilizan tres familias principales.

## Barlow Condensed

Principalmente para:

- identidad;
- títulos;
- LXL;
- elementos editoriales;
- elementos de alto impacto.

## Inter

Principalmente para:

- navegación;
- contenido;
- textos;
- descripciones;
- elementos de lectura.

## Oooh Baby

Se utiliza de forma específica para la firma:

```text
Lizeth Londoño
```

dentro del Hero.

La intención es combinar identidad tecnológica, jerarquía editorial y un elemento personal sin sacrificar legibilidad.

---

# 🖥️ Diseño del Hero

El Hero conserva una composición central basada en la identidad del proyecto.

Su estructura principal contiene:

```text
LXL

CODE X LIHEN

Lizeth Londoño

Junior Full-Stack Java Developer en formación

Ver proyectos

Contáctame
```

También incluye navegación hacia:

```text
Inicio
Sobre mí
Proyectos
Habilidades
Contacto
```

La sección **Recorrido**, utilizada en una propuesta anterior, dejó de mostrarse como portada independiente.

Su contenido conceptual se distribuye actualmente entre:

- Sobre mí;
- Proyectos;
- Habilidades.

La decisión busca mantener una navegación más directa.

---

# 🧭 Estructura del portafolio

La arquitectura visual vigente está organizada como una página vertical completa:

```text
Inicio
│
├── Secuencia LXL inicial
│
├── LIHEN Pixel Code Reveal
│
└── Hero final
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

## 1. Inicio

Actualmente Inicio funciona como una experiencia compuesta por diferentes estados.

La secuencia implementada sigue esta lógica:

```text
LXL inicial
↓
LIHEN Pixel Code Reveal
↓
Hero final
```

El Hero permanece como destino final de la experiencia.

## 2. Sobre mí

La sección cuenta con una composición editorial destinada a explicar quién soy más allá de una lista de tecnologías.

Actualmente integra:

- transición profesional;
- formación en desarrollo;
- tecnología y creatividad;
- experiencia previa;
- relación con LIHEN.CO;
- manifiesto personal;
- espacio preparado para fotografía;
- elementos gráficos de la identidad LXL.

## 3. Proyectos

La sección utiliza cards con interacción de giro.

Actualmente presenta:

- **HuellaVet** — proyecto colaborativo;
- **Planificador de Tareas Web** — proyecto individual.

Cada card contiene:

```text
Frente
├── nombre
├── descripción
├── Languages reales de GitHub
└── control de giro

Reverso
├── contexto
├── participación o enfoque
├── acceso al repositorio
└── control de giro
```

No se inventan enlaces, métricas, demos ni autoría.

## 4. Habilidades

La sección utiliza diez cards individuales:

```text
Java
JavaScript
HTML5
CSS3
Bootstrap
PostgreSQL
Git
GitHub
Spring Boot
Scrum
```

Cada card puede girarse para consultar información relacionada con la habilidad y su evidencia.

## 5. Contacto

La sección incluye principalmente:

- GitHub;
- LinkedIn.

Los enlaces externos utilizan apertura segura en una pestaña nueva.

## 6. Footer

El footer incluye:

- nombre;
- perfil profesional;
- copyright;
- GitHub;
- LinkedIn.

---

# ✨ Intro LXL

La Intro LXL ha evolucionado mediante diferentes pruebas y decisiones.

El concepto general continúa siendo:

```text
Información dispersa
↓
Organización
↓
Transformación
↓
Identidad
↓
LXL / LIHEN
↓
Hero
```

La intención no es utilizar movimiento únicamente como decoración.

La secuencia busca representar de forma visual cómo diferentes conocimientos, experiencias e ideas pueden transformarse en una identidad profesional.

---

# 🧩 Arquitectura actual de Inicio

La implementación actual separa responsabilidades entre varios archivos.

```text
index.html
↓
estructura de Inicio

styles.css
↓
apariencia, estados visuales y animaciones

js/index.js
↓
orquestación principal de Inicio

js/lihen-reveal.js
↓
componente LIHEN Pixel Code Reveal

js/logo-map.js
↓
matriz lógica del logo
```

La experiencia intermedia se monta dentro de:

```html
<div
    class="inicio-experiencia"
    data-inicio-experiencia
>
```

y contiene:

```text
LXL inicial
+
LIHEN Pixel Code Reveal
```

Después se muestra el Hero final.

---

# 🟩 LIHEN Pixel Code Reveal

Una de las principales evoluciones de la Intro fue integrar una representación modular del logo LIHEN.

La matriz utilizada actualmente es:

```text
72 filas
×
72 columnas
=
5184 posiciones
```

La lógica se encuentra separada en:

```text
js/logo-map.js
```

Los valores de la matriz representan:

```text
0
→ celda transparente

1
→ celda verde

2
→ celda morada
```

La matriz no necesita utilizar una imagen externa durante la ejecución.

El componente encargado de interpretarla y generar la experiencia visual se encuentra en:

```text
js/lihen-reveal.js
```

Esta separación permite mantener:

```text
datos
≠
lógica
≠
presentación
```

facilitando la comprensión del proyecto.

---

# 🕘 Historia de la Intro

El proyecto conserva evidencia de etapas anteriores porque forman parte del proceso de aprendizaje.

## Retícula inicial histórica

Se trabajó inicialmente con:

```text
14 columnas
×
10 filas
=
140 celdas
```

utilizadas para distribuir:

- números;
- operadores;
- símbolos;
- fragmentos binarios;
- caracteres relacionados con programación.

## Emblema modular histórico

También se desarrolló una retícula independiente de:

```text
30 × 30
=
900 celdas
```

para experimentar con un emblema modular.

Se trabajaron progresivamente:

```text
C1
→ aro exterior

C2
→ estrella superior y eje

C3
→ formas principales

C4
→ hojas intermedias

C5
→ núcleo central

C6
→ base floral
```

C1-C5 fueron utilizados como fases incrementales de aprendizaje.

C6 quedó como parte del historial de experimentación y dejó de ser el protagonista de la dirección visual actual.

Posteriormente el proyecto evolucionó hacia la matriz LIHEN Pixel Code de 72 × 72.

## Archivo de reserva

La lógica de una etapa anterior de la Intro se conserva en:

```text
js/index.intro-reserva.js
```

Este archivo funciona como referencia histórica y no corresponde al orquestador principal cargado actualmente por la página.

El archivo activo es:

```text
js/index.js
```

---

# 👩‍🏫 Acompañamiento y recomendaciones de la profe Nath

Durante el proceso se han considerado recomendaciones recibidas en espacios de acompañamiento.

Uno de los criterios principales ha sido concentrar el mayor impacto visual en:

```text
Intro
+
Hero / banner
```

y mantener las demás secciones más limpias y estables.

Entre las recomendaciones aplicadas se encuentran:

- utilizar animaciones breves;
- evitar animaciones permanentes;
- evitar saturación visual;
- conservar legibilidad;
- mantener experiencia responsive;
- considerar accesibilidad;
- permitir que el contenido continúe siendo comprensible aunque una animación se reduzca;
- comprender el código utilizado;
- poder explicar cada elemento implementado.

Se han explorado herramientas externas como referencia, pero no se consideran tecnologías implementadas si no están realmente integradas.

---

# 🛠️ Tecnologías utilizadas

Actualmente el portafolio utiliza principalmente:

```text
HTML5
CSS3
JavaScript
Git
GitHub
GitHub REST API
Google Fonts
Figma
Visual Studio Code
```

En el diseño se utilizan:

```text
CSS Grid
Flexbox
Custom Properties
Responsive Design
Media Queries
CSS Transforms
CSS Transitions
DOM
ES Modules
Fetch API
```

---

# 🤖 Uso de herramientas de apoyo

Durante el desarrollo del proyecto se utilizaron herramientas de inteligencia artificial como apoyo para:

- comprender conceptos;
- revisar código;
- resolver dudas;
- orientar ajustes CSS;
- estudiar posibles soluciones;
- organizar documentación;
- apoyar la redacción del README.

Las herramientas de apoyo no sustituyen la revisión humana.

Las decisiones, adaptación visual, validación, pruebas y comprensión deben formar parte del proceso personal de aprendizaje.

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

El proyecto puede abrirse mediante `index.html`.

Durante desarrollo también puede utilizarse una herramienta como Live Server.

La funcionalidad que consulta GitHub requiere conexión a Internet.

---

# 🚀 Uso

El recorrido principal actual es:

```text
1. Abrir el portafolio.

2. Visualizar la experiencia de Inicio.

3. LXL inicial.

4. LIHEN Pixel Code Reveal.

5. Hero final.

6. Consultar Sobre mí.

7. Consultar Proyectos.

8. Girar las cards de Proyectos cuando se requiera.

9. Revisar Habilidades.

10. Girar las cards de Habilidades.

11. Consultar Contacto.

12. Llegar al Footer.
```

La navegación principal es:

```text
Inicio | Sobre mí | Proyectos | Habilidades | Contacto
```

Las cards de Proyecto y Habilidades utilizan el símbolo:

```text
↻
```

para cambiar entre frente y reverso.

---

# 📁 Estructura actual del repositorio

La estructura de trabajo actual es:

```text
Gen-c13-Portafolio/
│
├── img/
│   └── skills/
│
├── js/
│   ├── index.intro-reserva.js
│   ├── index.js
│   ├── lihen-reveal.js
│   ├── logo-map.js
│   ├── project-cards.js
│   └── skills-cards.js
│
├── .gitignore
├── index.html
├── README.md
└── styles.css
```

Existe además una carpeta local:

```text
Material de Estudio/
```

utilizada como apoyo académico.

Esta carpeta está excluida del seguimiento del repositorio mediante `.gitignore`.

## Responsabilidad de los JavaScript

```text
index.js
→ orquesta la experiencia de Inicio

index.intro-reserva.js
→ conserva lógica histórica de una etapa anterior

lihen-reveal.js
→ construye y controla LIHEN Pixel Code Reveal

logo-map.js
→ contiene la matriz lógica 72 × 72

project-cards.js
→ controla giro y GitHub Languages de Proyectos

skills-cards.js
→ controla giro y evidencia GitHub de Habilidades
```

---

# Demo - GitHub Pages

[GitHub Pages](https://lizeth-londono.github.io/Gen-c13-Portafolio/)

---

# 🎨 Figma

Los wireframes, exploraciones visuales y prototipos se encuentran en:

[Ver diseño del portafolio en Figma](https://www.figma.com/design/1ukITbrseKkFJCGqMj0SDz/Curso-de-Figma-desde-Cero-%7C-Clase-1--Bases-Fundamentales--2025--con-UI3---Community-?node-id=2006-14&p=f&t=3pqvDqq20oyAsVIF-0)

---

# 🎨 Coolors

[Coolors](https://coolors.co/f72c25-fbd1a2-1effbc-000000-38023b)

---

# 📊 Estado actual

El portafolio cuenta actualmente con una página vertical completa.


---

# 🎨 Referente visual

Las referencias visuales utilizadas durante el desarrollo se consideran fuentes de inspiración y estudio.

Se analizan aspectos como:

- composición;
- ritmo visual;
- jerarquía;
- módulos;
- relación entre texto e imagen;
- estética editorial;
- estética tecnológica.

Cada sección se reconstruye con contenido, estructura, paleta e identidad propias de LXL.

Para una etapa de la introducción se estudió como referencia conceptual:

## F13 Code Summit Inspiracion

**Plataforma:** Behance

[F13 Code Summit — Proyecto de referencia](https://www.behance.net/gallery/252670417/F13-Code-Summit?tracking_source=for_you_logged_in_feed_published)

Resultaron interesantes elementos como:

- caracteres;
- números;
- símbolos;
- estética relacionada con programación;
- tipografía modular;
- formación progresiva de identidad;
- contraste entre fondo oscuro y colores brillantes;
- reorganización visual.

La referencia se utiliza únicamente con fines de:

- inspiración;
- documentación;
- análisis;
- aprendizaje.

No se busca copiar:

- logotipo;
- nombre;
- textos;
- fotografías;
- identidad;
- composiciones exactas;
- resultado final.

---

# 🔭 Mejoras futuras

A medida que avance mi formación el proyecto podrá mejorar en aspectos como:

- optimizar tiempos de animación;
- mejorar transiciones;
- mejorar microinteracciones;
- revisar contraste;
- fortalecer accesibilidad;
- probar diferentes escenarios de `prefers-reduced-motion`;
- mejorar responsive;
- optimizar imágenes;
- incorporar más proyectos;
- mejorar contenido profesional;
- realizar pruebas con usuarios;
- publicar una versión estable;
- continuar refinando la identidad visual.

La intención es que el portafolio evolucione conmigo.

---

# 👩‍💻 Autora

**Lina Lizeth Londoño Marín**

- Junior Full-Stack Java Developer en formación.
- Cofundadora de LIHEN.CO.
- Estudiante del Bootcamp Full Stack Java de Generation Colombia - Cohorte 13.

---

# 📬 Contacto

Puedes conocer más sobre mi proceso y mis proyectos mediante:

| Medio | Enlace |
| --- | --- |
| GitHub | [github.com/Lizeth-Londono](https://github.com/Lizeth-Londono) |
| LinkedIn | [linkedin.com/in/lina-londono-dev](https://www.linkedin.com/in/lina-londono-dev/) |
| Correo | [linalizethlondonomarin@gmail.com](mailto:linalizethlondonomarin@gmail.com) |
| Repositorio | [Gen-c13-Portafolio](https://github.com/Lizeth-Londono/Gen-c13-Portafolio) |
| Figma | [Prototipo y wireframes](https://www.figma.com/design/1ukITbrseKkFJCGqMj0SDz/Curso-de-Figma-desde-Cero-%7C-Clase-1--Bases-Fundamentales--2025--con-UI3---Community-?node-id=2006-14&p=f&t=3pqvDqq20oyAsVIF-0) |
| Portafolio web | Pendiente de publicación |

---

> **Tecnología con propósito. Código que transforma. Ideas que dejan huella.**