import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaWhatsapp, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import ContactForm from './ContactForm'

const ContactSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
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
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
      }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
    >
      {/* Contact Info */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
        }}
      >
        <h3 className="heading-md mb-6">Ponte en Contacto</h3>
        <p className="text-gray-300 mb-8">
          ¿Tienes un proyecto en mente? Nos encantaría escuchar tus ideas y
          convertirlas en realidad. Completa el formulario o contáctanos
          directamente a través de WhatsApp o nuestras redes sociales.
        </p>
        
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/1234567890" // Replace with your actual WhatsApp number
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
              href="https://instagram.com/" // Replace with your actual Instagram
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
              href="https://tiktok.com/" // Replace with your actual TikTok
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
      </motion.div>
      
      {/* Contact Form */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
        }}
      >
        <ContactForm />
      </motion.div>
    </motion.div>
  )
}

export default ContactSection
