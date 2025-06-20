import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import './Header.css'
import { ThemeContext } from '../../App'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  // Log para depuración - verificar que el contexto se está recibiendo correctamente
  useEffect(() => {
    console.log('Header recibió contexto de tema:', { theme, toggleThemeExists: !!toggleTheme })
  }, [theme, toggleTheme])
  
  // Handle scroll event to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  // Navigation links
  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Portafolio', href: '/portfolio' },
    { name: 'Videos', href: '#videos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Testimonios', href: '#testimonios' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' }
  ]
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 
          theme === 'dark' ? 'bg-black/70 backdrop-blur-xl py-3 shadow-lg shadow-primary-500/10' : 'bg-white/70 backdrop-blur-xl py-3 shadow-lg shadow-primary-500/10' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="relative z-50">
          <h1 className="font-heading font-bold text-2xl">
            <span className="text-gradient" data-text="Film">BranDing</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>BroThers</span>
          </h1>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.href}
                  className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} hover:text-primary-400 transition-colors`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              {/* Botón para cambiar el tema (claro/oscuro) */}
              <button
                onClick={() => {
                  console.log('Botón de tema clickeado, tema actual:', theme)
                  toggleTheme()
                }}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${theme === 'dark' ? 'bg-primary-500/20 hover:bg-primary-500/30 text-white' : 'bg-primary-500/10 hover:bg-primary-500/20 text-gray-900'}`}
                aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                data-theme-toggle="true"
              >
                <div className={`theme-icon-container ${theme === 'dark' ? 'rotate-dark' : 'rotate-light'}`}>
                  {theme === 'dark' ? 
                    <FaSun className="text-yellow-300" /> : 
                    <FaMoon className="text-primary-500" />}
                </div>
              </button>
            </li>
            <li>
              <a 
                href="#contacto" 
                className="btn-modern ml-4"
              >
                Cotizar Proyecto
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-50 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className={`mobile-menu-overlay ${isMobileMenuOpen ? 'mobile-menu-open' : ''} ${theme === 'dark' ? 'bg-black/95' : 'bg-white/95'}`}
          >
            <nav>
              <ul className="flex flex-col items-center space-y-6">
                {navLinks.map((link, index) => (
                  <li 
                    key={link.name}
                    className={`mobile-menu-item ${isMobileMenuOpen ? 'mobile-menu-item-visible' : ''}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <Link 
                      to={link.href}
                      className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'} hover:text-primary-400 transition-colors`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                
                {/* Botón de tema en versión móvil */}
                <li 
                  className={`mobile-menu-item ${isMobileMenuOpen ? 'mobile-menu-item-visible' : ''}`}
                  style={{ transitionDelay: `${navLinks.length * 0.1}s` }}
                >
                  <button
                    onClick={() => {
                      toggleTheme()
                      // Opcional: cerrar menú al cambiar tema
                      // setIsMobileMenuOpen(false)
                    }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ${theme === 'dark' ? 'bg-primary-500/20 hover:bg-primary-500/30 text-white' : 'bg-primary-500/10 hover:bg-primary-500/20 text-gray-900'}`}
                    aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                  >
                    <div className={`theme-icon-container ${theme === 'dark' ? 'rotate-dark' : 'rotate-light'}`}>
                      {theme === 'dark' ? 
                        <FaSun className="text-xl text-yellow-300" /> : 
                        <FaMoon className="text-xl text-primary-500" />}
                    </div>
                  </button>
                </li>
                <li 
                  className={`mobile-menu-item ${isMobileMenuOpen ? 'mobile-menu-item-visible' : ''}`}
                  style={{ transitionDelay: `${(navLinks.length + 1) * 0.1}s` }}
                >
                  <a 
                    href="#contacto" 
                    className="btn-primary mt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cotizar Proyecto
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
