const mongoose = require("mongoose"); // Import mongoose for MongoDB interaction

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // User's email, required and unique field
  password: { type: String, required: true }, // User's password, required field
  resetToken: String, // Token for password reset, optional field
});

// Export the User model based on the UserSchema
module.exports = mongoose.model("User", UserSchema);
