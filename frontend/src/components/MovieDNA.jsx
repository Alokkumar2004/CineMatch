// src/components/MovieDNA.jsx
import './MovieDNA.css';

function MovieDNA({ dna }) {
  // We map the raw data keys to nice labels with emojis
  const dnaLabels = {
    brain: "🧠 Brain",
    emotion: "😭 Emotion",
    action: "🔥 Action",
    comedy: "😂 Comedy",
    romance: "❤️ Romance",
    horror: "😱 Horror",
    adventure: "🏕️ Adventure"
  };

  return (
    <div className="movie-dna-container">
      <h3>Movie DNA</h3>
      
      {/* Object.entries turns our dna object into an array we can map over.
          Example: it turns { action: 90 } into ["action", 90] */}
      {Object.entries(dna).map(([key, value]) => (
        <div key={key} className="dna-row">
          <div className="dna-label">{dnaLabels[key] || key}</div>
          
          {/* The Background Bar */}
          <div className="dna-bar-bg">
            {/* The Colored Fill - We set the width using inline styles! */}
            <div 
              className="dna-bar-fill" 
              style={{ width: `${value}%` }} 
            ></div>
          </div>
          
          <div className="dna-percentage">{value}%</div>
        </div>
      ))}
    </div>
  );
}

export default MovieDNA;