// src/pages/Watchlist.jsx
// src/pages/Watchlist.jsx
import { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import AuthModal from '../components/AuthModal';
import './Watchlist.css';

function Watchlist() {
  const { watchlist } = useWatchlist();
  const token = localStorage.getItem('cinematch_token');

  // If not logged in, force open the modal instantly when visiting the page
  const [isModalOpen, setIsModalOpen] = useState(!token);

  return (
    <div className="watchlist-page" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="watchlist-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>My Watchlist</h1>
        <p style={{ color: 'var(--text-muted)' }}>Movies you have saved to watch later.</p>
      </div>

      {token && watchlist.length > 0 ? (
        <div className="movies-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <h2>Your watchlist is empty 📭</h2>
          <p>Explore movies and click "Add to Watchlist" to save them here!</p>
        </div>
      )}
    </div>
  );
}

export default Watchlist;