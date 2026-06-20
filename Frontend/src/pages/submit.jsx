import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createComplaintRoute } from "../utils/APIroutes";

const cloudinaryUploadUrl =
  "https://api.cloudinary.com/v1_1/dg5z3w7co/image/upload";

const cloudinaryUploadPreset = "hostelcare_uploads";

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const data = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  );
  const [values, setValues] = useState({
    username: data.username,
    rollNumber: "",
    roomNumber: "", // Added roomNumber to the form state
    complaint: "",
    image: null,
  });

  const handleValidation = () => {
    const { username, rollNumber, roomNumber, complaint } = values;
    if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return false;
    } else if (rollNumber === "") {
      toast.error("Roll number is required.", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return false;
    } else if (roomNumber === "") {
      toast.error("Room number is required.", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return false;
    } else if (complaint === "") {
      toast.error("Complaint is required.", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        let imageUrl = null;
        if (values.image) {
          const formData = new FormData();
          formData.append("file", values.image);
          formData.append("upload_preset", cloudinaryUploadPreset);

          const cloudinaryResponse = await axios.post(
            cloudinaryUploadUrl,
            formData
          );
          imageUrl = cloudinaryResponse.data.secure_url;
        }

        const complaintData = {
          username: values.username,
          rollNumber: values.rollNumber,
          roomNumber: values.roomNumber, // Include roomNumber in the data sent to backend
          from: JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )._id,
          complaint: values.complaint,
          imageUrl,
        };

        const response = await axios.post(createComplaintRoute, complaintData);

        if (response.data.status === false) {
          toast.error(response.data.msg, {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
        if (response.data.status === true) {
          toast.success("Complaint submitted successfully!", {
            position: "bottom-right",
            autoClose: 5000,
          });
          navigate("/complains");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setValues({ ...values, image: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Submit Complaint</h1>
          </div>
          {/* <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          /> */}
          <input
            type="text"
            placeholder="Roll Number"
            name="rollNumber"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Room Number" // Added input for room number
            name="roomNumber"
            onChange={(e) => handleChange(e)}
          />
          <textarea
            placeholder="Your Complaint"
            name="complaint"
            onChange={(e) => handleChange(e)}
          ></textarea>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Submit Complaint</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input,
  textarea {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  input[type="file"] {
    background-color: white;
    color: black;
    padding: 1rem;
    border: none;
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SubmitComplaint;
