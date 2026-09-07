




// src/pages/Discover.jsx
import { useState } from 'react';
import './Discover.css';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/movieApi'; 
import AuthModal from '../components/AuthModal';

function Discover() {
  const [activeMood, setActiveMood] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('cinematch_token');

  const moodProfiles = [
    { label: "😂 Make me laugh", query: "hangover" },
    { label: "😭 Make me emotional", query: "notebook" },
    { label: "😱 Scare me", query: "conjuring" },
    { label: "❤️ Romance", query: "love" },
    { label: "🧠 Make me think", query: "inception" },
    { label: "🔥 Give me action", query: "avengers" },
    { label: "😌 Something relaxing", query: "paddington" },
     { label: "🔥 Adrenaline Rush", query: "mission" },     // Gets Mission Impossible, etc.
    { label: "🧠 Mind Bending", query: "matrix" },         // Gets The Matrix movies
    { label: "😭 Bring the Tears", query: "notebook" },    // Gets romantic/sad dramas
    { label: "🤣 Pure Comedy", query: "hangover" },        // Gets comedy hits
    { label: "👻 Keep Me Awake", query: "conjuring" },     // Gets horror films
    { label: "🪄 Magical Fantasy", query: "potter" },      // Gets Harry Potter
    { label: "👽 Sci-Fi Escape", query: "star trek" },     // Gets Sci-Fi adventures
    { label: "🦸 Superhero Action", query: "batman" }    // Gets Mission Impossible, etc.
    
  ];

  const handleMoodSelect = async (mood) => {
    if (!token) {
      setIsModalOpen(true);
      return;
    }

    setActiveMood(mood.label);
    setIsLoading(true);
    setRecommendations([]); 

    const results = await searchMovies(mood.query);
    const topFourMovies = results.slice(0, 4);
    
    setRecommendations(topFourMovies);
    setIsLoading(false);
  };

  return (
    <div className="discover-page">
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="discover-header">
        <h1>Discover Your Match</h1>
        <p>Tell us what you're in the mood for, and we'll fetch the perfect live recommendations.</p>
      </div>

      <div className="mood-selector">
        {moodProfiles.map((mood, index) => (
          <button 
            key={index}
            className={`mood-btn ${activeMood === mood.label ? 'active' : ''}`}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood.label}
          </button>
        ))}
      </div>

      {activeMood && token && (
        <div className="recommendation-results">
          <h2>Recommended for: {activeMood}</h2>
          
          {isLoading ? (
            <p style={{ textAlign: 'center', margin: '2rem' }}>Consulting the movie gods... 🍿</p>
          ) : recommendations.length > 0 ? (
            <div className="movies-grid">
              {recommendations.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>
              No perfect matches found for this mood today. Try another!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Discover;