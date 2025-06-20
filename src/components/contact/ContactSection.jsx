import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FaWhatsapp, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import './ContactSection.css';
import ContactForm from './ContactForm'

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  
  return (
    <div 
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 contact-section-container ${isVisible ? 'section-visible' : 'section-hidden'}`}
    >
      {/* Contact Info */}
      <div
        className={`contact-info-block ${isVisible ? 'content-visible' : 'content-hidden'}`}
      >
        <h3 className="heading-md mb-6">Ponte en Contacto</h3>
        <p className="text-gray-300 mb-8">
          ¿Tienes un proyecto en mente? Nos encantaría escuchar tus ideas y
          convertirlas en realidad. Completa el formulario o contáctanos
          directamente a través de WhatsApp o nuestras redes sociales.
        </p>
        
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/59178504107" // Replace with your actual WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full mb-6 transition-colors inline-block"
        >
          <FaWhatsapp className="mr-2 text-xl" />
          <span>Contactar por WhatsApp</span>
        </a>
        
        {/* Social Media */}
        <div className="mt-8">
          <h4 className="font-medium text-white mb-4">Síguenos en redes</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/brandingbrothers.bo/" // Replace with your actual Instagram
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 text-2xl transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com/" // Replace with your actual YouTube
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-600 text-2xl transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.tiktok.com/@brandingbrothers.bo?is_from_webapp=1&sender_device=pc" // Replace with your actual TikTok
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-2xl transition-colors"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
        
        {/* Business Hours */}
        <div className="mt-8">
          <h4 className="font-medium text-white mb-4">Horario de Atención</h4>
          <p className="text-gray-400">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
          <p className="text-gray-400">Sábados: 10:00 AM - 2:00 PM</p>
        </div>
      </div>
      
      {/* Contact Form */}
      <div
        className={`contact-form-block ${isVisible ? 'content-visible' : 'content-hidden'}`}
        style={{ transitionDelay: isVisible ? '0.2s' : '0s' }} // Apply delay only when becoming visible
      >
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactSection;
