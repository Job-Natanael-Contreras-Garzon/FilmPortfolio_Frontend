import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm()
  
  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)
    
    try {
      // In a real application, you would send this data to your backend API
      // For now, we'll simulate a successful submission after a timeout
      console.log('Form data:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitSuccess(true)
      reset() // Clear form after successful submission
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="heading-md mb-6">Solicita una Cotización</h3>
      
      {submitSuccess && (
        <div className="bg-green-500 bg-opacity-20 text-green-400 p-4 rounded-lg mb-6">
          <p>Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo a la brevedad.</p>
        </div>
      )}
      
      {submitError && (
        <div className="bg-red-500 bg-opacity-20 text-red-400 p-4 rounded-lg mb-6">
          <p>Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos directamente.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-1">
            Nombre completo <span className="text-primary-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            placeholder="Tu nombre"
            {...register('name', { 
              required: 'Por favor ingresa tu nombre',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres'
              }
            })}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1">
            Correo electrónico <span className="text-primary-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            placeholder="tu@email.com"
            {...register('email', { 
              required: 'Por favor ingresa tu correo electrónico',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Dirección de correo electrónico inválida'
              }
            })}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-gray-300 mb-1">
            Teléfono
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.phone ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            placeholder="+123 456 7890"
            {...register('phone', { 
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i,
                message: 'Número de teléfono inválido'
              }
            })}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        {/* Project Type Field */}
        <div>
          <label htmlFor="projectType" className="block text-gray-300 mb-1">
            Tipo de proyecto <span className="text-primary-500">*</span>
          </label>
          <select
            id="projectType"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.projectType ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            {...register('projectType', { 
              required: 'Por favor selecciona un tipo de proyecto'
            })}
          >
            <option value="">Selecciona una opción</option>
            <option value="commercial">Comercial / Publicidad</option>
            <option value="event">Evento (boda, corporativo, etc.)</option>
            <option value="music">Videoclip musical</option>
            <option value="documentary">Documental</option>
            <option value="shortfilm">Cortometraje</option>
            <option value="socialmedia">Contenido para redes sociales</option>
            <option value="other">Otro</option>
          </select>
          {errors.projectType && (
            <p className="text-red-400 text-sm mt-1">{errors.projectType.message}</p>
          )}
        </div>
        
        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-gray-300 mb-1">
            Mensaje <span className="text-primary-500">*</span>
          </label>
          <textarea
            id="message"
            rows="5"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.message ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            placeholder="Cuéntanos sobre tu proyecto..."
            {...register('message', { 
              required: 'Por favor ingresa un mensaje',
              minLength: {
                value: 10,
                message: 'El mensaje debe tener al menos 10 caracteres'
              }
            })}
          ></textarea>
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary w-full ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
