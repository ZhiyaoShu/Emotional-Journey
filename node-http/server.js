const express = require("express");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
const MongoClient = require("mongodb");

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

const client = new MongoClient("mongodb://0.0.0.0:27017/nodemongo");
client.connect(),
  then(() => console.log("MongoDB connected")).catch((err) =>
    console.error("MongoDB connection error: ", err)
  );
