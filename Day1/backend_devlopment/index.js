// Import the express framework for building web applications
import express from "express";
// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";
//Import Database to connect the db
import connectDB from "./DB/database.js";
import userRoutes from "./Routes/user.js";

// Create an instance of the express application
const app = express();
// Load environment variables from the .env file into process.env
dotenv.config();

// Connect to the database
connectDB();
// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use user routes for all requests starting with /api/users
app.use(`${API_PREFIX}/users`, userRoutes);


// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message to the console when the server is running
  console.log(`Server is running on port ${PORT}`);
});
