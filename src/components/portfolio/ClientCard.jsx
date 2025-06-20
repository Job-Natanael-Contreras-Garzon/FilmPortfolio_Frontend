import './ClientCard.css';

const ClientCard = ({ project }) => {
  return (
    <div 
      className="project-card"
      style={{ backgroundImage: `url(${project.image})` }}
    >
      <div className="project-overlay">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
      </div>
    </div>
  );
};

export default ClientCard;