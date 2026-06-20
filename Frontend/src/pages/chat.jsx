import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { allUsersRoute, host, alladminRoute } from "../utils/APIroutes";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      setCurrentUser(data);
      setIsLoaded(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (currentUser && !currentUser.isadmin) {
        try {
          const response = await axios.get(`${alladminRoute}/${currentUser._id}`);
          setContacts(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      } else if (currentUser && currentUser.isadmin) {
        try {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, [currentUser]);

  return (
    <main className="min-h-screen bg-slate-100 p-3 text-slate-900 sm:p-5">
      <div className="mx-auto grid h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft sm:h-[calc(100vh-2.5rem)] lg:grid-cols-[320px_1fr]">
        <Contacts contacts={contacts} currentUser={currentUser} setCurrentChat={setCurrentChat} />
        <section className="min-h-0">
          {isLoaded && currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )}
        </section>
      </div>
    </main>
  );
};

export default Chat;
