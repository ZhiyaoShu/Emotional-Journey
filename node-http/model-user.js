const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const client = new MongoClient("mongodb://0.0.0.0:27017/nodemongo");

client
  .connect()
  .then(() => {
    const userSchema = new Mongodb.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
    });

    const User = Mongodb.model("User", userSchema);

    module.exports = {
      Post,
      User,
    };

    console.log("MongoDB connected");
  })
  .catch((err) => console.log("MongoDB connection error: ", err));
