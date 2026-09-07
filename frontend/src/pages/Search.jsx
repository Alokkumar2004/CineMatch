// src/pages/Search.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Search.css';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/movieApi'; // Import our new function

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]); // Store API results here
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // useEffect will run every time 'searchTerm' changes!
  useEffect(() => {
    const fetchResults = async () => {
      // Don't search if the input is empty or too short
      if (searchTerm.length < 3) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      const results = await searchMovies(searchTerm);
      setSearchResults(results);
      setIsLoading(false);
    };

    // A small delay (debounce) prevents API spam while typing fast
    const delaySearch = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]); // Re-run this effect when searchTerm changes

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchTerm(text);
    if (text) setSearchParams({ q: text });
    else setSearchParams({});
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Movies</h1>
        <div className="search-input-container">
          <input 
            type="text" 
            placeholder="Type a movie title (e.g. Inception)..." 
            value={searchTerm}
            onChange={handleSearchChange}
            autoFocus
          />
        </div>
      </div>

      {isLoading && <div style={{textAlign: 'center', margin: '2rem'}}>Loading... 🍿</div>}

      {!isLoading && searchTerm.length >= 3 && searchResults.length > 0 && (
        <div className="movies-grid">
          {searchResults.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {!isLoading && searchTerm.length >= 3 && searchResults.length === 0 && (
        <div className="empty-state">
          <h2>No movies found 😢</h2>
        </div>
      )}
    </div>
  );
}

export default Search;