const express = require("express");
const router = express.Router();
const Company = require("../models/company");

// Add Company
router.post("/add", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json({
      success: true,
      message: "Company saved successfully",
    });
  } catch (error) {
    console.error("POST /company/add Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Companies
router.get("/all", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("GET /company/all Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete Company
router.delete("/delete/:id", async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /company/delete Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;