import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createComplaintRoute } from "../utils/APIroutes";
import { PageNav } from "../components/ui";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dg5z3w7co/image/upload";
const cloudinaryUploadPreset = "hostelcare_uploads";

const categories = ["Electricity", "Water", "Internet", "Furniture", "Mess", "Cleanliness", "Other"];
const priorities = ["Low", "Medium", "High"];

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    username: currentUser?.username || "",
    rollNumber: "",
    roomNumber: "",
    category: "Other",
    priority: "Medium",
    complaint: "",
    image: null,
  });

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  const handleValidation = () => {
    if (values.username.length < 3) {
      toast.error("Username should be greater than 3 characters.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (!values.rollNumber) {
      toast.error("Roll number is required.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (!values.roomNumber) {
      toast.error("Room number is required.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    if (!values.complaint) {
      toast.error("Complaint is required.", { position: "bottom-right", autoClose: 5000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) return;
    setIsSubmitting(true);

    try {
      let imageUrl = null;
      if (values.image) {
        const formData = new FormData();
        formData.append("file", values.image);
        formData.append("upload_preset", cloudinaryUploadPreset);
        const cloudinaryResponse = await axios.post(cloudinaryUploadUrl, formData);
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const complaintData = {
        username: values.username,
        rollNumber: values.rollNumber,
        roomNumber: values.roomNumber,
        category: values.category,
        priority: values.priority,
        from: currentUser._id,
        complaint: values.complaint,
        imageUrl,
      };

      const response = await axios.post(createComplaintRoute, complaintData);
      if (response.data.status === false) toast.error(response.data.msg, { position: "bottom-right", autoClose: 5000 });
      if (response.data.status === true) {
        toast.success("Complaint submitted successfully!", { position: "bottom-right", autoClose: 5000 });
        navigate("/complains");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "bottom-right", autoClose: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setValues({ ...values, [name]: name === "image" ? files[0] : value });
  };

  return (
    <main className="hc-page">
      <PageNav currentUser={currentUser} />
      <section className="hc-container py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="hc-badge bg-blue-50 text-blue-700 ring-1 ring-blue-200">New complaint</span>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">Tell the hostel team what needs attention.</h1>
            <p className="mt-4 text-slate-600">
              Add the room details, describe the issue clearly, and attach a photo when it helps the admin team understand the request.
            </p>
            <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
              Your existing account and Cloudinary upload flow are used automatically.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="hc-card p-5 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="hc-label">Roll number</span>
                <input className="hc-input mt-2" type="text" name="rollNumber" placeholder="Example: 22CS104" onChange={handleChange} />
              </label>
              <label className="block">
                <span className="hc-label">Room number</span>
                <input className="hc-input mt-2" type="text" name="roomNumber" placeholder="Example: B-204" onChange={handleChange} />
              </label>
              <label className="block">
                <span className="hc-label">Category</span>
                <select className="hc-input mt-2" name="category" value={values.category} onChange={handleChange}>
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="hc-label">Priority</span>
                <select className="hc-input mt-2" name="priority" value={values.priority} onChange={handleChange}>
                  {priorities.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
                </select>
              </label>
            </div>
            <label className="mt-5 block">
              <span className="hc-label">Complaint details</span>
              <textarea className="hc-input mt-2 min-h-36 resize-y" name="complaint" placeholder="Describe the issue, location, and urgency." onChange={handleChange} />
            </label>
            <label className="mt-5 block">
              <span className="hc-label">Attachment</span>
              <input className="mt-2 block w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" type="file" name="image" accept="image/*" onChange={handleChange} />
            </label>
            <button type="submit" disabled={isSubmitting} className="hc-primary-btn mt-6 w-full disabled:cursor-not-allowed disabled:bg-slate-400">
              {isSubmitting ? "Submitting..." : "Submit complaint"}
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};

export default SubmitComplaint;
