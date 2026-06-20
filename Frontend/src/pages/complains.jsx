import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  allgetComplaintRoute,
  getComplaintsRoute,
  updateComplaintStatusRoute,
} from "../utils/APIroutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const GetComplaint = () => {
  const [allcomplaints, setAllComplaints] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [isadmin, setIsAdmin] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        const response = await axios.get(allgetComplaintRoute);
        setAllComplaints(response.data);
      } catch (error) {
        toast.error("Error fetching complaints. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    };

    fetchAllComplaints();
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `${getComplaintsRoute}/${
            JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )._id
          }`
        );
        setComplaints(response.data);
      } catch (error) {
        toast.error("Error fetching complaints. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    };

    fetchComplaints();
  }, []);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if (data && data.isadmin) {
      setIsAdmin(true);
    }
  }, []);

  const updateComplaintStatus = async (_id, status) => {
    try {
      const response = await axios.put(updateComplaintStatusRoute, {
        _id,
        status,
      });

      if (response.data.status) {
        // Update the status of the complaint in the state
        setAllComplaints((prevState) =>
          prevState.map((complaint) =>
            complaint._id === _id ? { ...complaint, status } : complaint
          )
        );

        setComplaints((prevState) =>
          prevState.map((complaint) =>
            complaint._id === _id ? { ...complaint, status } : complaint
          )
        );

        toast.success(response.data.msg, {
          position: "bottom-right",
          autoClose: 5000,
        });
      } else {
        toast.error(response.data.msg, {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleNavigateToChat = () => {
    navigate("/chat");
  };
  const gotouserchat = (username) => {
    navigate("/chat");
  };

  const Complaint = ({ complaint }) => {
    const handleMarkAsCompleted = () => {
      updateComplaintStatus(complaint._id, "completed");
    };
    const deletecomplaint = async (_id) => {
      try {
        const response = await axios.delete(
          `${getComplaintsRoute}/delete/${_id}`
        );
        if (response.data.status) {
          toast.success(response.data.msg, {
            position: "bottom-right",
            autoClose: 5000,
          });
          setComplaints((prevState) =>
            prevState.filter((complaint) => complaint._id !== _id)
          );
          setAllComplaints((prevState) =>
            prevState.filter((complaint) => complaint._id !== _id)
          );
        } else {
          toast.error(response.data.msg, {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error("Error deleting complaint:", error);
        toast.error("An error occurred. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    };

    return (
      <div
        className={`complaint ${
          complaint.status === "completed" ? "completed" : ""
        }`}
        key={complaint._id}
      >
        <div className="detail">
          <h2>{complaint.username}</h2>
          <p>Roll Number: {complaint.rollNumber}</p>
          <p>Room Number: {complaint.roomNumber}</p>
          <p>Issue: {complaint.complaint}</p>
          <p
            className={`status ${
              complaint.status === "completed" ? "completed" : "pending"
            }`}
          >
            Status: {complaint.status}
          </p>
          {isadmin && complaint.status !== "completed" && (
            <button className="mark-completed" onClick={handleMarkAsCompleted}>
              Mark as Completed
            </button>
          )}
          {isadmin && (
            <button
              className="go-back-to-chat"
              onClick={() => gotouserchat(complaint.username)}
            >
              Chat with this User
            </button>
          )}
          {isadmin && complaint.status === "completed" && (
            <button
              className="delete-it"
              onClick={() => deletecomplaint(complaint._id)}
            >
              Delete this complain
            </button>
          )}
          {!isadmin && (
            <button
              className="delete-it"
              onClick={() => deletecomplaint(complaint._id)}
            >
              Delete this complain
            </button>
          )}
        </div>
        <div className="image">
          {complaint.imageUrl && (
            <img src={complaint.imageUrl} alt="Complaint Attachment" />
          )}
        </div>
      </div>
    );
  };

  const filteredComplaints = isadmin
    ? allcomplaints.filter(
        (complaint) =>
          statusFilter === "all" || complaint.status === statusFilter
      )
    : complaints.filter(
        (complaint) =>
          statusFilter === "all" || complaint.status === statusFilter
      );

  return (
    <ComplaintsContainer>
      <h1>All Complaints</h1>
      <div className="filter-buttons">
        <button onClick={() => handleStatusFilterChange("all")}>All</button>
        <button onClick={() => handleStatusFilterChange("pending")}>
          Pending
        </button>
        <button onClick={() => handleStatusFilterChange("completed")}>
          Completed
        </button>
        <button onClick={handleNavigateToChat}>Go to Chat</button>
      </div>
      <div className="complaints-list">
        {filteredComplaints.map((complaint) => (
          <Complaint key={complaint._id} complaint={complaint} />
        ))}
      </div>
      <ToastContainer />
    </ComplaintsContainer>
  );
};

const ComplaintsContainer = styled.div`
  padding: 2rem;
  background-color: #131324;
  min-height: 100vh;
  color: black;
  overflow-y: auto;
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: white;
  }

  .filter-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;

    button {
      padding: 0.5rem 1rem;
      background-color: #9a86f3;
      border: none;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #7b68ee;
      }
    }
  }

  .complaints-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 80vh;
    overflow-y: auto;
  }

  .complaint {
    display: flex;
    gap: 1rem;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;

    img {
      max-width: 500px;
      height: auto;
      margin-top: 1rem;
      border-radius: 0.5rem;
      object-fit: cover;
    }

    .mark-completed {
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      background-color: #9a86f3;
      border: none;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #7b68ee;
      }
    }
    .go-back-to-chat {
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      background-color: #9a86f3;
      border: none;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #7b68ee;
      }
    }
    .delete-it {
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      background-color: red;
      border: none;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #7b68ee;
      }
    }

    .status {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      color: white;
      display: inline-block;

      &.completed {
        background-color: green;
      }

      &.pending {
        background-color: red;
      }
    }
  }
`;

export default GetComplaint;
