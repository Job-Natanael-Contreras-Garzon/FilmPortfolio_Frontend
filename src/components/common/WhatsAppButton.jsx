import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer'; // Importar useInView
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';
//https://api.whatsapp.com/send?phone=59178504107
const WhatsAppButton = ({ phoneNumber = '59178504107', message = 'Hola, me interesa conocer más sobre tus servicios de producción audiovisual.' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar la animación de entrada

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
    delay: 500 // Pequeño delay para asegurar que se vea la animación
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotX = ((y / rect.height) - 0.5) * 20;
    const rotY = ((x / rect.width) - 0.5) * -20;
    
    setRotation({ x: rotX, y: rotY });
  };
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };
  
  return (
    <div
      ref={ref} // Asignar ref para useInView
      className={`fixed bottom-8 right-8 z-50 whatsapp-button-container ${isVisible ? 'button-visible' : 'button-hidden'}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetRotation();
      }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        // La transición de la rotación se maneja en CSS o se puede dejar aquí si es específica para el JS
        transition: isHovered ? 'none' : 'transform 0.5s ease-out' 
      }}
    >
      <button
        ref={buttonRef} // Mover ref al botón si la rotación se aplica al botón directamente o mantener en el div si es el contenedor
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 whatsapp-button"
        style={{
          boxShadow: isHovered 
            ? '0 10px 25px -5px rgba(37, 211, 102, 0.5), 0 8px 10px -6px rgba(37, 211, 102, 0.2), 0 0 15px rgba(37, 211, 102, 0.6)' 
            : '0 10px 15px -3px rgba(37, 211, 102, 0.3), 0 4px 6px -2px rgba(37, 211, 102, 0.1)'
        }}
        aria-label="Contactar por WhatsApp"
      >
        <div className="relative">
          <FaWhatsapp size={30} className="relative z-10" />
          
          {/* Efecto de brillo con CSS */}
          <div 
            className="absolute inset-0 rounded-full bg-white whatsapp-shine-effect"
          />
        </div>
      </button>
      
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full right-0 mb-2 p-2 rounded bg-black/80 text-white text-sm whitespace-nowrap transform transition-all duration-300 whatsapp-tooltip ${ 
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        Contáctame por WhatsApp
      </div>
    </div>
  );
};

export default WhatsAppButton;
