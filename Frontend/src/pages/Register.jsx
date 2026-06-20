import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIroutes";
import AuthShell from "../components/AuthShell";

const Register = () => {
  const navigate = useNavigate();
  const [isadmin, setisadmin] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "student",
    secertkey: "",
  });

  const handleValidation = () => {
    if (values.password !== values.confirmPassword) {
      toast.error("Password and confirm password should be the same.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (values.username.length < 3) {
      toast.error("Username should be greater than 3 characters.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (values.password.length < 6) {
      toast.error("Password should be equal or greater than 6 characters.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (!values.email) {
      toast.error("Email is required.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (!values.gender) {
      toast.error("Gender is required.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) return;

    const { email, username, password, gender, role, secertkey } = values;
    try {
      const { data } = await axios.post(registerRoute, { username, email, password, gender, role, secertkey });
      if (data.status === false) toast.error(data.msg, { position: "bottom-right", autoClose: 5000 });
      if (data.status === true) {
        delete data.user.password;
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate(data.user.isadmin ? "/admin" : "/chat");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "bottom-right", autoClose: 5000 });
    }
  };

  const handleChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  useEffect(() => {
    setisadmin(values.role === "admin");
  }, [values.role]);

  return (
    <>
      <AuthShell
        title="Create your HostelCare account"
        subtitle="Join as a student or register an admin account with the existing secret key flow."
        asideTitle="Start tracking hostel issues in minutes."
        asideText="Registration keeps the existing avatar, role, and admin key behavior while giving the form better spacing and mobile ergonomics."
        footer={
          <>
            Already have an account? <Link to="/login" className="font-bold text-blue-700">Login</Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="hc-label">Username</span>
              <input className="hc-input mt-2" type="text" name="username" placeholder="Username" onChange={handleChange} />
            </label>
            <label className="block">
              <span className="hc-label">Email</span>
              <input className="hc-input mt-2" type="email" name="email" placeholder="name@example.com" onChange={handleChange} />
            </label>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="hc-label">Password</span>
              <input className="hc-input mt-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
            </label>
            <label className="block">
              <span className="hc-label">Confirm password</span>
              <input className="hc-input mt-2" type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} />
            </label>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="hc-label">Gender</span>
              <select className="hc-input mt-2" name="gender" onChange={handleChange} value={values.gender}>
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="block">
              <span className="hc-label">Role</span>
              <select className="hc-input mt-2" name="role" onChange={handleChange} value={values.role}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
          {isadmin && (
            <label className="block">
              <span className="hc-label">Secret key</span>
              <input className="hc-input mt-2" type="text" name="secertkey" placeholder="Admin secret key" onChange={handleChange} />
            </label>
          )}
          <button type="submit" className="hc-primary-btn w-full">Create account</button>
        </form>
      </AuthShell>
      <ToastContainer />
    </>
  );
};

export default Register;
