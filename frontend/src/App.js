import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [eligibleCompanies, setEligibleCompanies] = useState([]);

  const [student, setStudent] = useState({
    name: "",
    cgpa: "",
    branch: "",
    skills: "",
    backlogs: ""
  });

  useEffect(() => {
    axios.get("http://localhost:5000/company/all")
      .then(res => setCompanies(res.data))
      .catch(err => console.log(err));
  }, []);

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
      
setEligibleCompanies(result.data.eligible || []);
setSuggestions(result.data.suggestions || []);

      let calculatedScore =
        Number(student.cgpa) * 10 +
        student.skills.split(",").length * 10 -
        Number(student.backlogs) * 5;

      if (calculatedScore > 100) calculatedScore = 100;

      setScore(calculatedScore);

    } catch (error) {
      console.log(error);
      alert("Error sending data");
    }
  };

  return (
    <div className="container">
      <h1>CareerPath AI</h1>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="cgpa" placeholder="CGPA" onChange={handleChange} />
      <input name="branch" placeholder="Branch" onChange={handleChange} />
      <input name="skills" placeholder="Skills comma separated" onChange={handleChange} />
      <input name="backlogs" placeholder="Backlogs" onChange={handleChange} />

      <button onClick={handleSubmit}>Submit</button>

      <h2>Placement Readiness Score: {score}%</h2>

      <h2>Eligible Companies:</h2>
      <ul>
        {(eligibleCompanies || []).map((company, index) => (
          <li key={index}>
            {company.companyName} - {company.score}% match
          </li>
        ))}
      </ul>

      <input
        placeholder="Search company"
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Available Companies</h2>
      <ul>
        {companies
          .filter(company =>
            company.companyName.toLowerCase().includes(search.toLowerCase())
          )
          .map((company, index) => (
            <li key={index}>{company.companyName}</li>
          ))}
      </ul>

      <h2>Missing Skills</h2>
      <ul>
        {(suggestions || []).map((item, index) => (
          <li key={index}>
            {item.companyName} → {item.missingSkills.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;