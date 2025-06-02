import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ServiceCard from './ServiceCard'
import { FaVideo, FaEdit, FaPencilRuler, FaMicrophone, FaFilm, FaPhotoVideo } from 'react-icons/fa'

// Mock data for services - would be replaced with real data from an API in production
const servicesData = [
  {
    id: 1,
    title: 'Videografía',
    description: 'Capturamos tu visión con filmación en 4K/8K usando equipos de última generación para lograr la estética visual perfecta.',
    icon: <FaVideo className="text-4xl text-primary-500" />,
    delay: 0.1
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
]

const ServiceSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })
  
  // Estado para rastrear la dirección del scroll
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  
  // Detectar dirección del scroll
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
  
  // Animar cuando la sección entra o sale del viewport, considerando la dirección del scroll
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start(current => ({
        ...current,
        animateDirection: scrollDirection
      }));
    }
  }, [controls, inView, scrollDirection])
  
  const containerVariants = {
    hidden: (custom) => ({
      opacity: 0,
      y: scrollDirection === 'up' ? -20 : 20
    }),
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.1,
        duration: 0.8 
      }
    }
  }
  
  const cardVariants = {
    hidden: (i) => { 
      // Dependiendo de la dirección del scroll, los elementos se dispersan de forma diferente
      const yDirection = scrollDirection === 'up' ? -100 : 100;
      const xDirection = i % 3 === 0 ? -100 : i % 3 === 1 ? 0 : 100; // Distribución en 3 columnas
      const rotation = scrollDirection === 'up' ? 10 : -10;
      
      return {
        opacity: 0, 
        x: xDirection,
        y: yDirection,
        rotateZ: rotation,
        scale: 0.8,
        filter: "blur(5px)"
      };
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotateZ: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 10,
        delay: i * 0.15
      }
    }),
    exit: (i) => {
      // Animación de salida también adaptada a la dirección de scroll
      const yDirection = scrollDirection === 'up' ? 100 : -100;
      const rotation = scrollDirection === 'up' ? -5 : 5;
      
      return {
        opacity: 0,
        y: yDirection,
        rotateZ: rotation,
        filter: "blur(5px)",
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: i * 0.08
        }
      };
    }
  }
  
  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
    >
      {servicesData.map((service, index) => (
        <motion.div 
          key={service.id}
          custom={index}
          variants={cardVariants}
          className="preserve-3d will-change-transform"
          whileHover={{ 
            scale: 1.03, 
            rotateY: 5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <ServiceCard key={service.id} service={service} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ServiceSection
