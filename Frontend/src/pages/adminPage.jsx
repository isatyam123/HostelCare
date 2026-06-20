import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logout from "../components/Logout"; // Make sure the path to the Logout component is correct

const AdminPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleViewComplaints = () => {
    navigate("/complains");
  };

  const handleGoToChats = () => {
    navigate("/chat");
  };

  if (!currentUser || !currentUser.isadmin) {
    return <div>Loading...</div>;
  }

  return (
    <AdminContainer>
      <div className="logout-container">
        <Logout />
      </div>
      <div className="welcome">
        <h1>Welcome, {currentUser.username}!</h1>
      </div>
      <div className="options">
        <button onClick={handleViewComplaints}>See All Complaints</button>
        <button onClick={handleGoToChats}>Go to Chats</button>
      </div>
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  color: white;
  position: relative;

  .logout-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .welcome {
    margin-bottom: 2rem;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      padding: 1rem 2rem;
      background-color: #9a86f3;
      border: none;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: #7b68ee;
      }
    }
  }
`;

export default AdminPage;
