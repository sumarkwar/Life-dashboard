const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/dashboard")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// USER SCHEMA
const UserSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

// REGISTER
app.post("/register", async (req, res) => {
    const { name, phone, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await User.create({ name, phone, email, password: hash });

    res.send("Registered successfully");
});

// LOGIN
app.post("/login", async (req, res) => {
    const { identifier, password } = req.body;

    const user = await User.findOne({
        $or: [{ email: identifier }, { phone: identifier }]
    });

    if (!user) return res.send("User not found");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.send("Wrong password");

    res.send("Login success");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));