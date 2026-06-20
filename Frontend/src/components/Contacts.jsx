import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Fuse from "fuse.js"; // Import Fuse.js
import Logo from "../assets/logo.png";
import Logout from "./Logout";

export default function Contacts({ contacts, currentUser, setCurrentChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.ProfileImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    setCurrentChat(contact);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const complainHandle = () => {
    navigate("/complains");
  };

  const submitHandle = () => {
    navigate("/submit");
  };

  // Set up Fuse.js options
  const fuse = new Fuse(contacts, {
    keys: ["username"], // Specify the keys to search within
    threshold: 0.3, // Set the threshold for matching (0.0 to 1.0)
  });

  // Perform fuzzy search
  const filteredContacts = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : contacts;

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>HostelCare</h3>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search Contacts"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="contacts">
            {filteredContacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={contact.ProfileImage} alt="avatar" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="control-button">
            <button className="complain" onClick={complainHandle}>
              {`${currentUser.isadmin ? `All ` : `Your`} complain`}
            </button>
            {!currentUser.isadmin && (
              <button className="Submit-complain" onClick={submitHandle}>
                Submit complain
              </button>
            )}
            <Logout />
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentUserImage} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 62% 6% 12%;
  overflow: hidden;
  background-color: #080420;
  .control-button {
    display: flex;
    justify-content: center;
    gap: 1rem;
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #9a86f3;
      color: white;
      cursor: pointer;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;

    input {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: none;
      outline: none;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          font-size: 1rem;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 400px;
        }
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 500px; /* Adjust as needed */
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;

      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }

  /* Media queries for responsive font size */
  @media screen and (max-width: 720px) {
    .contacts .contact .username h3 {
      font-size: 0.895rem; /* Adjust font size for small screens */
    }

    .current-user .username h2 {
      font-size: 1rem; /* Adjust font size for small screens */
    }
  }

  @media screen and (max-width: 480px) {
    .contacts .contact .username h3 {
      font-size: 0.75rem; /* Further adjust font size for very small screens */
    }

    .current-user .username h2 {
      font-size: 0.875rem; /* Further adjust font size for very small screens */
    }
  }
`;
