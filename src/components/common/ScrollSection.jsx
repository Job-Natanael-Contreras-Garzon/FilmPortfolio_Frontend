import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PropTypes from 'prop-types'

const ScrollSection = ({ children, className, threshold = 0.1, variants }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: threshold,
    triggerOnce: true
  })
  
  // Default animation variants
  const defaultVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6
      }
    }
  }
  
  // Use provided variants or default
  const animationVariants = variants || defaultVariants
  
  // Animate when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  
  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

ScrollSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  threshold: PropTypes.number,
  variants: PropTypes.object
}

export default ScrollSection
