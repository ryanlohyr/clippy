"use client";

import React, { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import ChatInput from "./ChatInput";

const Chatbot = () => {
  const [chats, setChats] = useState([
    { isMe: false, content: "why are you so lazy!" },
    { isMe: true, content: "sorry man!" },
  ]);

  const addChat = ({message, isMe}) => {
    console.log(message);
    setChats([...chats, { isMe: isMe, content: message }]);
  };

  return (
    <div className="max-w-[80vw] ">
      {chats.map((chat, index) => (
        <ChatBubble key={index} isMe={chat.isMe} content={chat.content} />
      ))}

      <ChatInput addChat={addChat} />
    </div>
  );
};

export default Chatbot;
