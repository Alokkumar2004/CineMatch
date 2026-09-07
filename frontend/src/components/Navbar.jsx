// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import our context hook
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Bring in the user data and logout function
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // When they click logout, run the function, close the menu, and go to home page
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">🎬 CineMatch</Link>
      
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </button>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/movies" onClick={toggleMenu}>Movies</Link></li>
        <li><Link to="/discover" onClick={toggleMenu}>Discover</Link></li>
        <li><Link to="/watchlist" onClick={toggleMenu}>My List</Link></li>
        <li><Link to="/search" onClick={toggleMenu}>Search</Link></li>
        
        {/* CONDITIONAL RENDERING: If user exists, show Profile & Logout. Else, show Login. */}
        {user ? (
          <>
            <li>
              <Link to="/profile" className="profile-link" onClick={toggleMenu}>
                Hi, {user.name}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-nav-btn">Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="login-nav-btn" onClick={toggleMenu}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;