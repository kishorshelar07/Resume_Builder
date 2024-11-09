import React, { useState } from 'react';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    language: '',
    interest: '',
    skill: '',
    linkedin: '',
    github: '',
    instagram: '',
    objective: '',
    title: '',
    profilePic: null,
    experience: [{ position: '', company: '', duration: '', present: false }],
    education: [{ course: '', college: '', percentage: '', duration: '', present: false }],
    projects: [{ title: '', description: '' }],
    certificates: [{ title: '', description: '', date: '' }]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (e.target.type === 'file') {
      setFormData({
        ...formData,
        profilePic: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const addExperienceField = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { position: '', company: '', duration: '', present: false }]
    });
  };

  const removeExperienceField = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      experience: updatedExperience
    });
  };

  const addEducationField = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { course: '', college: '', percentage: '', duration: '', present: false }]
    });
  };

  const removeEducationField = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };

  const addProjectField = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '' }]
    });
  };

  const removeProjectField = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      projects: updatedProjects
    });
  };

  const addCertificateField = () => {
    setFormData({
      ...formData,
      certificates: [...formData.certificates, { title: '', description: '', date: '' }]
    });
  };

  const removeCertificateField = (index) => {
    const updatedCertificates = formData.certificates.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      certificates: updatedCertificates
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending data to the backend)
    console.log(formData);
  };

  return (
    <div className="container" id="form_Container">
      <h1 className="text-center my-2">Resume Builder</h1>
      <h3 className="text-center my-2">Fill your details</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div id="personal_info" className="col-md-6">
            <h4 className="text-center">Personal Information</h4>
            <div className="form-group mt-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                required
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                required
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div className="form-group mt-2">
              <label htmlFor="contact">Contact</label>
              <input
                type="number"
                required
                className="form-control"
                id="contact"
                name="contact"
                placeholder="Enter your phone number"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="address">Address</label>
              <textarea
                name="address"
                required
                className="form-control"
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group language_field mt-2">
              <label>Languages</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="language"
                placeholder="Enter your languages separated by commas not spaces!"
                value={formData.language}
                onChange={handleChange}
              />
              <small className="form-text text-muted">Hindi,English</small>
            </div>

            <div className="form-group interest_field mt-2">
              <label>Interests</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="interest"
                placeholder="Enter your interests separated by commas not spaces!"
                value={formData.interest}
                onChange={handleChange}
              />
              <small className="form-text text-muted">Reading Books,Listening Music</small>
            </div>

            <div className="form-group skill_field mt-2">
              <label>Skills</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="skill"
                placeholder="Enter your skills separated by commas not spaces!"
                value={formData.skill}
                onChange={handleChange}
              />
              <small className="form-text text-muted">PHP,jquery,HTML</small>
            </div>

            <p className="secondary-text mt-2">Important Links</p>

            <div className="form-group mt-2">
              <label htmlFor="linkedin">Linkedin</label>
              <input
                type="text"
                className="form-control"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="github">GitHub</label>
              <input
                type="text"
                className="form-control"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                className="form-control"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </div>
          </div>

          <div id="professional_info" className="col-md-6">
            <h4 className="text-center">Professional Information</h4>

            <div className="form-group mt-2">
              <label htmlFor="objective">Career Objective</label>
              <textarea
                name="objective"
                required
                className="form-control"
                id="objective"
                value={formData.objective}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                required
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter your title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label className="form-label" htmlFor="profilePic">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="profilePic"
                name="profilePic"
                onChange={handleChange}
              />
            </div>

            <h5 className="mt-2">Work Experience</h5>
            <div className="form-group" id="experience">
              {formData.experience.map((experience, index) => (
                <div className="experience_field mt-3" key={index}>
                  <button
                    className="btn btn-outline-danger btn-sm float-end remove_field mb-2"
                    type="button"
                    onClick={() => removeExperienceField(index)}
                    title="remove experience field"
                  >
                    Remove
                  </button>
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      className="form-control"
                      name="position"
                      value={experience.position}
                      onChange={(e) => {
                        const updatedExperience = [...formData.experience];
                        updatedExperience[index].position = e.target.value;
                        setFormData({ ...formData, experience: updatedExperience });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      value={experience.company}
                      onChange={(e) => {
                        const updatedExperience = [...formData.experience];
                        updatedExperience[index].company = e.target.value;
                        setFormData({ ...formData, experience: updatedExperience });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      name="duration"
                      value={experience.duration}
                      onChange={(e) => {
                        const updatedExperience = [...formData.experience];
                        updatedExperience[index].duration = e.target.value;
                        setFormData({ ...formData, experience: updatedExperience });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Present:
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="present"
                        checked={experience.present}
                        onChange={(e) => {
                          const updatedExperience = [...formData.experience];
                          updatedExperience[index].present = e.target.checked;
                          setFormData({ ...formData, experience: updatedExperience });
                        }}
                      />
                    </label>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm my-2"
                onClick={addExperienceField}
              >
                Add Experience
              </button>
            </div>

            <h5 className="mt-2">Education</h5>
            <div className="form-group" id="education">
              {formData.education.map((education, index) => (
                <div className="education_field mt-3" key={index}>
                  <button
                    className="btn btn-outline-danger btn-sm float-end remove_field mb-2"
                    type="button"
                    onClick={() => removeEducationField(index)}
                    title="remove education field"
                  >
                    Remove
                  </button>
                  <div className="form-group">
                    <label>Course</label>
                    <input
                      type="text"
                      className="form-control"
                      name="course"
                      value={education.course}
                      onChange={(e) => {
                        const updatedEducation = [...formData.education];
                        updatedEducation[index].course = e.target.value;
                        setFormData({ ...formData, education: updatedEducation });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>College</label>
                    <input
                      type="text"
                      className="form-control"
                      name="college"
                      value={education.college}
                      onChange={(e) => {
                        const updatedEducation = [...formData.education];
                        updatedEducation[index].college = e.target.value;
                        setFormData({ ...formData, education: updatedEducation });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Percentage</label>
                    <input
                      type="text"
                      className="form-control"
                      name="percentage"
                      value={education.percentage}
                      onChange={(e) => {
                        const updatedEducation = [...formData.education];
                        updatedEducation[index].percentage = e.target.value;
                        setFormData({ ...formData, education: updatedEducation });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      name="duration"
                      value={education.duration}
                      onChange={(e) => {
                        const updatedEducation = [...formData.education];
                        updatedEducation[index].duration = e.target.value;
                        setFormData({ ...formData, education: updatedEducation });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Present:
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="present"
                        checked={education.present}
                        onChange={(e) => {
                          const updatedEducation = [...formData.education];
                          updatedEducation[index].present = e.target.checked;
                          setFormData({ ...formData, education: updatedEducation });
                        }}
                      />
                    </label>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm my-2"
                onClick={addEducationField}
              >
                Add Education
              </button>
            </div>
          </div>

          <div className="col-md-12 text-center mt-4">
            <button type="submit" className="btn btn-success my-3">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResumeBuilder;
