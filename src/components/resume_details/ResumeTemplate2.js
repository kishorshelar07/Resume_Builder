// ResumeTemplate2.js
import React from "react";
import "./ResumeTemp.css"; // Use a different CSS file or add different classes for unique styling

function ResumeTemplate2({ resume }) {
  return (
    <div className="resume-template template-style-2">
      <div className="resume-header">
        <h1>{resume.name}</h1>
        <p>Email: {resume.email}</p>
        <p>Phone: {resume.phone}</p>
      </div>
      <div className="resume-section">
        <h3>Professional Experience</h3>
        <p>{resume.experience}</p>
      </div>
      <div className="resume-section">
        <h3>Academic Background</h3>
        <p>{resume.education}</p>
      </div>
      <div className="resume-section">
        <h3>Core Skills</h3>
        <p>{resume.skills}</p>
      </div>
      <div className="resume-section">
        <h3>Project Highlights</h3>
        <p>{resume.projects}</p>
      </div>
    </div>
  );
}

export default ResumeTemplate2;
