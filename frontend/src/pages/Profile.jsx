// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import './Profile.css';

function Profile() {
  const { user } = useAuth();
  const { watchlist } = useWatchlist();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Alok');
  const [genre, setGenre] = useState('Action & Sci-Fi');
  
  // State for the VIP Coming Soon alert banner
  const [showVipAlert, setShowVipAlert] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleVipClick = () => {
    setShowVipAlert(true);
    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setShowVipAlert(false);
    }, 3000);
  };

  const initial = name ? name.charAt(0).toUpperCase() : 'A';

  return (
    <div className="profile-page">
      {/* Centered Modern Account Card */}
      <div className="profile-card-container">
        
        {/* VIP Coming Soon Alert Popup Banner */}
        {showVipAlert && (
          <div className="vip-alert-banner">
            ⭐ VIP Membership features are coming soon! Stay tuned. 🚀
          </div>
        )}

        <div className="profile-card-header">
          <div className="profile-card-avatar">{initial}</div>
          
          {/* Interactive VIP Button */}
          <button className="profile-badge-btn" onClick={handleVipClick}>
            ⭐ VIP Member
          </button>
        </div>

        <div className="profile-card-body">
          {!isEditing ? (
            <div className="profile-info-view">
              <h2>{name}</h2>
              <p className="profile-email-text">{user?.email || 'alok@cinematch.com'}</p>
              
              <div className="profile-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Favorite Vibe</span>
                  <span className="meta-value">{genre}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Saved Watchlist</span>
                  <span className="meta-value">{watchlist.length} Movies</span>
                </div>
              </div>

              <button className="card-edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile Settings
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="card-edit-form">
              <h3>Edit Profile</h3>
              <div className="form-group">
                <label>Display Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="card-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Favorite Vibe</label>
                <select 
                  value={genre} 
                  onChange={(e) => setGenre(e.target.value)}
                  className="card-input"
                >
                  <option value="Action & Sci-Fi">Action & Sci-Fi</option>
                  <option value="Drama & Romance">Drama & Romance</option>
                  <option value="Mind-Bending & Thriller">Mind-Bending & Thriller</option>
                  <option value="Comedy & Light">Comedy & Light</option>
                </select>
              </div>
              <div className="card-btn-group">
                <button type="submit" className="card-save-btn">Save Changes</button>
                <button type="button" className="card-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Watchlist Section Preview */}
      <div className="profile-watchlist-section">
        <h3>Your Saved Watchlist</h3>
        {watchlist.length > 0 ? (
          <div className="movies-grid" style={{ marginTop: '1rem' }}>
            {watchlist.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="empty-text">No movies in your list yet. Start exploring to add some!</p>
        )}
      </div>
    </div>
  );
}

export default Profile;