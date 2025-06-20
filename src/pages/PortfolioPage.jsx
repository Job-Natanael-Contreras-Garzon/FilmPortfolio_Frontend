import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/common/Header';
import ClientCard from '../components/portfolio/ClientCard';
import ParticleBackground from '../components/common/ParticleBackground';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioProjects = t('portfolio.projects', { returnObjects: true }) || [];
  const filterCategories = t('portfolio.filters', { returnObjects: true }) || [];

  const filteredProjects = activeFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeFilter);

  const getButtonClass = (key) => {
    let baseClass = 'filter-button';
    if (key === activeFilter) {
      baseClass += ' active';
    }
    return baseClass;
  }

  return (
    <div className="portfolio-page">
      <ParticleBackground />
      <Header />
      <main className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">{t('portfolio.title')}</h1>
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {Array.isArray(filterCategories) && filterCategories.map(cat => (
            <button 
              key={cat.key} 
              onClick={() => setActiveFilter(cat.key)}
              className={getButtonClass(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(filteredProjects) && filteredProjects.map(project => (
            <ClientCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PortfolioPage;