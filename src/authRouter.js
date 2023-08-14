const express = require("express");
const router = express.Router();
const { User } = require("./model-user");

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = new User({ username, password, email });

    // Save the user to the database
    await user.save();

    // Redirect the user to the login page
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !user.verifyPassword(password)) {
      return res.status(401).send("Invalid username or password");
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  res.redirect("/login");
});

module.exports = router;
