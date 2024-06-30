// Create a context to hold the nextMessage variable
import React, { createContext, useContext, useState } from "react";

const NewMessageContext = createContext();

export const NewMessageProvider = ({ children }) => {
  const [newMessage, setNewMessage] = useState("");

  return (
    <NewMessageContext.Provider value={{ newMessage, setNewMessage }}>
      {children}
    </NewMessageContext.Provider>
  );
};

export const useNewMessage = () => useContext(NewMessageContext);
