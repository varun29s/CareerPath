const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.post("/add", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.send(error);
  }
});

//add
router.get("/all", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.send(error);
  }
});
const Company = require("../models/company");

router.get("/eligibility/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const companies = await Company.find();

    const eligibleCompanies = companies.filter(company =>
      student.cgpa >= company.minCGPA &&
      student.backlogs <= company.maxBacklogs &&
      company.allowedBranches.includes(student.branch)
    );

   const scoredCompanies = eligibleCompanies.map(company => ({
  companyName: company.companyName,
  score: Math.floor(Math.random() * 20) + 80
}));

res.json(scoredCompanies);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;