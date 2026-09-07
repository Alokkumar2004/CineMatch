// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We try to connect to the URL saved in our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Stop the server if the database fails to connect
  }
};

module.exports = connectDB;