// Import the User model for database operations
import User from "../Models/user.js";
// Import bcryptjs for password hashing
import bcrypt from "bcryptjs";
// Import dotenv to load environment variables
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

// Register controller to handle user registration
export const register = async (req, res) => {
  try {
    // Destructure fullName, email, and password from request body
    let { fullName, email, password } = req.body;

    // Check if all required fields are provided
    if (!fullName || !email || !password) {
      // Return 400 Bad Request if any field is missing
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Remove whitespace and convert email to lowercase for consistency
    email = email.trim().toLowerCase();

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // If email format is invalid, return 400 Bad Request
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Regular expression to validate password strength (min 8 chars, 1 letter, 1 number)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{8,}$/;
    // If password does not meet strength requirements, return 400 Bad Request
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one letter and one number.",
      });
    }

    // Check if a user with the same email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Return 409 Conflict if user already exists
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Get salt rounds from environment variable or default to 10
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new User instance with the provided data
    const newUser = new User({
      fullName, // User's full name
      email,    // Normalized email
      password: hashedPassword, // Hashed password
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success, message, and user info (excluding password)
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: newUser._id, // MongoDB-generated unique user ID
        fullName: newUser.fullName, // User's full name
        email: newUser.email,       // User's email
      },
    });
  } catch (error) {
    // Log error details only if not in production environment
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in user registration:", error);
    }
    // Respond with 500 Internal Server Error for any unexpected error
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
export const getUsersList = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Respond with the list of users
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    // Log error details only if not in production environment
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching users:", error);
    }
    // Respond with 500 Internal Server Error for any unexpected error
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}
export const loginUser=async(req,res)=>{
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Respond with success and user info (excluding password)
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      message: "Login successful. Welcome back, " + user.fullName,
    });
  } catch (error) {
    // Log error details only if not in production environment
    if (process.env.NODE_ENV !== "production") {
      console.error("Error logging in user:", error);
    }
    // Respond with 500 Internal Server Error for any unexpected error
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}