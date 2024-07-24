const mongoose = require("mongoose"); // Import mongoose for MongoDB interaction

// Define the schema for the Course model
const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Course name, required field
  description: String, // Course description, optional field
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }], // Array of instructor IDs, references the Instructor model
});

// Export the Course model based on the CourseSchema
module.exports = mongoose.model("Course", CourseSchema);
