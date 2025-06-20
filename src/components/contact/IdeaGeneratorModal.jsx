import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './IdeaGeneratorModal.css';

const IdeaGeneratorModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [businessInfo, setBusinessInfo] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    const handleGenerateIdeas = async () => {
    if (!businessInfo) return;

    setIsLoading(true);
    setIdeas([]);

    try {
            // IMPORTANT: Make sure to set your API key in a .env file
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `Generate 5 creative content ideas for a business described as: "${businessInfo}". Format the ideas as a numbered list.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      // Split the text into an array of ideas
      const generatedIdeas = text.split(/\n/g).filter(idea => idea.trim() !== '');
      setIdeas(generatedIdeas);
    } catch (error) {
      console.error('Error generating ideas:', error);
      setIdeas([t('contact.ideaModal.errorMessage')]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>{t('contact.ideaModal.title')}</h2>
        <p>{t('contact.ideaModal.subtitle')}</p>
        <textarea
          value={businessInfo}
          onChange={(e) => setBusinessInfo(e.target.value)}
          placeholder={t('contact.ideaModal.placeholder')}
        />
        <button onClick={handleGenerateIdeas} disabled={isLoading}>
          {isLoading ? t('contact.ideaModal.button_loading') : t('contact.ideaModal.button_default')}
        </button>
        <div className="ideas-container">
          {ideas.map((idea, index) => (
            <div key={index} className="idea-card">
              {idea}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaGeneratorModal;