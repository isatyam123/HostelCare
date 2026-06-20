import React, { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIroutes";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (currentUser && currentChat) {
          const response = await axios.post(recieveMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    setMessages([...messages, { fromSelf: true, message: msg }]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentChat) {
    return <div className="grid h-full place-items-center text-slate-500">No chat selected</div>;
  }

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_1fr_auto] bg-slate-50">
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <img className="h-11 w-11 rounded-full bg-slate-100 object-cover" src={currentChat.ProfileImage} alt="avatar" />
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-slate-950">{currentChat.username}</h3>
            <p className="text-xs font-semibold text-emerald-600">Available for HostelCare chat</p>
          </div>
        </div>
        <Logout />
      </header>

      <div className="min-h-0 overflow-y-auto px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <div ref={scrollRef} key={uuidv4()} className={`flex ${message.fromSelf ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[65%] ${
                  message.fromSelf ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-700"
                }`}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
