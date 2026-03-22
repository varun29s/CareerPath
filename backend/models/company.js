const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: String,
  minCGPA: Number,
  requiredSkills: [String],
  allowedBranches: [String],
  maxBacklogs: Number
});

module.exports = mongoose.model("Company", companySchema);