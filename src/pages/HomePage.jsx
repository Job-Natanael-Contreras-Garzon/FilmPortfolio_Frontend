import React, { useEffect, useRef, useState, useContext } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/hero/Hero'
import VideoGallery from '../components/gallery/VideoGallery'
import ServiceSection from '../components/services/ServiceSection'
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel'
import SocialCounters from '../components/counters/SocialCounters'
import AboutUs from '../components/about/AboutUs'
import ContactSection from '../components/contact/ContactSection'
import ParticleBackground from '../components/common/ParticleBackground'
import { ThemeContext } from '../App'

const HomePage = () => {
  // Referencias a las secciones para animación
  const sectionRefs = useRef([])
  const galleryRef = useRef(null)
  const servicesRef = useRef(null)
  const testimonialsRef = useRef(null)
  const countersRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)
  
  // Estado de visibilidad para cada sección
  const [isGalleryVisible, setIsGalleryVisible] = useState(true) // Iniciar visible
  const [isServicesVisible, setIsServicesVisible] = useState(true) // Iniciar visible
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(true) // Iniciar visible
  const [isCountersVisible, setIsCountersVisible] = useState(true) // Iniciar visible
  const [isAboutVisible, setIsAboutVisible] = useState(true) // Iniciar visible
  const [isContactVisible, setIsContactVisible] = useState(true) // Iniciar visible
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    // Inicializa todas las secciones como visibles para solucionar el problema de componentes no visibles
    setIsGalleryVisible(true)
    setIsServicesVisible(true)
    setIsTestimonialsVisible(true)
    setIsCountersVisible(true)
    setIsAboutVisible(true)
    setIsContactVisible(true)
    
    // Resetea las referencias
    sectionRefs.current = sectionRefs.current.slice(0, 7)

    // Configuración del Intersection Observer con margen mayor para detectar elementos antes
    const observerOptions = {
      root: null, // viewport
      rootMargin: '100px', // Aumentado para detectar elementos antes de que entren completamente en la vista
      threshold: 0.1 // Reducido para activar con menor visibilidad
    }

    // Función de callback cuando las secciones entran/salen del viewport
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        // Cuando la sección entra en el viewport
        if (entry.isIntersecting) {
          if (entry.target === galleryRef.current) {
            setIsGalleryVisible(true)
          } else if (entry.target === servicesRef.current) {
            setIsServicesVisible(true)
          } else if (entry.target === testimonialsRef.current) {
            setIsTestimonialsVisible(true)
          } else if (entry.target === countersRef.current) {
            setIsCountersVisible(true)
          } else if (entry.target === aboutRef.current) {
            setIsAboutVisible(true)
          } else if (entry.target === contactRef.current) {
            setIsContactVisible(true)
          }
        }
        // Mantenermos los componentes visibles incluso cuando salen del viewport
      })
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    // Observa cada sección
    if (galleryRef.current) observer.observe(galleryRef.current)
    if (servicesRef.current) observer.observe(servicesRef.current)
    if (testimonialsRef.current) observer.observe(testimonialsRef.current)
    if (countersRef.current) observer.observe(countersRef.current)
    if (aboutRef.current) observer.observe(aboutRef.current)
    if (contactRef.current) observer.observe(contactRef.current)

    // Observa secciones adicionales
    sectionRefs.current.forEach((section) => observer.observe(section))

    return () => {
      // Limpieza al desmontar
      if (galleryRef.current) observer.unobserve(galleryRef.current)
      if (servicesRef.current) observer.unobserve(servicesRef.current)
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current)
      if (countersRef.current) observer.unobserve(countersRef.current)
      if (aboutRef.current) observer.unobserve(aboutRef.current)
      if (contactRef.current) observer.unobserve(contactRef.current)
      
      sectionRefs.current.forEach((section) => observer.unobserve(section))
    }
  }, [])

  // Función para agregar referencias
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  return (
    <main className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-50'} relative overflow-hidden transition-colors duration-500`}>
      {/* Fondo de partículas animadas */}
      <ParticleBackground />

      {/* Hero a pantalla completa */}
      <Hero />

      {/* Contenedor para scroll infinito con componentes flotantes */}
      <div className="continuous-scroll-container">
        {/* Galería de Videos */}
        <motion.section
          ref={galleryRef}
          id="videos"
          className={`continuous-section ${isGalleryVisible ? '' : 'section-hidden'}`}
          initial={{ opacity: 0, y: 100 }}
          animate={isGalleryVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="container-custom">
            <div className="floating-component p-8">
              <h2 className="text-3xl font-bold mb-10 text-center">
                <span className="text-gradient" data-text="Nuestros Trabajos">Nuestros Trabajos</span>
              </h2>
              <VideoGallery />
            </div>
          </div>
        </motion.section>

        {/* Servicios */}
        <motion.section
          ref={servicesRef}
          id="servicios"
          className={`continuous-section ${isServicesVisible ? '' : 'section-hidden'}`}
          initial={{ opacity: 0, y: 100 }}
          animate={isServicesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="container-custom">
            <div className="floating-component p-8">
              <h2 className="text-3xl font-bold mb-10 text-center">
                <span className="text-gradient" data-text="Servicios">Servicios</span>
              </h2>
              <ServiceSection />
            </div>
          </div>
        </motion.section>

        {/* Testimonios */}
        <motion.section
          ref={testimonialsRef}
          id="testimonios"
          className={`continuous-section ${isTestimonialsVisible ? '' : 'section-hidden'}`}
          initial={{ opacity: 0, y: 100 }}
          animate={isTestimonialsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="container-custom">
            <div className="floating-component p-8">
              <h2 className="text-3xl font-bold mb-10 text-center">
                <span className="text-gradient" data-text="Lo Que Dicen Nuestros Clientes">Lo Que Dicen Nuestros Clientes</span>
              </h2>
              <TestimonialCarousel />
            </div>
          </div>
        </motion.section>

        {/* Contadores sociales */}
        <motion.section
          ref={countersRef}
          id="contadores"
          className={`continuous-section ${isCountersVisible ? '' : 'section-hidden'}`}
          initial={{ opacity: 0, y: 100 }}
          animate={isCountersVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="container-custom">
            <div className="floating-component p-8">
              <h2 className="text-3xl font-bold mb-10 text-center">
                <span className="text-gradient" data-text="Nuestro Alcance">Nuestro Alcance</span>
              </h2>
              <SocialCounters />
            </div>
          </div>
        </motion.section>

        {/* Sobre Nosotros */}
        <motion.section
          ref={aboutRef}
          id="nosotros"
          className={`continuous-section ${isAboutVisible ? '' : 'section-hidden'}`}
          initial={{ opacity: 0, y: 100 }}
          animate={isAboutVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="container-custom">
            <div className="floating-component p-8">
              <h2 className="text-3xl font-bold mb-10 text-center">
                <span className="text-gradient" data-text="Sobre Nosotros">Sobre Nosotros</span>
              </h2>
              <AboutUs />
            </div>
          </div>
        </motion.section>

        {/* Contacto */}
        <motion.section
          ref={contactRef}
          id="contacto"
          className={`continuous-section ${isContactVisible ? '' : 'section-hidden'}`}
          initial={{ opacity: 0, y: 100 }}
          animate={isContactVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="container-custom">
            <div className="floating-component p-8">
              <h2 className="text-3xl font-bold mb-10 text-center">
                <span className="text-gradient" data-text="Contacto">Contacto</span>
              </h2>
              <ContactSection />
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}

export default HomePage
