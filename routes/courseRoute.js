const express = require("express"); // Import express for creating the router
const router = express.Router(); // Create a new router instance

// Import the course controller functions
const { assignLecturer } = require("../controllers/courseController"); // Function to handle lecturer assignment

// Define the route and associate it with the corresponding controller function
router.post("/assign-lecturer", assignLecturer); // Route for assigning a lecturer to a course

// Export the router to be used in other parts of the application
module.exports = router;