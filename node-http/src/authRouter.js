const express = require("express");
const router = express.Router();
const { User } = require("./model-user");

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = new User({ username, password, email });

    //save the user to the database
    await user.save();

    //redirect the user to the login page
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !user.verifyPassword(password)) {
      return res.status(401).send("Invalid username or password");
    }
    res.redirect("/");
  } catch (Error) {
    console.error(error);
    res.status(500).send("Error logging up");
  }
});

router.post("/logout", (req, res) => {
  res.redirect("/login");
});
module.exports = router;
