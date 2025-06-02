import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCheck } from 'react-icons/fa'

const AboutUs = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false // Cambiar a false para permitir animaciones múltiples
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
  
  // List of features/benefits
  const features = [
    'Equipo especializado en cinematografía digital',
    'Más de 10 años de experiencia en producción audiovisual',
    'Uso de tecnología 8K y drones de última generación',
    'Enfoque narrativo en cada proyecto',
    'Postproducción avanzada con color grading profesional',
    'Entregas en tiempo récord sin sacrificar calidad'
  ]
  
  // Variantes adaptadas a la dirección del scroll
  const containerVariants = {
    hidden: (custom) => ({
      opacity: 0,
      y: scrollDirection === 'up' ? -30 : 30
    }),
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  // Variantes para los elementos de la izquierda (imagen)
  const leftItemVariants = {
    hidden: (custom) => ({
      opacity: 0,
      x: -50,
      y: scrollDirection === 'up' ? -50 : 50
    }),
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 12 
      }
    }
  }
  
  // Variantes para los elementos de la derecha (texto)
  const rightItemVariants = {
    hidden: (custom) => ({
      opacity: 0,
      x: 50,
      y: scrollDirection === 'up' ? -50 : 50
    }),
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 12 
      }
    }
  }
  
  // Variantes para los elementos de la lista de características
  const featureItemVariants = {
    hidden: (custom) => ({
      opacity: 0,
      x: custom % 2 === 0 ? -20 : 20,
      y: scrollDirection === 'up' ? -20 : 20
    }),
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { 
        delay: 0.2 + (custom * 0.1),
        duration: 0.5
      }
    })
  }
  
  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      {/* Image Section */}
      <motion.div
        variants={leftItemVariants}
        className="relative"
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
      </motion.div>
      
      {/* Content Section */}
      <motion.div
        variants={rightItemVariants}
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
            <motion.div 
              key={index}
              custom={index}
              variants={featureItemVariants}
              className="flex items-start"
            >
              <span className="text-primary-500 mr-2 mt-1">
                <FaCheck />
              </span>
              <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } }
          }}
        >
          <a href="#contacto" className="btn-primary">
            Trabajemos Juntos
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default AboutUs
