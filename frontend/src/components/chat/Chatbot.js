"use client";

import React, { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import ChatInput from "./ChatInput";
import { generateText } from "@/app/ai";

const Chatbot = () => {
  const [chats, setChats] = useState([
    { isMe: false, content: "why are you so lazy!" },
    { isMe: true, content: "sorry man!" },
  ]);

  const addChat = async ({ message, isMe }) => {
    console.log("addChat +++=============");
    // console.log("previous chats: " + prevChats);
    // console.log("message:" + message);
    setChats((chats) => [...chats, { isMe, content: message }]);
    const response = await generateText(chats);
    // console.log("previous chats:" + prevChats);
    // console.log("response:" + response);
    setChats((prevChats) => [...prevChats, { isMe: false, content: response }]);
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