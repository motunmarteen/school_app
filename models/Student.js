const mongoose = require("mongoose"); // Import mongoose for MongoDB interaction

// Define the schema for the Student model
const StudentSchema = new mongoose.Schema({
  first_name: { type: String, required: true }, // Student's first name, required field
  last_name: { type: String, required: true }, // Student's last name, required field
  email: { type: String, required: true, unique: true }, // Student's email, required and unique field
  password: { type: String, required: true }, // Student's password, required field
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Array of course IDs, references the Course model
});

// Export the Student model based on the StudentSchema
module.exports = mongoose.model("Student", StudentSchema);
