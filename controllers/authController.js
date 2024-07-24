const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

// User authentication and management
const createAccount = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate user data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user instance
    user = new User({
      username,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Send response back to client
    res.status(201).json({ msg: "Account created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate user data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token for authenticated user
    const payload = {
      user: {
        id: user.id, // Include user ID in the payload
      },
    };

    // Sign the JWT token with a secret key and set an expiration time
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: "1h" }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err; // Handle error if token signing fails
        res.json({ token }); // Send the token as a JSON response
      }
    );
  } catch (err) {
    console.error(err.message); // Log the error message
    res.status(500).send("Server error"); // Send a 500 status code for server error
  }
};

// Handle forgot password request
const forgotPassword = async (req, res) => {
  const { email } = req.body; // Get email from request body
  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Send 404 if user not found
    }
    const resetToken = "123456"; // Generate a reset token (placeholder)
    user.resetToken = resetToken; // Save reset token to user
    await user.save(); // Save user with reset token
    res.status(200).json({ message: "Password reset token sent to email" }); // Send success response
  } catch (error) {
    res.status(500).json({ message: "Server error", error }); // Send 500 status code for server error
  }
};

// Handle reset password request
const resetPassword = async (req, res) => {
  const { email, resetToken, newPassword } = req.body; // Get email, reset token, and new password from request body
  try {
    const user = await User.findOne({ email, resetToken }); // Find user by email and reset token
    if (!user) {
      return res.status(404).json({ message: "Invalid token or email" }); // Send 404 if user not found or token is invalid
    }
    user.password = newPassword; // Update user password
    user.resetToken = undefined; // Clear reset token
    await user.save(); // Save user with new password
    res.status(200).json({ message: "Password updated successfully" }); // Send success response
  } catch (error) {
    res.status(500).json({ message: "Server error", error }); // Send 500 status code for server error
  }
};

module.exports = {
  createAccount,
  login,
  forgotPassword,
  resetPassword,
};