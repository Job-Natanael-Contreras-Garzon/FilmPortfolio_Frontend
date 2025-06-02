import { useState, useEffect, createContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { LazyMotion, domAnimation } from 'framer-motion'
import HomePage from './pages/HomePage'
import CustomCursor from './components/common/CustomCursor'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

// Context para el tema (oscuro/claro)
export const ThemeContext = createContext()

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [theme, setTheme] = useState('dark') // 'dark' o 'light'
  
  // Cargar preferencia de tema al inicio
  useEffect(() => {
    // Intentar obtener el tema desde localStorage
    const savedTheme = localStorage.getItem('theme')
    // Si existe, aplicarlo. Si no, usar preferencia del sistema
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
    
    // Forzar la aplicación inmediata del tema correcto al cargar la página
    const currentTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    
    // Aplicar clases al cargar
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
    
    // También actualizar los atributos data-theme
    document.documentElement.setAttribute('data-theme', currentTheme)
    document.body.setAttribute('data-theme', currentTheme)
  }, [])

  // Cambiar entre modos oscuro y claro
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', newTheme)
    console.log('Tema cambiado a:', newTheme) // Log para depuración
  }

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Setup global event handlers for hover states
  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add hover state to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })
    
    return () => {
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])
  
  // Aplicar tema al documento
  useEffect(() => {
    // Aplicar la clase correspondiente al elemento body para controlar el tema
    if (theme === 'dark') {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
    
    // También actualizar el atributo data-theme para compatibilidad
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
    
    console.log('Clases aplicadas:', { 
      bodyClasses: document.body.className,
      htmlClasses: document.documentElement.className,
      currentTheme: theme 
    })
  }, [theme])
  
  // Este código se ha movido al otro useEffect que carga el tema al inicio

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LazyMotion features={domAnimation}>
        <div className={`app ${theme}`}>
          <Helmet>
            <title>Portafolio Audiovisual</title>
            <meta name="description" content="Portfolio audiovisual con trabajos de alta calidad en video" />
            <meta name="keywords" content="video, producción, audiovisual, portfolio, cine, edición" />
            <meta name="author" content="Film Portfolio" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href="https://filmportfolio.com" />
          </Helmet>
          
          <CustomCursor position={cursorPosition} isHovering={isHovering} theme={theme} />
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="scroll-smooth">
            <HomePage />
          </main>
          <Footer />
        </div>
      </LazyMotion>
    </ThemeContext.Provider>
  )
}

export default App
