const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./src/authRouter");
const { Post, User } = require("./src/model-user");
const path = require("path");
// const { fileURLToPath } = require("url");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://0.0.0.0:27017/smartdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });

app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.use("/", authRoutes);

// app.post("/signup", async (req, res) => {
//   try {
//     console.log(req.body);
//     const newUser = new User({
//       username: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });
//     await newUser.save();
//     res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
