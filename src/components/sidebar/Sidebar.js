import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css"; // Make sure this file is correct
import UserForm from "../user/Form";
function Sidebar() {
  // State to toggle the sidebar visibility
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  // State to handle the current selected page (like user details, resume details, etc.)
  const [selectedPage, setSelectedPage] = useState(null); 

  // Toggle sidebar on button click
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  // Handler for when a menu item is clicked
  const handlePageSelection = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="wrapper">
      <nav id="sidebar" className={isSidebarActive ? "active" : ""}>
        <div className="sidebar-header">
          <h3> Sidebar</h3>
        </div>

        <ul className="list-unstyled components">
          <p>Heading</p>
          <li className="active">
            <a href="#" onClick={() => handlePageSelection("home")}>
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handlePageSelection("userDetails")}>
              User Details
            </a>
          </li>
          <li>
            <a href="#" >
              Resume Details
            </a>
          </li>
        </ul>

        <ul className="list-unstyled CTAs">
          <li>
            <a href="#" className="article">
              Log Out
            </a>
          </li>
        </ul>
      </nav>

      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-info"
              onClick={toggleSidebar}
            >
              <i className="fas fa-align-left"></i>
              <span>Toggle Sidebar</span>
            </button>
            <button
              className="btn btn-dark d-inline-block d-lg-none ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-align-justify"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Page
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Conditionally render the selected page */}
        {selectedPage === "userDetails" && <UserForm />}
        {selectedPage === "home" && <h3>Welcome To Dashboard</h3>}
        {/* You can add similar conditions for other pages like 'resumeDetails' */}
      </div>
    </div>
  );
}

export default Sidebar;
