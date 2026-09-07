// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. Define the Blueprint (Schema)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    // We can store their favorite genres here later!
    type: Array,
    default: [],
  }
}, {
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt' dates
});

// 2. Pre-save Hook: Hash the password BEFORE saving it to the database
// 2. Pre-save Hook: Hash the password BEFORE saving it to the database
userSchema.pre('save', async function () {
  // If the password wasn't modified, skip this step
  if (!this.isModified('password')) {
    return; // Notice we just 'return' instead of using next()
  }

  // Generate a random "salt" (extra random characters)
  const salt = await bcrypt.genSalt(10);
  
  // Scramble the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
});

// 3. Helper Method: Check if a typed password matches the hashed one in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 4. Create and export the Model
const User = mongoose.model('User', userSchema);
module.exports = User;