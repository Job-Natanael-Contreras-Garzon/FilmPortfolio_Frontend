import { useRef, useEffect, useContext, useState } from 'react';
import { ThemeContext } from '../../App';

const ParticleBackground = () => {
  const { theme } = useContext(ThemeContext);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Configuración de partículas según el tema
  const particleConfig = {
    dark: {
      count: 50,
      color: [
        'rgba(139, 92, 246, 0.6)', // Púrpura
        'rgba(6, 182, 212, 0.5)',  // Cian
        'rgba(167, 139, 250, 0.4)', // Púrpura claro
        'rgba(79, 70, 229, 0.5)'   // Índigo
      ],
      size: { min: 1, max: 3 },
      speed: { min: 0.1, max: 0.3 },
      glow: true
    },
    light: {
      count: 40,
      color: [
        'rgba(109, 40, 217, 0.3)', // Púrpura oscuro
        'rgba(8, 145, 178, 0.25)',  // Cian oscuro
        'rgba(124, 58, 237, 0.2)',  // Púrpura medio
        'rgba(67, 56, 202, 0.3)'    // Índigo oscuro
      ],
      size: { min: 1, max: 2.5 },
      speed: { min: 0.05, max: 0.2 },
      glow: false
    }
  };

  useEffect(() => {
    // Mostrar el canvas después de un breve retraso para la transición de opacidad
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Pequeño retraso para que la transición CSS se active
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Crear partículas
    const createParticles = () => {
      const config = theme === 'dark' ? particleConfig.dark : particleConfig.light;
      particlesRef.current = [];
      
      for (let i = 0; i < config.count; i++) {
        const colorIndex = Math.floor(Math.random() * config.color.length);
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * (config.size.max - config.size.min) + config.size.min,
          color: config.color[colorIndex],
          speedX: (Math.random() - 0.5) * config.speed.max * (Math.random() < 0.5 ? 1 : -1), // Dirección aleatoria
          speedY: (Math.random() - 0.5) * config.speed.max * (Math.random() < 0.5 ? 1 : -1), // Dirección aleatoria
          glow: config.glow
        });
      }
    };

    // Ajustar tamaño del canvas
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Recrear partículas en resize para ajustar a nuevas dimensiones si es necesario
      createParticles(); 
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Llamada inicial
    
    // Animar partículas
    const animate = () => {
      if (!canvasRef.current) return; // Asegurarse que el canvas existe
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach(particle => {
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        
        if (particle.glow) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        
        // Mover partícula
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebote en los bordes con margen para evitar que se atasquen
        if (particle.x - particle.radius < 0 || particle.x + particle.radius > width) particle.speedX *= -1;
        if (particle.y - particle.radius < 0 || particle.y + particle.radius > height) particle.speedY *= -1;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    createParticles(); // Crear partículas inicialmente
    if (animationRef.current) cancelAnimationFrame(animationRef.current); // Limpiar animación anterior si existe
    animate();
    
    // Limpiar al desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]); // Se vuelve a ejecutar si cambia el tema para recrear partículas y reiniciar animación
  
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out'
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
    </div>
  );
};

export default ParticleBackground;
