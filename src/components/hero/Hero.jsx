import { useRef, useEffect, useContext, useState } from 'react';
import { useInView } from 'react-intersection-observer'; // Asegurar que esta es la importación utilizada
import { FaChevronDown } from 'react-icons/fa';

// Importar ThemeContext desde App
import { ThemeContext } from '../../App';

// ProjectShowcase optimizado para responsive
const ProjectShowcase = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Añadido para controlar la animación
  
  const projects = [
    {
      id: 1,
      title: "Branding - Fusion Restaurant",
      subtitle: "Identidad para restaurante de alta cocina",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Video Comercial - Tech Startup",
      subtitle: "Campaña publicitaria para startup tecnológica",
      category: "Video",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      id: 3,
      title: "Documental - Cultura Local",
      subtitle: "Preservando tradiciones ancestrales",
      category: "Documental",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2059&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentProject((prev) => (prev + 1) % projects.length);
      setTimeout(() => setIsAnimating(false), 1000); // Duración de la animación de salida/entrada
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = projects[currentProject];
  const [projectInfoRef, projectInfoInView] = useInView({ threshold: 0.1, triggerOnce: false });

  return (
    <div className="relative w-full h-full overflow-hidden project-showcase-container">
      {/* Background Image */}
      <div
        key={current.id} // Key para forzar re-render y animación en cambio de imagen
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat project-showcase-bg ${isAnimating ? 'bg-animating-out' : 'bg-animating-in'}`}
        style={{
          backgroundImage: `url(${current.image})`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 md:from-black/30 md:via-black/40 md:to-black/60" />
      
      <div 
        ref={projectInfoRef}
        className={`absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:max-w-md z-10 project-showcase-info ${projectInfoInView ? 'info-visible' : 'info-hidden'}`}
      >
        <div 
          className="inline-block px-3 py-1 mb-2 text-xs font-medium text-white bg-purple-600/80 rounded-full backdrop-blur-sm project-showcase-badge"
        >
          {current.category}
        </div>
        
        <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight">
          {current.title}
        </h3>
        
        <p className="text-sm md:text-base text-gray-200/90 leading-relaxed">
          {current.subtitle}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex space-x-2 z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 project-showcase-indicator ${index === currentProject ? 'bg-purple-500 w-6' : 'bg-white/40 hover:bg-white/60'}`}
            onClick={() => {
              setIsAnimating(true);
              setCurrentProject(index);
              setTimeout(() => setIsAnimating(false), 1000);
            }}
          />
        ))}
      </div>
    </div>
  );
};

