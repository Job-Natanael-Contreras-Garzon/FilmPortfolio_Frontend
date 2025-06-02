import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const ServiceCard = ({ service }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: service.delay || 0 
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors h-full flex flex-col"
    >
      <div className="mb-4">
        {service.icon}
      </div>
      
      <h3 className="font-heading text-xl font-semibold mb-3">{service.title}</h3>
      
      <p className="text-gray-400 flex-grow">{service.description}</p>
      
      <motion.div 
        className="mt-4 inline-block"
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <a href="#contacto" className="text-primary-500 hover:text-primary-400 font-medium">
          Cotizar servicio →
        </a>
      </motion.div>
    </motion.div>
  )
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    delay: PropTypes.number
  }).isRequired
}

export default ServiceCard
