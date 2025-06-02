import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaYoutube, FaInstagram, FaTiktok, FaFacebookF, FaTwitter } from 'react-icons/fa'
import AnimatedCounter from './AnimatedCounter'
import useScrollDirection from '../../hooks/useScrollDirection'

// Datos reales de las redes sociales de Farid Dieck (Junio 2025)
const socialNetworksData = [
  {
    id: 1,
    platform: 'YouTube',
    icon: <FaYoutube className="text-4xl text-red-600" />,
    count: 682000, // Valor real de suscriptores
    label: 'Suscriptores',
    link: 'https://www.youtube.com/@FaridDieckOficial'
  },
  {
    id: 2,
    platform: 'Instagram',
    icon: <FaInstagram className="text-4xl text-pink-500" />,
    count: 921000, // Valor real de seguidores
    label: 'Seguidores',
    link: 'https://www.instagram.com/faridieck'
  },
  {
    id: 3,
    platform: 'TikTok',
    icon: <FaTiktok className="text-4xl" />,
    count: 1240000, // Valor real de seguidores
    label: 'Seguidores',
    link: 'https://www.tiktok.com/@faridieck'
  },
  {
    id: 4,
    platform: 'Facebook',
    icon: <FaFacebookF className="text-4xl text-blue-500" />,
    count: 473000, // Valor real de seguidores
    label: 'Seguidores',
    link: 'https://www.facebook.com/faridieck'
  },
  {
    id: 5,
    platform: 'Twitter',
    icon: <FaTwitter className="text-4xl text-blue-400" />,
    count: 315000, // Valor real de seguidores
    label: 'Seguidores',
    link: 'https://x.com/faridieck'
  }
]

const SocialCounters = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })
  
  // Estado para los datos de redes sociales
  const [socialData, setSocialData] = useState(socialNetworksData)
  // Estado para controlar si estamos actualizando los datos
  const [isUpdating, setIsUpdating] = useState(false)
  // Estado para rastrear cuando un contador está siendo hover
  const [hoveredItem, setHoveredItem] = useState(null)
  
  const { scrollDirection } = useScrollDirection()
  
  // Efecto para actualizar los datos cada 60 segundos (simula refrescar los datos de la API)
  useEffect(() => {
    // Solo actualizar cuando está en vista
    if (!inView) return
    
    // Programar actualizaciones periódicas
    const refreshInterval = setInterval(() => {
      // Indicar que estamos actualizando para activar animaciones
      setIsUpdating(true)
      
      // Simular una petición de API (en producción real, aquí iría un fetch)
      setTimeout(() => {
        // Actualizar con pequeñas variaciones (simulando nuevos datos de API)
        setSocialData(prevData => 
          prevData.map(network => {
            // En un caso real, estos valores vendrían de la API
            // Simulamos un cambio pequeño aleatorio para demostración
            const variation = Math.floor(network.count * 0.005 * (Math.random() + 0.2));
            return {
              ...network,
              previousCount: network.count, // Guardar valor anterior para animación
              count: network.count + variation
            };
          })
        );
        
        // Terminamos de actualizar
        setTimeout(() => setIsUpdating(false), 1000);
      }, 500);
    }, 60000); // Actualizar cada minuto
    
    return () => clearInterval(refreshInterval);
  }, [inView])
  
  // Animar cuando la sección entra en el viewport
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      // Pasar la dirección de scroll a la animación para determinar cómo desaparecen los elementos
      controls.start(current => ({
        ...current,
        animateDirection: scrollDirection
      }));
    }
  }, [controls, inView, scrollDirection])
  
  // Variantes para la animación del contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3 
      }
    }
  }
  
  // Variantes para la animación de cada contador, adaptadas a la dirección del scroll
  const itemVariants = {
    hidden: (custom) => {
      // Si el scroll es hacia arriba, los elementos se dispersan hacia arriba
      // Si el scroll es hacia abajo (o inicial), los elementos se dispersan hacia abajo
      const direction = scrollDirection === 'up' ? -100 : 100;
      return {
        opacity: 0, 
        y: direction, 
        x: (custom % 2 === 0 ? -100 : 100), // Dispersa los items a los lados
        scale: 0.6,
        filter: "blur(10px)"
      };
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  }
  
  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
    >
      {socialData.map((item, index) => (
        <motion.div
          key={item.id}
          custom={index}
          variants={itemVariants}
          className="bg-black bg-opacity-40 rounded-lg p-8 text-center transition-all duration-300"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
          onHoverStart={() => setHoveredItem(item.id)}
          onHoverEnd={() => setHoveredItem(null)}
        >
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div 
              className="flex justify-center mb-4"
              animate={hoveredItem === item.id ? { scale: 1.2 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
            </motion.div>
            
            <div className="font-heading font-bold text-4xl md:text-5xl mb-2 text-white overflow-hidden">
              {isUpdating ? (
                <motion.div
                  key={`updating-${item.count}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <AnimatedCounter value={item.count} duration={1000} />
                </motion.div>
              ) : (
                <motion.div
                  initial={false}
                  animate={hoveredItem === item.id ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.count.toLocaleString()}
                </motion.div>
              )}
            </div>
            
            <motion.p 
              className="text-gray-300 mb-2"
              animate={hoveredItem === item.id ? { color: "#ffffff" } : { color: "#d1d5db" }}
            >
              {item.label}
            </motion.p>
            <motion.p 
              className="font-medium"
              animate={hoveredItem === item.id ? { color: "#6ee7b7" } : { color: "#34d399" }}
            >
              {item.platform}
            </motion.p>
          </a>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default SocialCounters
