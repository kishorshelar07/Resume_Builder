// ResumeTemplate.js
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./ResumeTemp.css"; // Add custom styling for the resume template

function ResumeTemplate({ resume }) {
  const resumeRef = useRef();

  const downloadResume = () => {
    const button = document.querySelector(".pdf-hidden"); // Select the button to hide
    button.style.display = "none"; // Hide the button

    html2canvas(resumeRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");

      button.style.display = "block"; // Show the button again after PDF download
    });
  };

  return (
    <div className="resume-template" ref={resumeRef}>
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

      {/* Download Button */}
      <button onClick={downloadResume} className="btn btn-success mt-3 pdf-hidden">
        Download Resume as PDF
      </button>
    </div>
  );
}

export default ResumeTemplate;
