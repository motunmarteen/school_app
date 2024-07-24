const mongoose = require("mongoose"); // Import mongoose for MongoDB interaction

// Define the schema for the Instructor model
const InstructorSchema = new mongoose.Schema({
  first_name: { type: String, required: true }, // Instructor's first name, required field
  last_name: { type: String, required: true }, // Instructor's last name, required field
  email: { type: String, required: true, unique: true }, // Instructor's email, required and unique field
  password: { type: String, required: true }, // Instructor's password, required field
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Array of course IDs, references the Course model
});

// Export the Instructor model based on the InstructorSchema
module.exports = mongoose.model("Instructor", InstructorSchema);
