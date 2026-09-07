// src/context/WatchlistContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const savedList = localStorage.getItem('cinematch_watchlist');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('cinematch_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    // Prevent duplicates
    if (!watchlist.some(item => item.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (imdbID) => {
    // Filter out the movie matching this exact imdbID
    setWatchlist(watchlist.filter(item => item.imdbID !== imdbID));
  };

  const isInWatchlist = (imdbID) => {
    return watchlist.some(item => item.imdbID === imdbID);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};