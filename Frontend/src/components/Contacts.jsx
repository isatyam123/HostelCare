import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import Logout from "./Logout";
import { BrandMark } from "./ui";

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

  const fuse = new Fuse(contacts, { keys: ["username"], threshold: 0.3 });
  const filteredContacts = searchQuery ? fuse.search(searchQuery).map((result) => result.item) : contacts;

  return (
    <aside className="flex min-h-0 flex-col border-b border-slate-200 bg-slate-950 text-white lg:border-b-0 lg:border-r">
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <BrandMark inverse />
          <Logout />
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/15" onClick={() => navigate("/complains")}>
            {currentUser?.isadmin ? "All complaints" : "My complaints"}
          </button>
          {!currentUser?.isadmin && (
            <button className="flex-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-600" onClick={() => navigate("/submit")}>
              Submit
            </button>
          )}
        </div>
      </div>

      <div className="border-b border-white/10 p-4">
        <input
          className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-500/20"
          type="text"
          placeholder="Search contacts"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {filteredContacts.map((contact, index) => (
            <button
              key={contact._id}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition ${
                index === currentSelected ? "bg-blue-600 text-white" : "bg-white/5 text-slate-100 hover:bg-white/10"
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <img className="h-10 w-10 rounded-full bg-white object-cover" src={contact.ProfileImage} alt="avatar" />
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">{contact.username}</span>
            </button>
          ))}
          {filteredContacts.length === 0 && (
            <div className="rounded-lg border border-white/10 p-4 text-sm text-slate-300">No contacts found.</div>
          )}
        </div>
      </div>

      {currentUserImage && currentUserName && (
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <img className="h-11 w-11 rounded-full bg-white object-cover" src={currentUserImage} alt="avatar" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{currentUserName}</p>
              <p className="text-xs text-slate-400">{currentUser?.isadmin ? "Administrator" : "Student"}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
