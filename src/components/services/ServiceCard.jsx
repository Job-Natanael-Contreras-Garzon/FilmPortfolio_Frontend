import { useEffect, useState } from 'react'; // Import useState and useEffect
import PropTypes from 'prop-types';
import './ServiceCard.css';

const ServiceCard = ({ service, isVisible }) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isVisible && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isVisible, hasBeenVisible]);

  return (
    <div
      className={`service-card bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors h-full flex flex-col ${hasBeenVisible ? 'service-card-visible' : 'service-card-hidden'}`}
      style={{ transitionDelay: hasBeenVisible ? `${service.delay || 0}s` : '0s' }}
    >
      <div className="mb-4">
        {service.icon}
      </div>
      
      <h3 className="font-heading text-xl font-semibold mb-3">{service.title}</h3>
      
      <p className="text-gray-400 flex-grow">{service.description}</p>
      
      <div className="service-card-link-container mt-4 inline-block">
        <a href="#contacto" className="text-primary-500 hover:text-primary-400 font-medium">
          Cotizar servicio →
        </a>
      </div>
    </div>
  )
}

ServiceCard.propTypes = {
  isVisible: PropTypes.bool,
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    delay: PropTypes.number
  }).isRequired,
}

export default ServiceCard
