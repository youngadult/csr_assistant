// ChatContext.js
import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatEnded, setChatEnded] = useState(false);

  return (
    <ChatContext.Provider value={{ chatEnded, setChatEnded }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
