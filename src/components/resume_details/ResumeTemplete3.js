// ResumeTemplate3.js
import React from "react";
import "./Temp3.css"
function ResumeTemplate3({ resume }) {
  return (
    <div className="resume-template template-style-3">
      <header className="resume-header">
        <h1>{resume.name}</h1>
        <p>{resume.email} | {resume.phone} | {resume.address}</p>
      </header>
      <section className="resume-content">
        <div>
          <h4>Experience</h4>
          <p>{resume.experience}</p>
        </div>
        <div>
          <h4>Education</h4>
          <p>{resume.education}</p>
        </div>
        <div>
          <h4>Skills</h4>
          <p>{resume.skills}</p>
        </div>
        <div>
          <h4>Projects</h4>
          <p>{resume.projects}</p>
        </div>
      </section>
    </div>
  );
}

export default ResumeTemplate3;
