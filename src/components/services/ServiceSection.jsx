import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import ServiceCard from './ServiceCard';
import './ServiceSection.css';
import { FaVideo, FaEdit, FaPencilRuler, FaMicrophone, FaFilm, FaPhotoVideo } from 'react-icons/fa';

const ServiceSection = () => {
  const { t } = useTranslation();

  const servicesData = [
    {
      id: 1,
      title: t('services.videography_title'),
      description: t('services.videography_description'),
      icon: <FaVideo className="text-4xl text-primary-500" />,
      delay: 0.1
    },
    {
      id: 2,
      title: t('services.editing_title'),
      description: t('services.editing_description'),
      icon: <FaEdit className="text-4xl text-primary-500" />,
      delay: 0.2
    },
    {
      id: 3,
      title: t('services.motion_graphics_title'),
      description: t('services.motion_graphics_description'),
      icon: <FaPencilRuler className="text-4xl text-primary-500" />,
      delay: 0.3
    },
    {
      id: 4,
      title: t('services.audio_production_title'),
      description: t('services.audio_production_description'),
      icon: <FaMicrophone className="text-4xl text-primary-500" />,
      delay: 0.4
    },
    {
      id: 5,
      title: t('services.creative_direction_title'),
      description: t('services.creative_direction_description'),
      icon: <FaFilm className="text-4xl text-primary-500" />,
      delay: 0.5
    },
    {
      id: 6,
      title: t('services.digital_content_title'),
      description: t('services.digital_content_description'),
      icon: <FaPhotoVideo className="text-4xl text-primary-500" />,
      delay: 0.6
    }
  ];

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
