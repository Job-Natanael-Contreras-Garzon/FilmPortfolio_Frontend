import { useContext } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { ThemeContext } from '../../App'

const CustomCursor = ({ position, isHovering }) => {
  const { theme } = useContext(ThemeContext)
  
  // Colores basados en el tema
  const ringColor = theme === 'dark' 
    ? 'rgba(139, 92, 246, 0.6)' // Púrpura para modo oscuro
    : 'rgba(109, 40, 217, 0.5)' // Púrpura más oscuro para modo claro
  
  const dotColor = theme === 'dark'
    ? 'rgba(255, 255, 255, 0.9)' // Blanco para modo oscuro
    : 'rgba(15, 23, 42, 0.8)' // Casi negro para modo claro
  
  const glowColor = theme === 'dark'
    ? '0 0 15px rgba(139, 92, 246, 0.5)' // Resplandor púrpura para modo oscuro
    : '0 0 10px rgba(109, 40, 217, 0.4)' // Resplandor púrpura para modo claro
  
  return (
    <motion.div
      className="fixed pointer-events-none z-50 flex items-center justify-center"
      style={{
        left: position.x,
        top: position.y,
        x: '-50%',
        y: '-50%'
      }}
    >
      {/* Cursor exterior (anillo con gradiente) */}
      <motion.div
        style={{
          borderColor: ringColor,
          boxShadow: glowColor,
          background: isHovering ? 'transparent' : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
        }}
        className="rounded-full border-2 backdrop-blur-sm transition-colors duration-300"
        animate={{
          width: isHovering ? 70 : 40,
          height: isHovering ? 70 : 40,
          opacity: isHovering ? 0.9 : 0.7,
          rotate: isHovering ? 45 : 0,
          borderWidth: isHovering ? '2px' : '1.5px'
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
      
      {/* Cursor interior (punto) */}
      <motion.div
        style={{
          backgroundColor: dotColor,
          boxShadow: isHovering ? glowColor : 'none',
        }}
        className="absolute rounded-full transition-colors duration-300"
        animate={{
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
          opacity: isHovering ? 1 : 0.8,
          scale: isHovering ? 1.2 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20
        }}
      />
      
      {/* Partículas que siguen al cursor cuando se hace hover */}
      {isHovering && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: ringColor,
                width: 4,
                height: 4,
              }}
              animate={{
                x: Math.random() * 60 - 30,
                y: Math.random() * 60 - 30,
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}

CustomCursor.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  isHovering: PropTypes.bool.isRequired
}

export default CustomCursor
