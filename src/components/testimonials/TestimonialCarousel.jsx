import { useState, useRef, useEffect } from 'react'
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './TestimonialCarousel.css';

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const slideDirection = useRef('right');
  
  // Datos para los testimonios con imágenes en línea
  const testimonials = [
    {
      id: 1,
      name: 'Miguel Ángel Rodríguez',
      role: 'Director de Marketing',
      company: 'Global Brands Inc.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Imagen profesional de Unsplash
      text: 'El nivel de calidad y profesionalismo en cada proyecto es excepcional. Han superado nuestras expectativas en cada campaña que hemos realizado juntos.',
      stars: 5
    },
    {
      id: 2,
      name: 'Laura Mendoza',
      role: 'Productora Ejecutiva',
      company: 'Creative Films',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Imagen profesional de Unsplash
      text: 'La capacidad para transformar nuestra visión en una narrativa visual impactante ha sido clave para el éxito de nuestros proyectos colaborativos.',
      stars: 5
    },
    {
      id: 3,
      name: 'Carlos Vega',
      role: 'CEO',
      company: 'Innovate Studios',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Imagen profesional de Unsplash
      text: 'Trabajar con este equipo ha sido una experiencia transformadora. Su atención al detalle y compromiso con la excelencia los distingue en la industria.',
      stars: 5
    }
  ]
  

  
  const nextSlide = () => {
    slideDirection.current = 'right';
    setIsExiting(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      setIsExiting(false);
    }, 500); // Match CSS transition duration
  };

  const prevSlide = () => {
    slideDirection.current = 'left';
    setIsExiting(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsExiting(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    slideDirection.current = index > currentSlide ? 'right' : 'left';
    setIsExiting(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsExiting(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // Autoplay interval

    return () => clearInterval(interval);
  }, []);
  
  // Renderizar estrellas según la calificación
  const renderStars = (count) => {
    return Array(count)
      .fill()
      .map((_, i) => (
        <FaStar key={i} className="text-yellow-500" />
      ));
  };
  
  return (
    <div className="bg-gray-900 py-16 rounded-lg testimonial-carousel-base">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-3">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Testimonios de clientes que han confiado en nosotros para sus proyectos audiovisuales.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="testimonial-container">
            {testimonials.map((testimonial, index) => {
              let a = index - currentSlide;
              let b = testimonials.length;
              let position = (a + b) % b;

              let status = '';
              if (position === 0) {
                status = isExiting ? `exiting-${slideDirection.current}` : 'active';
              } else if (position === 1) {
                status = isExiting ? (slideDirection.current === 'right' ? 'active' : '') : 'next';
              } else if (position === testimonials.length - 1) {
                status = isExiting ? (slideDirection.current === 'left' ? 'active' : '') : 'prev';
              }

              return (
                <div 
                  key={testimonial.id} 
                  className={`testimonial-card ${status}`}>
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary-500 mx-auto"
                      />
                    </div>
                    <div className="flex mb-4">
                      {renderStars(testimonial.stars)}
                    </div>
                    <div className="mb-6 relative">
                      <FaQuoteLeft className="text-primary-500 text-opacity-30 text-6xl absolute -top-8 -left-4" />
                      <p className="text-white text-lg leading-relaxed relative z-10">
                        {testimonial.text}
                      </p>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <button onClick={prevSlide} className="carousel-nav-button left-0">
            <FaChevronLeft />
          </button>
          <button onClick={nextSlide} className="carousel-nav-button right-0">
            <FaChevronRight />
          </button>
          
          {/* Indicadores personalizados */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-primary-500 w-6' : 'bg-gray-700 hover:bg-gray-600'}`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
