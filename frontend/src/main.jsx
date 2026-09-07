// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { WatchlistProvider } from './context/WatchlistContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // IMPORT THIS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap AuthProvider around everything! */}
      <AuthProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)