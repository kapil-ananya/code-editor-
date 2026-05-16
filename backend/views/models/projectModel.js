const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ananya:ananya%2D123@cluster0.qwftc88.mongodb.net/codeIDE",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const projectSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  date: {
    type: Date,
    default: Date.now,
  },
  htmlCode: {
    type: String,
    default:
      "<!DOCTYPE html><html>\n<head>\n<title>My Project</title>\n</head>\n<body>\n\n</body>\n</html>",
  },
  cssCode: {
    type: String,
    default: "body { font-family: Arial; }",
  },
  jsCode: {
    type: String,
    default: "console.log('Hello World');",
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
