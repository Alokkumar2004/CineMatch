// src/components/AuthModal.jsx
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✖</button>
        
        <div className="modal-icon">🎬</div>
        <h2>Unlock CineMatch</h2>
        <p>Please log in or sign up to access search, mood discovery, and save movies to your watchlist.</p>

        <div className="modal-actions">
          <button 
            className="modal-login-btn" 
            onClick={() => { onClose(); navigate('/login'); }}
          >
            Log In / Sign Up
          </button>
          <button 
            className="modal-cancel-btn" 
            onClick={onClose}
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;