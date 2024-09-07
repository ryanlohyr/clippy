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

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const playMp3 = (audioLink) => {
    console.log('Playing audio:', audioLink);
    const audio = new Audio(audioLink); // Create a new Audio object with the audio link
    audio.play(); // Play the audio
    
    // Optional: Add event listeners to track the end of the audio
    audio.onended = () => {
      console.log('Audio finished playing');
      setIsAudioPlaying(false); // Update the state to indicate the audio has finished
    };
  
    // Optional: Handle error in case the audio fails to play
    audio.onerror = (e) => {
      console.error('Error playing audio:', e);
      setIsAudioPlaying(false); // Update the state in case of an error
    };
  };
  

  const addChat = async ({ message, isMe }) => {
    setChats((chats) => [...chats, { isMe, content: message }]);
    const response = await generateText(message);
    const audioLink = response.audioLink;
    setChats((prevChats) => [...prevChats, { isMe: false, content: response.text }]);
    setIsAudioPlaying(true);
    playMp3(audioLink);
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