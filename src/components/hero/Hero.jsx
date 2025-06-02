import React, { useRef, useEffect, useContext, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

// Importar ThemeContext desde App
import { ThemeContext } from '../../App'

// ProjectShowcase optimizado para responsive
const ProjectShowcase = () => {
  const [currentProject, setCurrentProject] = useState(0)
  
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
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const current = projects[currentProject]

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        key={current.id}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${current.image})`,
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      {/* Overlay gradient - más sutil en mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 md:from-black/30 md:via-black/40 md:to-black/60" />
      
      {/* Project Info - Posicionado para no interferir con el hero */}
      <motion.div 
        className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:max-w-md z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Category Badge */}
        <motion.div 
          className="inline-block px-3 py-1 mb-2 text-xs font-medium text-white bg-purple-600/80 rounded-full backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          {current.category}
        </motion.div>
        
        {/* Project Title */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight">
          {current.title}
        </h3>
        
        {/* Project Subtitle */}
        <p className="text-sm md:text-base text-gray-200/90 leading-relaxed">
          {current.subtitle}
        </p>
      </motion.div>

      {/* Indicators */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex space-x-2 z-10">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentProject 
                ? 'bg-purple-500 w-6' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentProject(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}

// WhatsApp Button optimizado
const WhatsAppButton = ({ phoneNumber, message }) => (
  <motion.div 
    className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 200 }}
  >
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1, boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)" }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>
    </motion.a>
  </motion.div>
)

const Hero = () => {
  const { theme } = useContext(ThemeContext)
  const containerRef = useRef(null)
  const controls = useAnimation()
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Detectar si es mobile
  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Parallax effects - más sutiles en mobile
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, isMobile ? -20 : -50, isMobile ? -60 : -150])
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, isMobile ? 0.98 : 0.95, isMobile ? 0.95 : 0.8])
  const titleRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, isMobile ? 1 : 3, isMobile ? 3 : 8])
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [0, isMobile ? -15 : -25, isMobile ? -40 : -75])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.8, 0])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.02 : 1.05])
  const videoY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -15 : -30])
  
  const handleScroll = useCallback(() => {
    if (!isClient) return
    
    const scrollPosition = window.scrollY
    if (scrollPosition > 10) {
      controls.start({
        scale: isMobile ? 0.99 : 0.98,
        opacity: 0.95,
        transition: { duration: 0.3, ease: 'easeOut' }
      })
    } else {
      controls.start({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' }
      })
    }
  }, [controls, isClient, isMobile])

  useEffect(() => {
    if (!isClient) return

    controls.start({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.2, 0.8, 0.2, 1],
        staggerChildren: 0.2 
      }
    })
    
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [controls, handleScroll, isClient])

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden" 
      id="hero"
    >
      {/* Background Showcase */}
      <motion.div 
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ 
          y: videoY,
          scale: videoScale,
        }}
      >
        <ProjectShowcase />
      </motion.div>
      
      {/* Main Content Container - Optimizado para responsive */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
        {/* Content wrapper con mejor spacing responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          className="will-change-transform w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ 
            y: titleY,
            scale: titleScale,
            rotateX: titleRotateX,
            transformPerspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Main Title - Responsive sizing mejorado */}
          <motion.h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-3 sm:mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.2, 0.8, 0.2, 1]
            }}
          >
            <span 
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '900'
              }}
            >
              FilmMaker
            </span>
          </motion.h1>
          
          {/* Description - Mejor legibilidad en mobile */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed font-medium px-2"
            style={{ 
              y: textY, 
              opacity: textOpacity,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              color: 'rgba(255, 255, 255, 0.95)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.2, 0.8, 0.2, 1]
            }}
          >
            Director de Cine & Videógrafo especializado en producciones audiovisuales de alta calidad
          </motion.p>
          
          {/* CTA Button - Responsive sizing */}
          <motion.button 
            onClick={() => scrollToSection('videos')}
            className="group relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-xl transition-all duration-300 text-sm sm:text-base"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.2, 0.8, 0.2, 1]
              }
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Ver Proyectos
              <motion.span
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                →
              </motion.span>
            </span>
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 1
              }}
            />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator - Mejorado para mobile */}
      <motion.button 
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 p-2 sm:p-3 rounded-full transition-all duration-300 hover:bg-white/10"
        animate={{ 
          y: [0, 6, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "easeInOut" 
        }}
        whileHover={{ 
          scale: 1.1,
          backgroundColor: 'rgba(255,255,255,0.1)'
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scrollToSection('videos')}
        aria-label="Desplazarse a la sección de videos"
      >
        <FaChevronDown 
          className="text-xl sm:text-2xl text-white/90 hover:text-white transition-colors"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}
        />
        
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-white/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Mock section for scroll demo */}
      <div id="videos" className="absolute top-full w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl md:text-3xl font-bold text-center px-4">
          Sección de Videos
        </div>
      </div>
    </div>
  )
}

// Main component
const HeroWithWhatsApp = () => {
  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      <div className="bg-black min-h-screen">
        <Hero />
        <WhatsAppButton 
          phoneNumber="5491155555555" 
          message="Hola, me interesa conocer más sobre tus servicios de producción audiovisual y branding." 
        />
      </div>
    </ThemeContext.Provider>
  )
}

export default HeroWithWhatsApp