const express = require("express");
const router = express.Router();
const { User } = require("./model-user");

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
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid username or password");
    }
    res.redirect("/userportal.html");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

router.post("/logout", (req, res) => {
  res.redirect("/login");
});

module.exports = router;
