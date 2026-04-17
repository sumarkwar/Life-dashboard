const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Simple User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// REGISTER ROUTE ✅
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new User({ email, password });
    await newUser.save();

    console.log("User Registered:", email);

    // Redirect to login page
    res.redirect("/index.html");

  } catch (err) {
    console.log(err);
    res.send("Error registering user");
  }
});


// LOGIN ROUTE ✅
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    if (user.password !== password) {
      return res.send("Wrong password");
    }

    console.log("Login success:", email);

    // Redirect to dashboard
    res.redirect("/dashboard.html");

  } catch (err) {
    console.log(err);
    res.send("Login error");
  }
});


// PORT (IMPORTANT for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});