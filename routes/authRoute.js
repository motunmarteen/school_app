const express = require("express"); // Import express for creating the router
const router = express.Router(); // Create a new router instance

// Import the authentication controller functions
const {
  createAccount, // Function to handle account creation
  login, // Function to handle user login
  forgotPassword, // Function to handle forgotten password requests
  resetPassword, // Function to handle password reset
} = require("../controllers/authController");

// Define the routes and associate them with the corresponding controller functions
router.post("/create-account", createAccount); // Route for creating a new account
router.post("/login", login); // Route for logging in
router.post("/forgot-password", forgotPassword); // Route for requesting a password reset
router.post("/reset-password", resetPassword); // Route for resetting the password

// Export the router to be used in other parts of the application
module.exports = router;
