// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/movieApi'; 
import AuthModal from '../components/AuthModal'; // Import our new authentication modal

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // State for the Auth Modal popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Check if user is logged in via token
  const token = localStorage.getItem('cinematch_token');

  // Store the full arrays (up to 10 movies each from the API)
  const [trending, setTrending] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [blockbusters, setBlockbusters] = useState([]);

  // Track how many movies to show per row (starting at 5)
  const [visibleTrending, setVisibleTrending] = useState(5);
  const [visibleRecs, setVisibleRecs] = useState(5);
  const [visibleBlocks, setVisibleBlocks] = useState(5);

  useEffect(() => {
    const fetchHomeMovies = async () => {
      // Fetch live data using secret keywords for each category
      const trendData = await searchMovies('marvel');
      const recData = await searchMovies('nolan'); 
      const blockData = await searchMovies('avatar');

      // Save the full results to state 
      setTrending(trendData || []);
      setRecommendations(recData || []);
      setBlockbusters(blockData || []);
    };

    fetchHomeMovies();
  }, []);

  const moods = [
    "😂 Make me laugh", "😭 Make me emotional", 
    "😱 Scare me", "❤️ Romance", 
    "🧠 Make me think", "🔥 Give me action", "😌 Something relaxing"
  ];

  // Helper function to guard restricted actions for guests
  const handleRestrictedAction = (callback) => {
    if (!token) {
      setIsModalOpen(true); // Open login modal if not logged in
    } else {
      callback(); // Proceed if logged in
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      handleRestrictedAction(() => {
        navigate(`/search?q=${searchQuery}`);
      });
    }
  };

  return (
    <div className="home-page">
      {/* Auth Modal Popup Component */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section className="hero">
        <h1>Find Your Next Movie</h1>
        <p>CineMatch recommends movies based on your mood, time, and viewing preferences.</p>
        
        <form className="search-box" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search for a movie..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Find My Movie</button>
        </form>
      </section>

      <section className="section">
        <h2>Discover by Mood</h2>
        <div className="mood-grid">
          {moods.map((mood, index) => (
            <button 
              key={index} 
              className="mood-btn" 
              onClick={() => handleRestrictedAction(() => navigate('/discover'))}
            >
              {mood}
            </button>
          ))}
        </div>
      </section>

      {/* ROW 1: TRENDING */}
      <section className="section">
        <div className="section-header">
          <h2>Trending Now</h2>
          {visibleTrending === 5 && trending.length > 5 ? (
            <button className="see-more-btn" onClick={() => handleRestrictedAction(() => setVisibleTrending(10))}>
              See More ➔
            </button>
          ) : visibleTrending > 5 ? (
            <button className="see-less-btn" onClick={() => setVisibleTrending(5)}>
              ⬅ See Less
            </button>
          ) : null}
        </div>
        <div className="movie-grid">
          {trending.slice(0, visibleTrending).map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </section>

      {/* ROW 2: OUR RECOMMENDATIONS */}
      <section className="section">
        <div className="section-header">
          <h2>Our Recommendations</h2>
          {visibleRecs === 5 && recommendations.length > 5 ? (
            <button className="see-more-btn" onClick={() => handleRestrictedAction(() => setVisibleRecs(10))}>
              See More ➔
            </button>
          ) : visibleRecs > 5 ? (
            <button className="see-less-btn" onClick={() => setVisibleRecs(5)}>
              ⬅ See Less
            </button>
          ) : null}
        </div>
        <div className="movie-grid">
          {recommendations.slice(0, visibleRecs).map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </section>

      {/* ROW 3: BLOCKBUSTERS */}
      <section className="section">
        <div className="section-header">
          <h2>Blockbusters</h2>
          {visibleBlocks === 5 && blockbusters.length > 5 ? (
            <button className="see-more-btn" onClick={() => handleRestrictedAction(() => setVisibleBlocks(10))}>
              See More ➔
            </button>
          ) : visibleBlocks > 5 ? (
            <button className="see-less-btn" onClick={() => setVisibleBlocks(5)}>
              ⬅ See Less
            </button>
          ) : null}
        </div>
        <div className="movie-grid">
          {blockbusters.slice(0, visibleBlocks).map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;