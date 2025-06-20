import Header from '../components/common/Header';
import ClientCard from '../components/portfolio/ClientCard';
import './PortfolioPage.css';

const clients = [
  // Conciertos / Boliches
  { id: 1, name: 'Sonilum', category: 'Conciertos / Boliches', logo: '/path/to/sonilum-logo.png', description: 'Descripción de Sonilum' },
  { id: 2, name: 'Kuka Bar', category: 'Conciertos / Boliches', logo: '/path/to/kukabar-logo.png', description: 'Descripción de Kuka Bar' },
  // Jugueterías
  { id: 3, name: 'MundoToys', category: 'Jugueterías', logo: '/path/to/mundotoys-logo.png', description: 'Descripción de MundoToys' },
  { id: 4, name: 'Planeta Hotwheels', category: 'Jugueterías', logo: '/path/to/planetahotwheels-logo.png', description: 'Descripción de Planeta Hotwheels' },
  // Ropa / Moda
  { id: 5, name: 'Eclat Espacio Moda', category: 'Ropa / Moda', logo: '/path/to/eclat-logo.png', description: 'Descripción de Eclat Espacio Moda' },
  // Gastronomía
  { id: 6, name: 'El Orquideario', category: 'Gastronomía', logo: '/path/to/orquideario-logo.png', description: 'Descripción de El Orquideario' },
  { id: 7, name: 'El Japo', category: 'Gastronomía', logo: '/path/to/japo-logo.png', description: 'Descripción de El Japo' },
  { id: 8, name: 'Yakurama', category: 'Gastronomía', logo: '/path/to/yakurama-logo.png', description: 'Descripción de Yakurama' },
  // Joyería Holística
  { id: 9, name: 'El Bazar de Elementos', category: 'Joyería Holística', logo: '/path/to/bazar-logo.png', description: 'Descripción de El Bazar de Elementos' },
  // Estética
  { id: 10, name: 'Estetica', category: 'Estética', logo: '/path/to/estetica-logo.png', description: 'Descripción de Estética' },
];

const PortfolioPage = () => {
  const categories = [...new Set(clients.map(client => client.category))];

  return (
    <div className="portfolio-page">
      <Header />
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Nuestro Portafolio</h1>
        {categories.map(category => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {clients.filter(client => client.category === category).map(client => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default PortfolioPage;