import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaYoutube, FaInstagram, FaTiktok, FaFacebookF, FaTwitter } from 'react-icons/fa';
import AnimatedCounter from './AnimatedCounter';
import useScrollDirection from '../../hooks/useScrollDirection';

// Datos reales de las redes sociales de Farid Dieck (Junio 2025)
const socialNetworksData = [
  {
    id: 1,
    platform: 'YouTube',
    icon: <FaYoutube className="text-4xl text-red-600 social-icon" />,
    count: 682000, // Valor real de suscriptores
    label: 'Suscriptores',
    link: 'https://www.youtube.com/@FaridDieckOficial'
  },
  {
    id: 2,
    platform: 'Instagram',
    icon: <FaInstagram className="text-4xl text-pink-500 social-icon" />,
    count: 921000, // Valor real de seguidores
    label: 'Seguidores',
    link: 'https://www.instagram.com/brandingbrothers.bo/'
  },
  {
    id: 3,
    platform: 'TikTok',
    icon: <FaTiktok className="text-4xl social-icon" />,
    count: 12400, // Valor real de seguidores
    label: 'Seguidores',
    link: 'https://www.tiktok.com/@brandingbrothers.bo?is_from_webapp=1&sender_device=pc'
  },
  {
    id: 4,
    platform: 'Facebook',
    icon: <FaFacebookF className="text-4xl text-blue-500 social-icon" />,
    count: 47300, // Valor real de seguidores
    label: 'Seguidores',
    link: 'https://www.facebook.com/faridieck'
  },
  {
    id: 5,
    platform: 'Twitter',
    icon: <FaTwitter className="text-4xl text-blue-400 social-icon" />,
    count: 31500, // Valor real de seguidores
    label: 'Seguidores',
    link: 'https://x.com/faridieck'
  }
];

const SocialCounters = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const [socialData, setSocialData] = useState(socialNetworksData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollDirection } = useScrollDirection();
  
  useEffect(() => {
    if (!inView) return;
    
    const refreshInterval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setSocialData(prevData => 
          prevData.map(network => {
            const variation = Math.floor(network.count * 0.005 * (Math.random() + 0.2));
            return {
              ...network,
              previousCount: network.count,
              count: network.count + variation
            };
          })
        );
        setTimeout(() => setIsUpdating(false), 1000); 
      }, 500);
    }, 60000);
    
    return () => clearInterval(refreshInterval);
  }, [inView]);
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    } else {
      setIsVisible(false); // Reset visibility for re-animation
    }
  }, [inView]);
  
  const containerBaseClass = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 social-counters-container";
  const containerVisibilityClass = isVisible ? 'container-visible' : 'container-hidden';
  const scrollDirClass = `scroll-dir-${scrollDirection}`;

  return (
    <div 
      ref={ref}
      className={`${containerBaseClass} ${containerVisibilityClass} ${scrollDirClass}`}
    >
      {socialData.map((item, index) => (
        <div
          key={item.id}
          className={`social-counter-item bg-black bg-opacity-40 rounded-lg p-8 text-center ${isVisible ? 'item-visible' : 'item-hidden'}`}
          style={{ transitionDelay: isVisible ? `${index * 0.1}s` : '0s' }} // Stagger effect
        >
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block social-counter-link"
          >
            <div className="flex justify-center mb-4 icon-container">
              {item.icon}
            </div>
            
            <div className={`font-heading font-bold text-4xl md:text-5xl mb-2 text-white overflow-hidden counter-value-wrapper ${isUpdating ? 'counter-updating' : ''}`}>
              {isUpdating ? (
                <div className="counter-value-animated-entry">
                  <AnimatedCounter value={item.count} duration={1000} />
                </div>
              ) : (
                <AnimatedCounter value={item.count} duration={1000} />
              )}
            </div>
            <p className="text-sm text-gray-400">{item.label} en {item.platform}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialCounters;
