import { FaPlay } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useState } from 'react';

const YouTubeCard = ({ video, onClick }) => {
  const [ setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg group cursor-pointer diagonal-motion preserve-3d"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden bg-gray-800">
        <img 
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay with Play Button */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            className="bg-primary-500 text-white rounded-full p-4 transition-transform duration-300 ease-in-out group-hover:scale-110"
          >
            <FaPlay size={20} />
          </div>
        </div>
      </div>
      
      {/* Video Info */}
      <div className="p-4 bg-gray-900">
        <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1">{video.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
};

YouTubeCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    youtubeId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default YouTubeCard;
