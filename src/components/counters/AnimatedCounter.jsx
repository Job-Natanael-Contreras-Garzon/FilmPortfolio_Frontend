import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import PropTypes from 'prop-types'

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  // Animate counter when in view
  useEffect(() => {
    if (!inView) return
    
    let start = 0
    const end = value
    
    // Calculate increment per frame to finish in duration
    const totalFrames = Math.min(end, 60)
    const incrementPerFrame = Math.ceil(end / totalFrames)
    
    // Use requestAnimationFrame for smooth animation
    let animationFrameId
    
    // Calculate time per frame
    const timePerFrame = duration / totalFrames
    let lastFrameTime = 0
    
    const animate = (timestamp) => {
      if (!lastFrameTime) lastFrameTime = timestamp
      
      const deltaTime = timestamp - lastFrameTime
      
      if (deltaTime >= timePerFrame) {
        start = Math.min(start + incrementPerFrame, end)
        setCount(start)
        lastFrameTime = timestamp
      }
      
      if (start < end) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }
    
    animationFrameId = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationFrameId)
  }, [inView, value, duration])
  
  return <span ref={ref}>{formatNumber(count)}</span>
}

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number
}

export default AnimatedCounter
