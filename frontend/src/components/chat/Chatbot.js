"use client";

import React, { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import ChatInput from "./ChatInput";
import { generateText } from "@/app/ai";
import PacmanLoader from "react-spinners/PacmanLoader";


const Chatbot = () => {
  const [chats, setChats] = useState([
    { isMe: false, content: "HEY! STOP BEING PRODUCTIVE" },
    { isMe: true, content: "Micheal... can you just let me get back to work...." },
  ]);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isNextChatLoading, setIsNextChatLoading] = useState(false);

  const playMp3 = (audioLink) => {
    console.log("Playing audio:", audioLink);
    const audio = new Audio(audioLink); // Create a new Audio object with the audio link
    audio.play(); // Play the audio

    setTimeout(() => {
      audio.pause(); // Pause the audio
      audio.currentTime = 0; // Reset the audio to the beginning
      console.log("Audio stopped after 15 seconds");
    }, 12000);

    // Optional: Add event listeners to track the end of the audio
    audio.onended = () => {
      console.log("Audio finished playing");
      // setIsAudioPlaying(false); // Update the state to indicate the audio has finished
    };

    // Optional: Handle error in case the audio fails to play
    audio.onerror = (e) => {
      console.error("Error playing audio:", e);
      // setIsAudioPlaying(false); // Update the state in case of an error
    };
  };

  const addChat = async ({ message, isMe }) => {
    setChats((chats) => [...chats, { isMe, content: message }]);
    setIsNextChatLoading(true);
    const response = await generateText(message);
    const audioLink = response.audioLink;
    setChats((prevChats) => [
      ...prevChats,
      { isMe: false, content: response.text },
    ]);
    setIsAudioPlaying(true);
    playMp3(audioLink);
    setIsNextChatLoading(false);
    setTimeout(() => {
      setIsAudioPlaying(false);
    }, 12000);
    
  };

  return (
    <div className="w-[90vw]">
      {chats.map((chat, index) => (
        <ChatBubble key={index} isMe={chat.isMe} content={chat.content} />
      ))}
      {isNextChatLoading && <PacmanLoader color="red"/>}
      {isAudioPlaying ? (
        <p className="text-red">&quot;No typing while i speak!&quot;</p>
        
      ) : (
        <ChatInput addChat={addChat} />
      )}
    </div>
  );
};

export default Chatbot;
