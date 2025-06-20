import { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../App';

const CustomCursor = ({ position, isHovering }) => {
  const { theme } = useContext(ThemeContext);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [particleStyles, setParticleStyles] = useState([]);
  const requestRef = useRef();

  // Colores basados en el tema
  const ringColor = theme === 'dark' 
    ? 'rgba(139, 92, 246, 0.6)' // Púrpura para modo oscuro
    : 'rgba(109, 40, 217, 0.5)'; // Púrpura más oscuro para modo claro
  
  const dotColor = theme === 'dark'
    ? 'rgba(255, 255, 255, 0.9)' // Blanco para modo oscuro
    : 'rgba(15, 23, 42, 0.8)'; // Casi negro para modo claro
  
  const glowColor = theme === 'dark'
    ? '0 0 15px rgba(139, 92, 246, 0.5)' // Resplandor púrpura para modo oscuro
    : '0 0 10px rgba(109, 40, 217, 0.4)'; // Resplandor púrpura para modo claro

  useEffect(() => {
    // Suavizado del movimiento del cursor
    const updateCursorPosition = () => {
      setCurrentPosition(prevPosition => ({
        x: prevPosition.x + (position.x - prevPosition.x) * 0.2, // Factor de suavizado (0.2)
        y: prevPosition.y + (position.y - prevPosition.y) * 0.2,
      }));
      requestRef.current = requestAnimationFrame(updateCursorPosition);
    };
    requestRef.current = requestAnimationFrame(updateCursorPosition);
    return () => cancelAnimationFrame(requestRef.current);
  }, [position]);

  useEffect(() => {
    if (isHovering) {
      const newParticles = [...Array(3)].map(() => ({
        id: Math.random(),
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        duration: 1 + Math.random(),
        delay: Math.random() * 0.5, 
      }));
      setParticleStyles(newParticles);
    } else {
      setParticleStyles([]);
    }
  }, [isHovering]);

  const outerRingStyle = {
    borderColor: ringColor,
    boxShadow: glowColor,
    background: isHovering ? 'transparent' : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
    width: isHovering ? 70 : 40,
    height: isHovering ? 70 : 40,
    opacity: isHovering ? 0.9 : 0.7,
    transform: `rotate(${isHovering ? 45 : 0}deg) translate(-50%, -50%)`,
    borderWidth: isHovering ? '2px' : '1.5px',
    transition: 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out, transform 0.2s ease-out, border-width 0.2s ease-out, background 0.2s ease-out, border-color 0.3s ease-in-out',
    position: 'absolute',
    top: '50%',
    left: '50%',
  };

  const innerDotStyle = {
    backgroundColor: dotColor,
    boxShadow: isHovering ? glowColor : 'none',
    width: isHovering ? 6 : 8,
    height: isHovering ? 6 : 8,
    opacity: isHovering ? 1 : 0.8,
    transform: `scale(${isHovering ? 1.2 : 1}) translate(-50%, -50%)`,
    transition: 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out, transform 0.2s ease-out, background-color 0.3s ease-in-out, box-shadow 0.2s ease-out',
    position: 'absolute',
    top: '50%',
    left: '50%',
  };
  
  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
        width: 0, // El tamaño lo dan los hijos
        height: 0,
        // x: '-50%', // Se maneja con transform en los hijos
        // y: '-50%'
      }}
    >
      {/* Cursor exterior (anillo con gradiente) */}
      <div
        style={outerRingStyle}
        className="rounded-full border-2 backdrop-blur-sm"
      />
      
      {/* Cursor interior (punto) */}
      <div
        style={innerDotStyle}
        className="rounded-full"
      />
      
      {/* Partículas que siguen al cursor cuando se hace hover */}
      {isHovering && particleStyles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full particle-animation"
          style={{
            backgroundColor: ringColor,
            width: 4,
            height: 4,
            '--particle-x': `${particle.x}px`,
            '--particle-y': `${particle.y}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            // Se necesita CSS para @keyframes particle-animation
          }}
        />
      ))}
    </div>
  );
};

CustomCursor.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  isHovering: PropTypes.bool.isRequired
};

export default CustomCursor;

/* CSS que necesitarás añadir en tu archivo CSS global (ej: index.css): 
@keyframes particle-animation {
  0% {
    transform: translate(var(--particle-x), var(--particle-y)) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    transform: translate(var(--particle-x), var(--particle-y)) scale(1);
    opacity: 0;
  }
}

.particle-animation {
  animation-name: particle-animation;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite; 
}
*/
