const Student = require("../models/Student"); // Import the Student model

// Student management
const updateCourseForStudent = async (req, res) => {
  const { studentId } = req.params; // Extract studentId from request parameters
  const { courseId } = req.body; // Extract courseId from request body
  try {
    const student = await Student.findById(studentId); // Find the student by their ID
    if (!student) {
      return res.status(404).json({ message: "Student not found" }); // Return 404 if student is not found
    }
    if (!student.courses.includes(courseId)) {
      student.courses.push(courseId); // Add courseId to the student's courses array if not already included
      await student.save(); // Save the updated student
    }
    res.status(200).json({ message: "Course updated for student" }); // Send success response
  } catch (error) {
    res.status(500).json({ message: "Server error", error }); // Send 500 status code for server error
  }
};

const getColleagues = async (req, res) => {
  try {
    const colleagues = await Student.find({}, "first_name last_name _id"); // Find all students and select first_name, last_name, and _id fields
    res.status(200).json(colleagues); // Send the list of colleagues as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Server error", error }); // Send 500 status code for server error
  }
};

const getColleagueById = async (req, res) => {
  const { colleagueId } = req.params; // Extract colleagueId from request parameters
  try {
    const colleague = await Student.findById(
      colleagueId,
      "first_name last_name _id"
    ); // Find the colleague by their ID and select first_name, last_name, and _id fields
    if (!colleague) {
      return res.status(404).json({ message: "Colleague not found" }); // Return 404 if colleague is not found
    }
    res.status(200).json(colleague); // Send the colleague's details as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Server error", error }); // Send 500 status code for server error
  }
};

module.exports = {
  updateCourseForStudent, // Export the updateCourseForStudent function
  getColleagues, // Export the getColleagues function
  getColleagueById, // Export the getColleagueById function
};