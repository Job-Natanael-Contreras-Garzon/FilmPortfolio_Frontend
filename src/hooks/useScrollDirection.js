import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar la dirección del scroll
 * @returns {{scrollDirection: string}} Dirección del scroll ('up' o 'down')
 */
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return { scrollDirection };
};

export default useScrollDirection;
