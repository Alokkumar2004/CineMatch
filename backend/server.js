// backend/server.js
// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import our new routes!
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Tell the app to use our authRoutes for any URL that starts with /api/auth
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('CineMatch API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});