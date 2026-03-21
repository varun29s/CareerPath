const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();   // ← write here

const studentRoute = require("./routes/studentRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/student", studentRoute);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});