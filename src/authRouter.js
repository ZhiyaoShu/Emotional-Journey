const express = require("express");
const router = express.Router();
const { User } = require("./model-user");
const bcrypt = require("bcrypt");

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      username: username,
      password: hashedPassword,
      email: email,
    });

    // Save the user to the database
    await newuser.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error signing up");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).send("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("Invalid password");
      return res.status(401).send("Invalid email or password");
    }

    console.log("Login successful");
    res.redirect("/userportal.html");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
});

router.post("/logout", (req, res) => {
  res.redirect("/login");
});

router.get("/user-data", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error retrieving users");
  }
});

module.exports = router;
