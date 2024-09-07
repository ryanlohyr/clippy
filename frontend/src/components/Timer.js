"use client";

import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(20); // Initialize the timer at 30 seconds



  useEffect(() => {
    // Create a countdown effect
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId); // Cleanup the timer
    }
  }, [timeLeft]);

  return (
    <div className="absolute top-0 w-full bg-black text-white p-4 flex justify-center">
      {timeLeft === 0 ? (
        <h1 className="text-xl font-bold">I want you to stay here and be useless</h1>
      ) : (
        <h1 className="text-xl font-bold">
          You need to stay on this site for {timeLeft} seconds xd xd xd
        </h1>
      )}
    </div>
  );
};

export default Timer;
