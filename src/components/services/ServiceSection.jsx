import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import ServiceCard from './ServiceCard';
import './ServiceSection.css';
import { FaVideo, FaEdit, FaPencilRuler, FaMicrophone, FaFilm, FaPhotoVideo } from 'react-icons/fa';

// Mock data for services - would be replaced with real data from an API in production
const servicesData = [
  {
    id: 1,
    title: 'Videografía',
    description: 'Capturamos tu visión con filmación en 4K/8K usando equipos de última generación para lograr la estética visual perfecta.',
    icon: <FaVideo className="text-4xl text-primary-500" />,
    delay: 0.1 // Mantener para posible uso en CSS stagger
  },
  {
    id: 2,
    title: 'Edición Profesional',
    description: 'Editamos con precisión para darle ritmo, coherencia y emoción a tu historia. Color grading profesional incluido.',
    icon: <FaEdit className="text-4xl text-primary-500" />,
    delay: 0.2
  },
  {
    id: 3,
    title: 'Motion Graphics',
    description: 'Elementos gráficos y animaciones que potencian tu mensaje y dan identidad única a tus videos.',
    icon: <FaPencilRuler className="text-4xl text-primary-500" />,
    delay: 0.3
  },
  {
    id: 4,
    title: 'Producción de Audio',
    description: 'Grabación de voz, selección musical y mezcla de sonido profesional para complementar lo visual.',
    icon: <FaMicrophone className="text-4xl text-primary-500" />,
    delay: 0.4
  },
  {
    id: 5,
    title: 'Dirección Creativa',
    description: 'Desarrollo de conceptos, guiones y dirección en set para asegurar que tu visión cobre vida.',
    icon: <FaFilm className="text-4xl text-primary-500" />,
    delay: 0.5
  },
  {
    id: 6,
    title: 'Contenido Digital',
    description: 'Estrategia y producción de contenido optimizado para redes sociales y plataformas digitales.',
    icon: <FaPhotoVideo className="text-4xl text-primary-500" />,
    delay: 0.6
  }
];

const ServiceSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false // Allow re-animation if scrolling up and down
  });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0); // Usar useRef para evitar re-renders innecesarios

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    } else {
      // Cuando no está en vista, podría resetearse para re-animar al volver a entrar
      // Dependiendo del efecto deseado, podrías querer setIsVisible(false) aquí
      // o manejar clases de 'exit' más explícitamente.
      // Por ahora, la animación de entrada se activa con 'is-visible'.
      // La animación de salida es más compleja de replicar sin JS para la animación.
      setIsVisible(false); // Simple hide/show for now
    }
  }, [inView]);
  
  // Clases para el contenedor principal
  const containerClassName = `
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000
    service-section-container
    ${isVisible ? 'container-visible' : 'container-hidden'}
    scroll-dir-${scrollDirection}
  `;

  return (
    <div 
      ref={ref}
      className={containerClassName}
    >
      {servicesData.map((service) => (
        <div 
          key={service.id}
          className="preserve-3d will-change-transform" // Keep 3D and performance hints if needed
        >
          <ServiceCard service={service} isVisible={isVisible} />
        </div>
      ))}
    </div>
  );
};

export default ServiceSection;
