// pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Complaint Management System</h1>
      <div style={{ marginTop: "20px" }}>
        <Link to="/user-login">
          <button style={{ marginRight: "20px", padding: "10px 20px" }}>User</button>
        </Link>
        <Link to="/admin-login">
          <button style={{ padding: "10px 20px" }}>Admin</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
