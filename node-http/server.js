const express = require("express");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routers/authRouter");
const { Post, User } = require("./model-user");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

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

app.use(authRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
