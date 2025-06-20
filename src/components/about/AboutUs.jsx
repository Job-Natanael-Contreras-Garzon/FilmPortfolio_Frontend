import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { FaCheck } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false 
  });
  
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    } else {
      // Optional: Reset visibility when out of view if re-animation is desired
      // setIsVisible(false); 
    }
  }, [inView]);
  
  const features = [
    'Equipo especializado en cinematografía digital',
    'Más de 10 años de experiencia en producción audiovisual',
    'Uso de tecnología 8K y drones de última generación',
    'Enfoque narrativo en cada proyecto',
    'Postproducción avanzada con color grading profesional',
    'Entregas en tiempo récord sin sacrificar calidad'
  ];
  
  // Helper to construct dynamic class names for scroll direction
  const getDirectionalClass = (baseClass, visibleState, direction) => {
    if (!visibleState) return `${baseClass}-hidden`;
    return `${baseClass}-visible ${baseClass}-visible-${direction}`;
  };

  return (
    <div 
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center about-us-container ${getDirectionalClass('about-us-container', isVisible, scrollDirection)}`}
    >
      {/* Image Section */}
      <div
        className={`relative about-image-section ${getDirectionalClass('about-image-section', isVisible, scrollDirection)}`}
      >
        <div className="aspect-[4/3] rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2074"
            alt="Equipo de producción audiovisual"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-full flex items-center justify-center text-white font-heading font-bold text-xl p-4 text-center">
          10+ Años de Experiencia
        </div>
      </div>
      
      {/* Content Section */}
      <div
        className={`about-content-section ${getDirectionalClass('about-content-section', isVisible, scrollDirection)}`}
      >
        <h2 className="heading-lg mb-6">Sobre Nosotros</h2>
        <p className="text-gray-300 mb-6 text-lg">
          Somos un equipo de creadores audiovisuales apasionados por contar historias que conectan. Fundados en 2014, hemos producido contenido para marcas nacionales e internacionales, siempre con un enfoque cinematográfico y narrativo.
        </p>
        <p className="text-gray-300 mb-8">
          Nuestra misión es convertir tu visión en una experiencia visual impactante que resuene con tu audiencia. Ya sea un comercial, documental o contenido para redes sociales, aportamos la misma pasión y calidad a cada proyecto.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex items-start feature-item ${getDirectionalClass('feature-item', isVisible, scrollDirection)} ${index % 2 === 0 ? 'feature-item-even' : 'feature-item-odd'}`}
              style={{ transitionDelay: isVisible ? `${0.3 + index * 0.1}s` : '0s' }}
            >
              <span className="text-primary-500 mr-2 mt-1">
                <FaCheck />
              </span>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <div
          className={`cta-button-container ${isVisible ? 'button-visible' : 'button-hidden'}`}
           style={{ transitionDelay: isVisible ? '0.6s' : '0s' }}
        >
          <a href="#contacto" className="btn-primary">
            Trabajemos Juntos
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
