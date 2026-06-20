import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/APIroutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
    const data = await axios.get(`${logoutRoute}/${id}`);

    if (data.status === 200) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <button
      className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-xl text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"
      onClick={handleClick}
      aria-label="Logout"
    >
      <BiPowerOff />
    </button>
  );
}
