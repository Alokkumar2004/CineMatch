// src/services/movieApi.js
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const getTrendingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}?s=avengers&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || []; 
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; 
  }
};

// --- ADD THESE NEW FUNCTIONS BELOW ---

// 2. Search for movies by title
export const searchMovies = async (query) => {
  try {
    // We use the '?s=' parameter to tell OMDb to Search for a list of movies
    const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || []; 
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// 3. Get full details for a specific movie
export const getMovieDetails = async (id) => {
  try {
    // We use the '?i=' parameter to tell OMDb to look up a specific ID
    const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
// Add this to src/services/movieApi.js
export const getFilteredMovies = async (genre, year) => {
  try {
    // Default to 'action' or the selected genre as the search term
    let searchTerm = genre ? genre.toLowerCase() : 'movie';
    let url = `${BASE_URL}?s=${searchTerm}`;
    
    // If the user selected a specific year, append it to the request
    if (year && year !== 'All') {
      url += `&y=${year}`;
    }
    
    url += `&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching filtered movies:", error);
    return [];
  }
};