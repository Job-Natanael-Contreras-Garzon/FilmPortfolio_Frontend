import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import YouTubeCard from './YouTubeCard'
import ModalYouTube from './ModalYouTube'

// Datos reales para videos utilizando los recursos proporcionados
const videosData = [
  {
    id: 1,
    title: 'Boda de Julia y Marco',
    description: 'Hermosa boda en la playa con decoración elegante y momento emotivos',
    thumbnail: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90', // Boda profesional
    youtubeId: 'LXb3EKWsInQ', // Video 4K demo de bodas
    category: 'eventos'
  },
  {
    id: 2,
    title: 'Comercial Nuevo Producto',
    description: 'Anuncio de lanzamiento para producto tecnológico innovador',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90', // Comercial profesional
    youtubeId: 'LXb3EKWsInQ', // Video 4K demo de bodas
    category: 'comercial'
  },
  {
    id: 3,
    title: 'Documental: Vida Salvaje',
    description: 'Exploración de ecosistemas naturales y vida animal en su hábitat',
    thumbnail: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90', // Documental vida salvaje profesional
    youtubeId: 'LXb3EKWsInQ', // Video 4K demo de bodas
    category: 'documental'
  },
  {
    id: 4,
    title: 'Cortometraje: Conexiones',
    description: 'Historia sobre las conexiones humanas en la era digital',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90', // Cortometraje profesional
    youtubeId: 'LXb3EKWsInQ', // Video 4K demo de bodas
    category: 'cortometrajes'
  },
  {
    id: 5,
    title: 'Evento Corporativo',
    description: 'Cobertura profesional de evento corporativo con múltiples cámaras',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90', // Evento corporativo profesional
    youtubeId: 'LXb3EKWsInQ', // Video 4K demo de bodas
    category: 'eventos'
  },
  {
    id: 6,
    title: 'Videoclip Musical',
    description: 'Producción audiovisual para artista musical con efectos especiales',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90', // Videoclip musical profesional
    youtubeId: 'LXb3EKWsInQ', // Video 4K demo de bodas
    category: 'musica'
  }
]

// Categories for filtering
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'highlight', name: 'Destacados' },
  { id: 'commercial', name: 'Comerciales' },
  { id: 'documentary', name: 'Documentales' },
  { id: 'shortfilm', name: 'Cortometrajes' },
  { id: 'event', name: 'Eventos' },
  { id: 'musicvideo', name: 'Videoclips' }
]

const VideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  
  // Controles para animaciones
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  })
  
  // Efecto para iniciar animaciones cuando la sección entre en vista o cambie la categoría
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])
  
  // Efecto para animar cuando cambia la categoría seleccionada
  useEffect(() => {
    // Primero ocultar brevemente y luego mostrar con animación
    controls.start('hidden').then(() => {
      setTimeout(() => {
        controls.start('visible')
      }, 100) // Pequeña pausa para que la transición sea visible
    })
  }, [selectedCategory, controls])
  
  // Filter videos based on selected category
  const filteredVideos = selectedCategory === 'all' 
    ? videosData 
    : videosData.filter(video => video.category === selectedCategory)
  
  // Handle opening the video modal
  const openModal = (video) => {
    setSelectedVideo(video)
    setModalOpen(true)
  }
  
  // Handle closing the video modal
  const closeModal = () => {
    setModalOpen(false)
    setSelectedVideo(null)
  }
  
  // Variantes para animaciones diagonales
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.8
      }
    }
  }
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: -70,
      y: 100,
      rotateZ: -8,
      scale: 0.8 
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotateZ: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 10,
        delay: i * 0.15
      }
    }),
    exit: (i) => ({
      opacity: 0,
      y: -100,
      rotateZ: 5,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: i * 0.08
      }
    })
  }
  
  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center mb-10 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Video Grid con animaciones */}
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
      >
        {filteredVideos.map((video, index) => (
          <motion.div 
            key={video.id}
            custom={index}
            variants={cardVariants}
            className="preserve-3d will-change-transform"
            whileHover={{ 
              scale: 1.05, 
              rotateZ: 2,
              rotateY: 5,
              y: -10,
              zIndex: 10,
              boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.3), 0 15px 15px -5px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <YouTubeCard
              video={video}
              onClick={() => openModal(video)}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* No Results */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No se encontraron videos en esta categoría.</p>
        </div>
      )}
      
      {/* YouTube Modal */}
      <ModalYouTube
        isOpen={modalOpen}
        onRequestClose={closeModal}
        video={selectedVideo}
      />
    </div>
  )
}

export default VideoGallery
