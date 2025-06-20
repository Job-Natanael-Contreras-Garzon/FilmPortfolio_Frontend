import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import PropTypes from 'prop-types'

const ScrollSection = ({ children, className, threshold = 0.1}) => {
  const [ref, inView] = useInView({
    threshold: threshold,
    triggerOnce: false
  });
  const [isVisible, setIsVisible] = useState(false);

  // Default animation properties (to be handled by CSS)
  // const defaultVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: { 
  //     opacity: 1, 
  //     y: 0,
  //     transition: { 
  //       duration: 0.6
  //     }
  //   }
  // };
  
  // Note: The 'variants' prop for custom animations is more complex to replicate 
  // with pure CSS in a generic way. This refactor focuses on the default fade-in-up effect.
  // Custom 'variants' might need specific CSS or a different approach.

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  
  // Combine provided className with animation classes
  const combinedClassName = `scroll-section-base ${className || ''} ${isVisible ? 'is-visible' : 'is-hidden'}`;

  return (
    <div 
      ref={ref}
      className={combinedClassName}
    >
      {children}
    </div>
  );
};

ScrollSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  threshold: PropTypes.number,
  variants: PropTypes.object // Kept for prop validation, but functionality is limited in this refactor
};

export default ScrollSection;
