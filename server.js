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

app.use(
  express.static(path.join(__dirname, "public", "index.html"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.use("/", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public"));
});

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
