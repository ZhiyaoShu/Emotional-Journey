const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./src/authRouter");
const { Post, User } = require("./src/model-user");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
// });

mongoose
  .connect("mongodb://0.0.0.0:27017/nodemongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });

app.use("/", authRoutes);
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
