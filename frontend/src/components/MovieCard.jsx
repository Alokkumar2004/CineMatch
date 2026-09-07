// src/components/MovieCard.jsx
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // OMDb uses 'imdbID' instead of 'id'
    const movieId = movie.imdbID || movie.id; 
    navigate(`/movie/${movieId}`);
  };

  // Support BOTH our old dummy data AND the new OMDb data
  const title = movie.Title || movie.title;
  const year = movie.Year || movie.year;
  
  // OMDb returns the string "N/A" if a poster doesn't exist
  const posterUrl = (movie.Poster && movie.Poster !== "N/A") 
    ? movie.Poster 
    : movie.poster;

  return (
    <div className="movie-card" onClick={handleClick}>
      {posterUrl ? (
        <img 
  src={posterUrl} 
  alt={title} 
  className="movie-poster"
  onError={(e) => {
    // If the image fails to load, swap it with a generic placeholder!
    e.target.onerror = null; 
    e.target.src = 'https://placehold.co/300x450/1a1d24/e50914?text=No+Poster';
  }}
/>
      ) : (
        <div className="movie-poster" style={{ backgroundColor: '#2a2d36', height: '300px' }}></div>
      )}
      
      <div className="movie-info">
        <h3>{title}</h3>
        <div className="movie-meta">
          {/* OMDb doesn't return ratings in the list view, so we hide it if missing */}
          <span>{movie.rating ? `⭐ ${movie.rating}` : '🎥 Movie'}</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;