import React, { useState } from "react";
import axios from "axios";
import ResumeTemplate from "./ResumeTemp";
import ResumeTemplate2 from "./ResumeTemplate2";
import ResumeTemplate3 from "./ResumeTemplete3";
import "bootstrap/dist/css/bootstrap.min.css";

function ResumeForm() {
  const [form_data, set_form_data] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    education: "",
    skills: "",
    projects: "",
  });

  const [loading, setLoading] = useState(false); // To show a loading state
  const [saved, setSaved] = useState(false); // Track if data has been saved
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Track selected template

  const handleChange = (e) => {
    const { name, value } = e.target;
    set_form_data((form_data) => ({
      ...form_data,
      [name]: value,
    }));
  };

  // Function to submit form data to the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost/resume_builder/resume_details/index.php",
        JSON.stringify(form_data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Resume data saved successfully!");
        setSaved(true); // Indicate data is saved
      } else {
        alert("Failed to save resume data.");
      }
    } catch (error) {
      console.error("Error saving resume data:", error);
      alert("An error occurred while saving the data.");
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <ResumeTemplate resume={form_data} />;
      case "template2":
        return <ResumeTemplate2 resume={form_data} />;
      case "template3":
        return <ResumeTemplate3 resume={form_data} />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex">
      <div className="form-container">
        <h2>Resume Details</h2>

        <form onSubmit={handleSubmit}>
          {["name", "email", "phone", "address", "experience", "education", "skills", "projects"].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="text"
                name={field}
                value={form_data[field]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
            {loading ? "Saving..." : "Save Resume"}
          </button>
        </form>

        {saved && (
          <div>
            <h3>Select Template</h3>
            <div className="d-flex">
              <button
                onClick={() => setSelectedTemplate("template1")}
                className="btn btn-outline-primary m-1"
              >
                Template 1
              </button>
              <button
                onClick={() => setSelectedTemplate("template2")}
                className="btn btn-outline-secondary m-1"
              >
                Template 2
              </button>
              <button
                onClick={() => setSelectedTemplate("template3")}
                className="btn btn-outline-success m-1"
              >
                Template 3
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="template-preview">{renderTemplate()}</div>
    </div>
  );
}

export default ResumeForm;
