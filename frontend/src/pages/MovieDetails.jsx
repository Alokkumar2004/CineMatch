// src/pages/MovieDetails.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { getMovieDetails } from '../services/movieApi'; 
import MovieDNA from '../components/MovieDNA'; 
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams(); 
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);
      setIsLoading(false);
    };
    fetchMovie();
  }, [id]); 

  if (isLoading) {
    return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>Loading details... 🎬</h2>;
  }

  if (!movie || movie.Response === "False") {
    return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>Movie not found!</h2>;
  }

  // Check dynamically if the movie exists in the watchlist array
  const isSaved = watchlist.some((item) => item.imdbID === movie.imdbID);

  const handleWatchlistClick = () => {
    if (isSaved) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist(movie);
    }
  };

  const fakeDNA = { action: 75, brain: 60, emotion: 50 };

  return (
    <div className="movie-details-page">
      <div className="details-header">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : 'https://placehold.co/300x450/1a1d24/e50914?text=No+Poster'} 
          alt={movie.Title} 
          className="details-poster" 
        />
        
        <div className="details-info">
          <h1>{movie.Title}</h1>
          <div className="details-meta">
            <span>⭐ {movie.imdbRating}</span>
            <span>{movie.Year}</span>
            <span>{movie.Runtime}</span>
            <span>{movie.Genre}</span>
          </div>
          
          <p className="description">{movie.Plot}</p>
          
          <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
          </div>

          {/* Dynamic Watchlist Button */}
          <button 
            className="watchlist-btn" 
            onClick={handleWatchlistClick}
            style={{ 
              backgroundColor: isSaved ? '#2a2d36' : 'var(--primary-color)',
              border: isSaved ? '1px solid #ff4d4d' : 'none',
              color: isSaved ? '#ff4d4d' : 'white'
            }}
          >
            {isSaved ? '- Remove from Watchlist' : '+ Add to Watchlist'}
          </button>
        </div>
      </div>

      <MovieDNA dna={fakeDNA} />
    </div>
  );
}

export default MovieDetails;