// Import mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Define an async function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      // Use the new URL parser
      useNewUrlParser: true,
      // Use the new server discovery and monitoring engine
      useUnifiedTopology: true,
    });
    // Log success message if connection is successful
    console.log("✅✅MongoDB connected");
  } catch (error) {
    // Log error message if connection fails
    console.error("❌❌MongoDB connection failed:", error);
    // Exit the process with failure code
    process.exit(1);
  }
};

// Export the connectDB function as the default export
export default connectDB;
