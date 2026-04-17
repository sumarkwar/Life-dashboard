const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// ROUTE FOR HOME PAGE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Example login route
app.post("/login", async (req, res) => {
  res.send("Login route working");
});

  app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  console.log("Register:", email, password);

  res.send(`
  <script>
    alert("Registered successfully!");
    window.location.href = "/index.html";
  </script>
`);

});

// Port (IMPORTANT for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});