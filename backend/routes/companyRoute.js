const express = require("express");
const router = express.Router();
const Company = require("../models/company");

router.post("/add", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.send("Company saved successfully");
  } catch (error) {
    res.send(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.send(error);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.send("Company deleted successfully");
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;