import { useState } from "react";
import axios from "axios";
import './App.css';
function App() {
  const [student, setStudent] = useState({
    name: "",
    cgpa: "",
    branch: "",
    skills: "",
    backlogs: ""
  });

  const [eligibleCompanies, setEligibleCompanies] = useState([]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/student/add", {
        ...student,
        cgpa: Number(student.cgpa),
        backlogs: Number(student.backlogs),
        skills: student.skills.split(",")
      });

      const id = response.data._id;

      const result = await axios.get(`http://localhost:5000/student/eligibility/${id}`);

      setEligibleCompanies(result.data);
    } catch (error) {
      console.log(error);
      alert("Error sending data");
    }
  };

  return (
    <div>
      <h1>CareerPath AI</h1>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="cgpa" placeholder="CGPA" onChange={handleChange} />
      <input name="branch" placeholder="Branch" onChange={handleChange} />
      <input name="skills" placeholder="Skills comma separated" onChange={handleChange} />
      <input name="backlogs" placeholder="Backlogs" onChange={handleChange} />

      <button onClick={handleSubmit}>Submit</button>

      <h2>Eligible Companies:</h2>
      <ul>
        {eligibleCompanies.map((company, index) => (
          <li key={index}>
  {company.companyName} - {company.score}% match
</li>
        ))}
      </ul>
    </div>
  );
}

export default App;