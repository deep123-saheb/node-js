import mongoose from "mongoose";


//  Mongoose schema for the User model.
 
//   @typedef {Object} User
//   @property {string} fullname - The full name of the user. This field is required .
//   @property {string} email - The email address of the user. This field is required.
//   @property {string} password - The hashed password of the user. This field is required.
 
//   @description
//   Defines the structure of the User document stored in MongoDB.
//   The schema enforces required fields and trims whitespace from the fullname.

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
export default User;
