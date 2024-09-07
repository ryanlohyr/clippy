"use client";

import React, { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";

const ChatInput = ({ isNextChatLoading, addChat }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const submitInput = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (input.trim()) {
      addChat({ message: input, isMe: true });
      setInput("");
    }
  };

  return (
    <div className="relative max-w-full h-[100px]">
      <div className="px-[15px] pb-[20px]">
        {/* Form element */}
        <form
          onSubmit={submitInput}
          className="w-[100%] drop-shadow-lg h-fit flex items-center border-gray-300 border-[1px] rounded-xl bg-white"
        >
          <input
            name="message"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className="text-black resize-none px-4 max-h-[120px] grow border-none rounded-xl focus:outline-none border-transparent focus:ring-0 overflow-x-hidden"
          />

          <button
            type="submit"
            disabled={isNextChatLoading}
            className="pr-2 flex"
          >
            <SearchIcon
              className="mt-[2px] h-5 w-5"
              colour={isNextChatLoading ? "#808080" : "#171924"}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
