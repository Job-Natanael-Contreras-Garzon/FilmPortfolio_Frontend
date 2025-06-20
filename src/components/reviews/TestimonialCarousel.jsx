import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Slider from 'react-slick'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Mock data for testimonials - would be replaced with real data from an API in production
const testimonialsData = [
  {
    id: 1,
    name: 'Ana Rodríguez',
    company: 'Studio Creativo',
    position: 'Directora de Marketing',
    testimonial: 'La calidad de la producción superó nuestras expectativas. Lograron capturar perfectamente la esencia de nuestra marca y el mensaje que queríamos transmitir. Una experiencia realmente profesional de principio a fin.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 2,
    name: 'Carlos Méndez',
    company: 'Eventos Premium',
    position: 'CEO',
    testimonial: 'Contratamos sus servicios para documentar nuestra conferencia anual y quedamos impresionados. El equipo fue discreto durante el evento pero capturaron absolutamente todos los momentos importantes con un estilo cinematográfico increíble.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 3,
    name: 'Laura Sánchez',
    company: 'Marca de Moda',
    position: 'Directora Creativa',
    testimonial: 'Hemos trabajado en varias campañas juntos y siempre entregan piezas que conectan emocionalmente con nuestra audiencia. Su ojo para el detalle y comprensión de nuestra estética es incomparable.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 4,
    name: 'Miguel Torres',
    company: 'Productora Musical',
    position: 'Productor',
    testimonial: 'El videoclip que crearon para nosotros no solo capturó la esencia de la canción, sino que elevó la música a un nuevo nivel. La dirección, edición y cinematografía fueron excepcionales.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  }
];

const TestimonialCarousel = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [isVisible, setIsVisible] = useState(false);
  
  // Animate when section comes into view
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  // Star rating component
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'text-yellow-500' : 'text-gray-600'} 
      />
    ));
  };
  
  return (
    <div
      ref={ref}
      className={`max-w-4xl mx-auto testimonial-carousel-base ${isVisible ? 'is-visible' : 'is-hidden'}`}
    >
      <Slider {...settings}>
        {testimonialsData.map(testimonial => (
          <div key={testimonial.id} className="px-4 outline-none">
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              {/* Avatar */}
              <div className="mb-6 flex justify-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary-500"
                />
              </div>
              
              {/* Quote Icon */}
              <FaQuoteLeft className="text-primary-500 opacity-20 text-5xl mx-auto mb-6" />
              
              {/* Testimonial Text */}
              <p className="text-gray-300 text-lg mb-6 italic">{testimonial.testimonial}</p>
              
              {/* Rating */}
              <div className="flex justify-center mb-4 space-x-1">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Client Info */}
              <div>
                <h4 className="font-heading font-semibold text-xl">{testimonial.name}</h4>
                <p className="text-primary-400 font-medium">{testimonial.position}</p>
                <p className="text-gray-400">{testimonial.company}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;
