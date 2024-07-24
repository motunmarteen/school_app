const express = require("express"); // Import express for creating the router
const router = express.Router(); // Create a new router instance

// Import the student controller functions
const {
  updateCourseForStudent, // Function to handle course updates for a student
  getColleagues, // Function to get a list of colleagues
  getColleagueById, // Function to get a colleague by ID
} = require("../controllers/studentController");

// Define the routes and associate them with the corresponding controller functions
router.put("/:studentId/course", updateCourseForStudent); // Route for updating a student's course
router.get("/colleagues", getColleagues); // Route for getting a list of colleagues
router.get("/colleagues/:colleagueId", getColleagueById); // Route for getting a colleague by ID

// Export the router to be used in other parts of the application
module.exports = router;