import React, { useState, useEffect } from "react";
import axios from "axios";
import ResumeTemplate from "./ResumeTemp";
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
    resume_id: null, // unique ID for each resume
  });

  const [resumes, setResumes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost/resume_builder/resume_details/index.php")
      .then((response) => {
        if (response.data && response.data.data) {
          setResumes(response.data.data); // Assuming 'data' holds resume records array
        }
      })
      .catch((error) => console.error("Error fetching resumes:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    set_form_data((form_data) => ({
      ...form_data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestMethod = form_data.resume_id ? "PUT" : "POST";

    axios({
      method: requestMethod,
      url: "http://localhost/resume_builder/resume_details/index.php",
      data: form_data,
    })
      .then((response) => {
        const resp_data = response.data;

        if (resp_data && resp_data.data) {
          if (requestMethod === "POST") {
            setResumes((resumes) => [...resumes, resp_data.data]);
          } else if (requestMethod === "PUT") {
            setResumes((resumes) =>
              resumes.map((r) =>
                r.resume_id === form_data.resume_id ? resp_data.data : r
              )
            );
          }
          closeModal();
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
      });
  };

  const handleUpdate = (resume) => {
    set_form_data({
      ...resume, // Populate form with existing data
    });
    setIsUpdate(true);
    setShowModal(true);
  };

  const handleDelete = (resume) => {
    if (window.confirm(`Are you sure you want to delete this resume?`)) {
      axios
        .delete(`http://localhost/resume_builder/resume_details/index.php?resume_id=${resume.resume_id}`)
        .then(() => {
          setResumes((prevResumes) =>
            prevResumes.filter((r) => r.resume_id !== resume.resume_id)
          );
          console.log("Resume Deleted:", resume);
        })
        .catch((error) => {
          console.error("Error deleting resume:", error);
        });
    }
  };

  const openModal = () => {
    set_form_data({
      name: "",
      email: "",
      phone: "",
      address: "",
      experience: "",
      education: "",
      skills: "",
      projects: "",
      resume_id: null,
    });
    setIsUpdate(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    set_form_data({
      name: "",
      email: "",
      phone: "",
      address: "",
      experience: "",
      education: "",
      skills: "",
      projects: "",
      resume_id: null,
    });
  };

  return (
    <div className="container">
      <h2>Resume Builder</h2>
      <div className="d-flex">
        {/* Left side: Form */}
        <div className="col-md-6">
          {/* <button className="btn btn-primary mb-3" onClick={openModal}>
            {isUpdate ? "Update Resume" : "Add Resume"}
          </button> */}
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
            <button type="submit" className="btn btn-primary">
              {form_data.resume_id ? "Update" : "Submit"}
            </button>
          </form>
          
        </div>

        {/* Right side: Resume Template */}
        <div className="col-md-6">
          <ResumeTemplate resume={form_data} />
        </div>
        
      </div>
      
    </div>
  );
}

export default ResumeForm;
