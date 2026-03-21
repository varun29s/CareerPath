const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  cgpa: Number,
  branch: String,
  skills: [String],
  backlogs: Number
});

module.exports = mongoose.model("Student", studentSchema);