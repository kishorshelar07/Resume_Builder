import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";


function UserForm() {
  const [form_data, set_form_data] = useState({
    usr_id: "",
    usr_name: "",
    usr_email: "",
    usr_no: null,
    usr_pass: "",
    usr_status: 1,
    usr_type: "",
  });

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // Fetch user data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost/resume_builder/user/index.php")
      .then((response) => {
        if (response.data && response.data.data) {
          setUsers(response.data.data); // Assuming 'data' holds user records array
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
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
    const requestMethod = form_data.usr_no ? "PUT" : "POST";

    axios({
      method: requestMethod,
      url: "http://localhost/resume_builder/user/index.php",
      data: form_data,
    })
      .then((response) => {
        const resp_data = response.data;

        if (resp_data && resp_data.data) {
          if (requestMethod === "POST") {
            setUsers((users) => [...users, resp_data.data]);
          } else if (requestMethod === "PUT") {
            setUsers((users) =>
              users.map((u) =>
                u.usr_no === form_data.usr_no ? resp_data.data : u
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

  const handleUpdate = (user) => {
    set_form_data({
      usr_id: user.usr_id,
      usr_name: user.usr_name,
      usr_email: user.usr_email,
      usr_no: user.usr_no,
      usr_pass: user.usr_pass,
      usr_status: user.usr_status,
      usr_type: user.usr_type,
    });
    setIsUpdate(true);
    setShowModal(true);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete the user: ${user.usr_name}?`)) {
      axios
        .delete(`http://localhost/resume_builder/user/index.php?usr_no=${user.usr_no}`)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((u) => u.usr_no !== user.usr_no)
          );
          console.log("User Deleted:", user);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const openModal = () => {
    set_form_data({
      usr_id: "",
      usr_name: "",
      usr_email: "",
      usr_no: null,
      usr_pass: "",
      usr_status: 1,
      usr_type: "",
    });
    setIsUpdate(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    set_form_data({
      usr_id: "",
      usr_name: "",
      usr_email: "",
      usr_no: null,
      usr_pass: "",
      usr_status: 1,
      usr_type: "",
    });
  };

  return (
    <div>
      <h2>User Management</h2>
      <button className="btn btn-primary" onClick={openModal}>
        Add User
      </button>

      {/* User Grid */}
      <div className="user-grid">
        <h3>Submitted Users:</h3>
        {users.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Status</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.usr_id}</td>
                  <td>{user.usr_name}</td>
                  <td>{user.usr_email}</td>
                  <td>{user.usr_pass}</td>
                  <td>{user.usr_status === 1 ? "Active" : "Inactive"}</td>
                  <td>{user.usr_type}</td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => handleUpdate(user)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(user)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users submitted yet.</p>
        )}
      </div>

      {/* Modal for Add and Update */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  {form_data.usr_no ? "Update User" : "Add User"}
                </h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  {/* Form Fields */}
                  <div className="form-group">
                    <label>ID:</label>
                    <input
                      type="text"
                      name="usr_id"
                      value={form_data.usr_id}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="usr_name"
                      value={form_data.usr_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="usr_email"
                      value={form_data.usr_email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="usr_pass"
                      value={form_data.usr_pass}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      name="usr_status"
                      value={form_data.usr_status}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Type:</label>
                    <select
                      name="usr_type"
                      value={form_data.usr_type}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="Admin">Admin</option>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {form_data.usr_no ? "Update" : "Submit"}
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

export default UserForm;
