import { useEffect, useState } from 'react'
import CustomModal from './CustomModal'
import ReactPlayer from 'react-player/lazy'
import { FaTimes } from 'react-icons/fa'
import PropTypes from 'prop-types'

const ModalYouTube = ({ isOpen, onRequestClose, video }) => {
  const [playerReady, setPlayerReady] = useState(false)
  
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      // Reset player ready state when modal closes
      setPlayerReady(false)
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // Don't render if no video selected
  if (!video) return null

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="relative w-full">
        
        {/* Video Title */}
        <h3 className="text-white font-heading font-semibold text-xl mb-4 pr-8">
          {video.title}
        </h3>
        
        {/* Video Player */}
        <div className="relative pt-[56.25%] /* 16:9 Aspect Ratio */">
          {/* Fallback loading state */}
          {!playerReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <ReactPlayer
            // Usar la URL de video completa con parámetros de calidad
            url={`https://www.youtube.com/watch?v=${video.youtubeId}&vq=hd2160&hd=1&ccvq=hd2160`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            config={{
              youtube: {
                playerVars: {
                  // Forzar la máxima calidad disponible (4K/2160p)
                  vq: 'hd2160',
                  // Preferir resolución máxima
                  highres: 1,
                  // Forzar HD
                  hd: 1,
                  // Desactivar modo limitado de cookies para permitir más opciones
                  host: 'https://www.youtube.com',
                  // Habilitar JS API para controlar calidad
                  enablejsapi: 1,
                  // Parámetros para forzar la mejor calidad
                  quality: 'hd2160',
                  suggestedQuality: 'hd2160',
                  // Origen para seguridad
                  origin: window.location.origin,
                  // Parámetros adicionales
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 1,
                  iv_load_policy: 3,
                  // Idioma español
                  hl: 'es',
                  // Subtítulos en español
                  cc_lang_pref: 'es',
                  // Reproducción automática
                  autoplay: 1
                }
              }
            }}
            controls={true}
            playing={true}
            light={false}
            pip={false}
            stopOnUnmount={true}
            onReady={(player) => {
              setPlayerReady(true);
              
              try {
                // Acceder al reproductor nativo de YouTube 
                if (player && player.getInternalPlayer()) {
                  const youtubePlayer = player.getInternalPlayer();
                  
                  // Método mejorado para forzar máxima calidad
                  const forceMaxQuality = () => {
                    try {
                      // 1. Obtener calidades disponibles
                      const availableQualities = youtubePlayer.getAvailableQualityLevels?.() || [];
                      console.log('Calidades disponibles:', availableQualities);
                      
                      // 2. Seleccionar la mejor calidad disponible
                      const preferredQualities = ['hd2160', 'hd1440', 'hd1080', 'hd720'];
                      let bestAvailableQuality = 'auto';
                      
                      // Buscar la mejor calidad disponible
                      for (const quality of preferredQualities) {
                        if (availableQualities.includes(quality)) {
                          bestAvailableQuality = quality;
                          break;
                        }
                      }
                      
                      // 3. Forzar calidad usando diferentes métodos de API
                      if (youtubePlayer.setPlaybackQuality) {
                        youtubePlayer.setPlaybackQuality(bestAvailableQuality);
                        console.log(`Intentando establecer calidad: ${bestAvailableQuality}`);
                      }
                      
                      if (youtubePlayer.setPlaybackQualityRange) {
                        youtubePlayer.setPlaybackQualityRange(bestAvailableQuality, bestAvailableQuality);
                        console.log(`Estableciendo rango de calidad: ${bestAvailableQuality}`);
                      }
                      
                      // 4. Reportar calidad actual
                      const currentQuality = youtubePlayer.getPlaybackQuality?.() || 'desconocida';
                      console.log(`Calidad aplicada: ${currentQuality}`);
                      
                      // 5. Actualizar velocidad de datos para HD
                      if (youtubePlayer.setSize) {
                        // Intentar refrescar el tamaño para forzar recalcular calidad
                        const playerElement = player.getInternalPlayer();
                        const currentWidth = playerElement.width || 1920;
                        const currentHeight = playerElement.height || 1080;
                        youtubePlayer.setSize(currentWidth, currentHeight);
                      }
                    } catch (qualityError) {
                      console.error('Error al establecer calidad:', qualityError);
                    }
                  };
                  
                  // Esperar a que el video esté listo para la reproducción
                  if (youtubePlayer.addEventListener) {
                    // Evento cuando está listo para reproducir
                    youtubePlayer.addEventListener('onReady', () => {
                      console.log('Video listo para reproducción - estableciendo calidad máxima');
                      forceMaxQuality();
                    });
                    
                    // Evento cuando el estado cambia (reproducción, pausa, etc.)
                    youtubePlayer.addEventListener('onStateChange', (event) => {
                      // Cuando comienza a reproducir (estado 1)
                      if (event.data === 1) {
                        console.log('Video en reproducción - verificando calidad');
                        forceMaxQuality();
                      }
                    });
                    
                    // Evento cuando cambia la calidad
                    youtubePlayer.addEventListener('onPlaybackQualityChange', (event) => {
                      console.log(`Calidad cambiada a: ${event.data}`);
                      // Si no es máxima calidad, intentar forzarla de nuevo
                      if (event.data !== 'hd2160') {
                        setTimeout(forceMaxQuality, 500);
                      }
                    });
                  }
                  
                  // Intentar establecer calidad en diferentes momentos
                  setTimeout(forceMaxQuality, 500);
                  setTimeout(forceMaxQuality, 1500);
                  setTimeout(forceMaxQuality, 3000);
                  setTimeout(forceMaxQuality, 6000);
                }
              } catch (err) {
                console.error('Error al configurar calidad del video:', err);
              }
            }}
            onError={(e) => console.error('Error de reproducción:', e)}
          />
        </div>
        
        {/* Video Description */}
        <div className="mt-4 bg-gray-900 p-4 rounded-b-lg">
          <p className="text-gray-300">{video.description}</p>
        </div>
      </div>
    </Modal>
  )
}

ModalYouTube.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    youtubeId: PropTypes.string,
    category: PropTypes.string
  })
}

export default ModalYouTube
