# FilmPortfolio_Frontend

# Portafolio Audiovisual en React/Vite

Este repositorio contiene el código y la documentación para un portafolio audiovisual inspirado en diseños como Jay Ford[https://www.jayfordproductions.com/], Samuel Day[https://www.samuelday.de/], y Elijah Guess[https://www.elijahguess.com/]. El objetivo es combinar:

* **Hero dinámico** con video de fondo y animación Lottie.
* **Galería de videos** que consume contenido de YouTube en alta resolución (hasta 8K).
* **Secciones de servicios**, testimonios, contadores en tiempo real, “Sobre Nosotros”, formulario de contacto y footer.
* **Animaciones suaves** (Framer Motion, Lottie) y un **cursor personalizado** para reforzar la experiencia.

A continuación encontrarás la estructura del proyecto, las tecnologías empleadas, las descripciones conceptuales de cada sección, y las instrucciones para configurar y arrancar.

---

## Índice

1. [Tecnologías y Dependencias](#tecnologías-y-dependencias)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Secciones Conceptuales](#secciones-conceptuales)

   1. [Hero / Sección de Inicio](#1-hero--sección-de-inicio)
   2. [Galería de Videos](#2-galería-de-videos)
   3. [Servicios](#3-servicios)
   4. [Clientes y Reseñas (Testimonios)](#4-clientes-y-reseñas-testimonios)
   5. [Contadores en Tiempo Real](#5-contadores-en-tiempo-real)
   6. [Sobre Nosotros](#6-sobre-nosotros)
   7. [Formulario de Contacto](#7-formulario-de-contacto)
   8. [Footer](#8-footer)
4. [Requerimientos No Funcionales y Optimización](#requerimientos-no-funcionales-y-optimización)
5. [Flujo de Trabajo Sugerido](#flujo-de-trabajo-sugerido)
6. [Configuración Inicial y Scripts](#configuración-inicial-y-scripts)

---

## Tecnologías y Dependencias

El proyecto utiliza las siguientes herramientas y librerías:

* **Vite + React (JSX)**: arranque rápido y bundle optimizado.
* **Tailwind CSS**: estilos utilitarios, responsive y ágil prototipado.
* **Framer Motion**: animaciones suaves (fade-in, hover-effects, transiciones).
* **Lottie-React**: animaciones vectoriales interactivas (Hero y micro-animaciones).
* **React Player**: para embeber y reproducir videos de YouTube en alta resolución (hasta 8K).
* **React Modal** (o @headlessui/react Dialog): lightboxes para contenido multimedia y formularios.
* **React Intersection Observer**: para disparar animaciones cuando las secciones entran en viewport (fade-in, slide-up).
* **React Slick** / **Swiper.js**: carruseles de testimonios.
* **React Hook Form**: validación y manejo de formularios (contacto).
* **React Helmet Async**: SEO básico (títulos dinámicos, meta tags).
* **React Icons**: íconos SVG para redes sociales, servicios, etc.

---

## Estructura de Carpetas

```plaintext
mi-portfolio/
│
├─ public/
│   ├─ animations/
│   │   └─ hero-animation.json         ← Animación Lottie para la sección Hero
│   ├─ icons/                          ← Íconos SVG estáticos (servicios, redes)
│   └─ favicons/                       ← Favicons, logo en PNG/ICO
│
├─ src/
│   ├─ assets/
│   │   ├─ images/                     ← Imágenes estáticas (equipo, sobre nosotros)
│   │   └─ svg/                        ← SVG animados u otros vectores
│   │
│   ├─ components/
│   │   ├─ common/                     ← Componentes reutilizables globales
│   │   │   ├─ CustomCursor.jsx        ← Cursor personalizado
│   │   │   ├─ Header.jsx              ← Barra de navegación fija
│   │   │   ├─ Footer.jsx              ← Pie de página
│   │   │   └─ ScrollSection.jsx       ← Contenedor para animaciones en scroll
│   │   │
│   │   ├─ hero/                       ← Sección de inicio (Hero)
│   │   │   └─ Hero.jsx                ← Video de fondo + Lottie + texto + CTA
│   │   │
│   │   ├─ gallery/                    ← Galería de videos
│   │   │   ├─ YouTubeCard.jsx         ← Miniatura con overlay y botón de play
│   │   │   ├─ VideoGallery.jsx        ← Grid de YouTubeCard + filtro + modal
│   │   │   └─ ModalYouTube.jsx        ← Lightbox con ReactPlayer solicitando 8K
│   │   │
│   │   ├─ services/                   ← Sección de servicios ofrecidos
│   │   │   └─ ServiceCard.jsx         ← Tarjeta de servicio (ícono/animación + texto)
│   │   │
│   │   ├─ reviews/                    ← Carrusel de testimonios
│   │   │   └─ TestimonialCarousel.jsx ← Slider con React Slick y tarjetas de reseña
│   │   │
│   │   ├─ counters/                   ← Contadores en tiempo real
│   │   │   ├─ AnimatedCounter.jsx     ← Componente animator numérico (0→valor)
│   │   │   └─ SocialCounters.jsx      ← Block con 3 contadores sociales
│   │   │
│   │   ├─ about/                      ← Sección “Sobre Nosotros”
│   │   │   └─ AboutUs.jsx             ← Imagen + texto descriptivo + bulleted list
│   │   │
│   │   ├─ contact/                    ← Formulario de contacto + método alternativo
│   │   │   ├─ ContactForm.jsx         ← Formulario con React Hook Form + validación
│   │   │   └─ ContactSection.jsx      ← Formulario + íconos de WhatsApp, redes
│   │   │
│   │   └─ stats/                      ← (Opcional para v2: panel admin / dashboard)
│   │       └─ DashboardAdmin.jsx
│   │
│   ├─ pages/
│   │   └─ HomePage.jsx                ← Ensamblaje de todas las secciones
│   │
│   ├─ App.jsx                         ← Punto de entrada React: Header + HomePage + Cursor
│   ├─ main.jsx                        ← Renderizado en root + Modal.setAppElement
│   └─ index.css                       ← Importa Tailwind y estilos globales
│
├─ tailwind.config.js                 ← Configuración Tailwind (colores, breakpoints)
├─ postcss.config.js                  ← Configuración PostCSS para Tailwind
├─ vite.config.js                     ← Configuración Vite (alias, build, etc.)
└─ package.json                       ← Dependencias y scripts (start, build, preview)
```

---

## Secciones Conceptuales

A continuación se detalla, sección por sección, **qué va dentro**, **qué animaciones o comportamientos** deben implementarse y **cómo enfocarlo desde lo conceptual** para garantizar un flujo de trabajo organizado y coherente.

---

### 1. Hero / Sección de Inicio

#### 1.1. Objetivos

* **Captar la atención** del usuario al primer vistazo.
* Mostrar que el sitio es un **portafolio audiovisual de alta calidad**.
* Incentivar a navegar hacia la galería de proyectos.

#### 1.2. Contenido y Jerarquía

1. **Video de fondo** (full-screen)

   * Loop automático, silencio (`muted`) y `object-cover` para cubrir el viewport.
   * Clip corto (6–10 s) que resuma tu trabajo destacado.
   * Atributo `poster` con miniatura mientras carga.

2. **Capa semitransparente** (overlay)

   * `<div>` con `bg-black bg-opacity-50` encima del video para contraste del texto.

3. **Animación Lottie central**

   * Archivo JSON exportado (After Effects + Bodymovin) con animación vectorial en loop.
   * Centrado (`absolute inset-0 flex items-center justify-center pointer-events-none`).
   * Tamaño responsivo: `w-2/3 md:w-1/3 lg:w-1/4`.

4. **Texto principal**

   * `<h1>`: “Hola, soy \[Tu Nombre]”

     * Color: blanco, parte resaltada en **morado vibrante** (`#8b5cf6`).
     * Tamaño: `text-5xl md:text-6xl lg:text-7xl`.
   * `<p>`: Subtítulo descriptivo (“Frontend Developer especializado en experiencias audiovisuales”).
   * **Botón CTA**: “Ver Proyectos”

     * Enlace a `#videos`.
     * Estilo: `bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-full`.

5. **Indicador de scroll** (opcional)

   * Ícono SVG flecha hacia abajo con `animate-bounce` para invitar a deslizar.

#### 1.3. Animaciones y Comportamientos

* **Video de fondo**

  * `autoPlay`, `muted`, `loop`, `playsInline`.
  * Asegurar `object-cover` para evitar distorsión.

* **Lottie**

  * Usar `lottie-react`, contexto:

    ```jsx
    import Lottie from 'lottie-react';
    import heroAnimation from '/animations/hero-animation.json';

    <div className="pointer-events-none">
      <Lottie animationData={heroAnimation} loop />
    </div>
    ```
  * Centrar con `absolute inset-0 flex items-center justify-center`.

* **Texto y botón** (fade-in + slide-up)

  * Con **Framer Motion**:

    ```jsx
    import { motion } from 'framer-motion';

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <h1 className="text-white text-5xl ...">
        Hola, soy <span className="text-purple-400">Tu Nombre</span>
      </h1>
      ...
    </motion.div>
    ```

* **Indicador de scroll**

  * HTML:

    ```html
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="h-8 w-8 text-white" ...>
        <path d="M19 9l-7 7-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    ```

#### 1.4. Estilo y Responsividad

* **Paleta**:

  * Fondo oscuro (negro/gris oscuro).
  * Color primario: morado vibrante (`#8b5cf6`).
  * Texto blanco puro (`#FFFFFF`).

* **Tipografía**:

  * Fuente global: `Inter, sans-serif`.
  * Títulos con `font-extrabold`, subtítulos con `font-medium`.

* **Clases Tailwind**:

  * Contenedor: `relative h-screen w-full overflow-hidden`.
  * Video: `absolute top-0 left-0 w-full h-full object-cover`.
  * Overlay: `absolute inset-0 bg-black bg-opacity-50`.
  * Texto: `relative z-10 flex flex-col items-center justify-center text-center px-4`.
  * Responsive Titular: `text-5xl md:text-6xl lg:text-7xl`.

---

### 2. Galería de Videos

#### 2.1. Objetivos

* Mostrar todos los proyectos de video (verticales y horizontales)
* Permitir filtrar por categorías (“Gastronomía”, “Empresarial”, “Moda”, “Eventos”, “Otros”).
* Reproducir un **preview** al hover / mostrar miniatura de YouTube en alta resolución.
* Al hacer clic, abrir un **modal** para reproducir en 8K (si está disponible) con **React Player**.

#### 2.2. Contenido y Jerarquía

1. **Título de sección**

   * `<h2>`: “Mi Galería de Video”
   * Estilo: `text-4xl font-bold text-center mb-12`.

2. **Barra de filtros** (opcional)

   * Botones para categorías:

     ```jsx
     const categorias = ['Todos','Gastronomía','Empresarial','Moda','Eventos','Otros'];
     ```
   * Estado React:

     ```jsx
     const [categoria, setCategoria] = useState('Todos');
     ```
   * Botones con clases:

     * Activo: `bg-purple-500 text-white`.
     * Inactivo: `bg-gray-200 text-gray-700 hover:bg-gray-300`.

3. **Grid de miniaturas (YouTubeCard)**

   * Clases Tailwind:

     ```html
     <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
       <!-- YouTubeCard components -->
     </div>
     ```
   * Cada **YouTubeCard** muestra:

     * **Miniatura de YouTube** en alta resolución (`maxresdefault.jpg`).
     * **Overlay** oscuro con título centrado al hacer hover.
     * **Icono ▶** semitransparente en el centro con `group-hover:scale-110`.

4. **Lightbox / Modal (ModalYouTube)**

   * Al hacer clic en una tarjeta, setear `selectedVideoId` y abrir el modal.
   * Modal con `overlayClassName="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center"`.
   * Contenedor del video con `max-w-5xl max-h-[80vh] bg-black rounded-lg overflow-hidden`.
   * Botón de cerrar (✕) en la esquina superior derecha.
   * **React Player** con `playerVars: { autoplay: 1, rel: 0, vq: 'hd4320' }`.

#### 2.3. Lógica en React

* **Array de proyectos**:

  ```js
  const projectsData = [
    {
      id: 1,
      title: 'Video de Gastronomía 8K',
      videoId: 'YOUTUBE_ID_8K_1',
      category: 'Gastronomía',
    },
    {
      id: 2,
      title: 'Video Corporativo HD',
      videoId: 'YOUTUBE_ID_HD_2',
      category: 'Empresarial',
    },
    // …otros proyectos
  ];
  ```

* **Estado y filtrado**:

  ```jsx
  const [categoria, setCategoria] = useState('Todos');
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const proyectosFiltrados = projectsData.filter(
    (p) => categoria === 'Todos' || p.category === categoria
  );
  ```

* **YouTubeCard.jsx**

  ```jsx
  export default function YouTubeCard({ videoId, title, onClick }) {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    return (
      <div
        className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
        onClick={onClick}
      >
        <img
          src={thumbnailUrl}
          alt={`Miniatura de ${title}`}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-white opacity-70 transform transition-transform group-hover:scale-110"
            viewBox="0 0 84 84"
            fill="currentColor"
          >
            <circle cx="42" cy="42" r="42" fill="rgba(0,0,0,0.4)" />
            <polygon points="32,26 32,58 60,42" fill="white" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent p-2">
          <h3 className="text-white text-lg font-medium">{title}</h3>
        </div>
      </div>
    );
  }
  ```

* **ModalYouTube.jsx**

  ```jsx
  import Modal from 'react-modal';
  import ReactPlayer from 'react-player/youtube';

  export default function ModalYouTube({ isOpen, onRequestClose, videoId }) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        className="outline-none"
      >
        <div className="relative w-full max-w-5xl max-h-[80vh] bg-black rounded-lg overflow-hidden">
          <button
            onClick={onRequestClose}
            className="absolute top-3 right-3 text-white text-3xl hover:text-red-500 transition z-10"
          >
            &times;
          </button>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            playing={true}
            controls={true}
            width="100%"
            height="100%"
            config={{ youtube: { playerVars: { autoplay: 1, rel: 0, vq: 'hd4320' } } }}
          />
        </div>
      </Modal>
    );
  }
  ```

* **VideoGallery.jsx**

  ```jsx
  export default function VideoGallery() {
    const [categoria, setCategoria] = useState('Todos');
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const categoriasDisponibles = ['Todos','Gastronomía','Empresarial','Moda','Eventos','Otros'];

    const proyectosFiltrados = projectsData.filter(
      (p) => categoria === 'Todos' || p.category === categoria
    );

    return (
      <section id="videos" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Mi Galería de Video</h2>

          <div className="flex justify-center space-x-4 mb-8">
            {categoriasDisponibles.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                className={`px-4 py-2 rounded-full transition ${
                  categoria === cat
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {proyectosFiltrados.map((proj) => (
              <motion.div key={proj.id} variants={itemVariants}>
                <YouTubeCard
                  videoId={proj.videoId}
                  title={proj.title}
                  onClick={() => setSelectedVideoId(proj.videoId)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {selectedVideoId && (
          <ModalYouTube
            isOpen={!!selectedVideoId}
            onRequestClose={() => setSelectedVideoId(null)}
            videoId={selectedVideoId}
          />
        )}
      </section>
    );
  }
  ```

#### 2.4. Animaciones y Efectos

* **YouTubeCard (hover)**:

  * Overlay con `opacity-0 → opacity-100` al pasar el mouse.
  * Ícono ▶ con `transform scale-100 → scale-110` en `group-hover`.
* **Grid de tarjetas**:

  * Usar **Framer Motion** para un **staggered fade-in** de las tarjetas cuando la sección aparece:

    ```jsx
    const containerVariants = {
      hidden: {},
      show: { transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    };
    ```
* **ModalYouTube**:

  * Fondo (`overlayClassName`) con `opacity-0 → opacity-100` en 0.3 s.
  * Contenedor del video con `scale-90 → scale-100` para efecto “pop-in”.

#### 2.5. Estilo y Responsive

* **Fondo**: `bg-gray-100`.
* **Título**: `text-4xl font-bold text-gray-800`.
* **Grid**:

  * `grid-cols-1` en móvil,
  * `sm:grid-cols-2` en tablet,
  * `lg:grid-cols-3` en desktop.
* **Padding/Márgenes**: `py-20`, `mb-8`, `gap-8`.
* **Tarjetas**: `h-64` en desktop; en móvil puede ser `h-48`.
* **Textos**: títulos de tarjeta: `text-lg font-medium text-white` en overlay.

---

### 3. Servicios

#### 3.1. Objetivos

* Mostrar los **servicios ofrecidos** (Producción de video, Fotografía, Cobertura de eventos, Branding, Edición para redes, etc.).
* Usar **íconos SVG** o **animaciones Lottie** para cada servicio.
* Explicar brevemente cada servicio en 1–2 oraciones.

#### 3.2. Contenido y Jerarquía

1. **Título de sección**

   * `<h2>`: “Nuestros Servicios”
   * Estilo: `text-3xl font-bold text-center mb-12`.

2. **Grid de ServiceCard**

   * Responsive:

     * Móvil: 1 columna (`grid-cols-1`),
     * Tablet: 2 columnas (`sm:grid-cols-2`),
     * Desktop: 3 columnas (`lg:grid-cols-3`).
   * Cada **ServiceCard** contiene:

     * **Ícono o animación Lottie** en la parte superior (`w-24 h-24`).
     * **Título** (`text-xl font-semibold`).
     * **Descripción breve** (`text-gray-600`).

#### 3.3. Lógica en React

* **Datos de servicios**:

  ```js
  const servicesData = [
    {
      id: 1,
      title: 'Producción de Video',
      description: 'Grabación y edición de contenido audiovisual profesional.',
      icon: '/icons/video-production.svg',
      // lottie: '/animations/video.json' (opcional)
    },
    {
      id: 2,
      title: 'Fotografía Profesional',
      description: 'Sesiones fotográficas de alta calidad para eventos y productos.',
      icon: '/icons/photography.svg',
    },
    // …otros servicios
  ];
  ```

* **ServiceCard.jsx**

  ```jsx
  import Lottie from 'lottie-react';

  export default function ServiceCard({ title, description, icon, lottie }) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
        {lottie ? (
          <div className="w-24 h-24 mb-4">
            <Lottie animationData={lottie} loop />
          </div>
        ) : (
          <img src={icon} alt={`${title} icon`} className="w-16 h-16 mb-4" />
        )}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  ```

* **ServicesSection.jsx**

  ```jsx
  export default function ServicesSection() {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <ScrollSection key={service.id}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  lottie={service.lottie}
                />
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>
    );
  }
  ```

#### 3.4. Animaciones y Efectos

* **ServiceCard**

  * `hover:scale-105 transition-transform` para un ligero zoom en hover.
  * `shadow-lg → shadow-xl` al pasar el mouse.

* **Aparición en scroll**

  * Envolver cada tarjeta en `ScrollSection` para un **fade-in + slide-up**:

    ```jsx
    import { useInView } from 'react-intersection-observer';

    export function ScrollSection({ children }) {
      const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
      return (
        <div
          ref={ref}
          className={`transition-transform duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {children}
        </div>
      );
    }
    ```

#### 3.5. Estilo y Responsive

* **Fondo**: `bg-white`.
* **Grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`.
* **Padding/Márgenes**: `py-20`, `mb-12`.
* **Tarjeta**: `bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center`.
* **Tipografía**:

  * Título de tarjeta: `text-xl font-semibold`.
  * Descripción: `text-gray-600`.
* **Responsive**:

  * Tamaño de icono: `w-16 h-16` en móvil, `w-24 h-24` en desktop.
  * Espaciado adaptado por Tailwind.

---

### 4. Clientes y Reseñas (Testimonios)

#### 4.1. Objetivos

* Mostrar un **contador** rápido de clientes satisfechos.
* Presentar un **carrusel** de testimonios con:

  * Foto/Avatar del cliente,
  * Nombre y cargo/empresa,
  * Comentario (reseña) en texto,
  * (Opcional) Rating con estrellas.

#### 4.2. Contenido y Jerarquía

1. **Título y Subtítulo**

   * `<h2>`: “Lo que dicen nuestros clientes” (`text-3xl font-bold text-center`).
   * `<p>`: “Más de **120** clientes satisfechos.” (`text-gray-600 mt-2`).

2. **Carrusel de testimonios**

   * Usar **React Slick** o **Swiper.js**.
   * Cada **slide** contiene:

     * **Avatar circular** (`w-20 h-20 rounded-full`).
     * **Nombre** (`text-xl font-semibold`).
     * **Cargo / Empresa** (`text-gray-500 text-sm`).
     * **Comentario** en cursiva (`italic text-gray-700`).
     * **Estrellas** SVG (rating opcional).

#### 4.3. Lógica en React

* **Datos de testimonios**:

  ```js
  const testimonialsData = [
    {
      id: 1,
      name: 'María González',
      role: 'CEO de Foodies Inc.',
      avatar: '/images/avatar-maria.jpg',
      comment: 'Su trabajo de video para nuestro restaurante fue increíble. ¡Muy recomendable!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Carlos López',
      role: 'Marketing Manager – TechCorp',
      avatar: '/images/avatar-carlos.jpg',
      comment: 'La producción que realizaron para nuestro evento corporativo superó las expectativas.',
      rating: 4,
    },
    // …otros testimonios
  ];
  ```

* **TestimonialCarousel.jsx**

  ```jsx
  import Slider from 'react-slick';
  import 'slick-carousel/slick/slick.css';
  import 'slick-carousel/slick/slick-theme.css';

  export default function TestimonialCarousel() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1 } },
      ],
    };

    return (
      <Slider {...settings}>
        {testimonialsData.map((t) => (
          <div key={t.id} className="p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img
                src={t.avatar}
                alt={t.name}
                className="mx-auto w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">{t.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{t.role}</p>
              <p className="italic text-gray-700">“{t.comment}”</p>
              {t.rating && (
                <div className="flex justify-center mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        i < t.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3- .921 1.603-.921 1.902 0l1.38 4.24a1 1 0 00.95.69h4.46c.969 0 1.371 1.24.588 1.81l-3.61 2.62a1 1 0 00-.364 1.118l1.38 4.24c.3.921-.755 1.688-1.54 1.118l-3.61-2.62a1 1 0 00-1.176 0l-3.61 2.62c-.784.57-1.838-.197-1.54-1.118l1.38-4.24a1 1 0 00-.364-1.118L2.62 9.667c-.783-.57-.38-1.81.588-1.81h4.46a1 1 0 00.95-.69l1.38-4.24z" />
                    </svg>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    );
  }
  ```

* **TestimonialsSection.jsx**

  ```jsx
  import TestimonialCarousel from './TestimonialCarousel';

  export default function TestimonialsSection() {
    return (
      <section id="testimonios" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl font-bold">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 mt-2">
            Más de <span className="text-purple-500 font-semibold">120</span> clientes satisfechos.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-6">
          <TestimonialCarousel />
        </div>
      </section>
    );
  }
  ```

#### 4.4. Animaciones y Efectos

* **Carrusel (React Slick)**

  * `autoplaySpeed: 5000` (5 segundos).
  * Dots visibles para navegación.
  * Pausar en hover.

* **Fade-in en scroll**

  * Envolver `TestimonialsSection` o solamente el carrusel en `ScrollSection` para que aparezca con un **fade-in + slide-up**.

#### 4.5. Estilo y Responsive

* **Fondo**: `bg-gray-50`.
* **Padding/Márgenes**: `py-20`, `mb-12`.
* **Avatar**: `w-20 h-20 rounded-full object-cover`.
* **Tarjeta**: `bg-white rounded-lg shadow-lg p-6 text-center`.
* **Tipografía**:

  * Título de sección: `text-3xl font-bold text-gray-800`.
  * Subtítulo: `text-gray-600`.
  * Nombre de cliente: `text-xl font-semibold`.
  * Cargo: `text-gray-500 text-sm`.
  * Comentario: `italic text-gray-700`.
* **Responsive**:

  * Móvil (≤768px): `slidesToShow: 1`.
  * Tablet/Desktop: `slidesToShow: 2` o `3` según configuración.

---

### 5. Contadores en Tiempo Real

#### 5.1. Objetivos

* Mostrar métricas sociales en tiempo real:

  * Seguidores de YouTube, Instagram, TikTok.
  * (Opcional) Likes o visualizaciones de un video destacado.
* Si la integración con APIs aún no está disponible, mostrar un **contador animado** que incremente de 0 hasta el valor objetivo en 2 segundos.

#### 5.2. Contenido y Jerarquía

1. **Título de sección**

   * `<h2>`: “Nuestras estadísticas” (`text-3xl font-bold text-center mb-12`).

2. **Grid de contadores**

   * 3 bloques: YouTube, Instagram, TikTok.
   * Cada bloque incluye:

     * **Icono** de la plataforma (React Icons: `FaYoutube`, `FaInstagram`, `FaTiktok`).
     * **Contador** grande animado (`AnimatedCounter`).
     * **Descripción** breve (“Suscriptores de YouTube”, etc.).

#### 5.3. Lógica en React

* **AnimatedCounter.jsx**

  ```jsx
  import React, { useEffect, useState } from 'react';

  export default function AnimatedCounter({ end }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let startTimestamp = null;
      const duration = 2000;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }, [end]);

    return <span className="text-4xl font-bold">{count.toLocaleString()}</span>;
  }
  ```

* **SocialCounters.jsx**

  ```jsx
  import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

  export default function SocialCounters() {
    // Si no hay API real, usar valores estáticos:
    const statsData = {
      youtubeSubscribers: 12000,
      instagramFollowers: 8500,
      tiktokFollowers: 4500,
    };

    return (
      <section id="stats" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl font-bold">Nuestras estadísticas</h2>
        </div>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <ScrollSection>
            <div className="bg-gray-50 rounded-lg shadow-lg p-8 flex flex-col items-center hover:animate-pulse">
              <FaYoutube className="text-red-600 text-5xl mb-4" />
              <AnimatedCounter end={statsData.youtubeSubscribers} />
              <p className="mt-2 text-gray-600">Suscriptores de YouTube</p>
            </div>
          </ScrollSection>
          <ScrollSection>
            <div className="bg-gray-50 rounded-lg shadow-lg p-8 flex flex-col items-center hover:animate-pulse">
              <FaInstagram className="text-pink-500 text-5xl mb-4" />
              <AnimatedCounter end={statsData.instagramFollowers} />
              <p className="mt-2 text-gray-600">Seguidores de Instagram</p>
            </div>
          </ScrollSection>
          <ScrollSection>
            <div className="bg-gray-50 rounded-lg shadow-lg p-8 flex flex-col items-center hover:animate-pulse">
              <FaTiktok className="text-black text-5xl mb-4" />
              <AnimatedCounter end={statsData.tiktokFollowers} />
              <p className="mt-2 text-gray-600">Seguidores de TikTok</p>
            </div>
          </ScrollSection>
        </div>
      </section>
    );
  }
  ```

#### 5.4. Animaciones y Efectos

* **AnimatedCounter**

  * Utiliza `requestAnimationFrame` para incrementar de 0 al valor final en 2 segundos.
* **Bloques de contadores**

  * Uso de `ScrollSection` para **fade-in + slide-up** cuando entran en viewport.
  * `hover:animate-pulse` en el contenedor para un pulso ligero en hover.

#### 5.5. Estilo y Responsive

* **Fondo**: `bg-white`.
* **Grid**: `grid-cols-1 sm:grid-cols-3 gap-8`.
* **Tarjetas**: `bg-gray-50 rounded-lg shadow-lg p-8 flex flex-col items-center`.
* **Iconos**:

  * YouTube: `text-red-600 text-5xl`.
  * Instagram: `text-pink-500 text-5xl`.
  * TikTok: `text-black text-5xl`.
* **Texto**:

  * Contador: `text-4xl font-bold text-gray-800`.
  * Descripción: `text-gray-600`.
* **Responsive**:

  * Pantallas < 640px: tarjetas apiladas (una sola columna).
  * ≥ 640px: tres columnas alineadas.

---

### 6. Sobre Nosotros

#### 6.1. Objetivos

* Brindar una **presentación breve** de la empresa o profesional.
* Incluir **imagen** representativa del equipo o del lugar de trabajo.
* Resaltar **misión**, **visión** y **valores diferenciales**.

#### 6.2. Contenido y Jerarquía

1. **Título de sección**

   * `<h2>`: “Sobre Nosotros” (`text-3xl font-bold text-center mb-12`).

2. **Layout en dos columnas**

   * **Columna izquierda**:

     * **Imagen** (`img`) de alta calidad (e.g. equipo trabajando).
     * O bien un **parallax sutil** con `react-scroll-parallax`.
   * **Columna derecha**:

     * Párrafo introductorio (“Somos una productora audiovisual con 10 años de experiencia…”).
     * **Misión**: texto conciso.
     * **Visión**: texto conciso.
     * **Bulleted list** de valores (“Creatividad”, “Innovación”, “Puntualidad”).

#### 6.3. Lógica en React

* **AboutUs.jsx**

  ```jsx
  import aboutImage from '/images/sobre-equipolab.jpg';

  export default function AboutUs() {
    return (
      <section id="about" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:space-x-12">
          {/* Columna izquierda: Imagen */}
          <ScrollSection>
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <img
                src={aboutImage}
                alt="Equipo de producción"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
          </ScrollSection>

          {/* Columna derecha: Texto */}
          <ScrollSection>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Sobre Nosotros</h2>
              <p className="text-gray-700 mb-4">
                Somos una productora audiovisual con más de 10 años de experiencia en cubrir eventos empresariales, editoriales de moda y proyectos cinematográficos. Nuestro equipo está compuesto por directores, editores y fotógrafos especializados en cada área.
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Misión:</span> Brindar contenido visual de máxima calidad, que conecte emocionalmente a las marcas con su audiencia.
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Visión:</span> Convertirnos en líderes del mercado audiovisual latinoamericano, destacándonos por la innovación y el uso de tecnologías 8K.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                <li>Creatividad y narración emocional</li>
                <li>Tecnología de vanguardia</li>
                <li>Puntualidad y profesionalismo</li>
              </ul>
            </div>
          </ScrollSection>
        </div>
      </section>
    );
  }
  ```

#### 6.4. Animaciones y Efectos

* **Fade-in de columnas**

  * Cada columna envuelta en `ScrollSection` para que haga un **fade-in + slide-up** cuando entra en viewport.

* **Parallax sutil** (opcional)

  * Si se desea, envolver la imagen en `<Parallax speed={-10}>…</Parallax>` para un ligero movimiento vertical al hacer scroll.

#### 6.5. Estilo y Responsive

* **Fondo**: `bg-gray-100`.
* **Padding/Márgenes**: `py-20`, `mb-8` para separar secciones.
* **Tipografía**:

  * Título: `text-3xl font-bold text-gray-800`.
  * Texto: `text-gray-700 leading-relaxed`.
* **Columns**:

  * Desktop (`lg:flex-row`): imagen y texto lado a lado (`w-1/2`).
  * Móvil (`flex-col`): imagen arriba, texto abajo.
* **Imagen**: `rounded-lg shadow-lg w-full object-cover`.

---

### 7. Formulario de Contacto

#### 7.1. Objetivos

* Permitir que los usuarios envíen un mensaje formal con:

  * Nombre,
  * Correo electrónico,
  * Descripción breve del proyecto.
* Ofrecer **métodos alternativos** de contacto (WhatsApp, correo directo, redes sociales).

#### 7.2. Contenido y Jerarquía

1. **Título de sección**

   * `<h2>`: “Contáctanos” (`text-3xl font-bold text-center mb-8`).

2. **Grid dividido en columnas**

   * **Columna 1 (Formulario)**:

     * Campos: Nombre (`<input>`), Correo (`<input type="email">`), Mensaje (`<textarea>`).
     * Botón “Enviar mensaje”.
     * Validación con **React Hook Form**: campos obligatorios, correo válido.
     * Mensaje de éxito/error tras enviar.

   * **Columna 2 (Métodos de contacto directo)**:

     * Lista de íconos + texto:

       * **WhatsApp**: `https://wa.me/591XXXXXXXXX?text=…`
       * **Correo**: `mailto:tuemail@dominio.com`
       * **Instagram**: `https://instagram.com/tuCuenta`
       * **YouTube**: `https://youtube.com/tuCanal`
       * **TikTok**: `https://tiktok.com/@tuCuenta`

#### 7.3. Lógica en React

* **ContactForm.jsx** (React Hook Form)

  ```jsx
  import { useForm } from 'react-hook-form';

  export default function ContactForm() {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm();

    const onSubmit = async (data) => {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto grid grid-cols-1 gap-6"
      >
        <div>
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input
            {...register('nombre', { required: true })}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Tu nombre"
          />
          {errors.nombre && (
            <span className="text-red-500">Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Correo electrónico</label>
          <input
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="tuemail@dominio.com"
          />
          {errors.email && (
            <span className="text-red-500">Ingresa un correo válido</span>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Mensaje</label>
          <textarea
            {...register('mensaje', { required: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none"
            placeholder="Cuéntame sobre tu proyecto"
          />
          {errors.mensaje && (
            <span className="text-red-500">Este campo es obligatorio</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-full transition"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </button>

        {isSubmitSuccessful && (
          <p className="text-green-500 mt-4">¡Mensaje enviado correctamente!</p>
        )}
      </form>
    );
  }
  ```

* **ContactSection.jsx**

  ```jsx
  import {
    FaWhatsapp,
    FaEnvelope,
    FaInstagram,
    FaYoutube,
    FaTiktok,
  } from 'react-icons/fa';

  export default function ContactSection() {
    return (
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Contáctanos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Columna 1: Formulario */}
            <ScrollSection>
              <ContactForm />
            </ScrollSection>

            {/* Columna 2: Métodos de contacto */}
            <ScrollSection>
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold">O contáctanos directamente en:</h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <FaWhatsapp className="text-green-500 text-2xl" />
                    <a
                      href="https://wa.me/591XXXXXXXXX?text=Hola%20quiero%20saber%20sobre%20sus%20servicios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:underline"
                    >
                      +591 XXX XXX XXX (WhatsApp)
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaEnvelope className="text-purple-600 text-2xl" />
                    <a
                      href="mailto:tuemail@dominio.com"
                      className="text-gray-700 hover:underline"
                    >
                      tuemail@dominio.com
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaInstagram className="text-pink-500 text-2xl" />
                    <a
                      href="https://instagram.com/tuCuenta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:underline"
                    >
                      @tuCuenta
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaYoutube className="text-red-600 text-2xl" />
                    <a
                      href="https://youtube.com/tuCanal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:underline"
                    >
                      Canal de YouTube
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaTiktok className="text-black text-2xl" />
                    <a
                      href="https://tiktok.com/@tuCuenta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:underline"
                    >
                      @tuCuenta
                    </a>
                  </li>
                </ul>
              </div>
            </ScrollSection>
          </div>
        </div>
      </section>
    );
  }
  ```

#### 7.4. Animaciones y Efectos

* **Inputs y textarea**

  * Al enfocarlos (`:focus`), cambiar borde a `border-purple-500 transition-colors outline-none`.
* **Botón “Enviar mensaje”**

  * `hover:scale-105 transition-transform` para un ligero zoom.
* **Iconos de contacto**

  * `hover:scale-110 transition-transform` y `hover:text-purple-600`.
* **Aparición en scroll**

  * Envolver tanto el formulario como los métodos de contacto en `ScrollSection` para que aparezcan con fade-in + slide-up.

#### 7.5. Estilo y Responsive

* **Fondo**: `bg-gray-50`.
* **Grid**: `grid-cols-1 lg:grid-cols-2 gap-12`.
* **Tipografía**:

  * Título: `text-3xl font-bold text-gray-800`.
  * Subtítulo: `text-2xl font-semibold text-gray-700`.
  * Listado de métodos: `text-gray-700 hover:underline`.
* **Responsive**:

  * Móvil: formularios y métodos apilados (una columna).
  * Desktop: lado a lado (dos columnas).

---

### 8. Footer

#### 8.1. Objetivos

* Cerrar la página con:

  * Enlaces rápidos a secciones internas (Inicio, Videos, Servicios, Contacto).
  * Íconos de redes sociales.
  * Texto de copyright.

#### 8.2. Contenido y Jerarquía

1. **Enlaces de navegación**

   * Lista horizontal de enlaces: “Inicio” (`#hero`), “Videos” (`#videos`), “Servicios” (`#services`), “Contacto” (`#contacto`).

2. **Redes sociales**

   * Íconos pequeños de Instagram, YouTube y TikTok (React Icons).
   * Enlaces externos a cada perfil.

3. **Copyright**

   * Texto pequeño: “© 2025 Tu Nombre. Todos los derechos reservados.”

#### 8.3. Lógica en React

* **Footer.jsx**

  ```jsx
  import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

  export default function Footer() {
    return (
      <footer className="bg-black text-gray-400 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Enlaces rápidos */}
          <ul className="flex space-x-6 mb-4 md:mb-0">
            <li>
              <a href="#hero" className="hover:text-white transition">Inicio</a>
            </li>
            <li>
              <a href="#videos" className="hover:text-white transition">Videos</a>
            </li>
            <li>
              <a href="#services" className="hover:text-white transition">Servicios</a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-white transition">Contacto</a>
            </li>
          </ul>

          {/* Redes sociales */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://instagram.com/tuCuenta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://youtube.com/tuCanal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaYoutube className="text-2xl" />
            </a>
            <a
              href="https://tiktok.com/@tuCuenta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaTiktok className="text-2xl" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm">&copy; 2025 Tu Nombre. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }
  ```

#### 8.4. Animaciones y Efectos

* **Enlaces rápidos**

  * `hover:text-white transition-colors` para cambio de color en hover.

* **Iconos sociales**

  * `hover:scale-110 transition-transform` para efecto de pulso.

#### 8.5. Estilo y Responsive

* **Fondo**: `bg-black`.
* **Texto**: `text-gray-400`, `hover:text-white`.
* **Padding**: `py-6 px-6`.
* **Layout**:

  * Móvil (`flex-col items-center space-y-4`): enlaces, iconos y texto apilados.
  * Desktop (`md:flex-row justify-between`): fila distribuida entre enlaces – iconos – texto.

---

## Requerimientos No Funcionales y Optimización

### 1. Diseño Responsive

* **Mobile-First**: diseñar para móvil y escalar a pantallas mayores.

* Utilizar utilidades de Tailwind para breakpoints:

  * `sm` (> 640px), `md` (> 768px), `lg` (> 1024px), `xl` (> 1280px).
  * Ejemplo: `text-4xl md:text-5xl lg:text-6xl`.
  * Grillas: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

* Probar en DevTools con distintos tamaños (iPhone SE, iPad, Desktop).

### 2. Carga Rápida / Performance

* **Lazy Loading**

  * Videos de YouTube se cargan solo cuando el modal se abre.
  * Componentes pesados (Galería, Testimonios) pueden cargarse con `React.lazy()` + `Suspense`.

* **Optimización de Lottie**

  * Comprimir JSON con [LottieFiles Optimizer](https://lottiefiles.com/optimizer).
  * Cargar solo la animación del Hero inicialmente; otras animaciones solo en sus secciones.

* **Imágenes y SVG**

  * Comprimir JPG/PNG con herramientas externas (TinyPNG, Squoosh).
  * Servir SVG puros.
  * Usar `img` con `loading="lazy"` en imágenes secundarias (no en Hero).

* **Code Splitting y Tree Shaking**

  * Vite realiza tree-shaking de dependencias no usadas.
  * Configuración adicional no es necesaria; solo dividir rutas si se agregan.

* **Preload / Prefetch**

  * Agregar en `index.html`:

    ```html
    <link rel="preload" as="image" href="https://img.youtube.com/vi/YOUTUBE_ID/maxresdefault.jpg" />
    ```

### 3. SEO Básico

* **React Helmet** (o `react-helmet-async`):

  ```jsx
  import { Helmet, HelmetProvider } from 'react-helmet-async';

  function HomePage() {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Tu Nombre – Portafolio Audiovisual</title>
          <meta name="description" content="Portafolio con videos en alta calidad, servicios audiovisuales y contacto." />
          <meta property="og:title" content="Portafolio Audiovisual de Tu Nombre" />
          <meta property="og:description" content="Explora nuestros proyectos con calidad 8K, testimonios y más." />
          <meta property="og:image" content="https://tusitio.com/og-image.jpg" />
        </Helmet>
        {/* Resto del componente */}
      </HelmetProvider>
    );
  }
  ```
* **Sitemap (opcional)**

  * Crear `sitemap.xml` manualmente o con scripts y colocarlo en `public/` para indexación.

### 4. Panel de Gestión (v2 opcional)

* Integrar un CMS headless (Sanity, Contentful, Strapi) para manejar datos dinámicos (videos, servicios, testimonios).
* Consumir la API del CMS en lugar de datos “hardcoded” en JSON.

### 5. Modo Oscuro / Claro (futura versión)

* Configurar en `tailwind.config.js`:

  ```js
  darkMode: 'class',
  ```
* Agregar un **toggle** en el `Header` que añada/quite la clase `dark` en `<html>`.
* En CSS, definir:

  * `bg-white dark:bg-gray-900`,
  * `text-gray-800 dark:text-gray-200`,
  * `bg-gray-50 dark:bg-gray-800`,
  * etc.

---

## Flujo de Trabajo Sugerido

1. **Inicializar proyecto**

   ```bash
   npm create vite@latest mi-portfolio -- --template react
   cd mi-portfolio
   npm install
   ```

2. **Instalar dependencias**

   ```bash
   npm install \
     tailwindcss postcss autoprefixer \
     framer-motion lottie-react react-player react-modal \
     react-intersection-observer react-slick slick-carousel \
     react-hook-form react-helmet-async react-icons
   npx tailwindcss init -p
   ```

3. **Configurar Tailwind**

   * En `tailwind.config.js`:

     ```js
     export default {
       content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
       theme: {
         extend: {
           fontFamily: {
             sans: ['Inter', 'sans-serif'],
           },
           colors: {
             primary: '#8b5cf6',
           },
         },
       },
       plugins: [],
     };
     ```
   * En `src/index.css`:

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

4. **Crear componentes base**

   * `src/components/common/CustomCursor.jsx`
   * `src/components/common/Header.jsx`
   * `src/components/common/Footer.jsx`
   * `src/components/common/ScrollSection.jsx`

5. **Implementar Hero**

   * `src/components/hero/Hero.jsx`
   * Asegurar video de fondo (`/public/videos/…`) y Lottie (`/public/animations/hero-animation.json`).

6. **Implementar Galería de Videos**

   * `src/components/gallery/YouTubeCard.jsx`
   * `src/components/gallery/ModalYouTube.jsx`
   * `src/components/gallery/VideoGallery.jsx`
   * Definir `projectsData` con IDs de YouTube en 8K.

7. **Implementar Sección de Servicios**

   * `src/components/services/ServiceCard.jsx`
   * `src/components/services/ServicesSection.jsx`
   * Definir `servicesData` con iconos SVG o animaciones Lottie.

8. **Implementar Testimonios**

   * `src/components/reviews/TestimonialCarousel.jsx`
   * `src/components/reviews/TestimonialsSection.jsx`
   * Definir `testimonialsData` con datos reales o simulados.

9. **Implementar Contadores**

   * `src/components/counters/AnimatedCounter.jsx`
   * `src/components/counters/SocialCounters.jsx`
   * Usar datos estáticos o integrar API si está disponible.

10. **Implementar Sobre Nosotros**

    * `src/components/about/AboutUs.jsx`
    * Incluir imagen `/src/assets/images/sobre-equipolab.jpg`.

11. **Implementar Contacto**

    * `src/components/contact/ContactForm.jsx`
    * `src/components/contact/ContactSection.jsx`
    * Configurar endpoint `/api/contact` o usar servicio de terceros (SendGrid, Mailgun).

12. **Implementar Footer**

    * `src/components/common/Footer.jsx`.

13. **Página Principal y App**

    * `src/pages/HomePage.jsx`: importar todas las secciones en el orden: Hero → VideoGallery → ServicesSection → TestimonialsSection → SocialCounters → AboutUs → ContactSection → Footer.
    * `src/App.jsx`: renderizar `<CustomCursor />`, `<Header />` y `<HomePage />`.

14. **SEO y Metadata**

    * Envolver `HomePage` con `<HelmetProvider>` y definir `<Helmet>` con título, descripción y OG tags.

15. **Pruebas y Ajustes Finales**

    * Verificar responsividad en 320px, 768px, 1024px.
    * Ejecutar Lighthouse para evaluar performance, accesibilidad y SEO.
    * Ajustar assets (imágenes/animaciones) para reducir peso.
    * Agregar favicon y meta tags en `index.html`.

---

## Configuración Inicial y Scripts

En el archivo `package.json` encontrarás los scripts por defecto de Vite:

```json
{
  "name": "mi-portfolio",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^X.Y.Z",
    "lottie-react": "^X.Y.Z",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^X.Y.Z",
    "react-helmet-async": "^X.Y.Z",
    "react-icons": "^X.Y.Z",
    "react-intersection-observer": "^X.Y.Z",
    "react-modal": "^X.Y.Z",
    "react-player": "^X.Y.Z",
    "react-slick": "^X.Y.Z",
    "slick-carousel": "^1.8.1"
  },
  "devDependencies": {
    "autoprefixer": "^X.Y.Z",
    "postcss": "^X.Y.Z",
    "tailwindcss": "^X.Y.Z",
    "vite": "^4.0.0"
  }
}
```

Para arrancar el entorno de desarrollo:

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

Para previsualizar la build:

```bash
npm run preview
```

---

> Con esta documentación detallada en formato README, tendrás una guía clara para **iniciar**, **desarrollar** y **afinar** cada sección del portafolio audiovisual, integrando animaciones, consumo de videos en 8K desde YouTube y un diseño responsive moderno.
