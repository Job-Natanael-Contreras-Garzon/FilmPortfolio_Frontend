import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton = ({ phoneNumber = '123456789', message = 'Hola, me interesa conocer más sobre tus servicios de producción audiovisual.' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    
    // Calcular posición relativa del mouse dentro del botón
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Convertir a valores entre -1 y 1 para la rotación
    const rotX = ((y / rect.height) - 0.5) * 20 // Rotación X basada en posición Y
    const rotY = ((x / rect.width) - 0.5) * -20 // Rotación Y basada en posición X (invertida)
    
    setRotation({ x: rotX, y: rotY })
  }
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 })
  }
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }
  
  return (
    <motion.div
      ref={buttonRef}
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        resetRotation()
      }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease-out'
      }}
      whileTap={{ scale: 0.9 }}
    >
      <button
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        style={{
          boxShadow: isHovered 
            ? '0 10px 25px -5px rgba(37, 211, 102, 0.5), 0 8px 10px -6px rgba(37, 211, 102, 0.2), 0 0 15px rgba(37, 211, 102, 0.6)' 
            : '0 10px 15px -3px rgba(37, 211, 102, 0.3), 0 4px 6px -2px rgba(37, 211, 102, 0.1)'
        }}
        aria-label="Contactar por WhatsApp"
      >
        <div className="relative">
          <FaWhatsapp size={30} className="relative z-10" />
          
          {/* Efecto de brillo */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-white opacity-0"
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </div>
      </button>
      
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full right-0 mb-2 p-2 rounded bg-black/80 text-white text-sm whitespace-nowrap transform transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        Contáctame por WhatsApp
      </div>
    </motion.div>
  )
}

export default WhatsAppButton
