import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../App';
import './ProjectShowcase.css';

// Datos de proyectos destacados
const featuredProjects = [
  {
    id: 1,
    title: "Campaña de Branding - Nexus Tech",
    description: "Identidad visual completa para empresa de tecnología",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1200&auto=format&fit=crop",
    category: "Branding",
  },
  {
    id: 2,
    title: "Serie documental - Orígenes",
    description: "Exploración visual de tradiciones culturales",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    category: "Documental",
  },
  {
    id: 3,
    title: "Publicidad - EcoLife",
    description: "Campaña para productos sostenibles",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1200&auto=format&fit=crop",
    category: "Publicidad",
  },
  {
    id: 4,
    title: "Branding - Fusion Restaurant",
    description: "Identidad para restaurante de alta cocina",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    category: "Branding",
  }
];

const ProjectShowcase = () => {
  const { theme } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevIndex, setPrevIndex] = useState(null); // Para animar la salida de la imagen anterior

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setPrevIndex(currentIndex);
        setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
        // La duración de la transición se maneja con CSS
        setTimeout(() => {
          setIsTransitioning(false);
          setPrevIndex(null); // Limpiar prevIndex después de la transición
        }, 1200); // Coincidir con la duración de la animación CSS más larga (ej. imagen)
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isTransitioning, currentIndex]);

  const goToProject = (index) => {
    if (currentIndex !== index && !isTransitioning) {
      setIsTransitioning(true);
      setPrevIndex(currentIndex);
      setCurrentIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
        setPrevIndex(null);
      }, 1200);
    }
  };
  
  const currentProject = featuredProjects[currentIndex];
  const previousProject = prevIndex !== null ? featuredProjects[prevIndex] : null;

  // Clases para la animación de la imagen
  const getImageClasses = (project, isCurrent) => {
    let classes = 'absolute inset-0 w-full h-full bg-center bg-cover showcase-bg-image';
    if (isTransitioning) {
      if (isCurrent) {
        classes += ' image-entering'; // Entrando
      } else if (project && previousProject && project.id === previousProject.id) {
        classes += ' image-exiting'; // Saliendo
      }
    } else if (isCurrent) {
      classes += ' image-active'; // Activa y visible
    }
    return classes;
  };

  // Clases para la animación de la información
  const getInfoClasses = () => {
    let classes = 'max-w-4xl showcase-info-content';
    if (isTransitioning) {
      classes += ' info-exiting'; // Asumimos que la info vieja sale y la nueva entra
    } else {
      classes += ' info-active';
    }
    return classes;
  };

  return (
    <div className="absolute inset-0 overflow-hidden showcase-container">
      {/* Contenedor para las imágenes (actual y previa durante la transición) */}
      <div className="absolute inset-0 w-full h-full">
        {previousProject && isTransitioning && (
          <div
            key={`prev-${previousProject.id}`}
            className={getImageClasses(previousProject, false)}
            style={{
              backgroundImage: `url(${previousProject.image})`,
              filter: `brightness(${theme === 'dark' ? 0.6 : 0.8})`,
            }}
          />
        )}
        <div
          key={currentProject.id}
          className={getImageClasses(currentProject, true)}
          style={{
            backgroundImage: `url(${currentProject.image})`,
            filter: `brightness(${theme === 'dark' ? 0.6 : 0.8})`,
            transition: "filter 0.5s ease" // Mantener transición de filtro
          }}
        />
      </div>
      
      {/* Overlay con gradiente */}
      <div className={`absolute inset-0 ${ 
        theme === 'dark' 
          ? 'bg-gradient-to-b from-black/70 via-black/60 to-black/90' 
          : 'bg-gradient-to-b from-black/50 via-slate-900/40 to-gray-100/80'
      } showcase-gradient-overlay`}></div>
      
      {/* Información del proyecto actual con animación */}
      <div className="absolute bottom-20 left-0 w-full px-8 md:px-16 z-10 showcase-info-container">
        {/* Se renderiza solo la info actual, la animación de entrada/salida se maneja con una key y CSS */}
        <div
          key={currentProject.id} // Key para forzar re-render y animación en cambio de info
          className={getInfoClasses()}
        >
          <span className={`inline-block px-3 py-1 mb-4 text-sm rounded-full ${ 
            theme === 'dark' 
              ? 'bg-primary-500/30 text-primary-300' 
              : 'bg-primary-500/20 text-primary-700'
          } showcase-category-badge`}>
            {currentProject.category}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-md showcase-title">
            {currentProject.title}
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl ${ 
            theme === 'dark' ? 'text-gray-300' : 'text-white'
          } showcase-description`}>
            {currentProject.description}
          </p>
        </div>
      </div>
      
      {/* Navegación de proyectos */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center z-10 showcase-navigation">
        <div className="flex space-x-2">
          {featuredProjects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => goToProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${ 
                currentIndex === index 
                  ? 'bg-primary-500 w-8' 
                  : 'bg-gray-400/50 hover:bg-gray-300/70'
              } showcase-nav-button`}
              aria-label={`Ver proyecto ${project.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
