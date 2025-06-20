import { useState, useEffect, useRef } from 'react'; // Added useRef
import { useInView } from 'react-intersection-observer';
import YouTubeCard from './YouTubeCard';
import ModalYouTube from './ModalYouTube';
import './VideoGallery.css';

// Datos reales para videos utilizando los recursos proporcionados
const videosData = [
  {
    id: 1,
    title: 'Boda de Julia y Marco',
    description: 'Hermosa boda en la playa con decoración elegante y momento emotivos',
    thumbnail: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
    youtubeId: 'LXb3EKWsInQ',
    category: 'eventos'
  },
  {
    id: 2,
    title: 'Comercial Nuevo Producto',
    description: 'Anuncio de lanzamiento para producto tecnológico innovador',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
    youtubeId: 'LXb3EKWsInQ',
    category: 'comercial'
  },
  {
    id: 3,
    title: 'Documental: Vida Salvaje',
    description: 'Exploración de ecosistemas naturales y vida animal en su hábitat',
    thumbnail: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
    youtubeId: 'LXb3EKWsInQ',
    category: 'documental'
  },
  {
    id: 4,
    title: 'Cortometraje: Conexiones',
    description: 'Historia sobre las conexiones humanas en la era digital',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
    youtubeId: 'LXb3EKWsInQ',
    category: 'cortometrajes'
  },
  {
    id: 5,
    title: 'Evento Corporativo',
    description: 'Cobertura profesional de evento corporativo con múltiples cámaras',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
    youtubeId: 'LXb3EKWsInQ',
    category: 'eventos'
  },
  {
    id: 6,
    title: 'Videoclip Musical',
    description: 'Producción audiovisual para artista musical con efectos especiales',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
    youtubeId: 'LXb3EKWsInQ',
    category: 'musica'
  }
];

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'highlight', name: 'Destacados' },
  { id: 'commercial', name: 'Comerciales' },
  { id: 'documentary', name: 'Documentales' },
  { id: 'shortfilm', name: 'Cortometrajes' },
  { id: 'event', name: 'Eventos' },
  { id: 'musicvideo', name: 'Videoclips' }
];

const VideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false); // Para la animación de salida de tarjetas
  const galleryRef = useRef(null); // Ref para el contenedor de la galería

  const [ref, inView] = useInView({
    threshold: 0.1, // Reducido para activar antes
    triggerOnce: false 
  });

  useEffect(() => {
    if (inView) {
      setGalleryVisible(true);
      setIsAnimatingOut(false); // Asegurar que no esté animando la salida al entrar en vista
    } else {
      // Opcional: manejar la animación de salida cuando sale de la vista
      // setIsAnimatingOut(true);
      // setTimeout(() => setGalleryVisible(false), 500); // Duración de la animación de salida
      setGalleryVisible(false); // Simplemente ocultar si no se desea animación de salida al scrollear fuera
    }
  }, [inView]);

  useEffect(() => {
    setIsAnimatingOut(true); // Iniciar animación de salida de las tarjetas actuales
    const timer = setTimeout(() => {
      // Después de la animación de salida, actualizar las tarjetas y animar la entrada
      setIsAnimatingOut(false); 
      // Forzar re-render para aplicar nuevas clases de entrada si es necesario
      // Esto se maneja mejor con keys en los items o una clase de 're-entering'
    }, 500); // Duración de la animación de salida de las tarjetas (ej. 0.5s)

    return () => clearTimeout(timer);
  }, [selectedCategory]);
  
  const filteredVideos = selectedCategory === 'all' 
    ? videosData 
    : videosData.filter(video => video.category === selectedCategory);
  
  const openModal = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };
  
  return (
    <div ref={ref}>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center mb-10 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category.id 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div 
        ref={galleryRef}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000 video-gallery-grid ${galleryVisible ? 'gallery-visible' : 'gallery-hidden'}`}
      >
        {filteredVideos.map((video, index) => (
          <div 
            key={`${selectedCategory}-${video.id}`} // Cambiar key para forzar re-montado y animación de entrada
            className={`video-card-item preserve-3d will-change-transform ${isAnimatingOut ? 'card-exiting' : (galleryVisible ? 'card-visible' : 'card-hidden')}`}
            style={{ transitionDelay: galleryVisible && !isAnimatingOut ? `${index * 0.1}s` : '0s' }} // Stagger solo en entrada
          >
            <YouTubeCard
              video={video}
              onClick={() => openModal(video)}
            />
          </div>
        ))}
      </div>
      
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No se encontraron videos en esta categoría.</p>
        </div>
      )}
      
      <ModalYouTube
        isOpen={modalOpen}
        onRequestClose={closeModal}
        video={selectedVideo}
      />
    </div>
  );
};

export default VideoGallery;
