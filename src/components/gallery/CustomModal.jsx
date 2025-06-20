import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import './CustomModal.css';

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`custom-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onRequestClose}>
      <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="custom-modal-close-button"
          onClick={onRequestClose}
          aria-label="Cerrar"
        >
          <FaTimes size={24} />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModal;