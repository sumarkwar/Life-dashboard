const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// Register route
app.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const newUser = new User({ name, phone, email, password });
    await newUser.save();

    res.send("Registered successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user");
  }
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});