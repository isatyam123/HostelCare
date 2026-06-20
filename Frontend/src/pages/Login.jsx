import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIroutes";
import AuthShell from "../components/AuthShell";

const Login = () => {
  const navigate = useNavigate();
  const [isadmin, setisadmin] = useState(false);
  const [values, setValues] = useState({ username: "", password: "", role: "student", secertkey: "" });

  const handleValidation = () => {
    if (!values.password) {
      toast.error("Enter the complete password.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (!values.username) {
      toast.error("Enter the user name", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (values.role === "admin" && !values.secertkey) {
      toast.error("Enter the secret key to login as admin", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) return;

    try {
      const { data } = await axios.post(loginRoute, values);
      if (data.status === false) toast.error(data.msg, { position: "bottom-right", autoClose: 5000 });
      if (data.status === true) {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate(isadmin ? "/admin" : "/chat");
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
        title="Login to HostelCare"
        subtitle="Choose your role and continue to the right workspace."
        asideTitle="One login flow for students and administrators."
        asideText="The same backend authentication route is preserved while the interface gets a cleaner, more responsive surface."
        footer={
          <>
            Do not have an account? <Link to="/register" className="font-bold text-blue-700">Register</Link>
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
              <span className="hc-label">Role</span>
              <select className="hc-input mt-2" name="role" onChange={handleChange} value={values.role}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="hc-label">Password</span>
            <input className="hc-input mt-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
          </label>
          {isadmin && (
            <label className="block">
              <span className="hc-label">Secret key</span>
              <input className="hc-input mt-2" type="text" name="secertkey" placeholder="Admin secret key" onChange={handleChange} />
            </label>
          )}
          <button type="submit" className="hc-primary-btn w-full">Login</button>
        </form>
      </AuthShell>
      <ToastContainer />
    </>
  );
};

export default Login;