const WhatsAppButton = ({ phoneNumber, message }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: false, delay: 2000 }); // Delay para la animación de entrada

  return (
    <div 
      ref={ref}
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 whatsapp-button-container ${inView ? 'button-visible' : 'button-hidden'}`}
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl transition-all duration-300 whatsapp-button-link"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>
    </div>
  );
};

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  const containerRef = useRef(null);
  // const controls = useAnimation(); // Ya estaba comentado, se mantiene así
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroStyles, setHeroStyles] = useState({}); // Para parallax y otras transformaciones
  const [elementsVisible, setElementsVisible] = useState(false); // Para animación de entrada escalonada

  // Refs para elementos a animar en la entrada
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Trigger entrada escalonada
    const entryTimeout = setTimeout(() => setElementsVisible(true), 300); // Pequeño delay inicial

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(entryTimeout);
    };
  }, []);

  // Lógica de Parallax y encogimiento (reemplazo de useScroll, useTransform, useAnimation)
  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = containerRef.current.offsetHeight;
      const scrollProgress = Math.min(scrollY / heroHeight, 1); // 0 a 1 dentro del Hero

      // Parallax para el título
      const titleYVal = isMobile ? -20 * scrollProgress - 40 * Math.pow(scrollProgress, 2) : -50 * scrollProgress - 100 * Math.pow(scrollProgress, 2);
      const titleScaleVal = 1 - (isMobile ? 0.02 * scrollProgress - 0.03 * Math.pow(scrollProgress, 2) : 0.05 * scrollProgress - 0.15 * Math.pow(scrollProgress, 2));
      const titleRotateXVal = isMobile ? 1 * scrollProgress + 2 * Math.pow(scrollProgress, 2) : 3 * scrollProgress + 5 * Math.pow(scrollProgress, 2);
      
      // Parallax para el texto
      const textYVal = isMobile ? -15 * scrollProgress - 25 * Math.pow(scrollProgress, 2) : -25 * scrollProgress - 50 * Math.pow(scrollProgress, 2);
      const textOpacityVal = Math.max(0, 1 - scrollProgress / 0.6); // Opacidad disminuye hasta 60% del scroll

      // Parallax para el video/showcase (contenedor)
      const videoScaleVal = 1 + (isMobile ? 0.02 * scrollProgress : 0.05 * scrollProgress);
      const videoYVal = isMobile ? -15 * scrollProgress : -30 * scrollProgress;

      // Encogimiento del Hero
      const heroContainerScale = scrollY > 10 ? (isMobile ? 0.99 : 0.98) : 1;
      const heroContainerOpacity = scrollY > 10 ? 0.95 : 1;

      setHeroStyles({
        title: { transform: `translateY(${titleYVal}px) scale(${titleScaleVal}) rotateX(${titleRotateXVal}deg)` },
        text: { transform: `translateY(${textYVal}px)`, opacity: textOpacityVal },
        videoContainer: { transform: `scale(${videoScaleVal}) translateY(${videoYVal}px)` },
        heroContainerTransform: { transform: `scale(${heroContainerScale})`, opacity: heroContainerOpacity, transformOrigin: 'top' }
      });
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Llama una vez para establecer el estado inicial

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isClient, isMobile]);

  const scrollToContent = () => {
    const contentSection = document.getElementById('main-content-area'); // Asume que hay un ID
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clases para animación de entrada escalonada
  const getEntryClass = (baseClass, delayClass) => {
    return `${baseClass} hero-entry-item ${elementsVisible ? 'item-entered' : 'item-initial'} ${delayClass}`;
  };

  return (
    <section 
      ref={containerRef} 
      className={`relative h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`}
      style={heroStyles.heroContainerTransform} // Aplicar encogimiento
    >
      <div className="absolute inset-0 w-full h-full z-0 hero-video-container" style={heroStyles.videoContainer}>
        <ProjectShowcase />
      </div>

      <div className="relative z-10 p-4 md:p-8 max-w-4xl mx-auto hero-content-wrapper">
        <div 
          ref={titleRef}
          style={heroStyles.title}
          className={getEntryClass('mb-4 md:mb-6', 'delay-0')}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
              Branding
            </span>
            <span className="block text-gray-200 mt-1 md:mt-2">
              Brothers
            </span>
          </h1>
        </div>

        <div 
          ref={subtitleRef}
          style={heroStyles.text}
          className={getEntryClass('mb-6 md:mb-8', 'delay-1')}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Productor audiovisual y creador de contenido enfocado en contar historias con impacto y profundidad.
          </p>
        </div>

        <div 
          ref={ctaRef}
          className={getEntryClass('flex flex-col sm:flex-row items-center justify-center gap-4', 'delay-2')}
        >
          <a
            href="#contact"
            className="btn btn-primary btn-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Colaboremos
          </a>
          <a
            href="/portfolio"
            className="btn btn-secondary btn-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Ver Proyectos
          </a>
        </div>
      </div>

      <div 
        ref={scrollIndicatorRef}
        onClick={scrollToContent}
        className={getEntryClass('absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors', 'delay-3')}
      >
        <FaChevronDown className="text-3xl text-white animate-bounce" />
      </div>
      
      <WhatsAppButton phoneNumber="+59178504107" message="Hola brandingBrothers, me gustaría hablar sobre un proyecto." />
    </section>
  );
};

export default Hero;