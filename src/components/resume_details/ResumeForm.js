import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
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

  const handleView = (resume) => {
    const newTab = window.open("", "_blank");
    newTab.document.write("<!DOCTYPE html><html><head><title>Resume</title></head><body></body></html>");
  
    newTab.document.body.innerHTML = `<div id="resume-root"></div>`;
  
    const resumeDataScript = document.createElement("script");
    resumeDataScript.innerHTML = `
      window.resumeData = ${JSON.stringify(resume)};
      setTimeout(() => {
        const container = document.getElementById("resume-root");
        container.innerHTML = ReactDOMServer.renderToString(
          <ResumeTemplate resume={window.resumeData} />
        );
      }, 100);
    `;
  
    newTab.document.head.appendChild(resumeDataScript);
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
    <div>
      <h2>Resume Details</h2>
      <button className="btn btn-primary" onClick={openModal}>
        Add Resume
      </button>

      {/* Resume Grid */}
      <div className="resume-grid">
        {/* <h3>Submitted Resumes:</h3> */}
        {resumes.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Experience</th>
                <th>Education</th>
                <th>Skills</th>
                <th>Projects</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume, index) => (
                <tr key={index}>
                  <td>{resume.name}</td>
                  <td>{resume.email}</td>
                  <td>{resume.phone}</td>
                  <td>{resume.address}</td>
                  <td>{resume.experience}</td>
                  <td>{resume.education}</td>
                  <td>{resume.skills}</td>
                  <td>{resume.projects}</td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => handleUpdate(resume)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(resume)}>
                      Delete
                    </button>
                    <button className="btn btn-info" onClick={() => handleView(resume)}>
    View
  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No resumes submitted yet.</p>
        )}
      </div>

      {/* Modal for Add and Update */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  {form_data.resume_id ? "Update Resume" : "Add Resume"}
                </h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  {/* Form Fields */}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeForm;
