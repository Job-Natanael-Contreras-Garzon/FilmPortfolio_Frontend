import { useRef, useEffect, useContext } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { ThemeContext } from '../../App'
import ProjectShowcase from './ProjectShowcase'
import WhatsAppButton from '../common/WhatsAppButton'

const Hero = () => {
  const { theme } = useContext(ThemeContext)
  const containerRef = useRef(null)
  const controls = useAnimation()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Efectos de parallax 3D mejorados para el título y texto
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, -150])
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7])
  const titleRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 15])
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -25, -75])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.8, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 0.5, 0.8])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const videoBlur = useTransform(scrollYProgress, [0, 1], [0, 3])
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -50])
  
  // Manejo de animaciones
  useEffect(() => {
    
    // Añadir clase para el efecto de desplazamiento suave
    document.body.classList.add('smooth-scroll')
    
    // Iniciar secuencia de animación
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut', staggerChildren: 0.2 }
    })
    
    // Función para manejar el efecto de scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        // Cuando se comienza a hacer scroll
        controls.start({
          scale: 0.98,
          opacity: 0.9,
          transition: { duration: 0.3 }
        })
      } else {
        // Cuando se regresa al inicio
        controls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.3 }
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      document.body.classList.remove('smooth-scroll')
      window.removeEventListener('scroll', handleScroll)
    }
  }, [controls])
  
  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden" id="hero">
      {/* Showcase de proyectos con parallax */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ y: videoY }}
      >
        <ProjectShowcase />
      </motion.div>
      
      {/* Contenido central con efecto 3D mejorado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 perspective-1000">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={controls}
          transition={{ 
            duration: 1.2, 
            type: 'spring', 
            staggerChildren: 0.2,
            delayChildren: 0.3 
          }}
          style={{ 
            y: titleY,
            scale: titleScale,
            rotateX: titleRotateX,
            transformPerspective: 1200,
            transformStyle: 'preserve-3d'
          }}
          className="will-change-transform hero-content"
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient" data-text="FilmMaker">FilmMaker</span>{' '}
          </motion.h1>
          
          <motion.p 
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
            style={{ y: textY, opacity: textOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Director de Cine & Videógrafo especializado en producciones audiovisuales de alta calidad
          </motion.p>
          
          <motion.a 
            href="#videos" 
            className="modern-button relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="relative z-10">Ver Proyectos</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-pulse" 
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: 'reverse' 
              }}
            />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Indicador de scroll mejorado con efecto pulsante */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2.5, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.2 }}
        onClick={() => {
          document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        {/* Círculo pulsante detrás del ícono */}
        <motion.div 
          className="absolute inset-0 rounded-full -z-10"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(109, 40, 217, 0.4)',
            filter: "blur(8px)"
          }}
        />
        <FaChevronDown className={`text-3xl drop-shadow-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
      </motion.div>
    </div>
  )
}

// Componente Hero con WhatsApp integrado
const HeroWithWhatsApp = () => {
  return (
    <>
      <Hero />
      <WhatsAppButton phoneNumber="5491155555555" message="Hola, me interesa conocer más sobre tus servicios de producción audiovisual y branding." />
    </>
  )
}

// Solo exportamos el componente con WhatsApp
export default HeroWithWhatsApp
