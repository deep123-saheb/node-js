import mongoose from "mongoose";

//  Mongoose schema for the Todo model.

//   @typedef {Object} Todo
//   @property {string} title - The title of the todo item. This field is required.
//   @property {string} description - The description of the todo item. This field is required.
//   @property {boolean} completed - The completion status of the todo item. This field is required.

//   @description
//   Defines the structure of the Todo document stored in MongoDB.
//   The schema enforces required fields and trims whitespace from the title.

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
