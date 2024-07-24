const Instructor = require("../models/Instructor"); // Import the Instructor model

// Instructor management
const updatePassword = async (req, res) => {
  const { instructorId } = req.params; // Extract instructorId from request parameters
  const { newPassword } = req.body; // Extract newPassword from request body
  try {
    const instructor = await Instructor.findById(instructorId); // Find the instructor by their ID
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" }); // Return 404 if instructor is not found
    }
    instructor.password = newPassword; // Update the instructor's password
    await instructor.save(); // Save the updated instructor
    res.status(200).json({ message: "Password updated successfully" }); // Send success response
  } catch (error) {
    res.status(500).json({ message: "Server error", error }); // Send 500 status code for server error
  }
};

module.exports = {
  updatePassword, // Export the updatePassword function
};
