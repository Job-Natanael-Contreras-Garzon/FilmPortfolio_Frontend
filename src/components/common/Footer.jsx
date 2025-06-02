import { FaInstagram, FaYoutube, FaTiktok, FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  // Footer navigation links
  const footerLinks = [
    { section: 'Navegación', links: [
      { name: 'Inicio', href: '#hero' },
      { name: 'Videos', href: '#videos' },
      { name: 'Servicios', href: '#servicios' },
      { name: 'Testimonios', href: '#testimonios' },
      { name: 'Nosotros', href: '#nosotros' },
      { name: 'Contacto', href: '#contacto' }
    ]},
    { section: 'Servicios', links: [
      { name: 'Videografía', href: '#servicios' },
      { name: 'Edición', href: '#servicios' },
      { name: 'Motion Graphics', href: '#servicios' },
      { name: 'Dirección', href: '#servicios' },
      { name: 'Producción', href: '#servicios' }
    ]},
    { section: 'Legal', links: [
      { name: 'Términos y Condiciones', href: '#' },
      { name: 'Política de Privacidad', href: '#' },
      { name: 'Cookies', href: '#' }
    ]}
  ]
  
  // Social media links
  const socialLinks = [
    { name: 'Instagram', icon: <FaInstagram />, href: 'https://instagram.com/' },
    { name: 'YouTube', icon: <FaYoutube />, href: 'https://youtube.com/' },
    { name: 'TikTok', icon: <FaTiktok />, href: 'https://tiktok.com/' }
  ]
  
  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-6">
              <span className="text-primary-500">Film</span>Portfolio
            </h2>
            <p className="text-gray-400 mb-6">
              Creamos contenido audiovisual que conecta e impacta a tu audiencia, contando historias memorables.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-500 text-xl transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation Columns */}
          {footerLinks.map((section) => (
            <div key={section.section}>
              <h3 className="font-heading font-semibold text-lg mb-6">{section.section}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaEnvelope className="text-primary-500 mt-1 mr-3" />
                <a href="mailto:info@filmportfolio.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                  info@filmportfolio.com
                </a>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-primary-500 mt-1 mr-3" />
                <a href="tel:+123456789" className="text-gray-400 hover:text-primary-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} FilmPortfolio. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Diseñado y desarrollado con pasión
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
