const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.post("/add", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.send("Student saved successfully");
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

module.exports = router;