import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const SendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="relative border-t border-slate-200 bg-white p-3 sm:p-4">
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-20 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <form className="flex items-center gap-3" onSubmit={SendChat}>
        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-xl text-amber-500 transition hover:bg-amber-50"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          aria-label="Toggle emoji picker"
        >
          <BsEmojiSmileFill />
        </button>
        <input
          className="hc-input"
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(event) => setMsg(event.target.value)}
        />
        <button className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-600 text-xl text-white transition hover:bg-blue-700" aria-label="Send message">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
