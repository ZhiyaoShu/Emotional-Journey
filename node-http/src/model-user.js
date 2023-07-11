const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/nodemongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  const userSchema = new mongoose.Schema({
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

  const User = mongoose.model("User", userSchema);

  module.exports = {
    User,
  };

  // console.log("MongoDB connected");
});

db.on("error", (err) => {
  console.log("MongoDB connection error: ", err);
});
