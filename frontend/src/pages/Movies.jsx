// src/pages/Movies.jsx
// src/pages/Movies.jsx
import { useState, useEffect } from 'react';
import './Movies.css';
import MovieCard from '../components/MovieCard';
import { getFilteredMovies } from '../services/movieApi'; 
import AuthModal from '../components/AuthModal';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [selectedYear, setSelectedYear] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('cinematch_token');

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Animation'];
  const years = ['All', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const results = await getFilteredMovies(selectedGenre, selectedYear);
      setMovies(results);
      setIsLoading(false);
    };

    fetchMovies();
  }, [selectedGenre, selectedYear]);

  const handleFilterChange = (setter, value) => {
    if (!token) {
      setIsModalOpen(true);
    } else {
      setter(value);
    }
  };

  return (
    <div className="movies-page">
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="movies-header">
        <h1>Explore Movies</h1>
        <p>Browse our live collection by genre and release year.</p>
      </div>

      <div className="filter-container">
        <div className="filter-group">
          <label>Genre:</label>
          <select 
            value={selectedGenre} 
            onChange={(e) => handleFilterChange(setSelectedGenre, e.target.value)}
          >
            {genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Year:</label>
          <select 
            value={selectedYear} 
            onChange={(e) => handleFilterChange(setSelectedYear, e.target.value)}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)' }}>
          Loading movies... 🍿
        </p>
      ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No movies found matching these filters 😢</h2>
          <p style={{ color: 'var(--text-muted)' }}>Try selecting a different year or genre combination.</p>
        </div>
      )}
    </div>
  );
}

export default Movies;








