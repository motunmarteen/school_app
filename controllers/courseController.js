const Course = require("../models/Course"); // Import the Course model

// Course management
const assignLecturer = async (req, res) => {
  const { courseId, instructorId } = req.body; // Extract courseId and instructorId from request body
  try {
    const course = await Course.findById(courseId); // Find the course by its ID
    if (!course) {
      return res.status(404).json({ message: "Course not found" }); // Return 404 if course is not found
    }
    if (!course.instructors.includes(instructorId)) {
      course.instructors.push(instructorId); // Add instructorId to the course's instructors array if not already included
      await course.save(); // Save the updated course
    }
    res.status(200).json({ message: "Lecturer assigned to course" }); // Send success response
  } catch (error) {
    res.status(500).json({ message: "Server error", error }); // Send 500 status code for server error
  }
};

module.exports = {
  assignLecturer, // Export the assignLecturer function
};
