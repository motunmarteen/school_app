const express = require("express"); // Import express module
const app = express(); // Create an instance of express
const authRoutes = require("./routes/authRoute"); // Import authentication routes
const courseRoutes = require("./routes/courseRoute"); // Import course routes
const studentRoutes = require("./routes/studentRoute"); // Import student routes
const instructorRoutes = require("./routes/instructorRoute"); // Import instructor routes
const path = require("path"); // Import path module for handling file paths

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Serve static files (if any)
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

// Routes
app.use("/api", authRoutes); // Use authentication routes under "/api"
app.use("/api", courseRoutes); // Use course routes under "/api"
app.use("/api", studentRoutes); // Use student routes under "/api"
app.use("/api", instructorRoutes); // Use instructor routes under "/api"

// Route for forgot password page
app.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "forgot-password.html")); // Serve the forgot-password.html file
});

// Error handling
app.use((err, req, res, next) => {
  res
    .status(500) // Set status code to 500
    .json({ message: "Internal Server Error", error: err.message }); // Send JSON response with error message
});

// Start server
const PORT = process.env.PORT || 3000; // Use port from environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log message when server starts
});