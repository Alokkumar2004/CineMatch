// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Get our login function from context!

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear old errors

    try {
      // 1. Send the data to our backend using Fetch API
     const response = await fetch('https://cinematch-backend-8ti6.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We package our state variables into a JSON string
        body: JSON.stringify({ email, password }),
      });

      // 2. Unpack the response from the server
      const data = await response.json();

      // 3. If response is NOT ok (like a 401 Unauthorized), throw an error
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // 4. If successful, save user to context and go to Home page!
      login(data);
      navigate('/');
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        
        {/* If there is an error, show the red error box */}
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="auth-btn">Log In</button>
        </form>

        <div className="auth-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;