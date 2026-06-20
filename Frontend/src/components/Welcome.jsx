import React, { useEffect, useState } from "react";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    setUserName(user?.username || "");
  }, []);

  return (
    <div className="grid h-full place-items-center bg-slate-50 p-6 text-center">
      <div>
        <img className="mx-auto h-40 w-40 object-contain sm:h-56 sm:w-56" src={Robot} alt="" />
        <h1 className="mt-6 text-3xl font-extrabold text-slate-950">
          Welcome, <span className="text-blue-600">{userName}!</span>
        </h1>
        <p className="mt-3 text-slate-500">Select a contact to start messaging.</p>
      </div>
    </div>
  );
}
