// src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check if we already have a user saved in memory when the app loads
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('cinematch_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Call this function when the user successfully logs in
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('cinematch_user', JSON.stringify(userData));
    
    // NEW: Save the token separately so other pages know the user is logged in
    if (userData.token) {
      localStorage.setItem('cinematch_token', userData.token);
    }
  };

  // Call this function when the user clicks Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('cinematch_user');
    
    // NEW: Remove the token when they log out
    localStorage.removeItem('cinematch_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};