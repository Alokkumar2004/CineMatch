// src/App.jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import MovieDetails from './pages/MovieDetails';
import Movies from './pages/Movies';
import Search from './pages/Search'; // Import the Search component
import Watchlist from './pages/Watchlist'; // Import the Watchlist component
import Login from './pages/Login'; // Import the Login component
import Register from './pages/Register'; // Import the Register component
import Profile from './pages/Profile'; // Import the Profile component

function App() {
  return (
    <div className="app">
      {/* The Navbar stays outside of Routes because we want it on every page */}
      <Navbar />

      <main>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<Search />} />
          
          {/* Replaced Watchlist placeholder with the actual component */}
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
