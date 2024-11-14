// Import necessary libraries and components
import React, { useState } from "react";
import ResumeTemplate from "./ResumeTemp";         // Import first resume template component
import ResumeTemplate2 from "./ResumeTemplate2";   // Import second resume template component
import ResumeTemplate3 from "./ResumeTemplete3";   // Import third resume template component
import "bootstrap/dist/css/bootstrap.min.css";     // Import Bootstrap CSS for styling

// Define ResumeForm component
function ResumeForm() {
  // State to track selected resume template; default is "template1"
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  // State to store form data entered by user
  const [form_data, set_form_data] = useState({
    name: "",         // User's name
    email: "",        // User's email address
    phone: "",        // User's phone number
    address: "",      // User's address
    experience: "",   // User's work experience
    education: "",    // User's education background
    skills: "",       // User's skills
    projects: ""      // User's project experience
  });

  // Function to update selected template based on user's choice
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template); // Update selected template
  };

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;             // Destructure name and value from event target
    set_form_data((form_data) => ({               // Update form_data state
      ...form_data,                               // Keep existing form data
      [name]: value,                              // Update the field that changed
    }));
  };

  // Function to render the selected resume template component
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template2":                           // If template2 is selected
        return <ResumeTemplate2 resume={form_data} />; // Render ResumeTemplate2 with form_data
      case "template3":                           // If template3 is selected
        return <ResumeTemplate3 resume={form_data} />; // Render ResumeTemplate3 with form_data
      default:                                    // Default template is template1
        return <ResumeTemplate resume={form_data} />;  // Render ResumeTemplate with form_data
    }
  };

  return (
    <div className="d-flex">                      {/* Flex container for layout */}
      <div className="form-container">            {/* Container for form and buttons */}
        <h2>Resume Details</h2>                   {/* Header for the form */}
        
        {/* Form to collect user resume data */}
        <form>
          {/* Loop through each field in form_data and generate input field */}
          {["name", "email", "phone", "address", "experience", "education", "skills", "projects"].map((field) => (
            <div className="form-group" key={field}> {/* Form group for each input field */}
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label> {/* Label for the input */}
              <input
                type="text"                       // Input type is text
                name={field}                      // Name attribute matches field key
                value={form_data[field]}          // Bind value to form_data state
                onChange={handleChange}           // Update form_data on change
                className="form-control"          // Bootstrap styling
                required                          // Make input required
              />
            </div>
          ))}
        </form>

        <h3>Select Template</h3>                  {/* Header for template selection */}
        
        {/* Buttons to select different resume templates */}
        <div className="d-flex">
          <button onClick={() => handleTemplateSelect("template1")} className="btn btn-outline-primary m-1">
            Template 1
          </button>
          <button onClick={() => handleTemplateSelect("template2")} className="btn btn-outline-secondary m-1">
            Template 2
          </button>
          <button onClick={() => handleTemplateSelect("template3")} className="btn btn-outline-success m-1">
            Template 3
          </button>
        </div>
      </div>

      <div className="template-preview">           {/* Container for template preview */}
        {renderTemplate()}                         {/* Render selected resume template */}
      </div>
    </div>
  );
}

export default ResumeForm;                           // Export ResumeForm component as default
