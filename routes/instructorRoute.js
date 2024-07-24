const express = require("express"); // Import express for creating the router
const router = express.Router(); // Create a new router instance

// Import the instructor controller functions
const { updatePassword } = require("../controllers/instructorController"); // Function to handle password updates

// Define the route and associate it with the corresponding controller function
router.put("/:instructorId/password", updatePassword); // Route for updating an instructor's password

// Export the router to be used in other parts of the application
module.exports = router;