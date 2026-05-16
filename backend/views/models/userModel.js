const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ananya:ananya%2D123@cluster0.qwftc88.mongodb.net/codeIDE")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;