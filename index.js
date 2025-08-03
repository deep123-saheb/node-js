import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let user = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the API!");
});

app.get("/api/getAllUsers", (req, res) => {
  res.status(200).json({
    success: true,
    data: user,
  });
});

app.post("/api/v1/user/create", (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    // Basic validation
    if (!data.name || !data.email) {
      return res.status(400).json({
        success: false,
        message: "Please provide name and email",
      });
    }

    // Generate new ID
    const newUser = {
      id: user.length + 1,
      name: data.name,
      email: data.email,
    };

    user.push(newUser);
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.delete("/api/v1/user/delete/:id", (req, res) => {
  try{
    const userId= parseInt(req.params.id);
    if(isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }
    else if(userId <= 0 || userId > user.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  else{
  let filteredUsers = user.filter((u) => u.id !== userId);
   if(filteredUsers.length === user.length) {
    return res.status(400).json({
      success: false,
      message: "User not deleted",
    });
  }else {
    user = filteredUsers;
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }
}
} catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
