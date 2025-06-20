import { useState } from 'react';
import './ClientCard.css';

const ClientCard = ({ client }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="client-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={client.logo} alt={`${client.name} logo`} className="client-logo" />
      {isHovered && (
        <div className="client-overlay">
          <p className="client-description">{client.description}</p>
          <button className="view-more-button">Ver más</button>
        </div>
      )}
    </div>
  );
};

export default ClientCard;