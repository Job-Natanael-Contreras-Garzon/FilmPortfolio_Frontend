import { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeContext } from '../../App'

// Datos de proyectos destacados
const featuredProjects = [
  {
    id: 1,
    title: "Campaña de Branding - Nexus Tech",
    description: "Identidad visual completa para empresa de tecnología",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1200&auto=format&fit=crop",
    category: "Branding",
  },
  {
    id: 2,
    title: "Serie documental - Orígenes",
    description: "Exploración visual de tradiciones culturales",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    category: "Documental",
  },
  {
    id: 3,
    title: "Publicidad - EcoLife",
    description: "Campaña para productos sostenibles",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1200&auto=format&fit=crop",
    category: "Publicidad",
  },
  {
    id: 4,
    title: "Branding - Fusion Restaurant",
    description: "Identidad para restaurante de alta cocina",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    category: "Branding",
  }
];

const ProjectShowcase = () => {
  const { theme } = useContext(ThemeContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Cambiar proyecto automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
          setIsTransitioning(false)
        }, 500) // Duración de la transición
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isTransitioning])

  // Navegación manual
  const goToProject = (index) => {
    if (currentIndex !== index && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setIsTransitioning(false)
      }, 500)
    }
  }
  
  const currentProject = featuredProjects[currentIndex]
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fondo de imagen con efecto de transición */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0 w-full h-full bg-center bg-cover"
            style={{ 
              backgroundImage: `url(${currentProject.image})`,
              filter: `brightness(${theme === 'dark' ? 0.6 : 0.8})`,
              transition: "filter 0.5s ease"
            }}
          />
          
          {/* Overlay con gradiente */}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-black/70 via-black/60 to-black/90' 
              : 'bg-gradient-to-b from-black/50 via-slate-900/40 to-gray-100/80'
          }`}></div>
        </motion.div>
      </AnimatePresence>
      
      {/* Información del proyecto actual con animación */}
      <div className="absolute bottom-20 left-0 w-full px-8 md:px-16 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className={`inline-block px-3 py-1 mb-4 text-sm rounded-full ${
              theme === 'dark' 
                ? 'bg-primary-500/30 text-primary-300' 
                : 'bg-primary-500/20 text-primary-700'
            }`}>
              {currentProject.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-md">
              {currentProject.title}
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-white'
            }`}>
              {currentProject.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navegación de proyectos */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center z-10">
        <div className="flex space-x-2">
          {featuredProjects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => goToProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-primary-500 w-8' 
                  : 'bg-gray-400/50 hover:bg-gray-300/70'
              }`}
              aria-label={`Ver proyecto ${project.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectShowcase
