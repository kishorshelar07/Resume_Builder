import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResumeTable() {
    const [resumes, setResumes] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost/resume_builder/resume_details/index.php')
            .then(response => {
                // Make sure the response data is an array
                setResumes(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => console.error("Error fetching resume data", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h3>Resume Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>LinkedIn</th>
                        <th>GitHub</th>
                        <th>Instagram</th>
                        <th>Objective</th>
                        <th>Language</th>
                        <th>Interest</th>
                        <th>Skill</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(resumes) && resumes.length > 0 ? (
                        resumes.map((resume, index) => (
                            <tr key={index}>
                                <td>{resume.name}</td>
                                <td>{resume.email}</td>
                                <td>{resume.phone}</td>
                                <td>{resume.address}</td>
                                <td>{resume.linkedin}</td>
                                <td>{resume.github}</td>
                                <td>{resume.instagram}</td>
                                <td>{resume.objective}</td>
                                <td>{resume.language}</td>
                                <td>{resume.interest}</td>
                                <td>{resume.skill}</td>
                                <td>{resume.title}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">No resume data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ResumeTable;
