import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'

const ContactForm = () => {
  const { t } = useTranslation();
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
      <h3 className="heading-md mb-6">{t('contact.formTitle')}</h3>
      
      {submitSuccess && (
        <div className="bg-green-500 bg-opacity-20 text-green-400 p-4 rounded-lg mb-6">
          <p>{t('contact.formSuccessMessage')}</p>
        </div>
      )}
      
      {submitError && (
        <div className="bg-red-500 bg-opacity-20 text-red-400 p-4 rounded-lg mb-6">
          <p>{t('contact.formErrorMessage')}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-1">
            {t('contact.formLabels.name')} <span className="text-primary-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            placeholder={t('contact.formPlaceholders.name')}
            {...register('name', { 
              required: t('contact.formValidation.name_required'),
              minLength: {
                value: 2,
                message: t('contact.formValidation.name_minLength')
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
            {t('contact.formLabels.email')} <span className="text-primary-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            placeholder={t('contact.formPlaceholders.email')}
            {...register('email', { 
              required: t('contact.formValidation.email_required'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('contact.formValidation.email_pattern')
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
            {t('contact.formLabels.phone')}
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.phone ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            placeholder={t('contact.formPlaceholders.phone')}
            {...register('phone', { 
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i,
                message: t('contact.formValidation.phone_pattern')
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
            {t('contact.formLabels.projectType')} <span className="text-primary-500">*</span>
          </label>
          <select
            id="projectType"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.projectType ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            {...register('projectType', { 
              required: t('contact.formValidation.projectType_required')
            })}
          >
            <option value="">{t('contact.projectTypes.select')}</option>
            <option value="commercial">{t('contact.projectTypes.commercial')}</option>
            <option value="event">{t('contact.projectTypes.event')}</option>
            <option value="music">{t('contact.projectTypes.music')}</option>
            <option value="documentary">{t('contact.projectTypes.documentary')}</option>
            <option value="shortfilm">{t('contact.projectTypes.shortfilm')}</option>
            <option value="socialmedia">{t('contact.projectTypes.socialmedia')}</option>
            <option value="other">{t('contact.projectTypes.other')}</option>
          </select>
          {errors.projectType && (
            <p className="text-red-400 text-sm mt-1">{errors.projectType.message}</p>
          )}
        </div>
        
        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-gray-300 mb-1">
            {t('contact.formLabels.message')} <span className="text-primary-500">*</span>
          </label>
          <textarea
            id="message"
            rows="5"
            className={`w-full bg-gray-700 rounded-lg p-3 text-white border ${
              errors.message ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-primary-500`}
            placeholder={t('contact.formPlaceholders.message')}
            {...register('message', { 
              required: t('contact.formValidation.message_required'),
              minLength: {
                value: 10,
                message: t('contact.formValidation.message_minLength')
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
          {isSubmitting ? t('contact.submitButton.submitting') : t('contact.submitButton.default')}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
