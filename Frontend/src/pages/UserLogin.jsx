import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIroutes";
import AuthShell from "../components/AuthShell";

const UserLogin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });

  const handleValidation = () => {
    if (!values.password) {
      toast.error("Enter the complete password.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (!values.username) {
      toast.error("Enter the user name", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) return;

    try {
      const { data } = await axios.post(loginRoute, {
        username: values.username,
        password: values.password,
        role: "student",
      });

      if (data.status === false) toast.error(data.msg, { position: "bottom-right", autoClose: 5000 });
      if (data.status === true) {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate("/chat");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "bottom-right", autoClose: 5000 });
    }
  };

  const handleChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  return (
    <>
      <AuthShell
        title="Student login"
        subtitle="Access your complaint history, submit new issues, and message hostel administration."
        asideTitle="Everything students need to get help faster."
        asideText="HostelCare keeps complaint reporting simple while preserving the existing secure authentication flow."
        footer={
          <>
            New to HostelCare? <Link to="/register" className="font-bold text-blue-700">Create an account</Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="hc-label">Username</span>
            <input className="hc-input mt-2" type="text" name="username" placeholder="Enter username" onChange={handleChange} />
          </label>
          <label className="block">
            <span className="hc-label">Password</span>
            <input className="hc-input mt-2" type="password" name="password" placeholder="Enter password" onChange={handleChange} />
          </label>
          <button type="submit" className="hc-primary-btn w-full">Login as student</button>
        </form>
      </AuthShell>
      <ToastContainer />
    </>
  );
};

export default UserLogin;
