// ResumeTemplate.js
import React from "react";
import "./ResumeTemp.css"; // Add custom styling for the resume template

function ResumeTemplate({ resume }) {
  return (
    <div className="resume-template">
      <div className="resume-header">
        <h1>{resume.name}</h1>
        <p><strong>Email:</strong> {resume.email}</p>
        <p><strong>Phone:</strong> {resume.phone}</p>
        <p><strong>Address:</strong> {resume.address}</p>
      </div>
      
      <div className="resume-section">
        <h2>Experience</h2>
        <p>{resume.experience}</p>
      </div>

      <div className="resume-section">
        <h2>Education</h2>
        <p>{resume.education}</p>
      </div>

      <div className="resume-section">
        <h2>Skills</h2>
        <p>{resume.skills}</p>
      </div>

      <div className="resume-section">
        <h2>Projects</h2>
        <p>{resume.projects}</p>
      </div>
    </div>
  );
}

export default ResumeTemplate;
