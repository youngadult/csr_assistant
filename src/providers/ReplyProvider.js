// AutoReplyContext.js
import React, { createContext, useEffect, useState } from "react";

import avatarImage from '../assets/Avatar3.png'

export const AutoReplyContext = createContext();

export const AutoReplyProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const initialMessage = {
    key: 1,
    image: avatarImage,
    type: "other",
    msg: "Hi, I'm Alice. I will be assisting you today.<br><br> I see your bill appears to be higher than usual. Would you like me to help clarify the charges?",
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setChatMessages([initialMessage]);
    }, 6000);

    return () => clearTimeout(timeoutId); // Cleanup to prevent memory leaks
  }, []);

  return (
    <AutoReplyContext.Provider value={{ chatMessages, setChatMessages }}>
      {children}
    </AutoReplyContext.Provider>
  );
};
