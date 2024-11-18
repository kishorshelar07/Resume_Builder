import React, { useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./ResumeTemp.css";

function ResumeTemplate({ resume }) {
  const [editableFields, setEditableFields] = useState(resume); // State to track editable fields
  const [editingField, setEditingField] = useState(null); // Track the currently editing field
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

  const handleDoubleClick = (field) => {
    setEditingField(field); // Set the field to be editable
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEditableFields((prev) => ({
      ...prev,
      [editingField]: value, // Update the value of the editing field
    }));
  };

  const handleBlur = async () => {
    if (editingField) {
      try {
        // Send updated data to the server
        const response = await axios.post(
          "http://localhost/resume_builder/resume_details/update_resume.php", // Your API endpoint
          JSON.stringify({ field: editingField, value: editableFields[editingField] }), // Data to send
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          console.log(`${editingField} updated successfully.`);
        } else {
          console.error(`Failed to update ${editingField}.`);
        }
      } catch (error) {
        console.error("Error updating the field:", error);
      }
    }
    setEditingField(null); // Exit editing mode
  };

  return (
    <div className="resume-template" ref={resumeRef}>
      <div className="resume-header">
        <h1
          onDoubleClick={() => handleDoubleClick("name")}
          contentEditable={editingField === "name"}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onInput={(e) => handleChange(e)}
        >
          {editableFields.name}
        </h1>
        <p
          onDoubleClick={() => handleDoubleClick("email")}
          contentEditable={editingField === "email"}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onInput={(e) => handleChange(e)}
        >
          <strong>Email:</strong> {editableFields.email}
        </p>
        <p
          onDoubleClick={() => handleDoubleClick("phone")}
          contentEditable={editingField === "phone"}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onInput={(e) => handleChange(e)}
        >
          <strong>Phone:</strong> {editableFields.phone}
        </p>
        <p
          onDoubleClick={() => handleDoubleClick("address")}
          contentEditable={editingField === "address"}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onInput={(e) => handleChange(e)}
        >
          <strong>Address:</strong> {editableFields.address}
        </p>
      </div>

      <div className="resume-section">
        <h2>Experience</h2>
        <p
          onDoubleClick={() => handleDoubleClick("experience")}
          contentEditable={editingField === "experience"}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onInput={(e) => handleChange(e)}
        >
          {editableFields.experience}
        </p>
      </div>

      <div className="resume-section">
        <h2>Education</h2>
        <p
          onDoubleClick={() => handleDoubleClick("education")}
          contentEditable={editingField === "education"}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onInput={(e) => handleChange(e)}
        >
          {editableFields.education}
        </p>
      </div>

      <div className="resume-section">
        <h2>Skills</h2>
        <p
          onDoubleClick={() => handleDoubleClick("skills")}
          contentEditable={editingField === "skills"}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onInput={(e) => handleChange(e)}
        >
          {editableFields.skills}
        </p>
      </div>

      <div className="resume-section">
        <h2>Projects</h2>
        <p
          onDoubleClick={() => handleDoubleClick("projects")}
          contentEditable={editingField === "projects"}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onInput={(e) => handleChange(e)}
        >
          {editableFields.projects}
        </p>
      </div>

      {/* Download Button */}
      <button onClick={downloadResume} className="btn btn-success mt-3 pdf-hidden">
        Download Resume as PDF
      </button>
    </div>
  );
}

export default ResumeTemplate;
